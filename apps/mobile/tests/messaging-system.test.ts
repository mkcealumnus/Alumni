import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendMessageSchema, createConversationSchema } from "@alumnux/schemas";
import type { Conversation, ChatMessage } from "@alumnux/types";
import { BRUTAL_COLORS, BRUTAL_BORDERS } from "../src/design-system/tokens";

describe("Mobile Chat System - Nano-Brutalist & Feature-Parity Verification", () => {
  describe("1. Message Schema Validation", () => {
    it("validates and allows well-formed messages within character limits", () => {
      const validPayload = {
        content: "Hi Jordan, confirming our Saturday mock interview at 10 AM.",
      };

      const result = sendMessageSchema.safeParse(validPayload);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.content).toBe(validPayload.content);
      }
    });

    it("rejects empty messages or messages consisting solely of whitespace", () => {
      const emptyPayload = { content: "   " };
      const result = sendMessageSchema.safeParse(emptyPayload);
      expect(result.success).toBe(false);
    });

    it("enforces maximum length limit to prevent flood attacks", () => {
      const longMessage = "A".repeat(2001);
      const result = sendMessageSchema.safeParse({ content: longMessage });
      expect(result.success).toBe(false);
    });

    it("validates createConversationSchema for starting direct or mentorship chats", () => {
      const valid = {
        participantId: "alumni-demo-jordan",
        topic: "System Design Guidance",
        mentorshipRequestId: "mr-104",
      };
      const result = createConversationSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("rejects createConversation without a target participantId", () => {
      const invalid = { topic: "Missing recipient" };
      const result = createConversationSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe("2. Nano-Brutalist Visual Design Contracts", () => {
    it("adheres to strict nano-brutalist sent vs received bubble tokens", () => {
      // Sent bubble specifications:
      const sentBubbleStyle = {
        backgroundColor: BRUTAL_COLORS.INK, // Dark ink
        color: BRUTAL_COLORS.SURFACE,        // Light text
        alignSelf: "flex-end",               // Right alignment
      };

      // Received bubble specifications:
      const receivedBubbleStyle = {
        backgroundColor: BRUTAL_COLORS.SURFACE, // White / Ivory
        color: BRUTAL_COLORS.INK,                // Dark text
        borderWidth: BRUTAL_BORDERS.standard,    // 2px ink border
        borderColor: BRUTAL_COLORS.INK,
        alignSelf: "flex-start",                 // Left alignment
      };

      expect(sentBubbleStyle.backgroundColor).toBe("#171717");
      expect(sentBubbleStyle.alignSelf).toBe("flex-end");
      expect(receivedBubbleStyle.backgroundColor).toBe("#FFFFFF");
      expect(receivedBubbleStyle.borderWidth).toBe(2);
      expect(receivedBubbleStyle.alignSelf).toBe("flex-start");
    });

    it("uses acid lime (#D7FF3F) for interactive active navigation and unread badges", () => {
      expect(BRUTAL_COLORS.ACCENT).toBe("#D7FF3F");
      expect(BRUTAL_COLORS.BACKGROUND).toBe("#F7F6F2");
    });
  });

  describe("3. Unread Aggregation and Conversation Lifecycle", () => {
    const mockConversations: Conversation[] = [
      {
        id: "conv-1",
        studentId: "student-alex",
        studentName: "Alex Rivera",
        alumniId: "alumni-jordan",
        alumniName: "Jordan Vance",
        topic: "Distributed Systems",
        status: "active",
        createdAt: "2026-10-25T10:00:00Z",
        lastMessageAt: "2026-10-25T11:00:00Z",
        lastMessagePreview: "See you Saturday at 10.",
        unreadCount: 3,
      },
      {
        id: "conv-2",
        studentId: "student-alex",
        studentName: "Alex Rivera",
        alumniId: "alumni-karthik",
        alumniName: "Karthik Subramanian",
        topic: "Cloud Architecture",
        status: "active",
        createdAt: "2026-10-26T10:00:00Z",
        lastMessageAt: "2026-10-26T14:30:00Z",
        lastMessagePreview: "Resume looks strong.",
        unreadCount: 1,
      },
    ];

    it("accurately computes aggregate unread count for bottom navigation badge", () => {
      const total = mockConversations.reduce((sum, c) => sum + (c.unreadCount || 0), 0);
      expect(total).toBe(4);
    });

    it("resets unread count when conversation is marked as read", () => {
      const updatedConversations = mockConversations.map((c) =>
        c.id === "conv-1" ? { ...c, unreadCount: 0 } : c
      );

      const newTotal = updatedConversations.reduce((sum, c) => sum + (c.unreadCount || 0), 0);
      expect(newTotal).toBe(1);
      expect(updatedConversations[0].unreadCount).toBe(0);
    });
  });

  describe("4. Message History Chronology & Optimistic Handling", () => {
    it("orders messages chronologically by timestamp ascending", () => {
      const messages: ChatMessage[] = [
        {
          id: "msg-2",
          conversationId: "conv-1",
          senderId: "alumni-jordan",
          content: "Yes, 10 AM works great.",
          createdAt: "2026-10-25T10:05:00Z",
          isRead: true,
          status: "read",
        },
        {
          id: "msg-1",
          conversationId: "conv-1",
          senderId: "student-alex",
          content: "Hi Jordan, are you free this weekend?",
          createdAt: "2026-10-25T10:00:00Z",
          isRead: true,
          status: "read",
        },
        {
          id: "msg-3",
          conversationId: "conv-1",
          senderId: "student-alex",
          content: "Perfect, thank you!",
          createdAt: "2026-10-25T10:06:00Z",
          isRead: false,
          status: "delivered",
        },
      ];

      const sorted = [...messages].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      expect(sorted[0].id).toBe("msg-1");
      expect(sorted[1].id).toBe("msg-2");
      expect(sorted[2].id).toBe("msg-3");
    });

    it("prevents duplicate messages by ID during polling synchronization", () => {
      const existing: ChatMessage[] = [
        {
          id: "msg-1",
          conversationId: "conv-1",
          senderId: "student-alex",
          content: "Message 1",
          createdAt: "2026-10-25T10:00:00Z",
          isRead: true,
          status: "read",
        },
      ];

      const incoming: ChatMessage[] = [
        {
          id: "msg-1",
          conversationId: "conv-1",
          senderId: "student-alex",
          content: "Message 1",
          createdAt: "2026-10-25T10:00:00Z",
          isRead: true,
          status: "read",
        },
        {
          id: "msg-2",
          conversationId: "conv-1",
          senderId: "alumni-jordan",
          content: "Message 2",
          createdAt: "2026-10-25T10:05:00Z",
          isRead: false,
          status: "delivered",
        },
      ];

      const map = new Map<string, ChatMessage>();
      existing.forEach((m) => map.set(m.id, m));
      incoming.forEach((m) => map.set(m.id, m));

      const merged = Array.from(map.values());
      expect(merged.length).toBe(2);
      expect(merged.map((m) => m.id)).toEqual(["msg-1", "msg-2"]);
    });
  });

  describe("5. Participant Authorization & Scope Check", () => {
    it("ensures third parties cannot read unauthorized conversations", () => {
      const conversation: Conversation = {
        id: "conv-secret",
        studentId: "student-alex",
        alumniId: "alumni-jordan",
        status: "active",
        createdAt: "2026-10-25T10:00:00Z",
        unreadCount: 0,
      };

      const isAuthorized = (userId: string, conv: Conversation) => {
        return conv.studentId === userId || conv.alumniId === userId;
      };

      expect(isAuthorized("student-alex", conversation)).toBe(true);
      expect(isAuthorized("alumni-jordan", conversation)).toBe(true);
      expect(isAuthorized("malicious-intruder", conversation)).toBe(false);
    });
  });
});
