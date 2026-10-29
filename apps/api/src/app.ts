import Fastify, { FastifyError, FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import type { ApiErrorResponse } from "@alumnux/types";
import { env } from "./config/env.js";
import { healthRoutes } from "./routes/health.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { directoryRoutes } from "./modules/directory/directory.routes.js";
import { mentorshipRoutes } from "./modules/mentorship/mentorship.routes.js";

export function buildApp(): FastifyInstance {
  const isDev = env.NODE_ENV === "development";

  const app = Fastify({
    logger: env.NODE_ENV === "test"
      ? false
      : {
          level: isDev ? "debug" : "info",
          redact: [
            "req.headers.authorization",
            "req.headers.cookie",
            "req.body.password",
            "req.body.token",
            "req.body.secret",
          ],
        },
  });

  // CORS Configuration
  const allowedOrigins = env.CORS_ORIGIN === "*"
    ? true
    : env.CORS_ORIGIN.split(",").map((s) => s.trim());

  app.register(cors, {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  });

  // Cookie Support for HttpOnly refresh tokens
  app.register(cookie, {
    secret: env.COOKIE_SECRET,
    hook: "onRequest",
  });

  // Register Routes
  app.register(healthRoutes);
  app.register(authRoutes);
  app.register(directoryRoutes);
  app.register(mentorshipRoutes);

  // 404 Not Found Handler
  app.setNotFoundHandler((request, reply) => {
    const errorResponse: ApiErrorResponse = {
      success: false,
      error: {
        code: "NOT_FOUND",
        message: `Route ${request.method} ${request.url} not found`,
      },
      timestamp: new Date().toISOString(),
    };
    reply.status(404).send(errorResponse);
  });

  // Centralized Error Handler
  app.setErrorHandler((error: FastifyError | Error, _request, reply) => {
    const fastifyError = error as Partial<FastifyError>;
    const statusCode =
      fastifyError.statusCode && fastifyError.statusCode >= 400 && fastifyError.statusCode < 600
        ? fastifyError.statusCode
        : 500;

    app.log.error(error);

    const errorResponse: ApiErrorResponse = {
      success: false,
      error: {
        code: fastifyError.code || (statusCode === 500 ? "INTERNAL_SERVER_ERROR" : "BAD_REQUEST"),
        message:
          statusCode === 500 && env.NODE_ENV === "production"
            ? "An unexpected error occurred"
            : error.message || "An error occurred",
      },
      timestamp: new Date().toISOString(),
    };

    reply.status(statusCode).send(errorResponse);
  });

  return app;
}
