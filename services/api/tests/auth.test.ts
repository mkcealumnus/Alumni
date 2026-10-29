import { describe, it, expect, beforeEach } from "vitest";
import { buildApp } from "../src/app.js";
import { getDatabaseClient } from "../src/db/connection.js";

describe("Authentication & Security API Suite", () => {
  let app: ReturnType<typeof buildApp>;

  beforeEach(async () => {
    // Reset test database state
    const db = getDatabaseClient();
    await db.close();
    app = buildApp();
    await app.ready();
  });

  it("1. Successfully registers a student and returns user, profile, and tokens", async () => {
    const signupPayload = {
      email: "new.student@mkce.ac.in",
      password: "SecurePassword123!",
      fullName: "Priya Sharma",
      role: "STUDENT",
      departmentCode: "CSE",
      graduationYear: 2027,
      rollNumber: "927621CSR123",
      skills: ["React", "TypeScript", "Python"],
    };

    const res = await app.inject({
      method: "POST",
      url: "/v1/auth/signup",
      payload: signupPayload,
    });

    expect(res.statusCode).toBe(201);
    const body = JSON.parse(res.body);

    expect(body.success).toBe(true);
    expect(body.data.user.email).toBe("new.student@mkce.ac.in");
    expect(body.data.user.role).toBe("STUDENT");
    expect(body.data.profile.fullName).toBe("Priya Sharma");
    expect(body.data.profile.departmentCode).toBe("CSE");
    expect(body.data.tokens).toHaveProperty("accessToken");
    expect(body.data.tokens).toHaveProperty("refreshToken");

    // Ensure password hash is NEVER leaked
    expect(body.data.user).not.toHaveProperty("password_hash");
    expect(body.data.user).not.toHaveProperty("password");
  });

  it("2. Rejects duplicate email registration with 409 Conflict", async () => {
    const signupPayload = {
      email: "duplicate@alumnux.org",
      password: "Password123!",
      fullName: "Anand Kumar",
      role: "ALUMNI",
      departmentCode: "ECE",
      graduationYear: 2020,
    };

    const firstRes = await app.inject({
      method: "POST",
      url: "/v1/auth/signup",
      payload: signupPayload,
    });
    expect(firstRes.statusCode).toBe(201);

    const dupRes = await app.inject({
      method: "POST",
      url: "/v1/auth/signup",
      payload: signupPayload,
    });

    expect(dupRes.statusCode).toBe(409);
    const body = JSON.parse(dupRes.body);
    expect(body.success).toBe(false);
    expect(body.error.code).toBe("EMAIL_ALREADY_EXISTS");
  });

  it("3. Rejects public registration with role ADMIN with 400 Validation Error", async () => {
    const adminSignupPayload = {
      email: "fake.admin@alumnux.org",
      password: "AdminPassword123!",
      fullName: "Fake Admin",
      role: "ADMIN",
      departmentCode: "CSE",
      graduationYear: 2018,
    };

    const res = await app.inject({
      method: "POST",
      url: "/v1/auth/signup",
      payload: adminSignupPayload,
    });

    expect(res.statusCode).toBe(400);
    const body = JSON.parse(res.body);
    expect(body.success).toBe(false);
    expect(body.error.code).toBe("VALIDATION_ERROR");
  });

  it("4. Authenticates valid user credentials with 200 OK and generates session", async () => {
    const email = "login.test@alumnux.org";
    const password = "ValidPassword123!";

    await app.inject({
      method: "POST",
      url: "/v1/auth/signup",
      payload: {
        email,
        password,
        fullName: "Karthik R",
        role: "ALUMNI",
        departmentCode: "MECH",
        graduationYear: 2019,
        currentCompany: "TCS",
        currentRole: "Lead Consultant",
      },
    });

    const loginRes = await app.inject({
      method: "POST",
      url: "/v1/auth/login",
      payload: { email, password },
    });

    expect(loginRes.statusCode).toBe(200);
    const body = JSON.parse(loginRes.body);
    expect(body.success).toBe(true);
    expect(body.data.user.email).toBe(email);
    expect(body.data.tokens).toHaveProperty("accessToken");
    expect(body.data.tokens).toHaveProperty("refreshToken");
  });

  it("5. Rejects invalid password with 401 Unauthorized", async () => {
    const email = "wrong.pass@alumnux.org";
    await app.inject({
      method: "POST",
      url: "/v1/auth/signup",
      payload: {
        email,
        password: "CorrectPassword123!",
        fullName: "Test User",
        role: "STUDENT",
        departmentCode: "IT",
        graduationYear: 2026,
      },
    });

    const res = await app.inject({
      method: "POST",
      url: "/v1/auth/login",
      payload: { email, password: "WrongPassword999!" },
    });

    expect(res.statusCode).toBe(401);
    const body = JSON.parse(res.body);
    expect(body.success).toBe(false);
    expect(body.error.code).toBe("INVALID_CREDENTIALS");
  });

  it("6. Rotates refresh token atomically on /v1/auth/refresh", async () => {
    const signupRes = await app.inject({
      method: "POST",
      url: "/v1/auth/signup",
      payload: {
        email: "rotate@alumnux.org",
        password: "Password123!",
        fullName: "Rotation Test",
        role: "STUDENT",
        departmentCode: "AIDS",
        graduationYear: 2028,
      },
    });

    const initialTokens = JSON.parse(signupRes.body).data.tokens;
    const oldRefreshToken = initialTokens.refreshToken;

    const refreshRes = await app.inject({
      method: "POST",
      url: "/v1/auth/refresh",
      payload: { refreshToken: oldRefreshToken },
    });

    expect(refreshRes.statusCode).toBe(200);
    const refreshBody = JSON.parse(refreshRes.body);
    expect(refreshBody.success).toBe(true);
    expect(refreshBody.data).toHaveProperty("accessToken");
    expect(refreshBody.data).toHaveProperty("refreshToken");
    expect(refreshBody.data.refreshToken).not.toBe(oldRefreshToken);

    // Reuse detection: Attempting to use the old refresh token MUST fail and invalidate
    const reuseRes = await app.inject({
      method: "POST",
      url: "/v1/auth/refresh",
      payload: { refreshToken: oldRefreshToken },
    });

    expect(reuseRes.statusCode).toBe(401);
    const reuseBody = JSON.parse(reuseRes.body);
    expect(reuseBody.error.code).toBe("REFRESH_TOKEN_REUSE");
  });

  it("7. Accesses protected /v1/auth/me and updates profile via PATCH", async () => {
    const signupRes = await app.inject({
      method: "POST",
      url: "/v1/auth/signup",
      payload: {
        email: "profile.test@alumnux.org",
        password: "Password123!",
        fullName: "Profile Person",
        role: "ALUMNI",
        departmentCode: "EEE",
        graduationYear: 2017,
      },
    });

    const accessToken = JSON.parse(signupRes.body).data.tokens.accessToken;

    // GET /v1/auth/me
    const meRes = await app.inject({
      method: "GET",
      url: "/v1/auth/me",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    expect(meRes.statusCode).toBe(200);
    const meBody = JSON.parse(meRes.body);
    expect(meBody.data.user.email).toBe("profile.test@alumnux.org");

    // PATCH /v1/auth/me
    const patchRes = await app.inject({
      method: "PATCH",
      url: "/v1/auth/me",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      payload: {
        headline: "Principal Systems Architect",
        bio: "Mentoring junior engineers in distributed systems.",
      },
    });

    expect(patchRes.statusCode).toBe(200);
    const patchBody = JSON.parse(patchRes.body);
    expect(patchBody.data.profile.headline).toBe("Principal Systems Architect");
    expect(patchBody.data.profile.bio).toBe("Mentoring junior engineers in distributed systems.");
  });

  it("8. Rejects access to /v1/auth/me with invalid or expired token", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/v1/auth/me",
      headers: {
        authorization: "Bearer invalid_garbage_token_12345",
      },
    });

    expect(res.statusCode).toBe(401);
    const body = JSON.parse(res.body);
    expect(body.success).toBe(false);
  });

  it("9. Revokes active session on /v1/auth/logout", async () => {
    const signupRes = await app.inject({
      method: "POST",
      url: "/v1/auth/signup",
      payload: {
        email: "logout.test@alumnux.org",
        password: "Password123!",
        fullName: "Logout Person",
        role: "STUDENT",
        departmentCode: "CIVIL",
        graduationYear: 2025,
      },
    });

    const tokens = JSON.parse(signupRes.body).data.tokens;

    const logoutRes = await app.inject({
      method: "POST",
      url: "/v1/auth/logout",
      payload: { refreshToken: tokens.refreshToken },
    });

    expect(logoutRes.statusCode).toBe(200);

    // Refresh token should no longer work
    const refreshRes = await app.inject({
      method: "POST",
      url: "/v1/auth/refresh",
      payload: { refreshToken: tokens.refreshToken },
    });

    expect(refreshRes.statusCode).toBe(401);
  });
});
