import { describe, it, expect, beforeEach } from "vitest";
import { buildApp } from "../src/app.js";
import { getDatabaseClient } from "../src/db/connection.js";

describe("Directory & Mentorship API Suite", () => {
  let app: ReturnType<typeof buildApp>;

  beforeEach(async () => {
    const db = getDatabaseClient();
    await db.close();
    app = buildApp();
    await app.ready();
  });

  it("1. Returns paginated directory users with department and query filtering", async () => {
    // Seed 2 users: student and alumni
    await app.inject({
      method: "POST",
      url: "/v1/auth/signup",
      payload: {
        email: "alice@alumnux.org",
        password: "Password123!",
        fullName: "Alice Chen",
        role: "STUDENT",
        departmentCode: "CSE",
        graduationYear: 2026,
      },
    });

    await app.inject({
      method: "POST",
      url: "/v1/auth/signup",
      payload: {
        email: "bob@alumnux.org",
        password: "Password123!",
        fullName: "Bob Williams",
        role: "ALUMNI",
        departmentCode: "MECH",
        graduationYear: 2018,
        currentCompany: "Google",
        currentRole: "Staff Engineer",
      },
    });

    // Fetch all directory users
    const allRes = await app.inject({
      method: "GET",
      url: "/v1/directory?page=1&limit=10",
    });

    expect(allRes.statusCode).toBe(200);
    const allBody = JSON.parse(allRes.body);
    expect(allBody.success).toBe(true);
    expect(allBody.data.length).toBe(2);
    expect(allBody.meta.totalItems).toBe(2);

    // Filter by department CSE
    const cseRes = await app.inject({
      method: "GET",
      url: "/v1/directory?department=CSE",
    });
    const cseBody = JSON.parse(cseRes.body);
    expect(cseBody.data.length).toBe(1);
    expect(cseBody.data[0].fullName).toBe("Alice Chen");

    // Search by query "Google"
    const searchRes = await app.inject({
      method: "GET",
      url: "/v1/directory?query=Google",
    });
    const searchBody = JSON.parse(searchRes.body);
    expect(searchBody.data.length).toBe(1);
    expect(searchBody.data[0].fullName).toBe("Bob Williams");
  });

  it("2. Handles mentorship request creation, retrieval, and status authorization", async () => {
    // Register Student
    const studentRes = await app.inject({
      method: "POST",
      url: "/v1/auth/signup",
      payload: {
        email: "mentee@alumnux.org",
        password: "Password123!",
        fullName: "Mentee Student",
        role: "STUDENT",
        departmentCode: "IT",
        graduationYear: 2027,
      },
    });
    const studentData = JSON.parse(studentRes.body).data;

    // Register Alumni
    const alumniRes = await app.inject({
      method: "POST",
      url: "/v1/auth/signup",
      payload: {
        email: "mentor@alumnux.org",
        password: "Password123!",
        fullName: "Mentor Alumni",
        role: "ALUMNI",
        departmentCode: "IT",
        graduationYear: 2016,
      },
    });
    const alumniData = JSON.parse(alumniRes.body).data;

    // Student requests mentorship from Alumni
    const createReqRes = await app.inject({
      method: "POST",
      url: "/v1/mentorship/requests",
      headers: {
        authorization: `Bearer ${studentData.tokens.accessToken}`,
      },
      payload: {
        recipientId: alumniData.user.id,
        topicId: "career_guidance",
        message: "Hello! I would love guidance on preparing for cloud architecture interviews.",
      },
    });

    expect(createReqRes.statusCode).toBe(201);
    const reqData = JSON.parse(createReqRes.body).data;
    expect(reqData.studentId).toBe(studentData.user.id);
    expect(reqData.alumniId).toBe(alumniData.user.id);
    expect(reqData.status).toBe("pending");

    // Unauthorized acceptance attempt: Student tries to accept their own request
    const unauthorizedAccept = await app.inject({
      method: "PATCH",
      url: `/v1/mentorship/requests/${reqData.id}/status`,
      headers: {
        authorization: `Bearer ${studentData.tokens.accessToken}`,
      },
      payload: { status: "ACCEPTED" },
    });
    expect(unauthorizedAccept.statusCode).toBe(403);

    // Authorized acceptance: Alumni accepts the request
    const authorizedAccept = await app.inject({
      method: "PATCH",
      url: `/v1/mentorship/requests/${reqData.id}/status`,
      headers: {
        authorization: `Bearer ${alumniData.tokens.accessToken}`,
      },
      payload: { status: "ACCEPTED" },
    });
    expect(authorizedAccept.statusCode).toBe(200);
    const acceptedData = JSON.parse(authorizedAccept.body).data;
    expect(acceptedData.status).toBe("accepted");
  });
});
