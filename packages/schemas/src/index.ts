import { z } from "zod";

// Academic departments recognized in Alumnux
export const ALLOWED_DEPARTMENTS = [
  "CSE",
  "IT",
  "ECE",
  "EEE",
  "MECH",
  "CIVIL",
  "AIDS",
] as const;

export const departmentSchema = z.enum(ALLOWED_DEPARTMENTS);

// Roles and Status
export const userRoleSchema = z.enum(["STUDENT", "ALUMNI", "ADMIN"]);
export const accountTypeSchema = z.enum(["student", "alumni", "admin"]);
export const userStatusSchema = z.enum(["ACTIVE", "PENDING_VERIFICATION", "SUSPENDED"]);

export const verificationStatusSchema = z.enum([
  "PENDING",
  "NEEDS_REVIEW",
  "VERIFIED",
  "REJECTED",
]);

export const legacyVerificationStatusSchema = z.enum([
  "pending",
  "needs_review",
  "verified",
  "rejected",
]);

// 1. Student Verification Form Schema
export const studentVerificationSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(100, "Name exceeds maximum length"),
  department: z.enum(ALLOWED_DEPARTMENTS, {
    errorMap: () => ({ message: "Please select a valid academic department" }),
  }),
  graduationYear: z
    .number({ invalid_type_error: "Graduation year must be a number" })
    .int()
    .min(2024, "Graduation year must be current or future year for students")
    .max(2032, "Graduation year exceeds expected range"),
  rollNumber: z
    .string()
    .min(5, "Register / Roll number must be at least 5 alphanumeric characters")
    .max(20, "Register / Roll number is too long")
    .regex(/^[A-Za-z0-9]+$/, "Register / Roll number must contain only letters and numbers"),
  idFrontUploaded: z.boolean().refine((val) => val === true, {
    message: "College ID Card Front image is required",
  }),
  idBackUploaded: z.boolean().refine((val) => val === true, {
    message: "College ID Card Back image is required",
  }),
  declarationAccepted: z.boolean().refine((val) => val === true, {
    message: "You must certify that the uploaded credentials are authentic",
  }),
});

export type StudentVerificationInput = z.infer<typeof studentVerificationSchema>;

// 2. Alumni Verification Form Schema
export const alumniVerificationSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(100, "Name exceeds maximum length"),
  department: z.enum(ALLOWED_DEPARTMENTS, {
    errorMap: () => ({ message: "Please select your graduated department" }),
  }),
  graduationYear: z
    .number({ invalid_type_error: "Graduation year must be a number" })
    .int()
    .min(1970, "Graduation year must be 1970 or later")
    .max(2025, "Alumni graduation year cannot be in the future"),
  currentCompany: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name is too long"),
  currentRole: z
    .string()
    .min(2, "Designation / Role must be at least 2 characters")
    .max(100, "Role is too long"),
  experienceYears: z
    .number({ invalid_type_error: "Years of experience must be a number" })
    .min(0, "Experience cannot be negative")
    .max(50, "Experience value is invalid"),
  locationCity: z
    .string()
    .min(2, "City must be at least 2 characters")
    .max(100, "City name is too long"),
  linkedinUrl: z
    .string()
    .url("Must be a valid URL")
    .regex(/linkedin\.com/, "URL must be a valid LinkedIn profile")
    .optional()
    .or(z.literal("")),
  certificateUploaded: z.boolean().refine((val) => val === true, {
    message: "Anna University Degree or Provisional Certificate scan is required",
  }),
  declarationAccepted: z.boolean().refine((val) => val === true, {
    message: "You must certify that you are a bonafide graduate of Anna University",
  }),
});

export type AlumniVerificationInput = z.infer<typeof alumniVerificationSchema>;

// 3. Admin Verification Decision Schema
export const adminDecisionSchema = z
  .object({
    requestId: z.string().uuid("Invalid request ID"),
    action: z.enum(["verified", "needs_review", "rejected"]),
    reason: z.string().optional(),
    internalNotes: z.string().max(500, "Notes cannot exceed 500 characters").optional(),
  })
  .refine(
    (data) => {
      if (
        (data.action === "needs_review" || data.action === "rejected") &&
        (!data.reason || data.reason.trim().length === 0)
      ) {
        return false;
      }
      return true;
    },
    {
      message: "A specific reason must be provided when rejecting or requesting review",
      path: ["reason"],
    }
  );

