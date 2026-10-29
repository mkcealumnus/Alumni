import { v4 as uuidv4 } from "uuid";
import type {
  AuthResponse,
  AuthTokens,
  AuthenticatedUser,
  UserProfile,
} from "@alumnux/types";
import type {
  SignupInput,
  LoginInput,
  UpdateProfileInput,
} from "@alumnux/schemas";
import { AuthRepository, UserRow, ProfileRow } from "./auth.repository.js";
import { hashPassword, verifyPassword } from "../../utils/hash.js";
import { generateSecureToken, hashToken } from "../../utils/tokens.js";
import { signAccessToken } from "../../utils/jwt.js";
import { env } from "../../config/env.js";
import { getDepartmentByCode } from "@alumnux/domain";

export class AuthError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code = "AUTH_ERROR"
  ) {
    super(message);
    this.name = "AuthError";
  }
}

export class AuthService {
  constructor(private repo: AuthRepository = new AuthRepository()) {}

  private mapUser(row: UserRow): AuthenticatedUser {
    return {
      id: row.id,
      email: row.email,
      role: row.role,
      status: row.status,
      isVerified: Boolean(row.is_verified),
      createdAt: typeof row.created_at === "string" ? row.created_at : new Date(row.created_at).toISOString(),
    };
  }

  private mapProfile(row: ProfileRow, userRow: UserRow): UserProfile {
    const dept = getDepartmentByCode(row.department_code);
    let skills: string[] = [];
    if (row.skills_json) {
      try {
        skills = JSON.parse(row.skills_json);
      } catch {
        skills = [];
      }
    }

    return {
      id: row.id,
      email: userRow.email,
      fullName: row.full_name,
      avatarUrl: row.avatar_url || undefined,
      headline: row.headline || undefined,
      bio: row.bio || undefined,
      role: userRow.role,
      accountType: userRow.role === "ALUMNI" ? "alumni" : userRow.role === "ADMIN" ? "admin" : "student",
      departmentCode: row.department_code,
      departmentName: dept ? dept.name : row.department_code,
      graduationYear: row.graduation_year,
      rollNumber: row.roll_number || undefined,
      currentCompany: row.current_company || undefined,
      currentRole: row.current_role || undefined,
      experienceYears: row.experience_years,
      locationCity: row.location_city || undefined,
      locationCountry: row.location_country || undefined,
      linkedinUrl: row.linkedin_url || undefined,
      githubUrl: row.github_url || undefined,
      portfolioUrl: row.portfolio_url || undefined,
      skills,
      isVerified: Boolean(userRow.is_verified),
      createdAt: typeof row.created_at === "string" ? row.created_at : new Date(row.created_at).toISOString(),
      updatedAt: typeof row.updated_at === "string" ? row.updated_at : new Date(row.updated_at).toISOString(),
    };
  }

  private async generateTokens(userId: string, email: string, role: string): Promise<AuthTokens> {
    const accessToken = signAccessToken({ userId, email, role });
    const rawRefreshToken = generateSecureToken();
    const refreshTokenHash = hashToken(rawRefreshToken);

    const sessionId = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + env.REFRESH_TOKEN_TTL_DAYS);

    await this.repo.createSession({
      id: sessionId,
      userId,
      refreshTokenHash,
      expiresAt,
    });

