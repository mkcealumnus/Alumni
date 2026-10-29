import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  DemoUser,
  DEMO_STUDENT_ACCOUNT,
  DEMO_ALUMNI_ACCOUNT,
} from "../data/demoData";
import { api } from "../lib/api";
import { ApiClientError } from "@alumnux/api-client";
import type { AuthenticatedUser, UserProfile } from "@alumnux/types";

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: DemoUser;
}

export interface RegisterData {
  fullName: string;
  email: string;
  username: string;
  role: "student" | "alumni";
  department: string;
  academicYear?: "First Year" | "Second Year" | "Third Year" | "Final Year";
  passedOutYear?: number;
  password?: string;
  company?: string;
  linkedinUrl?: string;
  studentIdFrontName?: string;
  studentIdBackName?: string;
  graduationCertificateName?: string;
}

interface AuthContextType {
  user: DemoUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isDemoMode: boolean;
  login: (identifier: string, password: string) => Promise<AuthResult>;
  loginAsDemo: (role: "student" | "alumni") => Promise<DemoUser>;
  registerDemo: (data: RegisterData) => Promise<AuthResult>;
  register: (data: RegisterData) => Promise<AuthResult>;
  logout: () => void;
  updateUserBio: (bio: string, skills?: string[]) => void;
}

