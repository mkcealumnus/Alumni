import type { FastifyRequest, FastifyReply } from "fastify";
import type { ApiErrorResponse, UserRole } from "@alumnux/types";
import { verifyAccessToken } from "../utils/jwt.js";

declare module "fastify" {
  interface FastifyRequest {
    user?: {
      id: string;
      email: string;
      role: UserRole;
    };
  }
}

export async function authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const errorResponse: ApiErrorResponse = {
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Authentication required. Bearer token missing or malformed.",
      },
      timestamp: new Date().toISOString(),
    };
    return reply.status(401).send(errorResponse);
  }

  const token = authHeader.substring(7).trim();

  try {
    const decoded = verifyAccessToken(token);
    request.user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role as UserRole,
    };
  } catch (err: unknown) {
    const isExpired = err instanceof Error && err.name === "TokenExpiredError";
    const errorResponse: ApiErrorResponse = {
      success: false,
      error: {
        code: isExpired ? "TOKEN_EXPIRED" : "INVALID_TOKEN",
        message: isExpired ? "Access token has expired." : "Invalid access token.",
      },
      timestamp: new Date().toISOString(),
    };
    return reply.status(401).send(errorResponse);
  }
}

export function requireRole(allowedRoles: UserRole[]) {
  return async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    if (!request.user) {
      const errorResponse: ApiErrorResponse = {
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Authentication required.",
        },
        timestamp: new Date().toISOString(),
      };
      return reply.status(401).send(errorResponse);
    }

    if (!allowedRoles.includes(request.user.role)) {
      const errorResponse: ApiErrorResponse = {
        success: false,
        error: {
          code: "FORBIDDEN",
          message: `Forbidden. Role '${request.user.role}' is not authorized to access this resource.`,
        },
        timestamp: new Date().toISOString(),
      };
      return reply.status(403).send(errorResponse);
    }
  };
}
