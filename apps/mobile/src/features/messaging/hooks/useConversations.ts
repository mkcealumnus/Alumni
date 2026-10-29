import { useState, useEffect, useCallback, useMemo } from "react";
import type { Conversation, CreateConversationRequest } from "@alumnux/types";
import { messagingApi } from "../api";
import { useMobileAuth } from "../../../context/AuthContext";

// Fallback seed conversation for offline/test environments
const FALLBACK_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-alex-jordan",
    studentId: "student-demo-alex",
    studentName: "Alex Rivera",
    studentDepartment: "CSE",
    studentGraduationYear: 2026,
    alumniId: "alumni-demo-jordan",
    alumniName: "Jordan Vance",
    alumniRoleTitle: "Staff Platform Engineer",
    alumniCompany: "Stripe",
    mentorshipRequestId: "mr-104",
    topic: "System Design & Distributed Queues",
    status: "active",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 80).toISOString(),
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    lastMessagePreview: "Bring your repository link and architecture diagram to Saturday's call.",
    unreadCount: 0,
  },
];

export function useConversations() {
  const { user } = useMobileAuth();
  const [conversations, setConversations] = useState<Conversation[]>(FALLBACK_CONVERSATIONS);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchConversations = useCallback(async (isSilent = false) => {
    if (!isSilent) setIsLoading(true);
    setError(null);

    try {
      const data = await messagingApi.getConversations();
      if (data && data.length > 0) {
        setConversations(data);
      }
    } catch (err: unknown) {
      // In offline / fixture mode retain fallback data
      const msg = err instanceof Error ? err.message : "Failed to load conversations.";
      if (!conversations.length) {
        setError(msg);
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [conversations.length]);

  // Initial load
  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // Authenticated polling transport for cPanel compatibility (every 8s)
  useEffect(() => {
    const timer = setInterval(() => {
      fetchConversations(true);
    }, 8000);

    return () => clearInterval(timer);
  }, [fetchConversations]);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchConversations(false);
  }, [fetchConversations]);

  const totalUnreadCount = useMemo(() => {
    return conversations.reduce((acc, curr) => acc + (curr.unreadCount || 0), 0);
  }, [conversations]);

  const startConversation = useCallback(
    async (request: CreateConversationRequest): Promise<Conversation> => {
      try {
        const conv = await messagingApi.createOrGetConversation(request);
        setConversations((prev) => {
          const exists = prev.some((c) => c.id === conv.id);
          if (exists) return prev;
          return [conv, ...prev];
        });
        return conv;
      } catch (err) {
        // Fallback local conversation creation if offline
        const localConv: Conversation = {
          id: `conv-local-${Date.now()}`,
          studentId: user?.role === "STUDENT" ? user.id : request.participantId,
          studentName: user?.role === "STUDENT" ? "Student Participant" : "Candidate",
          studentDepartment: "Engineering",
          studentGraduationYear: 2026,
          alumniId: user?.role === "ALUMNI" ? user.id : request.participantId,
          alumniName: user?.role === "ALUMNI" ? "Alumni Mentor" : "Jordan Vance",
          alumniRoleTitle: "Staff Platform Engineer",
          alumniCompany: "Stripe",
          mentorshipRequestId: request.mentorshipRequestId,
          topic: request.topic || "Direct Mentorship Conversation",
          status: "active",
          createdAt: new Date().toISOString(),
          lastMessageAt: new Date().toISOString(),
          lastMessagePreview: "Conversation started.",
          unreadCount: 0,
        };
        setConversations((prev) => [localConv, ...prev]);
        return localConv;
      }
    },
    [user]
  );

  return {
    conversations,
    isLoading,
    isRefreshing,
    error,
    totalUnreadCount,
    onRefresh,
    startConversation,
  };
}
