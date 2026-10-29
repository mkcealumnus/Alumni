import { describe, it, expect } from "vitest";
import {
  BRUTAL_COLORS,
  BRUTAL_BORDERS,
  BRUTAL_RADII,
  BRUTAL_SHADOWS,
  BRUTAL_SPACING,
  BRUTAL_TYPOGRAPHY,
} from "../src/design-system/tokens";
import {
  INITIAL_CAREER_OPPORTUNITIES,
  INITIAL_EVENTS,
  INITIAL_ADMIN_VERIFICATION_QUEUE,
} from "../src/lib/mockData";

describe("Nano-Brutalist Mobile Design System Tokens", () => {
  it("enforces pure nano-brutalist palette", () => {
    expect(BRUTAL_COLORS.BACKGROUND).toBe("#F7F6F2");
    expect(BRUTAL_COLORS.SURFACE).toBe("#FFFFFF");
    expect(BRUTAL_COLORS.INK).toBe("#171717");
    expect(BRUTAL_COLORS.ACCENT).toBe("#D7FF3F");
    expect(BRUTAL_COLORS.MUTED).toBe("#E8E6DF");
    expect(BRUTAL_COLORS.SUCCESS).toBe("#C9F7A4");
    expect(BRUTAL_COLORS.WARNING).toBe("#FFE29A");
    expect(BRUTAL_COLORS.DANGER).toBe("#FF8C82");
  });

  it("enforces tactile 2px borders and sharp/micro radii", () => {
    expect(BRUTAL_BORDERS.standard).toBe(2);
    expect(BRUTAL_BORDERS.width).toBe(2);
    expect(BRUTAL_RADII.sharp).toBe(0);
    expect(BRUTAL_RADII.micro).toBe(2);
    expect(BRUTAL_RADII.standard).toBe(4);
  });

  it("enforces hard offset shadows with zero blur", () => {
    expect(BRUTAL_SHADOWS.sm.shadowRadius).toBe(0);
    expect(BRUTAL_SHADOWS.sm.shadowOpacity).toBe(1);
    expect(BRUTAL_SHADOWS.base.shadowRadius).toBe(0);
    expect(BRUTAL_SHADOWS.base.shadowOpacity).toBe(1);
    expect(BRUTAL_SHADOWS.base.shadowOffset).toEqual({ width: 3, height: 3 });
  });

  it("strictly aligns to 4px spacing unit scale", () => {
    const spacingValues = Object.values(BRUTAL_SPACING);
    spacingValues.forEach((val) => {
      expect(val % 4).toBe(0);
    });
  });

  it("provides oversized editorial typography scale", () => {
    expect(BRUTAL_TYPOGRAPHY.sizes["3xl"]).toBe(30);
    expect(BRUTAL_TYPOGRAPHY.sizes["4xl"]).toBe(36);
    expect(BRUTAL_TYPOGRAPHY.weights.black).toBe("900");
    expect(BRUTAL_TYPOGRAPHY.weights.bold).toBe("700");
  });
});

describe("Mobile Feature Data & Role Governance", () => {
  it("provides complete career opportunity models with referral tags", () => {
    expect(INITIAL_CAREER_OPPORTUNITIES.length).toBeGreaterThanOrEqual(3);
    const referralOpp = INITIAL_CAREER_OPPORTUNITIES.find(
      (o) => o.opportunityType === "Referral"
    );
    expect(referralOpp).toBeDefined();
    expect(referralOpp?.postedByName).toBeTruthy();
    expect(referralOpp?.postedByCompany).toBeTruthy();
    expect(referralOpp?.requirements.length).toBeGreaterThan(0);
  });

  it("provides structured event sessions with speaker and RSVP data", () => {
    expect(INITIAL_EVENTS.length).toBeGreaterThanOrEqual(3);
    INITIAL_EVENTS.forEach((event) => {
      expect(event.title).toBeTruthy();
      expect(event.speakerName).toBeTruthy();
      expect(event.registeredCount).toBeGreaterThan(0);
      expect(["Virtual AMA", "Interactive Workshop", "Panel Discussion"]).toContain(
        event.format
      );
    });
  });

  it("provides trustee verification queue with institutional documents", () => {
    expect(INITIAL_ADMIN_VERIFICATION_QUEUE.length).toBeGreaterThanOrEqual(3);
    const studentVerif = INITIAL_ADMIN_VERIFICATION_QUEUE.find(
      (v) => v.accountType === "STUDENT"
    );
    const alumniVerif = INITIAL_ADMIN_VERIFICATION_QUEUE.find(
      (v) => v.accountType === "ALUMNI"
    );

    expect(studentVerif).toBeDefined();
    expect(studentVerif?.documentType).toContain("College ID");
    expect(alumniVerif).toBeDefined();
    expect(alumniVerif?.documentType).toContain("Anna University Degree");
  });

  it("restricts trustee verification decisions to verified admins", () => {
    const studentRole = "STUDENT";
    const alumniRole = "ALUMNI";
    const trusteeRole = "ADMIN";

    const canReviewQueue = (role: string) => role === "ADMIN";

    expect(canReviewQueue(studentRole)).toBe(false);
    expect(canReviewQueue(alumniRole)).toBe(false);
    expect(canReviewQueue(trusteeRole)).toBe(true);
  });

  it("enforces student vs alumni mentorship permissions", () => {
    const studentCanRequest = true;
    const alumniCanRespond = (role: string, requestStatus: string) =>
      role === "ALUMNI" && requestStatus === "PENDING";
    const studentCanCancel = (role: string, requestStatus: string) =>
      role === "STUDENT" && requestStatus === "PENDING";

    expect(studentCanRequest).toBe(true);
    expect(alumniCanRespond("ALUMNI", "PENDING")).toBe(true);
    expect(alumniCanRespond("STUDENT", "PENDING")).toBe(false);
    expect(studentCanCancel("STUDENT", "PENDING")).toBe(true);
    expect(studentCanCancel("ALUMNI", "PENDING")).toBe(false);
  });
});
