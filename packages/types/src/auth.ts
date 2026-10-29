import type { UserProfile, UserRole } from "./user";

export type UserStatus = "ACTIVE" | "PENDING_VERIFICATION" | "SUSPENDED";

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: "Bearer";
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  isVerified: boolean;
  createdAt: string;
}

export interface AuthResponse {
  user: AuthenticatedUser;
  profile: UserProfile;
  tokens: AuthTokens;
}

export interface SignupRequest {
  email: string;
  password: string;
  fullName: string;
  role: "STUDENT" | "ALUMNI";
  departmentCode: string;
  graduationYear: number;
  rollNumber?: string;
  currentCompany?: string;
  currentRole?: string;
  linkedinUrl?: string;
  skills?: string[];
  bio?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshRequest {
  refreshToken?: string;
}

export interface UpdateProfileRequest {
  fullName?: string;
  headline?: string;
  bio?: string;
  departmentCode?: string;
  graduationYear?: number;
  currentCompany?: string;
  currentRole?: string;
  locationCity?: string;
  locationCountry?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  skills?: string[];
}

export interface PublicDirectoryUser {
  id: string;
  fullName: string;
  role: UserRole;
  departmentCode: string;
  departmentName: string;
  graduationYear: number;
  headline?: string;
  bio?: string;
  currentCompany?: string;
  currentRole?: string;
  locationCity?: string;
  skills: string[];
  avatarUrl?: string;
  linkedinUrl?: string;
  isVerified: boolean;
}

export interface DirectoryQueryParams {
  page?: number;
  limit?: number;
  query?: string;
  department?: string;
  graduationYear?: number;
  role?: "STUDENT" | "ALUMNI";
}
