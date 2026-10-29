import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { AuthenticatedUser, UserProfile, SignupRequest, LoginRequest } from "@alumnux/types";
import { mobileApi } from "../lib/api";
import { ApiClientError } from "@alumnux/api-client";

export const SAMPLE_STUDENT_ACCOUNT: { user: AuthenticatedUser; profile: UserProfile } = {
  user: {
    id: "student-demo-alex",
    email: "student@alumnux.demo",
    role: "STUDENT",
    status: "ACTIVE",
    isVerified: true,
    createdAt: "2024-01-15T08:00:00Z",
  },
  profile: {
    id: "prof-student-alex",
    email: "student@alumnux.demo",
    fullName: "Alex Rivera",
    role: "STUDENT",
    departmentCode: "CSE",
    departmentName: "Computer Science & Engineering",
    graduationYear: 2026,
    rollNumber: "2022CSE1084",
    locationCity: "Chennai",
    headline: "Pre-final year CSE student passionate about cloud distributed systems",
    bio: "Pre-final year CSE student passionate about cloud distributed systems, Go, and high-performance backend engineering. Preparing for campus internships and product company off-campus drives.",
    skills: ["Go", "TypeScript", "React", "PostgreSQL", "Docker", "Algorithms & DS"],
    isVerified: true,
    createdAt: "2024-01-15T08:00:00Z",
  },
};

export const SAMPLE_ALUMNI_ACCOUNT: { user: AuthenticatedUser; profile: UserProfile } = {
  user: {
    id: "alumni-demo-jordan",
    email: "alumni@alumnux.demo",
    role: "ALUMNI",
    status: "ACTIVE",
    isVerified: true,
    createdAt: "2023-06-20T10:00:00Z",
  },
  profile: {
    id: "prof-alumni-jordan",
    email: "alumni@alumnux.demo",
    fullName: "Jordan Vance",
    role: "ALUMNI",
    departmentCode: "IT",
    departmentName: "Information Technology",
    graduationYear: 2018,
    currentCompany: "Stripe",
    currentRole: "Staff Platform Engineer",
    experienceYears: 7,
    locationCity: "Bengaluru",
    headline: "Staff Platform Engineer at Stripe specializing in payment reliability",
    bio: "Staff Platform Engineer at Stripe specializing in payment reliability, global distributed architectures, and developer tooling. Offering mock interview guidance and resume critiques for aspiring engineers.",
    skills: ["Distributed Systems", "Cloud Architecture (AWS/GCP)", "System Design", "Go", "Mentorship", "Referrals"],
    isVerified: true,
    createdAt: "2023-06-20T10:00:00Z",
  },
};

export const SAMPLE_ADMIN_ACCOUNT: { user: AuthenticatedUser; profile: UserProfile } = {
  user: {
    id: "admin-trustee-arun",
    email: "admin@alumnux.demo",
    role: "ADMIN",
    status: "ACTIVE",
    isVerified: true,
    createdAt: "2023-01-01T00:00:00Z",
  },
  profile: {
    id: "prof-admin-arun",
    email: "admin@alumnux.demo",
    fullName: "Arunachalam S. (Trustee)",
    role: "ADMIN",
    departmentCode: "CSE",
    departmentName: "Computer Science & Engineering",
    graduationYear: 2012,
    currentCompany: "Alumnux Independent Trust",
    currentRole: "Senior Alumni Trustee & Infra Lead",
    experienceYears: 14,
    locationCity: "Chennai",
    headline: "Independent Trustee @ Alumnux | Infrastructure Lead",
    bio: "Senior Alumni Trustee governing platform verification integrity and student-alumni career initiatives.",
    skills: ["Platform Governance", "Systems Engineering", "Trustee Oversight"],
    isVerified: true,
    createdAt: "2023-01-01T00:00:00Z",
  },
};

interface MobileAuthContextType {
  user: AuthenticatedUser | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<{ success: boolean; error?: string }>;
  loginAsDemo: (role: "STUDENT" | "ALUMNI" | "ADMIN") => Promise<void>;
  loginWithPreset: (role: "STUDENT" | "ALUMNI" | "ADMIN") => Promise<void>;
  signup: (data: SignupRequest) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const MobileAuthContext = createContext<MobileAuthContextType | undefined>(undefined);

export const MobileAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const restoreSession = async () => {
    try {
      const refreshToken = await mobileApi.tokenStorage.getRefreshToken();
      if (refreshToken) {
        if (refreshToken === "mock-sample-student-refresh-token") {
          setUser(SAMPLE_STUDENT_ACCOUNT.user);
          setProfile(SAMPLE_STUDENT_ACCOUNT.profile);
          return;
        }
        if (refreshToken === "mock-sample-alumni-refresh-token") {
          setUser(SAMPLE_ALUMNI_ACCOUNT.user);
          setProfile(SAMPLE_ALUMNI_ACCOUNT.profile);
          return;
        }
        if (refreshToken === "mock-sample-admin-refresh-token") {
          setUser(SAMPLE_ADMIN_ACCOUNT.user);
          setProfile(SAMPLE_ADMIN_ACCOUNT.profile);
          return;
        }

        // Exchange refresh token for fresh access token and user profile
        await mobileApi.refresh(refreshToken);
        const data = await mobileApi.getMe();
        setUser(data.user);
        setProfile(data.profile);
      }
    } catch {
      await mobileApi.tokenStorage.clear();
      setUser(null);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    restoreSession();
  }, []);

