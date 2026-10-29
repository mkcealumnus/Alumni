import { useState, useEffect, useCallback, useRef } from "react";
import type { ChatMessage } from "@alumnux/types";
import { messagingApi } from "../api";
import { useMobileAuth } from "../../../context/AuthContext";

const SEED_MESSAGES: Record<string, ChatMessage[]> = {
  "conv-alex-jordan": [
    {
      id: "pm-aj-1",
      conversationId: "conv-alex-jordan",
      senderId: "alumni-demo-jordan",
      senderName: "Jordan Vance",
      senderRole: "ALUMNI",
      content:
        "Hi Alex! Thanks for reaching out about distributed queues and Stripe's backend architecture. What specific areas would you like to review in our upcoming session?",
      status: "read",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
    {
      id: "pm-aj-2",
      conversationId: "conv-alex-jordan",
      senderId: "student-demo-alex",
      senderName: "Alex Rivera",
      senderRole: "STUDENT",
      content:
        "Hello Jordan! I've been implementing write-ahead logs and leader election in Go. I would love your advice on handling network partitions and idempotency keys.",
      status: "read",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    },
    {
      id: "pm-aj-3",
      conversationId: "conv-alex-jordan",
      senderId: "alumni-demo-jordan",
      senderName: "Jordan Vance",
      senderRole: "ALUMNI",
      content:
        "Excellent project topic. Bring your repository link and architecture diagram to Saturday's call. We will walk through production failure modes together.",
      status: "read",
      createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    },
  ],
};

export function useMessages(conversationId: string) {
  const { user, profile } = useMobileAuth();
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return SEED_MESSAGES[conversationId] || [];
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const isMountedRef = useRef(true);

  const fetchMessages = useCallback(
    async (isSilent = false) => {
      if (!isSilent) setIsLoading(true);

      try {
        const data = await messagingApi.getMessages(conversationId);
        if (data && data.length > 0) {
          setMessages(data);
        }
      } catch {
        // Retain fallback / local messages
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      }
    },
    [conversationId]
  );

  // Mark conversation read on view
  useEffect(() => {
    isMountedRef.current = true;
    fetchMessages();
    messagingApi.markConversationRead(conversationId).catch(() => {});

    // Polling interval (every 4s) for active chat session
    const timer = setInterval(() => {
      fetchMessages(true);
    }, 4000);

    return () => {
      isMountedRef.current = false;
      clearInterval(timer);
    };
  }, [conversationId, fetchMessages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isSending) return;

    setIsSending(true);

    const tempId = `temp-${Date.now()}`;
    const optimisticMessage: ChatMessage = {
      id: tempId,
      conversationId,
      senderId: user?.id || "user-temp",
      senderName: profile?.fullName || "Me",
      senderRole: user?.role || "STUDENT",
      content: content.trim(),
      status: "sent",
      createdAt: new Date().toISOString(),
    };

    // Optimistic UI update
    setMessages((prev) => [...prev, optimisticMessage]);

    try {
      const persisted = await messagingApi.sendMessage(conversationId, {
        content: content.trim(),
      });
      setMessages((prev) =>
        prev.map((m) => (m.id === tempId ? persisted : m))
      );
    } catch {
      // Keep optimistic message or update status
    } finally {
      setIsSending(false);
    }
  };

  return {
    messages,
    isLoading,
    isSending,
    sendMessage,
    refetch: fetchMessages,
  };
}
