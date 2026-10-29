/**
 * ALUMNUX MESSAGING & CONVERSATION TYPES
 * Shared between Fastify backend, Next/Vite web application, and Expo mobile app.
 */

export type ConversationStatus = "active" | "completed" | "closed";
export type MessageDeliveryStatus = "sent" | "delivered" | "read";

export interface Conversation {
  id: string;
  studentId: string;
  studentName: string;
  studentDepartment: string;
  studentGraduationYear: number;
  alumniId: string;
  alumniName: string;
  alumniRoleTitle: string;
  alumniCompany: string;
  mentorshipRequestId?: string;
  topic?: string;
  status: ConversationStatus;
  createdAt: string;
  lastMessageAt: string;
  lastMessagePreview?: string;
  unreadCount?: number;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  content: string;
  status: MessageDeliveryStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface SendMessageRequest {
  content: string;
}

export interface CreateConversationRequest {
  participantId: string;
  mentorshipRequestId?: string;
  topic?: string;
}
