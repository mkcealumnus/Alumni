import { describe, it, expect } from "vitest";
import {
  evaluateStudentGraduationEligibility,
  transitionStudentToAlumni,
  LifecycleUserRecord,
} from "../lib/lifecycle";

describe("Registration & Student-to-Alumni Lifecycle Specification", () => {
  const baseStudentUser: LifecycleUserRecord = {
    id: "usr-student-alex-001",
    email: "alex.student@alumnux.demo",
    username: "alexstudent",
    full_name: "Alex Rivera",
    department: "CSE",
    role: "student",
    verification_status: "verified",
    academic_completion_status: "studying",
    current_academic_year: "Third Year",
    expected_graduation_date: "2026-05-31",
    verified_graduation_date: null,
    created_at: "2024-08-01T00:00:00Z",
    updated_at: "2024-08-01T00:00:00Z",
  };

  it("Rule 1: Does NOT promote student merely because 'Final Year' is selected", () => {
    const finalYearStudent: LifecycleUserRecord = {
      ...baseStudentUser,
      current_academic_year: "Final Year",
      academic_completion_status: "studying",
      verified_graduation_date: null,
    };

    // Evaluate eligibility today (before graduation date)
    const testDate = new Date("2025-10-15T00:00:00Z");
    const evaluation = evaluateStudentGraduationEligibility(finalYearStudent, testDate);

    expect(evaluation.eligible).toBe(false);
    expect(evaluation.reason).toContain("Final Year");

    // Attempt transition execution
    const result = transitionStudentToAlumni(finalYearStudent, "test_runner", {
      currentDate: testDate,
    });
    expect(result.success).toBe(false);
    expect(result.user.role).toBe("student"); // Remains student!
  });

  it("Rule 2: Successfully triggers transition when verified graduation condition is met", () => {
    const graduatingStudent: LifecycleUserRecord = {
      ...baseStudentUser,
      current_academic_year: "Final Year",
      academic_completion_status: "graduated",
      verified_graduation_date: "2026-05-15T00:00:00Z",
    };

    const graduationDay = new Date("2026-05-16T00:00:00Z");
    const evaluation = evaluateStudentGraduationEligibility(graduatingStudent, graduationDay);

    expect(evaluation.eligible).toBe(true);
    expect(evaluation.reason).toContain("Verified academic completion");

    const transitionResult = transitionStudentToAlumni(graduatingStudent, "system_lifecycle_daemon", {
      currentDate: graduationDay,
      passedOutYear: 2026,
      currentCompany: "Stripe",
    });

    expect(transitionResult.success).toBe(true);
    expect(transitionResult.user.role).toBe("alumni");
    expect(transitionResult.user.passed_out_year).toBe(2026);
    expect(transitionResult.user.current_company).toBe("Stripe");
  });

  it("Rule 3: Preserves the same user ID and historical record associations across transition", () => {
    const studentUser: LifecycleUserRecord = {
      ...baseStudentUser,
      id: "usr-unique-uuid-999",
      email: "alex.permanent@alumnux.demo",
      username: "alexperm",
      academic_completion_status: "course_completed",
      verified_graduation_date: "2026-05-20T00:00:00Z",
    };

    const result = transitionStudentToAlumni(studentUser, "system_lifecycle_daemon", {
      currentDate: new Date("2026-05-25T00:00:00Z"),
    });

    expect(result.success).toBe(true);
    expect(result.user.id).toBe("usr-unique-uuid-999");
    expect(result.user.email).toBe("alex.permanent@alumnux.demo");
    expect(result.user.username).toBe("alexperm");
  });

  it("Rule 4: Transition to Alumni does NOT automatically grant verified status", () => {
    const studentUser: LifecycleUserRecord = {
      ...baseStudentUser,
      verification_status: "verified", // Was verified as student
      academic_completion_status: "graduated",
      verified_graduation_date: "2026-05-15T00:00:00Z",
    };

    const result = transitionStudentToAlumni(studentUser, "system_lifecycle_daemon", {
      currentDate: new Date("2026-06-01T00:00:00Z"),
      requireAlumniReverification: true, // Default verification policy
    });

    expect(result.success).toBe(true);
    expect(result.user.role).toBe("alumni");
    // CRITICAL: Must be pending or unverified until graduation certificate is reviewed!
    expect(result.user.verification_status).toBe("pending");
  });

  it("Rule 5: Emits an immutable audit log record detailing the transition", () => {
    const studentUser: LifecycleUserRecord = {
      ...baseStudentUser,
      id: "usr-audit-test-456",
      academic_completion_status: "graduated",
      verified_graduation_date: "2026-05-15T00:00:00Z",
    };

    const testTime = new Date("2026-05-18T10:30:00Z");
    const result = transitionStudentToAlumni(studentUser, "trustee_admin_arunachalam", {
      currentDate: testTime,
    });

    expect(result.auditRecord).toBeDefined();
    expect(result.auditRecord?.affected_user_id).toBe("usr-audit-test-456");
    expect(result.auditRecord?.actor_id).toBe("trustee_admin_arunachalam");
    expect(result.auditRecord?.previous_role).toBe("student");
    expect(result.auditRecord?.new_role).toBe("alumni");
    expect(result.auditRecord?.timestamp).toBe(testTime.toISOString());
  });

  it("Rule 6: Transition operation is strictly idempotent", () => {
    const studentUser: LifecycleUserRecord = {
      ...baseStudentUser,
      academic_completion_status: "graduated",
      verified_graduation_date: "2026-05-15T00:00:00Z",
    };

    const firstRun = transitionStudentToAlumni(studentUser, "system_lifecycle_daemon", {
      currentDate: new Date("2026-05-20T00:00:00Z"),
    });

    expect(firstRun.success).toBe(true);

    // Running again on the already-transitioned user should fail safely (role is already alumni)
    const secondRun = transitionStudentToAlumni(firstRun.user, "system_lifecycle_daemon", {
      currentDate: new Date("2026-05-21T00:00:00Z"),
    });

    expect(secondRun.success).toBe(false);
    expect(secondRun.error).toContain("already registered with role 'alumni'");
  });
});
