import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  DemoUser,
  DEMO_STUDENT_ACCOUNT,
  DEMO_ALUMNI_ACCOUNT,
} from "../data/demoData";

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
  login: (identifier: string, password: string) => Promise<AuthResult>;
  loginAsDemo: (role: "student" | "alumni") => Promise<DemoUser>;
  registerDemo: (data: RegisterData) => Promise<AuthResult>;
  logout: () => void;
  updateUserBio: (bio: string, skills?: string[]) => void;
}

const STORAGE_KEY = "alumnux_demo_session";
const REGISTERED_USERS_KEY = "alumnux_registered_users";
const ADMIN_QUEUE_KEY = "alumnux_admin_verification_queue";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Restore session from localStorage on initial mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as DemoUser;
        setUser(parsed);
      }
    } catch (e) {
      console.warn("Failed to read demo session from localStorage", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const persistUser = (newUser: DemoUser | null) => {
    setUser(newUser);
    try {
      if (newUser) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.warn("Failed to persist demo session", e);
    }
  };

  const login = async (identifier: string, password: string): Promise<AuthResult> => {
    // Artificial small delay for realistic UX feedback
    await new Promise((resolve) => setTimeout(resolve, 350));

    const cleanId = identifier.trim().toLowerCase();

    // 1. Check student demo account by email or username
    if (
      cleanId === DEMO_STUDENT_ACCOUNT.email.toLowerCase() ||
      cleanId === DEMO_STUDENT_ACCOUNT.username?.toLowerCase()
    ) {
      if (password === "Student@123") {
        persistUser(DEMO_STUDENT_ACCOUNT);
        return { success: true, user: DEMO_STUDENT_ACCOUNT };
      }
      return {
        success: false,
        error: "Invalid password for student demo. Required password is: Student@123",
      };
    }

    // 2. Check alumni demo account by email or username
    if (
      cleanId === DEMO_ALUMNI_ACCOUNT.email.toLowerCase() ||
      cleanId === DEMO_ALUMNI_ACCOUNT.username?.toLowerCase()
    ) {
      if (password === "Alumni@123") {
        persistUser(DEMO_ALUMNI_ACCOUNT);
        return { success: true, user: DEMO_ALUMNI_ACCOUNT };
      }
      return {
        success: false,
        error: "Invalid password for alumni demo. Required password is: Alumni@123",
      };
    }

    // 3. Check registered custom accounts in localStorage
    try {
      const rawStored = localStorage.getItem(REGISTERED_USERS_KEY);
      const registeredUsers: Array<DemoUser & { passwordHash?: string }> = rawStored
        ? JSON.parse(rawStored)
        : [];

      // Also check legacy single-key entries
      const legacyKey = `alumnux_registered_${cleanId}`;
      const legacySaved = localStorage.getItem(legacyKey);
      if (legacySaved) {
        const legacyUser = JSON.parse(legacySaved);
        if (!registeredUsers.some((u) => u.email === legacyUser.email)) {
          registeredUsers.push(legacyUser);
        }
      }

      const matchedUser = registeredUsers.find(
        (u) =>
          u.email.toLowerCase() === cleanId ||
          (u.username && u.username.toLowerCase() === cleanId)
      );

      if (matchedUser) {
        if (matchedUser.passwordHash && matchedUser.passwordHash !== password) {
          return { success: false, error: "Incorrect password for this account." };
        }

        // Section 4 Verification Status Enforcement:
        // Do not grant access solely because a user registered.
        if (matchedUser.verification_status === "pending") {
          return {
            success: false,
            error:
              "Your registration is currently awaiting review by an Alumnux administrator. You will be able to access the platform once your credentials are verified.",
          };
        }

        if (matchedUser.verification_status === "needs_review") {
          return {
            success: false,
            error:
              "Your application requires clarification. Please review administrator feedback or re-upload your document credentials.",
          };
        }

        if (matchedUser.verification_status === "rejected") {
          return {
            success: false,
            error:
              "Your application was rejected by the platform administrators. Reason: Verification documents could not be authenticated.",
          };
        }

        if (matchedUser.verification_status === "suspended") {
          return {
            success: false,
            error: "This account has been suspended by Alumnux administrators.",
          };
        }

        // Verified account
        persistUser(matchedUser);
        return { success: true, user: matchedUser };
      }
    } catch (e) {
      console.warn("Error reading registered users", e);
    }

    return {
      success: false,
      error:
        "Account not recognized. Please verify your email/username, or use 'student@alumnux.demo' (Student@123) / 'alumni@alumnux.demo' (Alumni@123).",
    };
  };

  const loginAsDemo = async (role: "student" | "alumni"): Promise<DemoUser> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const demoAccount = role === "student" ? DEMO_STUDENT_ACCOUNT : DEMO_ALUMNI_ACCOUNT;
    persistUser(demoAccount);
    return demoAccount;
  };

  const registerDemo = async (data: RegisterData): Promise<AuthResult> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const initials =
      data.fullName
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase() || "AL";

    const cleanEmail = data.email.trim().toLowerCase();
    const cleanUsername = data.username.trim().toLowerCase();

    // Check for collision with preset demo accounts
    if (
      cleanEmail === DEMO_STUDENT_ACCOUNT.email.toLowerCase() ||
      cleanEmail === DEMO_ALUMNI_ACCOUNT.email.toLowerCase() ||
      cleanUsername === DEMO_STUDENT_ACCOUNT.username?.toLowerCase() ||
      cleanUsername === DEMO_ALUMNI_ACCOUNT.username?.toLowerCase()
    ) {
      return {
        success: false,
        error: "An account with this email address or username already exists.",
      };
    }

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

    // Build the new user record in PENDING verification state (Section 4)
    const newUser: DemoUser = {
      id: `usr-${Date.now()}`,
      email: cleanEmail,
      username: cleanUsername,
      fullName: data.fullName.trim(),
      role: data.role,
      verification_status: "pending", // strictly pending!
      academic_completion_status: data.role === "alumni" ? "graduated" : "studying",
      academic_year: data.academicYear,
      passed_out_year: data.passedOutYear,
      expected_graduation_date:
        data.role === "student" ? `${calculatedGradYear}-05-31` : undefined,
      verified_graduation_date:
        data.role === "alumni" ? `${calculatedGradYear}-05-15` : null,
      department: data.department,
      graduationYear: calculatedGradYear,
      company: data.company,
      roleTitle: data.role === "alumni" ? "Alumnus / Professional" : undefined,
      linkedin_url: data.linkedinUrl,
      student_id_front_name: data.studentIdFrontName,
      student_id_back_name: data.studentIdBackName,
      graduation_certificate_name: data.graduationCertificateName,
      initials,
      bio: `${data.role === "student" ? "Student" : "Alumnus"} registered on Alumnux. Awaiting administrator verification.`,
      skills: ["Engineering", "Networking"],
    };

    // 1. Store in registered users collection
    try {
      const rawStored = localStorage.getItem(REGISTERED_USERS_KEY);
      const registeredUsers: Array<DemoUser & { passwordHash?: string }> = rawStored
        ? JSON.parse(rawStored)
        : [];

      // Check duplicate in custom users
      if (
        registeredUsers.some(
          (u) =>
            u.email.toLowerCase() === cleanEmail ||
            (u.username && u.username.toLowerCase() === cleanUsername)
        )
      ) {
        return {
          success: false,
          error: "An account with this email or username has already been submitted.",
        };
      }

      registeredUsers.push({ ...newUser, passwordHash: data.password });
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(registeredUsers));
      localStorage.setItem(`alumnux_registered_${cleanEmail}`, JSON.stringify({ ...newUser, passwordHash: data.password }));
    } catch (e) {
      console.warn("Storage quota exceeded", e);
    }

    // 2. Add entry to Admin Verification Queue (Section 4)
    try {
      const queueRaw = localStorage.getItem(ADMIN_QUEUE_KEY);
      const queueList = queueRaw ? JSON.parse(queueRaw) : [];

      const evidenceItems = [];
      if (data.studentIdFrontName) {
        evidenceItems.push({
          id: `ev-${Date.now()}-1`,
          document_type: "student_id_front",
          file_name: data.studentIdFrontName,
          file_size_bytes: 1250000,
          mime_type: "image/jpeg",
          uploaded_at: new Date().toISOString(),
        });
      }
      if (data.studentIdBackName) {
        evidenceItems.push({
          id: `ev-${Date.now()}-2`,
          document_type: "student_id_back",
          file_name: data.studentIdBackName,
          file_size_bytes: 1180000,
          mime_type: "image/jpeg",
          uploaded_at: new Date().toISOString(),
        });
      }
      if (data.graduationCertificateName) {
        evidenceItems.push({
          id: `ev-${Date.now()}-cert`,
          document_type: "degree_certificate",
          file_name: data.graduationCertificateName,
          file_size_bytes: 1840000,
          mime_type: "application/pdf",
          uploaded_at: new Date().toISOString(),
        });
      }

      const queueItem = {
        id: `req-${Date.now()}`,
        user_id: newUser.id,
        full_name: newUser.fullName,
        email: newUser.email,
        account_type: newUser.role,
        department_code: newUser.department,
        graduation_year: newUser.graduationYear,
        status: "pending",
        submitted_at: new Date().toISOString(),
        current_company: newUser.company,
        evidence: evidenceItems,
      };

      queueList.unshift(queueItem);
      localStorage.setItem(ADMIN_QUEUE_KEY, JSON.stringify(queueList));
    } catch (e) {
      console.warn("Failed to sync with admin verification queue", e);
    }

    // Do NOT call persistUser(newUser) because pending accounts cannot log in until approved
    return { success: true, user: newUser };
  };

  const logout = () => {
    persistUser(null);
  };

  const updateUserBio = (bio: string, skills?: string[]) => {
    if (!user) return;
    const updated: DemoUser = {
      ...user,
      bio,
      skills: skills || user.skills,
    };
    persistUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginAsDemo,
        registerDemo,
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
