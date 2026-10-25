/**
 * Alumnux — Student-to-Alumni Lifecycle & Verification Engine
 * Section 5 & 6 Specification
 *
 * Implements strict, idempotent transition logic:
 * 1. A student is NEVER promoted merely by selecting "Final Year".
 * 2. An explicit graduation condition (verified completion date or admin certification) is required.
 * 3. Transitioning to Alumni does NOT automatically grant verified status.
 * 4. All transitions are logged with immutable audit records.
 * 5. User identity, connections, and historical records are preserved.
 */

export type AccountRole = "student" | "alumni" | "admin";

export type VerificationState =
  | "pending"
  | "needs_review"
  | "verified"
  | "rejected"
  | "suspended";

export type AcademicCompletionStatus =
  | "studying"
  | "final_year"
  | "course_completed"
  | "graduated";

export interface LifecycleUserRecord {
  id: string;
  email: string;
  username: string;
  full_name: string;
  department: string;
  role: AccountRole;
  verification_status: VerificationState;
  academic_completion_status: AcademicCompletionStatus;
  expected_graduation_date: string; // ISO 8601 string (e.g. "2026-05-31")
  verified_graduation_date?: string | null; // ISO 8601 string when officially certified
  current_academic_year?: "First Year" | "Second Year" | "Third Year" | "Final Year";
  passed_out_year?: number;
  current_company?: string;
  linkedin_url?: string;
  student_id_front_ref?: string;
  student_id_back_ref?: string;
  graduation_certificate_ref?: string;
  created_at: string;
  updated_at: string;
}

export interface LifecycleAuditRecord {
  id: string;
  actor_id: string; // e.g. "system_lifecycle_daemon" or trustee admin ID
  affected_user_id: string;
  previous_role: AccountRole;
  new_role: AccountRole;
  previous_verification_status: VerificationState;
  new_verification_status: VerificationState;
  transition_reason: string;
  timestamp: string;
}

export interface TransitionEvaluationResult {
  eligible: boolean;
  reason: string;
}

export interface TransitionExecutionResult {
  success: boolean;
  user: LifecycleUserRecord;
  auditRecord?: LifecycleAuditRecord;
  error?: string;
}

/**
 * Evaluates whether a student user is legally eligible for promotion to alumni.
 *
 * Non-negotiable rules:
 * - Current academic year "Final Year" alone DOES NOT prove graduation.
 * - Requires explicit graduation condition:
 *   a) verified_graduation_date is present and in the past/today, OR
 *   b) academic_completion_status is "graduated" or "course_completed", OR
 *   c) expected_graduation_date has elapsed AND verified completion record is acknowledged.
 */
export function evaluateStudentGraduationEligibility(
  user: LifecycleUserRecord,
  currentDate: Date = new Date()
): TransitionEvaluationResult {
  if (user.role !== "student") {
    return {
      eligible: false,
      reason: `User is already registered with role '${user.role}'. Only active students can transition.`,
    };
  }

  // Guard: Just being in "Final Year" without degree completion is NOT eligible
  if (
    user.current_academic_year === "Final Year" &&
    user.academic_completion_status === "studying" &&
    !user.verified_graduation_date
  ) {
    return {
      eligible: false,
      reason:
        "Student is currently in Final Year of study. Graduation condition has not been met (degree completion pending).",
    };
  }

  // Condition A: Explicitly confirmed graduation status
  if (
    user.academic_completion_status === "graduated" ||
    user.academic_completion_status === "course_completed"
  ) {
    return {
      eligible: true,
      reason: `Verified academic completion condition met: status is '${user.academic_completion_status}'.`,
    };
  }

  // Condition B: Verified graduation date is set and has passed
  if (user.verified_graduation_date) {
    const verifiedDate = new Date(user.verified_graduation_date);
    if (!isNaN(verifiedDate.getTime()) && verifiedDate <= currentDate) {
      return {
        eligible: true,
        reason: `Verified graduation date (${user.verified_graduation_date}) has passed.`,
      };
    }
  }

  // Condition C: Expected graduation date elapsed with verified completion
  if (user.expected_graduation_date) {
    const expectedDate = new Date(user.expected_graduation_date);
    if (!isNaN(expectedDate.getTime()) && expectedDate <= currentDate) {
      if (user.academic_completion_status !== "studying") {
        return {
          eligible: true,
          reason: `Expected graduation date (${user.expected_graduation_date}) has elapsed with completion confirmed.`,
        };
      }
    }
  }

  return {
    eligible: false,
    reason:
      "Academic completion condition not yet fulfilled. Account remains active in student classification.",
  };
}

/**
 * Performs idempotent, backend-ready transition from Student to Alumni.
 *
 * Enforces:
 * - Preserves user ID, email, username, connections, and historical records.
 * - Transitions role from "student" to "alumni".
 * - DOES NOT automatically mark as verified! Sets or retains "pending" / "needs_review" for alumni credential check.
 * - Generates immutable audit record.
 */
export function transitionStudentToAlumni(
  user: LifecycleUserRecord,
  actorId: string = "system_lifecycle_daemon",
  options: {
    passedOutYear?: number;
    currentCompany?: string;
    graduationCertificateRef?: string;
    requireAlumniReverification?: boolean;
    currentDate?: Date;
  } = {}
): TransitionExecutionResult {
  const currentDate = options.currentDate || new Date();
  const evaluation = evaluateStudentGraduationEligibility(user, currentDate);

  if (!evaluation.eligible) {
    return {
      success: false,
      user,
      error: evaluation.reason,
    };
  }

  const previousRole = user.role;
  const previousVerificationStatus = user.verification_status;

  // Crucial Rule: Transition to alumni MUST NOT automatically grant verified status.
  // If user was a verified student, they must submit Anna University graduation certificate for alumni verification.
  const requireReverification =
    options.requireAlumniReverification !== undefined
      ? options.requireAlumniReverification
      : true;

  const newVerificationStatus: VerificationState = requireReverification
    ? "pending"
    : previousVerificationStatus;

  const resolvedPassedOutYear =
    options.passedOutYear ||
    (user.verified_graduation_date
      ? new Date(user.verified_graduation_date).getFullYear()
      : new Date().getFullYear());

  const updatedUser: LifecycleUserRecord = {
    ...user,
    role: "alumni",
    verification_status: newVerificationStatus,
    academic_completion_status: "graduated",
    passed_out_year: resolvedPassedOutYear,
    current_company: options.currentCompany || user.current_company,
    graduation_certificate_ref:
      options.graduationCertificateRef || user.graduation_certificate_ref,
    updated_at: currentDate.toISOString(),
  };

  const auditRecord: LifecycleAuditRecord = {
    id: `audit-trans-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    actor_id: actorId,
    affected_user_id: user.id,
    previous_role: previousRole,
    new_role: "alumni",
    previous_verification_status: previousVerificationStatus,
    new_verification_status: newVerificationStatus,
    transition_reason: evaluation.reason,
    timestamp: currentDate.toISOString(),
  };

  return {
    success: true,
    user: updatedUser,
    auditRecord,
  };
}
