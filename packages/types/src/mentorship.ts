export type MentorshipRequestStatus =
  | "pending"
  | "accepted"
  | "declined"
  | "completed";

export interface MentorshipTopic {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface MentorshipRequest {
  id: string;
  studentId: string;
  alumniId: string;
  topicId: string;
  message: string;
  status: MentorshipRequestStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface JobPreview {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: "full_time" | "internship" | "referral_only";
  postedByName: string;
  postedByRole: string;
  isReferralAvailable: boolean;
  createdAt: string;
  departmentTag: string;
}

export interface PlatformEventPreview {
  id: string;
  title: string;
  description: string;
  eventType: string;
  speakerName: string;
  speakerHeadline: string;
  startTime: string;
  registeredCount: number;
  status: "upcoming" | "live" | "completed";
}

export interface AuditLogItem {
  id: string;
  adminName: string;
  action: string;
  targetEntity: string;
  targetId: string;
  summary: string;
  createdAt: string;
}
