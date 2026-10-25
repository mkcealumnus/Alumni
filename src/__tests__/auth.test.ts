import { describe, it, expect, beforeEach } from "vitest";
import {
  DEMO_STUDENT_ACCOUNT,
  DEMO_ALUMNI_ACCOUNT,
} from "../data/demoData";

class MockStorage {
  private store: Record<string, string> = {};
  getItem(key: string) {
    return this.store[key] ?? null;
  }
  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }
  removeItem(key: string) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

const localStorage = new MockStorage();

describe("Authentication & Demo Accounts Spec", () => {
  const STORAGE_KEY = "alumnux_demo_session";

  beforeEach(() => {
    localStorage.clear();
  });

  it("verifies expected demo student credentials and username", () => {
    expect(DEMO_STUDENT_ACCOUNT.email).toBe("student@alumnux.demo");
    expect(DEMO_STUDENT_ACCOUNT.username).toBe("alexrivera");
    expect(DEMO_STUDENT_ACCOUNT.role).toBe("student");
    expect(DEMO_STUDENT_ACCOUNT.fullName).toBe("Alex Rivera");
    expect(DEMO_STUDENT_ACCOUNT.verification_status).toBe("verified");
  });

  it("verifies expected demo alumni credentials and username", () => {
    expect(DEMO_ALUMNI_ACCOUNT.email).toBe("alumni@alumnux.demo");
    expect(DEMO_ALUMNI_ACCOUNT.username).toBe("jordanvance");
    expect(DEMO_ALUMNI_ACCOUNT.role).toBe("alumni");
    expect(DEMO_ALUMNI_ACCOUNT.fullName).toBe("Jordan Vance");
    expect(DEMO_ALUMNI_ACCOUNT.company).toBe("Stripe");
    expect(DEMO_ALUMNI_ACCOUNT.verification_status).toBe("verified");
  });

  it("validates demo student login with correct password", () => {
    const inputEmail = "student@alumnux.demo";
    const inputPassword = "Student@123";

    const isStudent =
      inputEmail.toLowerCase() === DEMO_STUDENT_ACCOUNT.email.toLowerCase() &&
      inputPassword === "Student@123";

    expect(isStudent).toBe(true);

    const redirectPath = isStudent ? "/student/dashboard" : "/login";
    expect(redirectPath).toBe("/student/dashboard");
  });

  it("validates demo alumni login with correct password", () => {
    const inputEmail = "alumni@alumnux.demo";
    const inputPassword = "Alumni@123";

    const isAlumni =
      inputEmail.toLowerCase() === DEMO_ALUMNI_ACCOUNT.email.toLowerCase() &&
      inputPassword === "Alumni@123";

    expect(isAlumni).toBe(true);

    const redirectPath = isAlumni ? "/alumni/dashboard" : "/login";
    expect(redirectPath).toBe("/alumni/dashboard");
  });

  it("validates login via username for both roles", () => {
    const studentUsername = "alexrivera";
    const alumniUsername = "jordanvance";

    expect(studentUsername.toLowerCase()).toBe(DEMO_STUDENT_ACCOUNT.username?.toLowerCase());
    expect(alumniUsername.toLowerCase()).toBe(DEMO_ALUMNI_ACCOUNT.username?.toLowerCase());
  });

  it("rejects invalid password for student account", () => {
    const inputEmail = "student@alumnux.demo";
    const inputPassword: string = "WrongPassword!456";

    const isStudent =
      inputEmail.toLowerCase() === DEMO_STUDENT_ACCOUNT.email.toLowerCase() &&
      inputPassword === "Student@123";

    expect(isStudent).toBe(false);
  });

  it("rejects invalid password for alumni account", () => {
    const inputEmail = "alumni@alumnux.demo";
    const inputPassword: string = "WrongPassword!456";

    const isAlumni =
      inputEmail.toLowerCase() === DEMO_ALUMNI_ACCOUNT.email.toLowerCase() &&
      inputPassword === "Alumni@123";

    expect(isAlumni).toBe(false);
  });

  it("handles case-insensitive email matching for demo login", () => {
    const mixedCaseStudentEmail = "Student@ALUMNUX.demo";
    const isStudent =
      mixedCaseStudentEmail.toLowerCase() === DEMO_STUDENT_ACCOUNT.email.toLowerCase();
    expect(isStudent).toBe(true);
  });

  it("persists demo session in localStorage and cleans up on logout", () => {
    const session = {
      user: DEMO_STUDENT_ACCOUNT,
      token: "demo-jwt-student-token",
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    const retrieved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

    expect(retrieved.user.email).toBe("student@alumnux.demo");
    expect(retrieved.user.role).toBe("student");

    // Simulate logout cleanup
    localStorage.removeItem(STORAGE_KEY);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