const STORAGE_SESSION_BACKUP = "alumnux_web_session_cache";
const IS_DEV = import.meta.env.DEV;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapServerToUser(authUser: AuthenticatedUser, profile: UserProfile): DemoUser {
  const initials =
    profile.fullName
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "AL";

  let verificationStatus: DemoUser["verification_status"] = "pending";
  if (authUser.isVerified) {
    verificationStatus = "verified";
  } else if (authUser.status === "SUSPENDED") {
    verificationStatus = "suspended";
  } else if (authUser.status === "PENDING_VERIFICATION") {
    verificationStatus = "pending";
  }

  return {
    id: authUser.id,
    email: authUser.email,
    username: authUser.email.split("@")[0],
    fullName: profile.fullName,
    role: authUser.role === "ALUMNI" ? "alumni" : "student",
    verification_status: verificationStatus,
    academic_completion_status: authUser.role === "ALUMNI" ? "graduated" : "studying",
    department: profile.departmentName || profile.departmentCode,
    graduationYear: profile.graduationYear,
    passed_out_year: authUser.role === "ALUMNI" ? profile.graduationYear : undefined,
    company: profile.currentCompany,
    roleTitle: profile.currentRole || (authUser.role === "ALUMNI" ? "Alumnus / Professional" : "Student"),
    experienceYears: profile.experienceYears,
    locationCity: profile.locationCity,
    linkedin_url: profile.linkedinUrl,
    initials,
    bio: profile.bio || "",
    skills: profile.skills || ["Engineering", "Networking"],
    avatarUrl: profile.avatarUrl,
  };
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);

  // Restore session from API or local cache on initial mount
  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      try {
        const token = await api.tokenStorage.getAccessToken();
        const refreshToken = await api.tokenStorage.getRefreshToken();

        if (token || refreshToken) {
          const { user: authUser, profile } = await api.getMe();
          if (isMounted) {
            const mapped = mapServerToUser(authUser, profile);
            setUser(mapped);
            setIsDemoMode(false);
            localStorage.setItem(STORAGE_SESSION_BACKUP, JSON.stringify(mapped));
          }
          return;
        }

        // Check if demo session was active in dev mode
        if (IS_DEV) {
          const cached = localStorage.getItem(STORAGE_SESSION_BACKUP);
          if (cached) {
            const parsed = JSON.parse(cached) as DemoUser;
            if (isMounted) {
              setUser(parsed);
              setIsDemoMode(true);
            }
          }
        }
      } catch {
        // Token invalid or expired
        await api.tokenStorage.clear();
        localStorage.removeItem(STORAGE_SESSION_BACKUP);
        if (isMounted) {
          setUser(null);
          setIsDemoMode(false);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (identifier: string, password: string): Promise<AuthResult> => {
    const cleanId = identifier.trim().toLowerCase();

    // 1. Try real API authentication first
    try {
      const response = await api.login({
        email: cleanId,
        password,
      });

      const mapped = mapServerToUser(response.user, response.profile);
      setUser(mapped);
      setIsDemoMode(false);
      localStorage.setItem(STORAGE_SESSION_BACKUP, JSON.stringify(mapped));

      return { success: true, user: mapped };
    } catch (err) {
      if (err instanceof ApiClientError) {
        // If API explicitly rejected credentials, check dev demo fallback ONLY in local development
        if (IS_DEV && (cleanId === DEMO_STUDENT_ACCOUNT.email.toLowerCase() || cleanId === "student")) {
          if (password === "Student@123") {
            setUser(DEMO_STUDENT_ACCOUNT);
            setIsDemoMode(true);
            localStorage.setItem(STORAGE_SESSION_BACKUP, JSON.stringify(DEMO_STUDENT_ACCOUNT));
            return { success: true, user: DEMO_STUDENT_ACCOUNT };
          }
        }

        if (IS_DEV && (cleanId === DEMO_ALUMNI_ACCOUNT.email.toLowerCase() || cleanId === "alumni")) {
          if (password === "Alumni@123") {
            setUser(DEMO_ALUMNI_ACCOUNT);
            setIsDemoMode(true);
            localStorage.setItem(STORAGE_SESSION_BACKUP, JSON.stringify(DEMO_ALUMNI_ACCOUNT));
            return { success: true, user: DEMO_ALUMNI_ACCOUNT };
          }
        }

        return {
          success: false,
          error: err.message || "Invalid email or password.",
        };
      }

      // Network or connection failure fallback in dev
      if (IS_DEV) {
        if (cleanId === DEMO_STUDENT_ACCOUNT.email.toLowerCase() && password === "Student@123") {
          setUser(DEMO_STUDENT_ACCOUNT);
          setIsDemoMode(true);
          return { success: true, user: DEMO_STUDENT_ACCOUNT };
        }
        if (cleanId === DEMO_ALUMNI_ACCOUNT.email.toLowerCase() && password === "Alumni@123") {
          setUser(DEMO_ALUMNI_ACCOUNT);
          setIsDemoMode(true);
          return { success: true, user: DEMO_ALUMNI_ACCOUNT };
        }
      }

      return {
        success: false,
        error: "Unable to connect to the authentication service. Please check your network connection.",
      };
    }
  };

  const loginAsDemo = async (role: "student" | "alumni"): Promise<DemoUser> => {
    const demoAccount = role === "student" ? DEMO_STUDENT_ACCOUNT : DEMO_ALUMNI_ACCOUNT;
    setUser(demoAccount);
    setIsDemoMode(true);
    localStorage.setItem(STORAGE_SESSION_BACKUP, JSON.stringify(demoAccount));
    return demoAccount;
  };

  const register = async (data: RegisterData): Promise<AuthResult> => {
    const calculatedGradYear =
      data.role === "alumni"
        ? data.passedOutYear || 2020
        : data.academicYear === "First Year"
        ? 2029
        : data.academicYear === "Second Year"
        ? 2028
        : data.academicYear === "Third Year"
        ? 2027
        : 2026;

    try {
      const response = await api.signup({
        email: data.email.trim().toLowerCase(),
        password: data.password || "SecurePassword123!",
        fullName: data.fullName.trim(),
        role: data.role.toUpperCase() as "STUDENT" | "ALUMNI",
        departmentCode: data.department,
        graduationYear: calculatedGradYear,
        currentCompany: data.company,
        linkedinUrl: data.linkedinUrl,
      });

      const mapped = mapServerToUser(response.user, response.profile);
      return { success: true, user: mapped };
    } catch (err: unknown) {
      if (err instanceof ApiClientError) {
        return { success: false, error: err.message };
      }
      return {
        success: false,
        error: "Registration failed. Please check your network connection and try again.",
      };
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch {
      // Ignore network errors on logout
    } finally {
      setUser(null);
      setIsDemoMode(false);
      localStorage.removeItem(STORAGE_SESSION_BACKUP);
      await api.tokenStorage.clear();
    }
  };

  const updateUserBio = async (bio: string, skills?: string[]) => {
    if (!user) return;

    try {
      if (!isDemoMode) {
        const { profile } = await api.updateMe({ bio, skills });
        setUser((prev) => (prev ? { ...prev, bio: profile.bio || bio, skills: profile.skills || skills || prev.skills } : null));
      } else {
        setUser((prev) => (prev ? { ...prev, bio, skills: skills || prev.skills } : null));
      }
    } catch {
      // Optimistic update
      setUser((prev) => (prev ? { ...prev, bio, skills: skills || prev.skills } : null));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isDemoMode,
        login,
        loginAsDemo,
        registerDemo: register,
        register,
        logout,
        updateUserBio,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
