import { describe, expect, it } from "vitest";
import { loadEnv } from "../src/config/env.js";

const productionEnvironment = {
  NODE_ENV: "production",
  DATABASE_USER: "isolated_test_user",
  DATABASE_PASSWORD: "isolated_test_password",
};

describe("production environment validation", () => {
  it("rejects a missing signing secret in production", () => {
    expect(() => loadEnv(productionEnvironment)).toThrow(/JWT_ACCESS_SECRET/);
  });

  it("rejects an empty signing secret without echoing its value", () => {
    expect(() => loadEnv({ ...productionEnvironment, JWT_ACCESS_SECRET: "" })).toThrow(/Environment validation failed/);
  });

  it("rejects known development and example placeholders", () => {
    for (const secret of [
      "development_jwt_secret_key_change_in_production_min_16_chars",
      "replace_with_a_long_random_secret_at_least_32_chars",
    ]) {
      expect(() => loadEnv({ ...productionEnvironment, JWT_ACCESS_SECRET: secret })).toThrow(/JWT_ACCESS_SECRET/);
    }
  });

  it("accepts an explicitly configured production secret", () => {
    expect(loadEnv({ ...productionEnvironment, JWT_ACCESS_SECRET: "a-valid-unique-production-signing-key" }).NODE_ENV)
      .toBe("production");
  });

  it("retains the development default outside production", () => {
    expect(loadEnv({ NODE_ENV: "development", DATABASE_USER: "local_user", DATABASE_PASSWORD: "" }).JWT_ACCESS_SECRET)
      .toBe("development_jwt_secret_key_change_in_production_min_16_chars");
  });

  it("requires explicit database credentials outside test mode but permits an explicitly empty local password", () => {
    expect(() => loadEnv({ NODE_ENV: "development", DATABASE_USER: "local_user" })).toThrow(/DATABASE_USER and DATABASE_PASSWORD/);
    expect(loadEnv({ NODE_ENV: "development", DATABASE_USER: "local_user", DATABASE_PASSWORD: "" }).DATABASE_PASSWORD).toBe("");
  });
});
