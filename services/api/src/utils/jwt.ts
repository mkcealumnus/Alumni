import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export interface AccessTokenPayload {
  userId: string;
  email: string;
  role: string;
}

export interface DecodedAccessToken extends AccessTokenPayload {
  iss: string;
  aud: string;
  iat: number;
  exp: number;
}

export function signAccessToken(payload: AccessTokenPayload): string {
  // Explicit issuer, audience, and expiration
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_TTL as jwt.SignOptions["expiresIn"],
    issuer: "alumnux-api",
    audience: "alumnux-clients",
  });
}

export function verifyAccessToken(token: string): DecodedAccessToken {
  return jwt.verify(token, env.JWT_ACCESS_SECRET, {
    issuer: "alumnux-api",
    audience: "alumnux-clients",
  }) as DecodedAccessToken;
}
