import type {
  AccountType,
  Department,
  UserRole,
  VerificationStatus,
  LegacyVerificationStatus,
} from "@alumnux/types";
import { ALLOWED_DEPARTMENTS } from "@alumnux/schemas";

// Department Catalog
export const DEPARTMENTS: Record<string, Department> = {
  CSE: { id: "dept_cse", code: "CSE", name: "Computer Science and Engineering" },
  IT: { id: "dept_it", code: "IT", name: "Information Technology" },
  ECE: { id: "dept_ece", code: "ECE", name: "Electronics and Communication Engineering" },
  EEE: { id: "dept_eee", code: "EEE", name: "Electrical and Electronics Engineering" },
  MECH: { id: "dept_mech", code: "MECH", name: "Mechanical Engineering" },
  CIVIL: { id: "dept_civil", code: "CIVIL", name: "Civil Engineering" },
  AIDS: { id: "dept_aids", code: "AIDS", name: "Artificial Intelligence and Data Science" },
};

export function getDepartmentByCode(code: string): Department | undefined {
  return DEPARTMENTS[code.toUpperCase()];
}

export function isValidDepartmentCode(code: string): boolean {
  return (ALLOWED_DEPARTMENTS as readonly string[]).includes(code.toUpperCase());
}

// Role Utilities
export function normalizeUserRole(role: string): UserRole {
  const upper = role.toUpperCase();
  if (upper === "ADMIN") return "ADMIN";
  if (upper === "ALUMNI") return "ALUMNI";
  return "STUDENT";
}

export function toAccountType(role: UserRole | string): AccountType {
  const upper = role.toUpperCase();
  if (upper === "ADMIN") return "admin";
  if (upper === "ALUMNI") return "alumni";
  return "student";
}

export function isAdmin(role: UserRole | string): boolean {
  return role.toUpperCase() === "ADMIN";
}

export function isAlumni(role: UserRole | string): boolean {
  return role.toUpperCase() === "ALUMNI";
}

export function isStudent(role: UserRole | string): boolean {
  return role.toUpperCase() === "STUDENT";
}

// Verification Lifecycle
export function normalizeVerificationStatus(
  status: string
): VerificationStatus {
  const upper = status.toUpperCase();
  switch (upper) {
    case "VERIFIED":
      return "VERIFIED";
    case "NEEDS_REVIEW":
      return "NEEDS_REVIEW";
    case "REJECTED":
      return "REJECTED";
    default:
      return "PENDING";
  }
}

export function canTransitionVerification(
  current: VerificationStatus | LegacyVerificationStatus,
  target: VerificationStatus | LegacyVerificationStatus
): boolean {
  const currNorm = normalizeVerificationStatus(current);
  const targetNorm = normalizeVerificationStatus(target);

  if (currNorm === targetNorm) return false;

  // Once verified, changing status requires admin super-action
  if (currNorm === "VERIFIED") {
    return targetNorm === "NEEDS_REVIEW";
  }

  // From pending, can go to any valid decision
  if (currNorm === "PENDING") {
    return ["VERIFIED", "NEEDS_REVIEW", "REJECTED"].includes(targetNorm);
  }

  // From needs review or rejected, can re-submit to pending or transition directly
  if (currNorm === "NEEDS_REVIEW" || currNorm === "REJECTED") {
    return ["PENDING", "VERIFIED", "REJECTED", "NEEDS_REVIEW"].includes(targetNorm);
  }

  return true;
}

// Graduation Boundaries
export const CURRENT_ACADEMIC_YEAR = 2026;

export function isValidStudentGraduationYear(year: number): boolean {
  return year >= 2024 && year <= 2032;
}

export function isValidAlumniGraduationYear(year: number): boolean {
  return year >= 1970 && year <= CURRENT_ACADEMIC_YEAR;
}