  const login = async (credentials: LoginRequest): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = credentials.email.trim().toLowerCase();
    const pass = credentials.password;

    try {
      const res = await mobileApi.login(credentials);
      setUser(res.user);
      setProfile(res.profile);
      return { success: true };
    } catch (err: unknown) {
      // Check sample credentials matching the website presets
      if (
        (cleanEmail === "student@alumnux.demo" || cleanEmail === "student") &&
        pass === "Student@123"
      ) {
        setUser(SAMPLE_STUDENT_ACCOUNT.user);
        setProfile(SAMPLE_STUDENT_ACCOUNT.profile);
        await mobileApi.tokenStorage.setAccessToken("mock-sample-student-access-token");
        await mobileApi.tokenStorage.setRefreshToken("mock-sample-student-refresh-token");
        return { success: true };
      }

      if (
        (cleanEmail === "alumni@alumnux.demo" || cleanEmail === "alumni") &&
        pass === "Alumni@123"
      ) {
        setUser(SAMPLE_ALUMNI_ACCOUNT.user);
        setProfile(SAMPLE_ALUMNI_ACCOUNT.profile);
        await mobileApi.tokenStorage.setAccessToken("mock-sample-alumni-access-token");
        await mobileApi.tokenStorage.setRefreshToken("mock-sample-alumni-refresh-token");
        return { success: true };
      }

      if (
        (cleanEmail === "admin@alumnux.demo" || cleanEmail === "admin") &&
        pass === "Admin@123"
      ) {
        setUser(SAMPLE_ADMIN_ACCOUNT.user);
        setProfile(SAMPLE_ADMIN_ACCOUNT.profile);
        await mobileApi.tokenStorage.setAccessToken("mock-sample-admin-access-token");
        await mobileApi.tokenStorage.setRefreshToken("mock-sample-admin-refresh-token");
        return { success: true };
      }

      if (err instanceof ApiClientError) {
        return { success: false, error: err.message };
      }
      return { success: false, error: "Network error during login. Check server connection." };
    }
  };

  const loginAsDemo = async (role: "STUDENT" | "ALUMNI" | "ADMIN"): Promise<void> => {
    let sample = SAMPLE_STUDENT_ACCOUNT;
    if (role === "ALUMNI") sample = SAMPLE_ALUMNI_ACCOUNT;
    if (role === "ADMIN") sample = SAMPLE_ADMIN_ACCOUNT;

    setUser(sample.user);
    setProfile(sample.profile);
    await mobileApi.tokenStorage.setAccessToken(`mock-sample-${role.toLowerCase()}-access-token`);
    await mobileApi.tokenStorage.setRefreshToken(`mock-sample-${role.toLowerCase()}-refresh-token`);
  };

  const signup = async (data: SignupRequest): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await mobileApi.signup(data);
      setUser(res.user);
      setProfile(res.profile);
      return { success: true };
    } catch (err: unknown) {
      if (err instanceof ApiClientError) {
        return { success: false, error: err.message };
      }
      return { success: false, error: "Registration failed. Please try again." };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await mobileApi.logout();
    } catch {
      // Ignore network errors on logout
    } finally {
      await mobileApi.tokenStorage.clear();
      setUser(null);
      setProfile(null);
    }
  };

  const refreshProfile = async (): Promise<void> => {
    try {
      const data = await mobileApi.getMe();
      setUser(data.user);
      setProfile(data.profile);
    } catch {
      // Silent error
    }
  };

  return (
    <MobileAuthContext.Provider
      value={{
        user,
        profile,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginAsDemo,
        loginWithPreset: loginAsDemo,
        signup,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </MobileAuthContext.Provider>
  );
};

export const useMobileAuth = () => {
  const context = useContext(MobileAuthContext);
  if (!context) {
    throw new Error("useMobileAuth must be used within MobileAuthProvider");
  }
  return context;
};
