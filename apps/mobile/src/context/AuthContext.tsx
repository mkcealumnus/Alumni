import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { AuthenticatedUser, UserProfile, SignupRequest, LoginRequest } from "@alumnux/types";
import { mobileApi } from "../lib/api";
import { ApiClientError } from "@alumnux/api-client";

interface MobileAuthContextType {
  user: AuthenticatedUser | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<{ success: boolean; error?: string }>;
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
    try {
      const res = await mobileApi.login(credentials);
      setUser(res.user);
      setProfile(res.profile);
      return { success: true };
    } catch (err: unknown) {
      if (err instanceof ApiClientError) {
        return { success: false, error: err.message };
      }
      return { success: false, error: "Network error during login" };
    }
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
