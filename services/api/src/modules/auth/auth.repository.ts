import { getDatabaseClient, IDatabaseClient } from "../../db/connection.js";
import type { UserRole, UserStatus } from "@alumnux/types";

export interface UserRow {
  id: string;
  email: string;
  password_hash: string;
  role: UserRole;
  status: UserStatus;
  is_verified: boolean | number;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProfileRow {
  id: string;
  user_id: string;
  full_name: string;
  headline: string | null;
  bio: string | null;
  department_code: string;
  graduation_year: number;
  roll_number: string | null;
  current_company: string | null;
  current_role: string | null;
  experience_years: number;
  location_city: string | null;
  location_country: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  portfolio_url: string | null;
  skills_json: string | null;
  avatar_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface SessionRow {
  id: string;
  user_id: string;
  refresh_token_hash: string;
  expires_at: string | Date;
  revoked_at: string | null;
  replaced_by_session_id: string | null;
  created_at: string;
  last_used_at: string | null;
}

export class AuthRepository {
  constructor(private db: IDatabaseClient = getDatabaseClient()) {}

  async findUserByEmail(email: string): Promise<UserRow | null> {
    const rows = await this.db.query<UserRow>(
      "SELECT * FROM `users` WHERE `email` = ? LIMIT 1;",
      [email.toLowerCase()]
    );
    return rows[0] || null;
  }

  async findUserById(id: string): Promise<UserRow | null> {
    const rows = await this.db.query<UserRow>(
      "SELECT * FROM `users` WHERE `id` = ? LIMIT 1;",
      [id]
    );
    return rows[0] || null;
  }

  async findProfileByUserId(userId: string): Promise<ProfileRow | null> {
    const rows = await this.db.query<ProfileRow>(
      "SELECT * FROM `profiles` WHERE `user_id` = ? LIMIT 1;",
      [userId]
    );
    return rows[0] || null;
  }

  async createUserWithProfile(
    user: Omit<UserRow, "created_at" | "updated_at">,
    profile: Omit<ProfileRow, "created_at" | "updated_at">
  ): Promise<void> {
    await this.db.transaction(async (trx) => {
      await trx.execute(
        `INSERT INTO \`users\` (\`id\`, \`email\`, \`password_hash\`, \`role\`, \`status\`, \`is_verified\`)
         VALUES (?, ?, ?, ?, ?, ?);`,
        [user.id, user.email, user.password_hash, user.role, user.status, user.is_verified ? 1 : 0]
      );

      await trx.execute(
        `INSERT INTO \`profiles\` (
          \`id\`, \`user_id\`, \`full_name\`, \`headline\`, \`bio\`,
          \`department_code\`, \`graduation_year\`, \`roll_number\`,
          \`current_company\`, \`current_role\`, \`experience_years\`,
          \`location_city\`, \`location_country\`, \`linkedin_url\`,
          \`github_url\`, \`portfolio_url\`, \`skills_json\`
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          profile.id,
          profile.user_id,
          profile.full_name,
          profile.headline || null,
          profile.bio || null,
          profile.department_code,
          profile.graduation_year,
          profile.roll_number || null,
          profile.current_company || null,
          profile.current_role || null,
          profile.experience_years || 0,
          profile.location_city || null,
          profile.location_country || "India",
          profile.linkedin_url || null,
          profile.github_url || null,
          profile.portfolio_url || null,
          profile.skills_json || null,
        ]
      );
    });
  }

  async createSession(session: {
    id: string;
    userId: string;
    refreshTokenHash: string;
    expiresAt: Date;
  }): Promise<void> {
    await this.db.execute(
      `INSERT INTO \`auth_sessions\` (\`id\`, \`user_id\`, \`refresh_token_hash\`, \`expires_at\`)
       VALUES (?, ?, ?, ?);`,
      [session.id, session.userId, session.refreshTokenHash, session.expiresAt]
    );
  }

  async findSessionByTokenHash(hash: string): Promise<SessionRow | null> {
    const rows = await this.db.query<SessionRow>(
      "SELECT * FROM `auth_sessions` WHERE `refresh_token_hash` = ? LIMIT 1;",
      [hash]
    );
    return rows[0] || null;
  }

  async revokeSession(id: string, replacedBySessionId?: string): Promise<void> {
    await this.db.execute(
      `UPDATE \`auth_sessions\`
       SET \`revoked_at\` = CURRENT_TIMESTAMP, \`replaced_by_session_id\` = ?
       WHERE \`id\` = ?;`,
      [replacedBySessionId || null, id]
    );
  }

  async revokeAllUserSessions(userId: string): Promise<number> {
    const res = await this.db.execute(
      `UPDATE \`auth_sessions\`
       SET \`revoked_at\` = CURRENT_TIMESTAMP
       WHERE \`user_id\` = ? AND \`revoked_at\` IS NULL;`,
      [userId]
    );
    return res.affectedRows;
  }

  async updateProfile(userId: string, fields: Partial<ProfileRow>): Promise<void> {
    const entries = Object.entries(fields).filter(([_, v]) => v !== undefined);
    if (entries.length === 0) return;

    const setClauses = entries.map(([k]) => `\`${k}\` = ?`).join(", ");
    const values = entries.map(([_, v]) => v);
    values.push(userId);

    await this.db.execute(
      `UPDATE \`profiles\` SET ${setClauses}, \`updated_at\` = CURRENT_TIMESTAMP WHERE \`user_id\` = ?;`,
      values
    );
  }
}
