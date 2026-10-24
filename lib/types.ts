export type AccountType = "student" | "alumni" | "admin";

export type VerificationStatus = "pending" | "needs_review" | "verified" | "rejected";

export type DocumentType =
  | "student_id_front"
  | "student_id_back"
  | "degree_certificate"
  | "provisional_certificate"
  | "other_evidence";

export interface Department {
  id: string;
  code: string;
  name: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  headline?: string;
  bio?: string;
  account_type: AccountType;
  department_code: string;
  department_name: string;
  graduation_year: number;
  roll_number?: string;
  current_company?: string;
  current_role?: string;
  experience_years?: number;
  location_city?: string;
  location_country?: string;
  linkedin_url?: string;
  github_url?: string;
  portfolio_url?: string;
  skills: string[];
  is_verified: boolean;
  created_at: string;
}

export interface VerificationEvidenceItem {
  id: string;
  document_type: DocumentType;
  file_name: string;
  file_size_bytes: number;
  mime_type: string;
  preview_url?: string;
  uploaded_at: string;
}

export interface VerificationQueueItem {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  account_type: "student" | "alumni";
  department_code: string;
  graduation_year: number;
  status: VerificationStatus;
  submitted_at: string;
  roll_number?: string;
  current_company?: string;
  current_role?: string;
  evidence: VerificationEvidenceItem[];
  review_notes?: string;
  rejection_reason?: string;
}

export interface MentorshipTopic {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface JobPreview {
  id: string;
  title: string;
  company: string;
  location: string;
  job_type: "full_time" | "internship" | "referral_only";
  posted_by_name: string;
  posted_by_role: string;
  is_referral_available: boolean;
  created_at: string;
  department_tag: string;
}

export interface PlatformEventPreview {
  id: string;
  title: string;
  description: string;
  event_type: string;
  speaker_name: string;
  speaker_headline: string;
  start_time: string;
  registered_count: number;
  status: "upcoming" | "live" | "completed";
}

export interface AuditLogItem {
  id: string;
  admin_name: string;
  action: string;
  target_entity: string;
  target_id: string;
  summary: string;
  created_at: string;
}
