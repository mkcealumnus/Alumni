import { describe, it, expect } from "vitest";
import { buildApp } from "../src/app.js";

describe("GET /health", () => {
  it("should return 200 with valid health check payload", async () => {
    const app = buildApp();
    await app.ready();

    const response = await app.inject({
      method: "GET",
      url: "/health",
    });

    expect(response.statusCode).toBe(200);

    const body = JSON.parse(response.body);
    expect(body).toHaveProperty("status", "ok");
    expect(body).toHaveProperty("service", "alumnux-api");
    expect(body).toHaveProperty("version");
    expect(body).toHaveProperty("uptime");
    expect(body).toHaveProperty("timestamp");

    // Ensure no secrets or environment variables are leaked
    expect(body).not.toHaveProperty("DB_PASSWORD");
    expect(body).not.toHaveProperty("JWT_SECRET");
    expect(body).not.toHaveProperty("env");

    await app.close();
  });

  it("should return 404 for unknown endpoints", async () => {
    const app = buildApp();
    await app.ready();

    const response = await app.inject({
      method: "GET",
      url: "/unknown-route",
    });

    expect(response.statusCode).toBe(404);
    const body = JSON.parse(response.body);
    expect(body.success).toBe(false);
    expect(body.error.code).toBe("NOT_FOUND");

    await app.close();
  });
});
