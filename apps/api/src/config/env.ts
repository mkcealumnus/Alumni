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
  DATABASE_USER: z.string().default("alumnux_user"),
  DATABASE_PASSWORD: z.string().default(""),
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

export function loadEnv(): Env {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    const formatted = result.error.format();
    throw new Error(`Environment validation failed: ${JSON.stringify(formatted)}`);
  }
  return result.data;
}

export const env = loadEnv();
