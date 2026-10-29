import { describe, it, expect, vi, beforeEach } from "vitest";
import { ExpoSecureTokenStorageAdapter } from "../src/lib/storage";
import { signupSchema, loginSchema } from "@alumnux/schemas";
import * as SecureStore from "expo-secure-store";

vi.mock("expo-secure-store", () => {
  const store = new Map<string, string>();
  return {
    isAvailableAsync: vi.fn(async () => true),
    getItemAsync: vi.fn(async (key: string) => store.get(key) || null),
    setItemAsync: vi.fn(async (key: string, value: string) => {
      store.set(key, value);
    }),
    deleteItemAsync: vi.fn(async (key: string) => {
      store.delete(key);
    }),
  };
});

describe("Mobile Application - Storage and Authentication Rules", () => {
  let adapter: ExpoSecureTokenStorageAdapter;

  beforeEach(async () => {
    vi.clearAllMocks();
    adapter = new ExpoSecureTokenStorageAdapter();
    await adapter.clear();
  });

  describe("ExpoSecureTokenStorageAdapter", () => {
    it("stores access token in memory and refresh token via Expo SecureStore", async () => {
      await adapter.setAccessToken("test-access-token");
      await adapter.setRefreshToken("test-refresh-token");

      expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
        "alumnux_mobile_refresh_token",
        "test-refresh-token"
      );

      const accessToken = await adapter.getAccessToken();
      const refreshToken = await adapter.getRefreshToken();

      expect(accessToken).toBe("test-access-token");
      expect(refreshToken).toBe("test-refresh-token");
    });

    it("clears all stored credentials securely on logout", async () => {
      await adapter.setAccessToken("token-a");
      await adapter.setRefreshToken("token-b");
      await adapter.clear();

      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith("alumnux_mobile_refresh_token");

      const accessToken = await adapter.getAccessToken();
      const refreshToken = await adapter.getRefreshToken();

      expect(accessToken).toBeNull();
      expect(refreshToken).toBeNull();
    });
  });

  describe("Client-side validation schemas matching backend", () => {
    it("validates legitimate student registration data", () => {
      const validStudent = {
        email: "student@mkce.ac.in",
        password: "StrongPassword123!",
        fullName: "Rahul V",
        role: "STUDENT" as const,
        departmentCode: "CSE",
        graduationYear: 2026,
      };

      const result = signupSchema.safeParse(validStudent);
      expect(result.success).toBe(true);
    });

    it("validates legitimate alumni registration data", () => {
      const validAlumni = {
        email: "alumni@company.com",
        password: "StrongPassword123!",
        fullName: "Priya S",
        role: "ALUMNI" as const,
        departmentCode: "ECE",
        graduationYear: 2020,
        currentCompany: "Google",
        currentRole: "Staff Software Engineer",
      };

      const result = signupSchema.safeParse(validAlumni);
      expect(result.success).toBe(true);
    });

    it("rejects weak passwords under 8 characters", () => {
      const weak = {
        email: "student@mkce.ac.in",
        password: "short",
        fullName: "Rahul V",
        role: "STUDENT" as const,
        departmentCode: "CSE",
        graduationYear: 2026,
      };

      const result = signupSchema.safeParse(weak);
      expect(result.success).toBe(false);
    });

    it("rejects login attempt with invalid email format", () => {
      const invalid = {
        email: "not-an-email",
        password: "Password123!",
      };

      const result = loginSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });
});
