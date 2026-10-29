import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  HOST: z.string().default("0.0.0.0"),
  APP_ORIGIN: z.string().default("http://localhost:3000"),
  CORS_ORIGIN: z.string().default("http://localhost:3000,http://localhost:8081"),
  API_VERSION: z.string().default("2.0.0"),

  // MySQL Database Configuration
  DATABASE_HOST: z.string().default("127.0.0.1"),
  DATABASE_PORT: z.coerce.number().default(3306),
  DATABASE_NAME: z.string().default("alumnux"),
  DATABASE_USER: z.string().min(1).optional(),
  DATABASE_PASSWORD: z.string().optional(),
  DATABASE_CONNECTION_LIMIT: z.coerce.number().default(10),
  DATABASE_CONNECT_TIMEOUT_MS: z.coerce.number().default(5000),

  // JWT & Authentication Configuration
  JWT_ACCESS_SECRET: z.string().min(16, "JWT_ACCESS_SECRET must be at least 16 characters").default("development_jwt_secret_key_change_in_production_min_16_chars"),
  JWT_ACCESS_TTL: z.string().default("15m"),
  REFRESH_TOKEN_TTL_DAYS: z.coerce.number().default(30),
  PASSWORD_HASH_COST: z.coerce.number().default(10),

  // Cookie Signing Secret
  COOKIE_SECRET: z.string().default("cookie_secret_for_development_must_change_in_production"),
});

export type Env = z.infer<typeof envSchema>;

const DEVELOPMENT_JWT_SECRET = "development_jwt_secret_key_change_in_production_min_16_chars";
const INSECURE_JWT_SECRETS = new Set([
  DEVELOPMENT_JWT_SECRET,
  "replace_with_a_long_random_secret_at_least_32_chars",
  "your_jwt_secret_here",
  "change_me",
]);

export function loadEnv(environment: NodeJS.ProcessEnv = process.env): Env {
  const result = envSchema.safeParse(environment);
  if (!result.success) {
    throw new Error("Environment validation failed. Check the required environment variable names and formats.");
  }

  if (result.data.NODE_ENV === "production") {
    const secret = environment.JWT_ACCESS_SECRET?.trim();
    if (!secret || INSECURE_JWT_SECRETS.has(secret)) {
      throw new Error("JWT_ACCESS_SECRET must be explicitly configured with a non-placeholder value in production.");
    }
  }

  if (
    result.data.NODE_ENV !== "test" &&
    (!environment.DATABASE_USER?.trim() || !Object.prototype.hasOwnProperty.call(environment, "DATABASE_PASSWORD"))
  ) {
    throw new Error("DATABASE_USER and DATABASE_PASSWORD must be explicitly configured outside test mode.");
  }

  return result.data;
}

export const env = loadEnv();
