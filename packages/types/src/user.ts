export type UserId = string;

export type UserRole = "STUDENT" | "ALUMNI" | "ADMIN";

/**
 * Legacy lowercase representation for backward compatibility with the existing web app
 */
export type AccountType = "student" | "alumni" | "admin";

export interface UserIdentity {
  id: UserId;
  email: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Department {
  id: string;
  code: string;
  name: string;
}

export interface UserProfile {
  id: UserId;
  email: string;
  fullName: string;
  avatarUrl?: string;
  headline?: string;
  bio?: string;
  role: UserRole;
  accountType?: AccountType;
  departmentCode: string;
  departmentName: string;
  graduationYear: number;
  rollNumber?: string;
  currentCompany?: string;
  currentRole?: string;
  experienceYears?: number;
  locationCity?: string;
  locationCountry?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  skills: string[];
  isVerified: boolean;
  createdAt: string;
  updatedAt?: string;
}
