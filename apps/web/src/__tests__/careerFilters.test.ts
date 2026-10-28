import { describe, it, expect } from "vitest";
import {
  DEMO_CAREER_OPPORTUNITIES,
  CareerOpportunity,
} from "../data/demoData";

describe("Career Opportunities Search & Filters Spec", () => {
  function filterOpportunities(
    opportunities: CareerOpportunity[],
    params: {
      search?: string;
      opportunityType?: string;
      workMode?: string;
      departmentTag?: string;
    }
  ): CareerOpportunity[] {
    return opportunities.filter((item) => {
      if (params.search && params.search.trim()) {
        const query = params.search.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesOrg = item.organization.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesOrg && !matchesDesc && !matchesTags) {
          return false;
        }
      }

      if (
        params.opportunityType &&
        params.opportunityType !== "ALL" &&
        item.opportunityType !== params.opportunityType
      ) {
        return false;
      }

      if (
        params.workMode &&
        params.workMode !== "ALL" &&
        item.workMode !== params.workMode
      ) {
        return false;
      }

      if (
        params.departmentTag &&
        params.departmentTag !== "ALL" &&
        !item.departmentTag.includes(params.departmentTag) &&
        !item.departmentTag.includes("All")
      ) {
        return false;
      }

      return true;
    });
  }

  it("loads the seeded career opportunities", () => {
    expect(DEMO_CAREER_OPPORTUNITIES.length).toBeGreaterThan(0);
    expect(DEMO_CAREER_OPPORTUNITIES.every((o) => o.isDemo)).toBe(true);
  });

  it("filters opportunities by search query (e.g. 'Stripe')", () => {
    const results = filterOpportunities(DEMO_CAREER_OPPORTUNITIES, {
      search: "Stripe",
    });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((r) => r.organization === "Stripe" || r.tags.includes("Stripe"))).toBe(true);
  });

  it("filters opportunities by opportunityType (e.g. 'Internship')", () => {
    const results = filterOpportunities(DEMO_CAREER_OPPORTUNITIES, {
      opportunityType: "Internship",
    });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((r) => r.opportunityType === "Internship")).toBe(true);
  });

  it("filters opportunities by workMode (e.g. 'Remote')", () => {
    const results = filterOpportunities(DEMO_CAREER_OPPORTUNITIES, {
      workMode: "Remote",
    });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((r) => r.workMode === "Remote")).toBe(true);
  });

  it("filters opportunities by departmentTag (e.g. 'CSE')", () => {
    const results = filterOpportunities(DEMO_CAREER_OPPORTUNITIES, {
      departmentTag: "CSE",
    });
    expect(results.length).toBeGreaterThan(0);
    expect(
      results.every(
        (r) => r.departmentTag.includes("CSE") || r.departmentTag.includes("All")
      )
    ).toBe(true);
  });

  it("handles multi-attribute compound filtering correctly", () => {
    const results = filterOpportunities(DEMO_CAREER_OPPORTUNITIES, {
      opportunityType: "Full-time",
      workMode: "Hybrid",
    });
    expect(
      results.every(
        (r) => r.opportunityType === "Full-time" && r.workMode === "Hybrid"
      )
    ).toBe(true);
  });

  it("returns empty array when search query matches no opportunities", () => {
    const results = filterOpportunities(DEMO_CAREER_OPPORTUNITIES, {
      search: "NonExistentCompanyXYZ12345",
    });
    expect(results).toHaveLength(0);
  });
});
