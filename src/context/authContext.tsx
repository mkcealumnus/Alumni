import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  DemoUser,
  DEMO_STUDENT_ACCOUNT,
  DEMO_ALUMNI_ACCOUNT,
} from "../data/demoData";

interface AuthResult {
  success: boolean;
  error?: string;
  user?: DemoUser;
}

interface RegisterData {
  fullName: string;
  email: string;
  role: "student" | "alumni";
  department?: string;
  graduationYear?: number;
  password?: string;
}

interface AuthContextType {
  user: DemoUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  loginAsDemo: (role: "student" | "alumni") => Promise<DemoUser>;
  registerDemo: (data: RegisterData) => Promise<AuthResult>;
  logout: () => void;
  updateUserBio: (bio: string, skills?: string[]) => void;
}

const STORAGE_KEY = "alumnux_demo_session";

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

  const login = async (email: string, password: string): Promise<AuthResult> => {
    // Artificial small delay for realistic UX feedback
    await new Promise((resolve) => setTimeout(resolve, 350));

    const cleanEmail = email.trim().toLowerCase();

    // Check student demo account
    if (cleanEmail === "student@alumnux.demo") {
      if (password === "Student@123") {
        persistUser(DEMO_STUDENT_ACCOUNT);
        return { success: true, user: DEMO_STUDENT_ACCOUNT };
      }
      return {
        success: false,
        error: "Invalid password for student demo. Required password is: Student@123",
      };
    }

    // Check alumni demo account
    if (cleanEmail === "alumni@alumnux.demo") {
      if (password === "Alumni@123") {
        persistUser(DEMO_ALUMNI_ACCOUNT);
        return { success: true, user: DEMO_ALUMNI_ACCOUNT };
      }
      return {
        success: false,
        error: "Invalid password for alumni demo. Required password is: Alumni@123",
      };
    }

    // Check if there is an active registered demo account stored in localStorage
    try {
      const regKey = `alumnux_registered_${cleanEmail}`;
      const savedCustom = localStorage.getItem(regKey);
      if (savedCustom) {
        const customUser = JSON.parse(savedCustom) as DemoUser & { passwordHash?: string };
        if (customUser.passwordHash && customUser.passwordHash !== password) {
          return { success: false, error: "Incorrect password for this demo account." };
        }
        persistUser(customUser);
        return { success: true, user: customUser };
      }
    } catch {
      // fallback
    }

    return {
      success: false,
      error:
        "Account not recognized in demo mode. Please use 'student@alumnux.demo' (Student@123), 'alumni@alumnux.demo' (Alumni@123), or click one of the instant Demo Login buttons below.",
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
    const initials = data.fullName
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "AL";

    const newUser: DemoUser = {
      id: `demo-${Date.now()}`,
      email: data.email.trim().toLowerCase(),
      fullName: data.fullName.trim(),
      role: data.role,
      department: data.department || (data.role === "student" ? "Computer Science & Engineering" : "Information Technology"),
      graduationYear: data.graduationYear || (data.role === "student" ? 2026 : 2019),
      initials,
      bio: `Newly registered demo ${data.role} profile. Ready to explore Alumnux connections.`,
      skills: ["General Engineering", "Problem Solving", "Networking"],
      company: data.role === "alumni" ? "Independent Tech Alum" : undefined,
      roleTitle: data.role === "alumni" ? "Software Engineer" : undefined,
    };

    // Store custom registered user in localStorage for demo reuse
    try {
      localStorage.setItem(`alumnux_registered_${newUser.email}`, JSON.stringify({ ...newUser, passwordHash: data.password }));
    } catch (e) {
      console.warn("Storage quota exceeded", e);
    }

    persistUser(newUser);
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
