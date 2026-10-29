import type { FastifyPluginAsync } from "fastify";
import {
  signupSchema,
  loginSchema,
  refreshSchema,
  updateProfileSchema,
} from "@alumnux/schemas";
import type { ApiSuccessResponse } from "@alumnux/types";
import { AuthService, AuthError } from "./auth.service.js";
import { authenticate } from "../../middleware/authenticate.js";
import { env } from "../../config/env.js";

const authService = new AuthService();

export const authRoutes: FastifyPluginAsync = async (fastify) => {
  // Helper to set HttpOnly refresh cookie
  const setRefreshCookie = (reply: any, token: string) => {
    if (reply.setCookie) {
      reply.setCookie("alumnux_refresh_token", token, {
        path: "/",
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: env.REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60,
      });
    }
  };

  // Helper to clear refresh cookie
  const clearRefreshCookie = (reply: any) => {
    if (reply.clearCookie) {
      reply.clearCookie("alumnux_refresh_token", { path: "/" });
    }
  };

  // 1. POST /v1/auth/signup
  fastify.post("/v1/auth/signup", async (request, reply) => {
    const parseResult = signupSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid registration fields",
          details: parseResult.error.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        timestamp: new Date().toISOString(),
      });
    }

    try {
      const result = await authService.signup(parseResult.data);
      setRefreshCookie(reply, result.tokens.refreshToken);

      const response: ApiSuccessResponse<typeof result> = {
        success: true,
        data: result,
        timestamp: new Date().toISOString(),
      };
      return reply.status(201).send(response);
    } catch (err: unknown) {
      if (err instanceof AuthError) {
        return reply.status(err.statusCode).send({
          success: false,
          error: { code: err.code, message: err.message },
          timestamp: new Date().toISOString(),
        });
      }
      throw err;
    }
  });

  // 2. POST /v1/auth/login
  fastify.post("/v1/auth/login", async (request, reply) => {
    const parseResult = loginSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Email and password are required",
          details: parseResult.error.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        timestamp: new Date().toISOString(),
      });
    }

    try {
      const result = await authService.login(parseResult.data);
      setRefreshCookie(reply, result.tokens.refreshToken);

      const response: ApiSuccessResponse<typeof result> = {
        success: true,
        data: result,
        timestamp: new Date().toISOString(),
      };
      return reply.status(200).send(response);
    } catch (err: unknown) {
      if (err instanceof AuthError) {
        return reply.status(err.statusCode).send({
          success: false,
          error: { code: err.code, message: err.message },
          timestamp: new Date().toISOString(),
        });
      }
      throw err;
    }
  });

  // 3. POST /v1/auth/refresh
  fastify.post("/v1/auth/refresh", async (request, reply) => {
    // Read from request body or cookie
    const bodyResult = refreshSchema.safeParse(request.body || {});
    const cookieToken = (request as any).cookies?.alumnux_refresh_token;
    const token = bodyResult.success && bodyResult.data.refreshToken
      ? bodyResult.data.refreshToken
      : cookieToken;

    if (!token) {
      return reply.status(401).send({
        success: false,
        error: {
          code: "REFRESH_TOKEN_REQUIRED",
          message: "Refresh token is missing from body and cookies.",
        },
        timestamp: new Date().toISOString(),
      });
    }

    try {
      const tokens = await authService.refresh(token);
      setRefreshCookie(reply, tokens.refreshToken);

      const response: ApiSuccessResponse<typeof tokens> = {
        success: true,
        data: tokens,
        timestamp: new Date().toISOString(),
      };
      return reply.status(200).send(response);
    } catch (err: unknown) {
      if (err instanceof AuthError) {
        clearRefreshCookie(reply);
        return reply.status(err.statusCode).send({
          success: false,
          error: { code: err.code, message: err.message },
          timestamp: new Date().toISOString(),
        });
      }
      throw err;
    }
  });

  // 4. POST /v1/auth/logout
  fastify.post("/v1/auth/logout", async (request, reply) => {
    const body = (request.body as { refreshToken?: string }) || {};
    const cookieToken = (request as any).cookies?.alumnux_refresh_token;
    const token = body.refreshToken || cookieToken;

    await authService.logout(token);
    clearRefreshCookie(reply);

    const response: ApiSuccessResponse<{ message: string }> = {
      success: true,
      data: { message: "Logged out successfully" },
      timestamp: new Date().toISOString(),
    };
    return reply.status(200).send(response);
  });

  // 5. POST /v1/auth/logout-all (Requires Bearer token)
  fastify.post(
    "/v1/auth/logout-all",
    { preHandler: [authenticate] },
    async (request, reply) => {
      const userId = request.user!.id;
      const revokedCount = await authService.logoutAll(userId);
      clearRefreshCookie(reply);

      const response: ApiSuccessResponse<{ revokedCount: number; message: string }> = {
        success: true,
        data: {
          revokedCount,
          message: `All ${revokedCount} active sessions have been revoked.`,
        },
        timestamp: new Date().toISOString(),
      };
      return reply.status(200).send(response);
    }
  );

  // 6. GET /v1/auth/me (Requires Bearer token)
  fastify.get(
    "/v1/auth/me",
    { preHandler: [authenticate] },
    async (request, reply) => {
      const userId = request.user!.id;
      try {
        const result = await authService.getMe(userId);
        const response: ApiSuccessResponse<typeof result> = {
          success: true,
          data: result,
          timestamp: new Date().toISOString(),
        };
        return reply.status(200).send(response);
      } catch (err: unknown) {
        if (err instanceof AuthError) {
          return reply.status(err.statusCode).send({
            success: false,
            error: { code: err.code, message: err.message },
            timestamp: new Date().toISOString(),
          });
        }
        throw err;
      }
    }
  );

  // 7. PATCH /v1/auth/me (Requires Bearer token)
  fastify.patch(
    "/v1/auth/me",
    { preHandler: [authenticate] },
    async (request, reply) => {
      const userId = request.user!.id;
      const parseResult = updateProfileSchema.safeParse(request.body);
      if (!parseResult.success) {
        return reply.status(400).send({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid profile update fields",
            details: parseResult.error.errors.map((e) => ({
              field: e.path.join("."),
              message: e.message,
            })),
          },
          timestamp: new Date().toISOString(),
        });
      }

      try {
        const result = await authService.updateMe(userId, parseResult.data);
        const response: ApiSuccessResponse<typeof result> = {
          success: true,
          data: result,
          timestamp: new Date().toISOString(),
        };
        return reply.status(200).send(response);
      } catch (err: unknown) {
        if (err instanceof AuthError) {
          return reply.status(err.statusCode).send({
            success: false,
            error: { code: err.code, message: err.message },
            timestamp: new Date().toISOString(),
          });
        }
        throw err;
      }
    }
  );
};
