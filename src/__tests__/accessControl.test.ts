import { describe, it, expect } from "vitest";

describe("Role-Based Route Access Control Spec", () => {
  interface RouteGuardContext {
    user: { id: string; role: "student" | "alumni"; verification_status?: string } | null;
    allowedRole?: "student" | "alumni";
  }

  function evaluateRouteAccess(
    context: RouteGuardContext,
    targetPath: string
  ): { canAccess: boolean; redirectPath: string | null } {
    if (!context.user) {
      return {
        canAccess: false,
        redirectPath: `/login?redirect=${encodeURIComponent(targetPath)}`,
      };
    }

    if (context.allowedRole && context.user.role !== context.allowedRole) {
      const fallbackPath =
        context.user.role === "alumni" ? "/alumni/dashboard" : "/student/dashboard";
      return {
        canAccess: false,
        redirectPath: fallbackPath,
      };
    }

    return {
      canAccess: true,
      redirectPath: null,
    };
  }

  it("blocks unauthenticated visitor from student dashboard and redirects to login", () => {
    const result = evaluateRouteAccess(
      { user: null, allowedRole: "student" },
      "/student/dashboard"
    );
    expect(result.canAccess).toBe(false);
    expect(result.redirectPath).toBe("/login?redirect=%2Fstudent%2Fdashboard");
  });

  it("blocks unauthenticated visitor from alumni dashboard and redirects to login", () => {
    const result = evaluateRouteAccess(
      { user: null, allowedRole: "alumni" },
      "/alumni/dashboard"
    );
    expect(result.canAccess).toBe(false);
    expect(result.redirectPath).toBe("/login?redirect=%2Falumni%2Fdashboard");
  });

  it("allows verified student to access student dashboard", () => {
    const result = evaluateRouteAccess(
      { user: { id: "std-1", role: "student" }, allowedRole: "student" },
      "/student/dashboard"
    );
    expect(result.canAccess).toBe(true);
    expect(result.redirectPath).toBeNull();
  });

  it("blocks student from accessing alumni dashboard and redirects to student dashboard", () => {
    const result = evaluateRouteAccess(
      { user: { id: "std-1", role: "student" }, allowedRole: "alumni" },
      "/alumni/dashboard"
    );
    expect(result.canAccess).toBe(false);
    expect(result.redirectPath).toBe("/student/dashboard");
  });

  it("allows verified alumni to access alumni dashboard", () => {
    const result = evaluateRouteAccess(
      { user: { id: "alm-1", role: "alumni" }, allowedRole: "alumni" },
      "/alumni/dashboard"
    );
    expect(result.canAccess).toBe(true);
    expect(result.redirectPath).toBeNull();
  });

  it("blocks alumni from accessing student dashboard and redirects to alumni dashboard", () => {
    const result = evaluateRouteAccess(
      { user: { id: "alm-1", role: "alumni" }, allowedRole: "student" },
      "/student/dashboard"
    );
    expect(result.canAccess).toBe(false);
    expect(result.redirectPath).toBe("/alumni/dashboard");
  });
});
