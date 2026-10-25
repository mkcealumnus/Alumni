/**
 * Alumnux — Mentorship Module Data Model & Entity Types
 * Phase 1 Mentorship Module Specification
 *
 * Prepared for TypeScript type safety and future Supabase integration.
 */

export type UserRole = "student" | "alumni" | "admin";

export type ModerationStatus = "visible" | "flagged" | "removed" | "approved";

export type MentorshipRequestStatus = "pending" | "accepted" | "declined" | "closed";

export type MentorshipConversationStatus = "active" | "completed" | "closed";

export type MessageDeliveryStatus = "sending" | "sent" | "delivered" | "read" | "failed";

export type ReportReason =
  | "inappropriate"
  | "spam"
  | "harassment"
  | "off_topic"
  | "academic_dishonesty"
  | "other";

export type ReportStatus = "pending_review" | "reviewed" | "dismissed";

/**
 * 1. open_chat_messages
 * Shared, community-wide career guidance discussion space.
 */
export interface OpenChatMessage {
  id: string;
  sender_id: string;
  sender_name: string;
  sender_role: UserRole;
  sender_avatar?: string;
  sender_initials: string;
  sender_department?: string;
  sender_badge?: string; // e.g. "Staff Platform Engineer @ Stripe" or "CSE Class of 2026"
  sender_company?: string;
  sender_is_verified: boolean;
  content: string;
  category_tag?: string; // e.g. "Software Engineering", "Resume", "System Design", "Internships"
  reply_to_message_id?: string | null;
  reply_to_preview?: {
    id: string;
    sender_name: string;
    sender_role: UserRole;
    content: string;
  } | null;
  created_at: string;
  updated_at: string;
  moderation_status: ModerationStatus;
  likes_count: number;
  delivery_status?: MessageDeliveryStatus;
}

/**
 * 2. mentorship_requests
 * Initiated by a student towards a selected alumnus/alumna.
 */
export interface MentorshipRequestEntity {
  id: string;
  student_id: string;
  student_name: string;
  student_email: string;
  student_department: string;
  student_graduation_year: number;
  student_initials: string;
  alumni_id: string;
  alumni_name: string;
  alumni_role_title?: string;
  alumni_company?: string;
  alumni_initials?: string;
  topic: string;
  introductory_message: string;
  preferred_cadence: string;
  status: MentorshipRequestStatus;
  created_at: string;
  responded_at?: string | null;
  closed_at?: string | null;
  decline_reason?: string;
}

/**
 * 3. private_mentorship_conversations
 * Activated when a mentorship request is accepted.
 */
export interface PrivateMentorshipConversation {
  id: string;
  student_id: string;
  student_name: string;
  student_department: string;
  student_graduation_year: number;
  student_initials: string;
  alumni_id: string;
  alumni_name: string;
  alumni_role_title: string;
  alumni_company: string;
  alumni_initials: string;
  mentorship_request_id: string;
  topic: string;
  cadence: string;
  status: MentorshipConversationStatus;
  created_at: string;
  last_message_at: string;
  last_message_preview?: string;
  unread_count_for_current_user?: number;
  closed_at?: string | null;
  closed_by_user_id?: string | null;
}

/**
 * 4. private_mentorship_messages
 * Messages exchanged in a private 1-on-1 mentorship conversation.
 */
export interface PrivateMentorshipMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_name: string;
  sender_role: UserRole;
  content: string;
  status: MessageDeliveryStatus;
  created_at: string;
  updated_at: string;
}

/**
 * 5. message_reports
 * Moderation reporting entity for inappropriate content.
 */
export interface MessageReport {
  id: string;
  reporter_id: string;
  reporter_name: string;
  reporter_role: UserRole;
  message_type: "open_chat" | "private_mentorship";
  message_id: string;
  message_preview?: string;
  reported_user_id?: string;
  reason: ReportReason;
  details?: string;
  status: ReportStatus;
  created_at: string;
}

/**
 * Summary metrics for dashboard widgets
 */
export interface MentorshipMetrics {
  openChatDiscussionsCount: number;
  openChatUnansweredCount: number;
  pendingRequestsCount: number;
  activeMentorshipsCount: number;
  totalAlumniMentorsCount: number;
}
