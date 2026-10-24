import { describe, it, expect } from "vitest";
import {
  studentVerificationSchema,
  alumniVerificationSchema,
  adminDecisionSchema,
  ALLOWED_DEPARTMENTS,
} from "../lib/validation";

describe("Alumnux Validation & Governance Suite", () => {
  describe("Student Verification Validation", () => {
    it("should accept valid student verification inputs", () => {
      const validStudent = {
        fullName: "Priya Dharshini R.",
        department: "CSE",
        graduationYear: 2026,
        rollNumber: "2022CSE1042",
        idFrontUploaded: true,
        idBackUploaded: true,
        declarationAccepted: true,
      };

      const result = studentVerificationSchema.safeParse(validStudent);
      expect(result.success).toBe(true);
    });

    it("should reject student submission if ID Back is missing", () => {
      const missingBack = {
        fullName: "Priya Dharshini R.",
        department: "CSE",
        graduationYear: 2026,
        rollNumber: "2022CSE1042",
        idFrontUploaded: true,
        idBackUploaded: false,
        declarationAccepted: true,
      };

      const result = studentVerificationSchema.safeParse(missingBack);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("College ID Card Back image is required");
      }
    });

    it("should reject invalid academic department", () => {
      const invalidDept = {
        fullName: "Priya Dharshini R.",
        department: "BIOLOGY" as any,
        graduationYear: 2026,
        rollNumber: "2022CSE1042",
        idFrontUploaded: true,
        idBackUploaded: true,
        declarationAccepted: true,
      };

      const result = studentVerificationSchema.safeParse(invalidDept);
      expect(result.success).toBe(false);
    });
  });

  describe("Alumni Verification Validation", () => {
    it("should accept valid alumni verification inputs", () => {
      const validAlum = {
        fullName: "Karthik Subramanian",
        department: "CSE",
        graduationYear: 2017,
        currentCompany: "Amazon Web Services",
        currentRole: "Staff Cloud Architect",
        experienceYears: 7.5,
        locationCity: "Bengaluru",
        linkedinUrl: "https://linkedin.com/in/example-karthik",
        certificateUploaded: true,
        declarationAccepted: true,
      };

      const result = alumniVerificationSchema.safeParse(validAlum);
      expect(result.success).toBe(true);
    });

    it("should reject future graduation year for alumni", () => {
      const futureAlum = {
        fullName: "Karthik Subramanian",
        department: "CSE",
        graduationYear: 2028,
        currentCompany: "Amazon Web Services",
        currentRole: "Staff Cloud Architect",
        experienceYears: 7.5,
        locationCity: "Bengaluru",
        certificateUploaded: true,
        declarationAccepted: true,
      };

      const result = alumniVerificationSchema.safeParse(futureAlum);
      expect(result.success).toBe(false);
    });

    it("should reject alumni missing Anna University degree certificate", () => {
      const missingCert = {
        fullName: "Karthik Subramanian",
        department: "CSE",
        graduationYear: 2017,
        currentCompany: "Amazon Web Services",
        currentRole: "Staff Cloud Architect",
        experienceYears: 7.5,
        locationCity: "Bengaluru",
        certificateUploaded: false,
        declarationAccepted: true,
      };

      const result = alumniVerificationSchema.safeParse(missingCert);
      expect(result.success).toBe(false);
    });
  });

  describe("Admin Verification Decision Validation", () => {
    it("should allow verified decision without requiring rejection reason", () => {
      const decision = {
        requestId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        action: "verified",
        reason: "",
        internalNotes: "ID cards verified and matches department roster.",
      };

      const result = adminDecisionSchema.safeParse(decision);
      expect(result.success).toBe(true);
    });

    it("should mandate a specific reason when requesting review or rejecting", () => {
      const invalidDecision = {
        requestId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        action: "needs_review",
        reason: "", // Empty reason should fail
      };

      const result = adminDecisionSchema.safeParse(invalidDecision);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain(
          "A specific reason must be provided when rejecting or requesting review"
        );
      }
    });
  });

  describe("Taxonomy Integrity", () => {
    it("should contain standard engineering departments", () => {
      expect(ALLOWED_DEPARTMENTS).toContain("CSE");
      expect(ALLOWED_DEPARTMENTS).toContain("IT");
      expect(ALLOWED_DEPARTMENTS).toContain("ECE");
      expect(ALLOWED_DEPARTMENTS).toContain("EEE");
      expect(ALLOWED_DEPARTMENTS).toContain("MECH");
      expect(ALLOWED_DEPARTMENTS).toContain("CIVIL");
      expect(ALLOWED_DEPARTMENTS).toContain("AIDS");
    });
  });
});
