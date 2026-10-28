import type { AccountType, UserRole } from "./user";

export type VerificationStatus =
  | "PENDING"
  | "NEEDS_REVIEW"
  | "VERIFIED"
  | "REJECTED";

/**
 * Legacy lowercase representation for backward compatibility
 */
export type LegacyVerificationStatus =
  | "pending"
  | "needs_review"
  | "verified"
  | "rejected";

export type DocumentType =
  | "student_id_front"
  | "student_id_back"
  | "degree_certificate"
  | "provisional_certificate"
  | "other_evidence";

export interface VerificationEvidenceItem {
  id: string;
  documentType: DocumentType;
  fileName: string;
  fileSizeBytes: number;
  mimeType: string;
  previewUrl?: string;
  uploadedAt: string;
}

export interface VerificationQueueItem {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  role: UserRole;
  accountType?: AccountType;
  departmentCode: string;
  graduationYear: number;
  status: VerificationStatus | LegacyVerificationStatus;
  submittedAt: string;
  rollNumber?: string;
  currentCompany?: string;
  currentRole?: string;
  evidence: VerificationEvidenceItem[];
  reviewNotes?: string;
  rejectionReason?: string;
}