export type AdminDecisionInput = z.infer<typeof adminDecisionSchema>;

// 4. Directory Filter Schema
export const directoryFilterSchema = z.object({
  query: z.string().optional(),
  department: z.string().optional(),
  gradYearMin: z.number().optional(),
  gradYearMax: z.number().optional(),
  skill: z.string().optional(),
  company: z.string().optional(),
  role: z.string().optional(),
  location: z.string().optional(),
});

export type DirectoryFilterInput = z.infer<typeof directoryFilterSchema>;

// 5. Authentication Schemas (Phase 2)
export const signupSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email address")
    .max(255, "Email address is too long")
    .transform((val) => val.trim().toLowerCase()),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password exceeds maximum length"),
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(150, "Full name exceeds maximum length")
    .transform((val) => val.trim()),
  role: z.enum(["STUDENT", "ALUMNI"], {
    errorMap: () => ({ message: "Role must be either STUDENT or ALUMNI" }),
  }),
  departmentCode: departmentSchema,
  graduationYear: z.coerce
    .number({ invalid_type_error: "Graduation year must be a number" })
    .int()
    .min(1970, "Graduation year must be 1970 or later")
    .max(2035, "Graduation year is invalid"),
  rollNumber: z.string().max(50).optional(),
  currentCompany: z.string().max(150).optional(),
  currentRole: z.string().max(150).optional(),
  linkedinUrl: z.string().url().max(500).optional().or(z.literal("")),
  skills: z.array(z.string()).optional(),
  bio: z.string().max(1000).optional(),
});

export type SignupInput = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email address")
    .transform((val) => val.trim().toLowerCase()),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const refreshSchema = z.object({
  refreshToken: z.string().optional(),
});

export type RefreshInput = z.infer<typeof refreshSchema>;

export const updateProfileSchema = z.object({
  fullName: z.string().min(2).max(150).optional(),
  headline: z.string().max(200).optional(),
  bio: z.string().max(1000).optional(),
  departmentCode: departmentSchema.optional(),
  graduationYear: z.coerce.number().int().min(1970).max(2035).optional(),
  currentCompany: z.string().max(150).optional(),
  currentRole: z.string().max(150).optional(),
  locationCity: z.string().max(100).optional(),
  locationCountry: z.string().max(100).optional(),
  linkedinUrl: z.string().url().max(500).optional().or(z.literal("")),
  githubUrl: z.string().url().max(500).optional().or(z.literal("")),
  portfolioUrl: z.string().url().max(500).optional().or(z.literal("")),
  skills: z.array(z.string()).optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

// Legacy Auth Schemas for backward compatibility
export const authLoginSchema = loginSchema;
export type AuthLoginInput = LoginInput;

export const authRegisterSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  role: userRoleSchema,
  departmentCode: departmentSchema,
  graduationYear: z.number().int().min(1970).max(2032),
});
export type AuthRegisterInput = z.infer<typeof authRegisterSchema>;

// 6. Pagination Schema
export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  cursor: z.string().optional(),
});

export type PaginationQueryInput = z.infer<typeof paginationQuerySchema>;

export const directoryQuerySchema = paginationQuerySchema.extend({
  query: z.string().optional(),
  department: z.string().optional(),
  graduationYear: z.coerce.number().int().optional(),
  role: z.enum(["STUDENT", "ALUMNI"]).optional(),
});

export type DirectoryQueryInput = z.infer<typeof directoryQuerySchema>;

// 7. Mentorship Schemas
export const createMentorshipRequestSchema = z.object({
  recipientId: z.string().min(1, "Recipient ID is required"),
  topicId: z.string().optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message exceeds 1000 characters"),
});

export type CreateMentorshipRequestInput = z.infer<typeof createMentorshipRequestSchema>;

export const updateMentorshipStatusSchema = z.object({
  status: z.enum(["ACCEPTED", "DECLINED", "CANCELLED"]),
});

export type UpdateMentorshipStatusInput = z.infer<typeof updateMentorshipStatusSchema>;

// 8. Health Check Schema
export const healthCheckResponseSchema = z.object({
  status: z.enum(["ok", "degraded", "error"]),
  service: z.string(),
  version: z.string(),
  uptime: z.number(),
  timestamp: z.string(),
  database: z.enum(["connected", "disconnected", "mock"]).optional(),
});

export type HealthCheckResponseInput = z.infer<typeof healthCheckResponseSchema>;
