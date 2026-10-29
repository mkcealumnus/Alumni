import { describe, it, expect, beforeEach } from "vitest";
import { buildApp } from "../src/app.js";
import { getDatabaseClient } from "../src/db/connection.js";

describe("Real Messaging & Conversations API Suite", () => {
  let app: ReturnType<typeof buildApp>;

  beforeEach(async () => {
    const db = getDatabaseClient();
    await db.close();
    app = buildApp();
    await app.ready();
  });

  async function registerAndLogin(email: string, role: "STUDENT" | "ALUMNI", name: string) {
    const res = await app.inject({
      method: "POST",
      url: "/v1/auth/signup",
      payload: {
        email,
        password: "Password123!",
        fullName: name,
        role,
        departmentCode: role === "STUDENT" ? "CSE" : "IT",
        graduationYear: role === "STUDENT" ? 2026 : 2018,
        currentCompany: role === "ALUMNI" ? "Stripe" : undefined,
        currentRole: role === "ALUMNI" ? "Staff Engineer" : undefined,
      },
    });
    const body = JSON.parse(res.body);
    return {
      user: body.data.user,
      accessToken: body.data.tokens.accessToken,
    };
  }

  it("1. Lists conversations scoped to the authenticated participant", async () => {
    const student = await registerAndLogin("alex.chat@alumnux.org", "STUDENT", "Alex Rivera");
    const alumnus = await registerAndLogin("jordan.chat@alumnux.org", "ALUMNI", "Jordan Vance");

    // Student creates conversation with alumnus
    const createRes = await app.inject({
      method: "POST",
      url: "/v1/conversations",
      headers: {
        authorization: `Bearer ${student.accessToken}`,
      },
      payload: {
        participantId: alumnus.user.id,
        topic: "Distributed Systems Architecture",
      },
    });

    expect(createRes.statusCode).toBe(201);
    const createdConv = JSON.parse(createRes.body).data;
    expect(createdConv.id).toBeDefined();

    // Student fetches conversations
    const listRes = await app.inject({
      method: "GET",
      url: "/v1/conversations",
      headers: {
        authorization: `Bearer ${student.accessToken}`,
      },
    });

    expect(listRes.statusCode).toBe(200);
    const listBody = JSON.parse(listRes.body);
    expect(listBody.success).toBe(true);
    expect(listBody.data.length).toBeGreaterThanOrEqual(1);
    expect(listBody.data.some((c: any) => c.id === createdConv.id)).toBe(true);

    // Alumnus also sees the conversation
    const alumListRes = await app.inject({
      method: "GET",
      url: "/v1/conversations",
      headers: {
        authorization: `Bearer ${alumnus.accessToken}`,
      },
    });
    expect(alumListRes.statusCode).toBe(200);
    expect(JSON.parse(alumListRes.body).data.some((c: any) => c.id === createdConv.id)).toBe(true);
  });

  it("2. Prevents duplicate conversations between the same student and alumnus", async () => {
    const student = await registerAndLogin("priya.chat@alumnux.org", "STUDENT", "Priya Dharshini");
    const alumnus = await registerAndLogin("karthik.chat@alumnux.org", "ALUMNI", "Karthik S");

    const first = await app.inject({
      method: "POST",
      url: "/v1/conversations",
      headers: { authorization: `Bearer ${student.accessToken}` },
      payload: { participantId: alumnus.user.id, topic: "Cloud Architecture" },
    });
    expect(first.statusCode).toBe(201);
    const firstId = JSON.parse(first.body).data.id;

    // Second call should return existing conversation with status 200
    const second = await app.inject({
      method: "POST",
      url: "/v1/conversations",
      headers: { authorization: `Bearer ${student.accessToken}` },
      payload: { participantId: alumnus.user.id, topic: "Different Topic" },
    });
    expect(second.statusCode).toBe(200);
    expect(JSON.parse(second.body).data.id).toBe(firstId);
  });

  it("3. Sends message, updates conversation preview, and supports mark as read", async () => {
    const student = await registerAndLogin("sam.chat@alumnux.org", "STUDENT", "Sam K");
    const alumnus = await registerAndLogin("elena.chat@alumnux.org", "ALUMNI", "Elena Rostova");

    // Create conversation
    const convRes = await app.inject({
      method: "POST",
      url: "/v1/conversations",
      headers: { authorization: `Bearer ${student.accessToken}` },
      payload: { participantId: alumnus.user.id },
    });
    const convId = JSON.parse(convRes.body).data.id;

    // Student sends message
    const sendRes = await app.inject({
      method: "POST",
      url: `/v1/conversations/${convId}/messages`,
      headers: { authorization: `Bearer ${student.accessToken}` },
      payload: { content: "Hello Elena, thrilled to connect!" },
    });
    expect(sendRes.statusCode).toBe(201);
    const sentMsg = JSON.parse(sendRes.body).data;
    expect(sentMsg.content).toBe("Hello Elena, thrilled to connect!");
    expect(sentMsg.senderId).toBe(student.user.id);

    // Alumnus views messages
    const msgListRes = await app.inject({
      method: "GET",
      url: `/v1/conversations/${convId}/messages`,
      headers: { authorization: `Bearer ${alumnus.accessToken}` },
    });
    expect(msgListRes.statusCode).toBe(200);
    const msgs = JSON.parse(msgListRes.body).data;
    expect(msgs.length).toBe(1);
    expect(msgs[0].content).toBe("Hello Elena, thrilled to connect!");

    // Alumnus marks conversation read
    const readRes = await app.inject({
      method: "PATCH",
      url: `/v1/conversations/${convId}/read`,
      headers: { authorization: `Bearer ${alumnus.accessToken}` },
    });
    expect(readRes.statusCode).toBe(200);
  });

  it("4. Blocks unauthorized users from reading or sending messages", async () => {
    const student = await registerAndLogin("victim.chat@alumnux.org", "STUDENT", "Victim Student");
    const alumnus = await registerAndLogin("mentor.chat@alumnux.org", "ALUMNI", "Target Mentor");
    const intruder = await registerAndLogin("intruder.chat@alumnux.org", "STUDENT", "Intruder");

    // Conversation between victim and mentor
    const convRes = await app.inject({
      method: "POST",
      url: "/v1/conversations",
      headers: { authorization: `Bearer ${student.accessToken}` },
      payload: { participantId: alumnus.user.id },
    });
    const convId = JSON.parse(convRes.body).data.id;

    // Intruder attempts to read messages
    const intruderGet = await app.inject({
      method: "GET",
      url: `/v1/conversations/${convId}/messages`,
      headers: { authorization: `Bearer ${intruder.accessToken}` },
    });
    expect(intruderGet.statusCode).toBe(403);

    // Intruder attempts to send message
    const intruderSend = await app.inject({
      method: "POST",
      url: `/v1/conversations/${convId}/messages`,
      headers: { authorization: `Bearer ${intruder.accessToken}` },
      payload: { content: "I am intruding into your chat!" },
    });
    expect(intruderSend.statusCode).toBe(403);
  });
});
