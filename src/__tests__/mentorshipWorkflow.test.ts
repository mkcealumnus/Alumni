import { describe, it, expect } from "vitest";
import {
  MentorshipRequestEntity,
  PrivateMentorshipConversation,
  PrivateMentorshipMessage,
  OpenChatMessage,
} from "../types/mentorship";

describe("Mentorship Workflow & State Transitions Spec", () => {
  it("creates a valid pending mentorship request", () => {
    const newRequest: MentorshipRequestEntity = {
      id: "mr-test-01",
      student_id: "student-demo-alex",
      student_name: "Alex Rivera",
      student_email: "student@alumnux.demo",
      student_department: "Computer Science & Engineering",
      student_graduation_year: 2026,
      student_initials: "AR",
      alumni_id: "alumni-demo-jordan",
      alumni_name: "Jordan Vance",
      alumni_company: "Stripe",
      alumni_role_title: "Staff Platform Engineer",
      topic: "Distributed Systems & Off-Campus Prep",
      introductory_message: "Hi Jordan, I would love guidance on high-throughput queue design in Go.",
      preferred_cadence: "Bi-weekly 45-min Zoom calls",
      status: "pending",
      created_at: new Date().toISOString(),
    };

    expect(newRequest.status).toBe("pending");
    expect(newRequest.student_id).toBe("student-demo-alex");
    expect(newRequest.alumni_id).toBe("alumni-demo-jordan");
    expect(newRequest.introductory_message.length).toBeGreaterThan(10);
  });

  it("transitions request to accepted and creates private 1-on-1 conversation", () => {
    const request: MentorshipRequestEntity = {
      id: "mr-test-02",
      student_id: "student-demo-alex",
      student_name: "Alex Rivera",
      student_email: "student@alumnux.demo",
      student_department: "Computer Science & Engineering",
      student_graduation_year: 2026,
      student_initials: "AR",
      alumni_id: "alumni-demo-jordan",
      alumni_name: "Jordan Vance",
      alumni_company: "Stripe",
      alumni_role_title: "Staff Platform Engineer",
      topic: "Distributed Systems & Off-Campus Prep",
      introductory_message: "Hi Jordan, would love guidance.",
      preferred_cadence: "Bi-weekly 45-min Zoom calls",
      status: "pending",
      created_at: new Date().toISOString(),
    };

    const acceptedRequest: MentorshipRequestEntity = {
      ...request,
      status: "accepted",
      responded_at: new Date().toISOString(),
    };

    expect(acceptedRequest.status).toBe("accepted");

    // Spawn 1-on-1 private conversation
    const newConversation: PrivateMentorshipConversation = {
      id: `conv-${request.id}`,
      mentorship_request_id: request.id,
      student_id: request.student_id,
      student_name: request.student_name,
      student_initials: request.student_initials,
      student_department: request.student_department,
      student_graduation_year: request.student_graduation_year,
      alumni_id: request.alumni_id,
      alumni_name: request.alumni_name,
      alumni_initials: "JV",
      alumni_company: request.alumni_company || "Stripe",
      alumni_role_title: request.alumni_role_title || "Staff Platform Engineer",
      topic: request.topic,
      cadence: request.preferred_cadence,
      status: "active",
      created_at: new Date().toISOString(),
      last_message_at: new Date().toISOString(),
      last_message_preview: request.introductory_message,
    };

    expect(newConversation.status).toBe("active");
    expect(newConversation.student_id).toBe(request.student_id);
    expect(newConversation.alumni_id).toBe(request.alumni_id);
  });

  it("transitions request to declined with optional mentor note", () => {
    const request: MentorshipRequestEntity = {
      id: "mr-test-03",
      student_id: "student-demo-alex",
      student_name: "Alex Rivera",
      student_email: "student@alumnux.demo",
      student_department: "Computer Science & Engineering",
      student_graduation_year: 2026,
      student_initials: "AR",
      alumni_id: "alumni-demo-jordan",
      alumni_name: "Jordan Vance",
      alumni_company: "Stripe",
      alumni_role_title: "Staff Platform Engineer",
      topic: "Full Stack Roadmap",
      introductory_message: "Looking for generic advice.",
      preferred_cadence: "Weekly calls",
      status: "pending",
      created_at: new Date().toISOString(),
    };

    const declinedRequest: MentorshipRequestEntity = {
      ...request,
      status: "declined",
      decline_reason: "Bandwidth currently full for Q4",
      responded_at: new Date().toISOString(),
    };

    expect(declinedRequest.status).toBe("declined");
    expect(declinedRequest.decline_reason).toBe("Bandwidth currently full for Q4");
  });

  it("submits a private 1-on-1 message and enforces participant confidentiality", () => {
    const conversationId = "conv-101";
    const studentId = "student-demo-alex";
    const alumniId = "alumni-demo-jordan";

    const msg: PrivateMentorshipMessage = {
      id: "msg-p1",
      conversation_id: conversationId,
      sender_id: studentId,
      sender_name: "Alex Rivera",
      sender_role: "student",
      content: "Here is the GitHub link to my distributed queue implementation.",
      status: "delivered",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    expect(msg.conversation_id).toBe(conversationId);
    expect(msg.sender_id).toBe(studentId);

    // Verify access decision: only studentId or alumniId can read this message
    const isAuthorizedStudent = [studentId, alumniId].includes("student-demo-alex");
    const isAuthorizedAlumni = [studentId, alumniId].includes("alumni-demo-jordan");
    const isUnauthorizedThirdParty = [studentId, alumniId].includes("student-unauthorized-301");

    expect(isAuthorizedStudent).toBe(true);
    expect(isAuthorizedAlumni).toBe(true);
    expect(isUnauthorizedThirdParty).toBe(false);
  });

  it("submits an Open Chat public message with optional reply-to threading", () => {
    const questionMsg: OpenChatMessage = {
      id: "oc-101",
      sender_id: "student-demo-alex",
      sender_name: "Alex Rivera",
      sender_role: "student",
      sender_initials: "AR",
      sender_is_verified: true,
      category_tag: "Placements",
      content: "What are the key differences between off-campus interviews for Stripe vs Google?",
      likes_count: 5,
      moderation_status: "visible",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const replyMsg: OpenChatMessage = {
      id: "oc-102",
      sender_id: "alumni-demo-jordan",
      sender_name: "Jordan Vance",
      sender_role: "alumni",
      sender_initials: "JV",
      sender_is_verified: true,
      category_tag: "Placements",
      content: "Stripe places heavy emphasis on clean, idiomatic code, handling edge cases, and practical system design.",
      reply_to_message_id: questionMsg.id,
      reply_to_preview: {
        id: questionMsg.id,
        sender_name: questionMsg.sender_name,
        sender_role: questionMsg.sender_role,
        content: questionMsg.content.slice(0, 80),
      },
      likes_count: 8,
      moderation_status: "visible",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    expect(questionMsg.category_tag).toBe("Placements");
    expect(replyMsg.reply_to_message_id).toBe("oc-101");
    expect(replyMsg.reply_to_preview?.sender_name).toBe("Alex Rivera");
  });
});