    return {
      accessToken,
      refreshToken: rawRefreshToken,
      expiresIn: 900, // 15 minutes in seconds
      tokenType: "Bearer",
    };
  }

  async signup(input: SignupInput): Promise<AuthResponse> {
    const normalizedEmail = input.email.trim().toLowerCase();

    // Check if email already registered
    const existing = await this.repo.findUserByEmail(normalizedEmail);
    if (existing) {
      throw new AuthError(
        409,
        "An account with this email address already exists.",
        "EMAIL_ALREADY_EXISTS"
      );
    }

    const userId = uuidv4();
    const profileId = uuidv4();
    const passwordHash = await hashPassword(input.password);

    const userRecord = {
      id: userId,
      email: normalizedEmail,
      password_hash: passwordHash,
      role: input.role,
      status: "PENDING_VERIFICATION" as const,
      is_verified: false,
      email_verified_at: null,
    };

    const profileRecord = {
      id: profileId,
      user_id: userId,
      full_name: input.fullName.trim(),
      headline: input.currentRole ? `${input.currentRole} at ${input.currentCompany || "Company"}` : null,
      bio: input.bio || null,
      department_code: input.departmentCode,
      graduation_year: input.graduationYear,
      roll_number: input.rollNumber || null,
      current_company: input.currentCompany || null,
      current_role: input.currentRole || null,
      experience_years: 0,
      location_city: null,
      location_country: "India",
      linkedin_url: input.linkedinUrl || null,
      github_url: null,
      portfolio_url: null,
      skills_json: input.skills ? JSON.stringify(input.skills) : JSON.stringify(["Networking", "Career Growth"]),
    };

    await this.repo.createUserWithProfile(userRecord, profileRecord);

    const tokens = await this.generateTokens(userId, normalizedEmail, input.role);
    const userRow: UserRow = {
      ...userRecord,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const profRow: ProfileRow = {
      ...profileRecord,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    return {
      user: this.mapUser(userRow),
      profile: this.mapProfile(profRow, userRow),
      tokens,
    };
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    const normalizedEmail = input.email.trim().toLowerCase();
    const user = await this.repo.findUserByEmail(normalizedEmail);

    if (!user) {
      throw new AuthError(401, "Invalid email or password.", "INVALID_CREDENTIALS");
    }

    const isMatch = await verifyPassword(input.password, user.password_hash);
    if (!isMatch) {
      throw new AuthError(401, "Invalid email or password.", "INVALID_CREDENTIALS");
    }

    if (user.status === "SUSPENDED") {
      throw new AuthError(
        403,
        "This account has been suspended by administrators.",
        "ACCOUNT_SUSPENDED"
      );
    }

    const profile = await this.repo.findProfileByUserId(user.id);
    if (!profile) {
      throw new AuthError(500, "User profile not found.", "PROFILE_MISSING");
    }

    const tokens = await this.generateTokens(user.id, user.email, user.role);

    return {
      user: this.mapUser(user),
      profile: this.mapProfile(profile, user),
      tokens,
    };
  }

  async refresh(rawRefreshToken: string): Promise<AuthTokens> {
    if (!rawRefreshToken || typeof rawRefreshToken !== "string") {
      throw new AuthError(401, "Refresh token is required.", "REFRESH_TOKEN_REQUIRED");
    }

    const tokenHash = hashToken(rawRefreshToken.trim());
    const session = await this.repo.findSessionByTokenHash(tokenHash);

    if (!session) {
      throw new AuthError(401, "Invalid refresh session.", "INVALID_REFRESH_TOKEN");
    }

    // Reuse detection: if the session has already been revoked, revoke ALL user sessions
    if (session.revoked_at) {
      await this.repo.revokeAllUserSessions(session.user_id);
      throw new AuthError(
        401,
        "Refresh token reuse detected. All sessions have been terminated for security.",
        "REFRESH_TOKEN_REUSE"
      );
    }

    // Check expiration
    const expiryDate = new Date(session.expires_at);
    if (expiryDate.getTime() < Date.now()) {
      await this.repo.revokeSession(session.id);
      throw new AuthError(401, "Refresh session has expired.", "SESSION_EXPIRED");
    }

    const user = await this.repo.findUserById(session.user_id);
    if (!user || user.status === "SUSPENDED") {
      await this.repo.revokeSession(session.id);
      throw new AuthError(401, "User account is suspended or unavailable.", "ACCOUNT_UNAVAILABLE");
    }

    // Rotate: Generate new refresh token
    const newRawRefreshToken = generateSecureToken();
    const newRefreshTokenHash = hashToken(newRawRefreshToken);
    const newSessionId = uuidv4();

    const newExpiresAt = new Date();
    newExpiresAt.setDate(newExpiresAt.getDate() + env.REFRESH_TOKEN_TTL_DAYS);

    // Revoke old session and link to new session
    await this.repo.revokeSession(session.id, newSessionId);

    // Create new session
    await this.repo.createSession({
      id: newSessionId,
      userId: user.id,
      refreshTokenHash: newRefreshTokenHash,
      expiresAt: newExpiresAt,
    });

    const accessToken = signAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      accessToken,
      refreshToken: newRawRefreshToken,
      expiresIn: 900,
      tokenType: "Bearer",
    };
  }

  async logout(rawRefreshToken?: string): Promise<void> {
    if (rawRefreshToken) {
      const tokenHash = hashToken(rawRefreshToken.trim());
      const session = await this.repo.findSessionByTokenHash(tokenHash);
      if (session && !session.revoked_at) {
        await this.repo.revokeSession(session.id);
      }
    }
  }

  async logoutAll(userId: string): Promise<number> {
    return this.repo.revokeAllUserSessions(userId);
  }

  async getMe(userId: string): Promise<{ user: AuthenticatedUser; profile: UserProfile }> {
    const user = await this.repo.findUserById(userId);
    if (!user) {
      throw new AuthError(404, "User not found.", "USER_NOT_FOUND");
    }

    const profile = await this.repo.findProfileByUserId(userId);
    if (!profile) {
      throw new AuthError(404, "Profile not found.", "PROFILE_NOT_FOUND");
    }

    return {
      user: this.mapUser(user),
      profile: this.mapProfile(profile, user),
    };
  }

  async updateMe(
    userId: string,
    input: UpdateProfileInput
  ): Promise<{ user: AuthenticatedUser; profile: UserProfile }> {
    const user = await this.repo.findUserById(userId);
    if (!user) {
      throw new AuthError(404, "User not found.", "USER_NOT_FOUND");
    }

    const updates: Partial<ProfileRow> = {};
    if (input.fullName) updates.full_name = input.fullName;
    if (input.headline !== undefined) updates.headline = input.headline;
    if (input.bio !== undefined) updates.bio = input.bio;
    if (input.departmentCode) updates.department_code = input.departmentCode;
    if (input.graduationYear) updates.graduation_year = input.graduationYear;
    if (input.currentCompany !== undefined) updates.current_company = input.currentCompany;
    if (input.currentRole !== undefined) updates.current_role = input.currentRole;
    if (input.locationCity !== undefined) updates.location_city = input.locationCity;
    if (input.locationCountry !== undefined) updates.location_country = input.locationCountry;
    if (input.linkedinUrl !== undefined) updates.linkedin_url = input.linkedinUrl;
    if (input.githubUrl !== undefined) updates.github_url = input.githubUrl;
    if (input.portfolioUrl !== undefined) updates.portfolio_url = input.portfolioUrl;
    if (input.skills) updates.skills_json = JSON.stringify(input.skills);

    await this.repo.updateProfile(userId, updates);

    return this.getMe(userId);
  }
}
