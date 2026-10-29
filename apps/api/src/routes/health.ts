import type { FastifyPluginAsync } from "fastify";
import type { HealthCheckResponse } from "@alumnux/types";
import { env } from "../config/env.js";
import { getDatabaseClient } from "../db/connection.js";

const startTime = Date.now();

export const healthRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Reply: HealthCheckResponse }>("/health", async (_request, reply) => {
    const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
    const db = getDatabaseClient();

    let dbStatus: "connected" | "disconnected" | "mock" = "disconnected";
    let isHealthy = true;

    try {
      const pingOk = await db.ping();
      if (pingOk) {
        dbStatus = db.isMock() ? "mock" : "connected";
      } else {
        isHealthy = false;
      }
    } catch {
      isHealthy = false;
      dbStatus = "disconnected";
    }

    const payload: HealthCheckResponse & { database?: string } = {
      status: isHealthy ? "ok" : "degraded",
      service: "alumnux-api",
      version: env.API_VERSION,
      uptime: uptimeSeconds,
      timestamp: new Date().toISOString(),
      database: dbStatus,
    };

    return reply.status(isHealthy ? 200 : 503).send(payload as HealthCheckResponse);
  });
};
