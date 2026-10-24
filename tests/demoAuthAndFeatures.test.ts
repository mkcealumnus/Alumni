import { describe, it, expect } from "vitest";
import {
  DEMO_STUDENT_ACCOUNT,
  DEMO_ALUMNI_ACCOUNT,
  DEMO_CAREER_OPPORTUNITIES,
  INITIAL_MENTORSHIP_REQUESTS,
  DEMO_EVENTS,
  DEMO_NOTIFICATIONS,
} from "@/data/demoData";

describe("Alumnux Demo Authentication & Feature Dataset", () => {
  describe("Preset Demo Accounts", () => {
    it("should provide valid student demo credentials", () => {
      expect(DEMO_STUDENT_ACCOUNT.email).toBe("student@alumnux.demo");
      expect(DEMO_STUDENT_ACCOUNT.role).toBe("student");
      expect(DEMO_STUDENT_ACCOUNT.fullName).toBe("Alex Rivera");
      expect(DEMO_STUDENT_ACCOUNT.initials).toBe("AR");
      expect(DEMO_STUDENT_ACCOUNT.department).toContain("Computer Science");
    });

    it("should provide valid alumni demo credentials", () => {
      expect(DEMO_ALUMNI_ACCOUNT.email).toBe("alumni@alumnux.demo");
      expect(DEMO_ALUMNI_ACCOUNT.role).toBe("alumni");
      expect(DEMO_ALUMNI_ACCOUNT.fullName).toBe("Jordan Vance");
      expect(DEMO_ALUMNI_ACCOUNT.initials).toBe("JV");
      expect(DEMO_ALUMNI_ACCOUNT.company).toBe("Stripe");
      expect(DEMO_ALUMNI_ACCOUNT.roleTitle).toContain("Platform Engineer");
    });
  });

  describe("Career Opportunities Dataset", () => {
    it("should mark all seeded opportunities as demo content", () => {
      expect(DEMO_CAREER_OPPORTUNITIES.length).toBeGreaterThanOrEqual(4);
      DEMO_CAREER_OPPORTUNITIES.forEach((opp) => {
        expect(opp.isDemo).toBe(true);
        expect(opp.title).toBeDefined();
        expect(opp.organization).toBeDefined();
        expect(opp.location).toBeDefined();
        expect(["Full-time", "Internship", "Referral", "Mentorship"]).toContain(
          opp.opportunityType
        );
        expect(["Remote", "Hybrid", "Onsite"]).toContain(opp.workMode);
      });
    });

    it("should filter opportunities accurately by type", () => {
      const fullTime = DEMO_CAREER_OPPORTUNITIES.filter(
        (o) => o.opportunityType === "Full-time"
      );
      const internships = DEMO_CAREER_OPPORTUNITIES.filter(
        (o) => o.opportunityType === "Internship"
      );
      const referrals = DEMO_CAREER_OPPORTUNITIES.filter(
        (o) => o.opportunityType === "Referral"
      );
      const mentorships = DEMO_CAREER_OPPORTUNITIES.filter(
        (o) => o.opportunityType === "Mentorship"
      );

      expect(fullTime.length).toBeGreaterThan(0);
      expect(internships.length).toBeGreaterThan(0);
      expect(referrals.length).toBeGreaterThan(0);
      expect(mentorships.length).toBeGreaterThan(0);
    });

    it("should filter opportunities accurately by work mode", () => {
      const remote = DEMO_CAREER_OPPORTUNITIES.filter(
        (o) => o.workMode === "Remote"
      );
      const hybrid = DEMO_CAREER_OPPORTUNITIES.filter(
        (o) => o.workMode === "Hybrid"
      );
      const onsite = DEMO_CAREER_OPPORTUNITIES.filter(
        (o) => o.workMode === "Onsite"
      );

      expect(remote.length).toBeGreaterThan(0);
      expect(hybrid.length).toBeGreaterThan(0);
      expect(onsite.length).toBeGreaterThan(0);
    });
  });

  describe("Mentorship Workflow Integrity", () => {
    it("should contain pending mentorship requests for alumni review", () => {
      const pending = INITIAL_MENTORSHIP_REQUESTS.filter(
        (r) => r.status === "pending"
      );
      expect(pending.length).toBeGreaterThan(0);
      pending.forEach((r) => {
        expect(r.studentName).toBeDefined();
        expect(r.topic).toBeDefined();
        expect(r.message.length).toBeGreaterThan(10);
      });
    });
  });

  describe("Platform Events & Notifications", () => {
    it("should have upcoming interactive webinars and workshops", () => {
      expect(DEMO_EVENTS.length).toBeGreaterThanOrEqual(2);
      DEMO_EVENTS.forEach((e) => {
        expect(e.speakerName).toBeDefined();
        expect(e.registeredCount).toBeGreaterThan(0);
        expect(e.isDemo).toBe(true);
      });
    });

    it("should have demo notifications seeded", () => {
      expect(DEMO_NOTIFICATIONS.length).toBeGreaterThanOrEqual(2);
    });
  });
});
