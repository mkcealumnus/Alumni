import type { FastifyPluginAsync } from "fastify";
import type { HealthCheckResponse } from "@alumnux/types";
import { env } from "../config/env.js";

const startTime = Date.now();

export const healthRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Reply: HealthCheckResponse }>("/health", async (_request, reply) => {
    const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);

    const payload: HealthCheckResponse = {
      status: "ok",
      service: "alumnux-api",
      version: env.API_VERSION,
      uptime: uptimeSeconds,
      timestamp: new Date().toISOString(),
    };

    return reply.status(200).send(payload);
  });
};
