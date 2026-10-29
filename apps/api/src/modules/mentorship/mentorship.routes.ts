import type { FastifyPluginAsync } from "fastify";
import { v4 as uuidv4 } from "uuid";
import {
  createMentorshipRequestSchema,
  updateMentorshipStatusSchema,
} from "@alumnux/schemas";
import type { ApiSuccessResponse, MentorshipRequest } from "@alumnux/types";
import { authenticate } from "../../middleware/authenticate.js";
import { getDatabaseClient } from "../../db/connection.js";

export const mentorshipRoutes: FastifyPluginAsync = async (fastify) => {
  // 1. GET /v1/mentorship/requests
  fastify.get(
    "/v1/mentorship/requests",
    { preHandler: [authenticate] },
    async (request, reply) => {
      const userId = request.user!.id;
      const db = getDatabaseClient();

      const rows = await db.query<any>(
        `SELECT * FROM \`mentorship_requests\`
         WHERE \`requester_id\` = ? OR \`recipient_id\` = ?
         ORDER BY \`created_at\` DESC;`,
        [userId, userId]
      );

      const data: MentorshipRequest[] = rows.map((r) => ({
        id: r.id,
        studentId: r.requester_id,
        alumniId: r.recipient_id,
        topicId: r.topic_id || "general",
        message: r.message,
        status: r.status.toLowerCase(),
        createdAt: typeof r.created_at === "string" ? r.created_at : new Date(r.created_at).toISOString(),
        updatedAt: r.updated_at ? (typeof r.updated_at === "string" ? r.updated_at : new Date(r.updated_at).toISOString()) : undefined,
      }));

      const response: ApiSuccessResponse<MentorshipRequest[]> = {
        success: true,
        data,
        timestamp: new Date().toISOString(),
      };
      return reply.status(200).send(response);
    }
  );

  // 2. POST /v1/mentorship/requests
  fastify.post(
    "/v1/mentorship/requests",
    { preHandler: [authenticate] },
    async (request, reply) => {
      const parseResult = createMentorshipRequestSchema.safeParse(request.body);
      if (!parseResult.success) {
        return reply.status(400).send({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid mentorship request input",
            details: parseResult.error.errors.map((e) => ({
              field: e.path.join("."),
              message: e.message,
            })),
          },
          timestamp: new Date().toISOString(),
        });
      }

      const requesterId = request.user!.id;
      const { recipientId, topicId, message } = parseResult.data;

      if (requesterId === recipientId) {
        return reply.status(400).send({
          success: false,
          error: {
            code: "CANNOT_MENTOR_SELF",
            message: "You cannot request mentorship from yourself.",
          },
          timestamp: new Date().toISOString(),
        });
      }

      const db = getDatabaseClient();
      if (request.user!.role !== "STUDENT") {
        return reply.status(403).send({
          success: false,
          error: { code: "FORBIDDEN", message: "Only students can request mentorship." },
          timestamp: new Date().toISOString(),
        });
      }

      const recipients = await db.query<any>(
        "SELECT `id`, `role` FROM `users` WHERE `id` = ? LIMIT 1;",
        [recipientId]
      );
      if (recipients.length === 0) {
        return reply.status(404).send({
          success: false,
          error: { code: "RECIPIENT_NOT_FOUND", message: "Mentorship recipient not found." },
          timestamp: new Date().toISOString(),
        });
      }
      if (recipients[0].role !== "ALUMNI") {
        return reply.status(400).send({
          success: false,
          error: { code: "INVALID_RECIPIENT_ROLE", message: "Mentorship requests must target an alumni account." },
          timestamp: new Date().toISOString(),
        });
      }

      const requestId = uuidv4();

      await db.execute(
        `INSERT INTO \`mentorship_requests\` (\`id\`, \`requester_id\`, \`recipient_id\`, \`topic_id\`, \`message\`, \`status\`)
         VALUES (?, ?, ?, ?, ?, 'PENDING');`,
        [requestId, requesterId, recipientId, topicId || null, message]
      );

      const created: MentorshipRequest = {
        id: requestId,
        studentId: requesterId,
        alumniId: recipientId,
        topicId: topicId || "general",
        message,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      const response: ApiSuccessResponse<MentorshipRequest> = {
        success: true,
        data: created,
        timestamp: new Date().toISOString(),
      };
      return reply.status(201).send(response);
    }
  );

  // 3. PATCH /v1/mentorship/requests/:id/status
  fastify.patch<{ Params: { id: string } }>(
    "/v1/mentorship/requests/:id/status",
    { preHandler: [authenticate] },
    async (request, reply) => {
      const { id } = request.params;
      const parseResult = updateMentorshipStatusSchema.safeParse(request.body);
      if (!parseResult.success) {
        return reply.status(400).send({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid status value",
            details: parseResult.error.errors.map((e) => ({
              field: e.path.join("."),
              message: e.message,
            })),
          },
          timestamp: new Date().toISOString(),
        });
      }

      const userId = request.user!.id;
      const { status } = parseResult.data;
      const db = getDatabaseClient();

      const result = await db.transaction(async (trx) => {
        const existing = await trx.query<any>(
          "SELECT * FROM `mentorship_requests` WHERE `id` = ? LIMIT 1 FOR UPDATE;",
          [id]
        );
        if (existing.length === 0) return { outcome: "NOT_FOUND" as const };

        const reqRecord = existing[0];
        if (reqRecord.status.toUpperCase() !== "PENDING") {
          return { outcome: "INVALID_TRANSITION" as const };
        }

        if ((status === "ACCEPTED" || status === "DECLINED") && reqRecord.recipient_id !== userId) {
          return { outcome: "FORBIDDEN" as const };
        }
        if (status === "CANCELLED" && reqRecord.requester_id !== userId) {
          return { outcome: "FORBIDDEN" as const };
        }

        const updateResult = await trx.execute(
          "UPDATE `mentorship_requests` SET `status` = ?, `updated_at` = CURRENT_TIMESTAMP WHERE `id` = ? AND `status` = 'PENDING';",
          [status, id]
        );
        if (updateResult.affectedRows !== 1) return { outcome: "INVALID_TRANSITION" as const };
        return { outcome: "UPDATED" as const, request: reqRecord };
      });

      if (result.outcome === "NOT_FOUND") {
        return reply.status(404).send({
          success: false,
          error: {
            code: "REQUEST_NOT_FOUND",
            message: "Mentorship request not found.",
          },
          timestamp: new Date().toISOString(),
        });
      }

      if (result.outcome === "FORBIDDEN") {
        return reply.status(403).send({
          success: false,
          error: {
            code: "FORBIDDEN",
            message: "You are not authorized to update this mentorship request.",
          },
          timestamp: new Date().toISOString(),
        });
      }

      if (result.outcome === "INVALID_TRANSITION") {
        return reply.status(409).send({
          success: false,
          error: {
            code: "INVALID_STATUS_TRANSITION",
            message: "Only pending mentorship requests can be updated.",
          },
          timestamp: new Date().toISOString(),
        });
      }

      const reqRecord = result.request!;

      const updated: MentorshipRequest = {
        id,
        studentId: reqRecord.requester_id,
        alumniId: reqRecord.recipient_id,
        topicId: reqRecord.topic_id || "general",
        message: reqRecord.message,
        status: status.toLowerCase() as any,
        createdAt: typeof reqRecord.created_at === "string" ? reqRecord.created_at : new Date(reqRecord.created_at).toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const response: ApiSuccessResponse<MentorshipRequest> = {
        success: true,
        data: updated,
        timestamp: new Date().toISOString(),
      };
      return reply.status(200).send(response);
    }
  );
};
