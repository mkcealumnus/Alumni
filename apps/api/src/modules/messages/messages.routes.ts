import type { FastifyPluginAsync } from "fastify";
import { v4 as uuidv4 } from "uuid";
import {
  sendMessageSchema,
  createConversationSchema,
} from "@alumnux/schemas";
import type {
  ApiSuccessResponse,
  Conversation,
  ChatMessage,
} from "@alumnux/types";
import { authenticate } from "../../middleware/authenticate.js";
import { getDatabaseClient } from "../../db/connection.js";

export const messagesRoutes: FastifyPluginAsync = async (fastify) => {
  // Helper to format conversation entity with participant names & unread counts
  async function hydrateConversation(r: any, currentUserId: string): Promise<Conversation> {
    const db = getDatabaseClient();

    // Query student profile
    const studentProfiles = await db.query<any>(
      "SELECT * FROM `profiles` WHERE `user_id` = ? LIMIT 1;",
      [r.student_id]
    );
    const sp = studentProfiles[0] || {};

    // Query alumni profile
    const alumniProfiles = await db.query<any>(
      "SELECT * FROM `profiles` WHERE `user_id` = ? LIMIT 1;",
      [r.alumni_id]
    );
    const ap = alumniProfiles[0] || {};

    // Calculate unread count for current user
    const unreadRows = await db.query<any>(
      "SELECT * FROM `messages` WHERE `conversation_id` = ?;",
      [r.id]
    );
    const unreadCount = unreadRows.filter(
      (m: any) => m.sender_id !== currentUserId && m.status !== "read"
    ).length;

    return {
      id: r.id,
      studentId: r.student_id,
      studentName: sp.full_name || "Student Participant",
      studentDepartment: sp.department_code || "Engineering",
      studentGraduationYear: sp.graduation_year || 2026,
      alumniId: r.alumni_id,
      alumniName: ap.full_name || "Alumni Mentor",
      alumniRoleTitle: ap.current_role || "Professional",
      alumniCompany: ap.current_company || "Industry",
      mentorshipRequestId: r.mentorship_request_id || undefined,
      topic: r.topic || undefined,
      status: r.status || "active",
      createdAt: typeof r.created_at === "string" ? r.created_at : new Date(r.created_at).toISOString(),
      lastMessageAt: typeof r.last_message_at === "string" ? r.last_message_at : new Date(r.last_message_at).toISOString(),
      lastMessagePreview: r.last_message_preview || undefined,
      unreadCount,
    };
  }

  // 1. GET /v1/conversations
  fastify.get(
    "/v1/conversations",
    { preHandler: [authenticate] },
    async (request, reply) => {
      const userId = request.user!.id;
      const db = getDatabaseClient();

      const rows = await db.query<any>(
        `SELECT * FROM \`conversations\`
         WHERE \`student_id\` = ? OR \`alumni_id\` = ?
         ORDER BY \`last_message_at\` DESC;`,
        [userId, userId]
      );

      const data: Conversation[] = [];
      for (const r of rows) {
        data.push(await hydrateConversation(r, userId));
      }

      const response: ApiSuccessResponse<Conversation[]> = {
        success: true,
        data,
        timestamp: new Date().toISOString(),
      };
      return reply.status(200).send(response);
    }
  );

  // 2. POST /v1/conversations (start or get existing conversation)
  fastify.post(
    "/v1/conversations",
    { preHandler: [authenticate] },
    async (request, reply) => {
      const parseResult = createConversationSchema.safeParse(request.body);
      if (!parseResult.success) {
        return reply.status(400).send({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid conversation request",
            details: parseResult.error.errors.map((e) => ({
              field: e.path.join("."),
              message: e.message,
            })),
          },
          timestamp: new Date().toISOString(),
        });
      }

      const currentUserId = request.user!.id;
      const currentUserRole = request.user!.role;
      const { participantId, mentorshipRequestId, topic } = parseResult.data;

      if (currentUserId === participantId) {
        return reply.status(400).send({
          success: false,
          error: {
            code: "CANNOT_MESSAGE_SELF",
            message: "You cannot initiate a conversation with yourself.",
          },
          timestamp: new Date().toISOString(),
        });
      }

      const db = getDatabaseClient();

      // Resolve roles to assign student_id and alumni_id correctly
      let studentId = currentUserId;
      let alumniId = participantId;
      if (currentUserRole === "ALUMNI") {
        alumniId = currentUserId;
        studentId = participantId;
      }

      // Check if conversation already exists between this student & alumni
      const existing = await db.query<any>(
        "SELECT * FROM `conversations` WHERE `student_id` = ? AND `alumni_id` = ? LIMIT 1;",
        [studentId, alumniId]
      );

      if (existing && existing.length > 0) {
        const hydrated = await hydrateConversation(existing[0], currentUserId);
        return reply.status(200).send({
          success: true,
          data: hydrated,
          timestamp: new Date().toISOString(),
        });
      }

      const convId = uuidv4();
      await db.execute(
        `INSERT INTO \`conversations\` (\`id\`, \`student_id\`, \`alumni_id\`, \`mentorship_request_id\`, \`topic\`, \`status\`)
         VALUES (?, ?, ?, ?, ?, 'active');`,
        [convId, studentId, alumniId, mentorshipRequestId || null, topic || null]
      );

      const createdRows = await db.query<any>(
        "SELECT * FROM `conversations` WHERE `id` = ? LIMIT 1;",
        [convId]
      );

      const hydrated = await hydrateConversation(createdRows[0] || {
        id: convId,
        student_id: studentId,
        alumni_id: alumniId,
        mentorship_request_id: mentorshipRequestId,
        topic,
        status: "active",
        created_at: new Date().toISOString(),
        last_message_at: new Date().toISOString(),
      }, currentUserId);

      return reply.status(201).send({
        success: true,
        data: hydrated,
        timestamp: new Date().toISOString(),
      });
    }
  );

  // 3. GET /v1/conversations/:id
  fastify.get<{ Params: { id: string } }>(
    "/v1/conversations/:id",
    { preHandler: [authenticate] },
    async (request, reply) => {
      const { id } = request.params;
      const userId = request.user!.id;
      const db = getDatabaseClient();

      const rows = await db.query<any>(
        "SELECT * FROM `conversations` WHERE `id` = ? LIMIT 1;",
        [id]
      );

      if (!rows || rows.length === 0) {
        return reply.status(404).send({
          success: false,
          error: {
            code: "CONVERSATION_NOT_FOUND",
            message: "Conversation not found.",
          },
          timestamp: new Date().toISOString(),
        });
      }

      const conv = rows[0];
      if (conv.student_id !== userId && conv.alumni_id !== userId && request.user!.role !== "ADMIN") {
        return reply.status(403).send({
          success: false,
          error: {
            code: "FORBIDDEN",
            message: "You are not authorized to access this private conversation.",
          },
          timestamp: new Date().toISOString(),
        });
      }

      const data = await hydrateConversation(conv, userId);
      return reply.status(200).send({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    }
  );

  // 4. GET /v1/conversations/:id/messages
  fastify.get<{ Params: { id: string } }>(
    "/v1/conversations/:id/messages",
    { preHandler: [authenticate] },
    async (request, reply) => {
      const { id } = request.params;
      const userId = request.user!.id;
      const db = getDatabaseClient();

      // Verify participant authorization
      const convRows = await db.query<any>(
        "SELECT * FROM `conversations` WHERE `id` = ? LIMIT 1;",
        [id]
      );

      if (!convRows || convRows.length === 0) {
        return reply.status(404).send({
          success: false,
          error: {
            code: "CONVERSATION_NOT_FOUND",
            message: "Conversation not found.",
          },
          timestamp: new Date().toISOString(),
        });
      }

      const conv = convRows[0];
      if (conv.student_id !== userId && conv.alumni_id !== userId && request.user!.role !== "ADMIN") {
        return reply.status(403).send({
          success: false,
          error: {
            code: "FORBIDDEN",
            message: "You are not authorized to view messages in this conversation.",
          },
          timestamp: new Date().toISOString(),
        });
      }

      const rawMessages = await db.query<any>(
        "SELECT * FROM `messages` WHERE `conversation_id` = ? ORDER BY `created_at` ASC;",
        [id]
      );

      const data: ChatMessage[] = rawMessages.map((m: any) => ({
        id: m.id,
        conversationId: m.conversation_id,
        senderId: m.sender_id,
        senderName: m.sender_name,
        senderRole: m.sender_role,
        content: m.content,
        status: m.status || "sent",
        createdAt: typeof m.created_at === "string" ? m.created_at : new Date(m.created_at).toISOString(),
        updatedAt: m.updated_at ? (typeof m.updated_at === "string" ? m.updated_at : new Date(m.updated_at).toISOString()) : undefined,
      }));

      return reply.status(200).send({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    }
  );

  // 5. POST /v1/conversations/:id/messages
  fastify.post<{ Params: { id: string } }>(
    "/v1/conversations/:id/messages",
    { preHandler: [authenticate] },
    async (request, reply) => {
      const { id } = request.params;
      const userId = request.user!.id;
      const userRole = request.user!.role;
      const db = getDatabaseClient();

      // Verify participant authorization
      const convRows = await db.query<any>(
        "SELECT * FROM `conversations` WHERE `id` = ? LIMIT 1;",
        [id]
      );

      if (!convRows || convRows.length === 0) {
        return reply.status(404).send({
          success: false,
          error: {
            code: "CONVERSATION_NOT_FOUND",
            message: "Conversation not found.",
          },
          timestamp: new Date().toISOString(),
        });
      }

      const conv = convRows[0];
      if (conv.student_id !== userId && conv.alumni_id !== userId) {
        return reply.status(403).send({
          success: false,
          error: {
            code: "FORBIDDEN",
            message: "You are not authorized to send messages in this conversation.",
          },
          timestamp: new Date().toISOString(),
        });
      }

      const parseResult = sendMessageSchema.safeParse(request.body);
      if (!parseResult.success) {
        return reply.status(400).send({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid message content",
            details: parseResult.error.errors.map((e) => ({
              field: e.path.join("."),
              message: e.message,
            })),
          },
          timestamp: new Date().toISOString(),
        });
      }

      const { content } = parseResult.data;

      // Fetch sender full name from profile
      const userProfiles = await db.query<any>(
        "SELECT * FROM `profiles` WHERE `user_id` = ? LIMIT 1;",
        [userId]
      );
      const senderName = userProfiles[0]?.full_name || request.user!.email;

      const messageId = uuidv4();
      const nowIso = new Date().toISOString();

      // Insert message
      await db.execute(
        `INSERT INTO \`messages\` (\`id\`, \`conversation_id\`, \`sender_id\`, \`sender_name\`, \`sender_role\`, \`content\`, \`status\`)
         VALUES (?, ?, ?, ?, ?, ?, 'sent');`,
        [messageId, id, userId, senderName, userRole, content]
      );

      // Update conversation last message preview
      await db.execute(
        "UPDATE `conversations` SET `last_message_preview` = ?, `last_message_at` = CURRENT_TIMESTAMP WHERE `id` = ?;",
        [content.slice(0, 150), id]
      );

      const createdMessage: ChatMessage = {
        id: messageId,
        conversationId: id,
        senderId: userId,
        senderName,
        senderRole: userRole,
        content,
        status: "sent",
        createdAt: nowIso,
        updatedAt: nowIso,
      };

      return reply.status(201).send({
        success: true,
        data: createdMessage,
        timestamp: new Date().toISOString(),
      });
    }
  );

  // 6. PATCH /v1/conversations/:id/read
  fastify.patch<{ Params: { id: string } }>(
    "/v1/conversations/:id/read",
    { preHandler: [authenticate] },
    async (request, reply) => {
      const { id } = request.params;
      const userId = request.user!.id;
      const db = getDatabaseClient();

      await db.execute(
        "UPDATE `messages` SET `status` = 'read' WHERE `conversation_id` = ? AND `sender_id` != ? AND `status` != 'read';",
        [id, userId]
      );

      return reply.status(200).send({
        success: true,
        data: { success: true },
        timestamp: new Date().toISOString(),
      });
    }
  );
};
