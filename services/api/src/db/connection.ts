import mysql, { Pool, PoolConnection } from "mysql2/promise";
import { env } from "../config/env.js";

export interface QueryResult<T = unknown> {
  rows: T[];
  affectedRows: number;
  insertId?: number;
}

export interface IDatabaseClient {
  query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]>;
  execute(sql: string, params?: unknown[]): Promise<QueryResult>;
  transaction<T>(callback: (client: IDatabaseClient) => Promise<T>): Promise<T>;
  ping(): Promise<boolean>;
  close(): Promise<void>;
  isMock(): boolean;
}

// ---------------------------------------------------------------------------
// 1. In-Memory Mock Store for Automated Tests & Offline Development
// ---------------------------------------------------------------------------
class MockDatabaseClient implements IDatabaseClient {
  private users = new Map<string, Record<string, unknown>>();
  private profiles = new Map<string, Record<string, unknown>>();
  private sessions = new Map<string, Record<string, unknown>>();
  private mentorshipRequests = new Map<string, Record<string, unknown>>();

  isMock(): boolean {
    return true;
  }

  async ping(): Promise<boolean> {
    return true;
  }

  async close(): Promise<void> {
    this.users.clear();
    this.profiles.clear();
    this.sessions.clear();
    this.mentorshipRequests.clear();
  }

  async transaction<T>(callback: (client: IDatabaseClient) => Promise<T>): Promise<T> {
    return callback(this);
  }

  async query<T = unknown>(sql: string, params: unknown[] = []): Promise<T[]> {
    const cleanSql = sql.replace(/[`'"]/g, "").replace(/\s+/g, " ").trim().toUpperCase();

    // Health / Ping
    if (cleanSql.startsWith("SELECT 1")) {
      return [{ "1": 1 }] as unknown as T[];
    }

    // SELECT user by email
    if (cleanSql.includes("FROM USERS") && cleanSql.includes("EMAIL = ?")) {
      const email = String(params[0]).toLowerCase();
      for (const user of this.users.values()) {
        if (String(user.email).toLowerCase() === email) {
          return [user as unknown as T];
        }
      }
      return [];
    }

    // SELECT user by id
    if (cleanSql.includes("FROM USERS") && cleanSql.includes("ID = ?")) {
      const id = String(params[0]);
      const user = this.users.get(id);
      return user ? [user as unknown as T] : [];
    }

    // SELECT profile by user_id
    if (cleanSql.includes("FROM PROFILES") && cleanSql.includes("USER_ID = ?")) {
      const userId = String(params[0]);
      for (const profile of this.profiles.values()) {
        if (profile.user_id === userId) {
          return [profile as unknown as T];
        }
      }
      return [];
    }

    // SELECT session by refresh_token_hash
    if (cleanSql.includes("FROM AUTH_SESSIONS") && cleanSql.includes("REFRESH_TOKEN_HASH = ?")) {
      const hash = String(params[0]);
      for (const session of this.sessions.values()) {
        if (session.refresh_token_hash === hash) {
          return [session as unknown as T];
        }
      }
      return [];
    }

    // SELECT directory users with pagination & search
    if (cleanSql.includes("FROM USERS U JOIN PROFILES P")) {
      const results: Record<string, unknown>[] = [];
      for (const user of this.users.values()) {
        if (user.status !== "ACTIVE" && user.status !== "PENDING_VERIFICATION") continue;
        const profile = Array.from(this.profiles.values()).find((p) => p.user_id === user.id);
        if (!profile) continue;

        results.push({
          id: user.id,
          email: user.email,
          role: user.role,
          status: user.status,
          is_verified: user.is_verified,
          full_name: profile.full_name,
          headline: profile.headline,
          bio: profile.bio,
          department_code: profile.department_code,
          graduation_year: profile.graduation_year,
          current_company: profile.current_company,
          current_role: profile.current_role,
          location_city: profile.location_city,
          skills_json: profile.skills_json,
          avatar_url: profile.avatar_url,
          linkedin_url: profile.linkedin_url,
        });
      }
      return results as unknown as T[];
    }

    // SELECT mentorship requests for user
    if (cleanSql.includes("FROM MENTORSHIP_REQUESTS") && (cleanSql.includes("REQUESTER_ID = ?") || cleanSql.includes("RECIPIENT_ID = ?"))) {
      const userId = String(params[0]);
      const reqs: Record<string, unknown>[] = [];
      for (const r of this.mentorshipRequests.values()) {
        if (r.requester_id === userId || r.recipient_id === userId) {
          reqs.push(r);
        }
      }
      return reqs as unknown as T[];
    }

    // SELECT single mentorship request by id
    if (cleanSql.includes("FROM MENTORSHIP_REQUESTS") && cleanSql.includes("ID = ?")) {
      const id = String(params[0]);
      const req = this.mentorshipRequests.get(id);
      return req ? [req as unknown as T] : [];
    }

    return [];
  }

  async execute(sql: string, params: unknown[] = []): Promise<QueryResult> {
    const cleanSql = sql.replace(/[`'"]/g, "").replace(/\s+/g, " ").trim().toUpperCase();

    // INSERT INTO users
    if (cleanSql.startsWith("INSERT INTO USERS")) {
      const [id, email, passwordHash, role, status, isVerified] = params as [
        string,
        string,
        string,
        string,
        string,
        boolean
      ];

      // Check unique email
      for (const u of this.users.values()) {
        if (String(u.email).toLowerCase() === email.toLowerCase()) {
          const err = new Error("Duplicate entry for key 'email'");
          (err as unknown as { code: string }).code = "ER_DUP_ENTRY";
          throw err;
        }
      }

      this.users.set(id, {
        id,
        email: email.toLowerCase(),
        password_hash: passwordHash,
        role,
        status: status || "ACTIVE",
        is_verified: isVerified ?? false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      return { rows: [], affectedRows: 1 };
    }

    // INSERT INTO profiles
    if (cleanSql.startsWith("INSERT INTO PROFILES")) {
      const [
        id,
        userId,
        fullName,
        headline,
        bio,
        departmentCode,
        graduationYear,
        rollNumber,
        currentCompany,
        currentRole,
        experienceYears,
        locationCity,
        locationCountry,
        linkedinUrl,
        githubUrl,
        portfolioUrl,
        skillsJson,
      ] = params as [
        string,
        string,
        string,
        string | null,
        string | null,
        string,
        number,
        string | null,
        string | null,
        string | null,
        number,
        string | null,
        string | null,
        string | null,
        string | null,
        string | null,
        string | null
      ];

      this.profiles.set(id, {
        id,
        user_id: userId,
        full_name: fullName,
        headline,
        bio,
        department_code: departmentCode,
        graduation_year: graduationYear,
        rollNumber,
        current_company: currentCompany,
        current_role: currentRole,
        experience_years: experienceYears || 0,
        location_city: locationCity,
        location_country: locationCountry,
        linkedin_url: linkedinUrl,
        github_url: githubUrl,
        portfolio_url: portfolioUrl,
        skills_json: skillsJson,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      return { rows: [], affectedRows: 1 };
    }

    // UPDATE profiles
    if (cleanSql.startsWith("UPDATE PROFILES")) {
      const userId = String(params[params.length - 1]);
      for (const [id, prof] of this.profiles.entries()) {
        if (prof.user_id === userId) {
          const updated: Record<string, any> = { ...prof, updated_at: new Date().toISOString() };
          const setMatch = cleanSql.match(/SET (.+) WHERE USER_ID/i);
          if (setMatch) {
            const clauses = setMatch[1].split(",");
            let pIdx = 0;
            for (const clause of clauses) {
              const col = clause.split("=")[0].trim().toLowerCase();
              if (col !== "updated_at") {
                updated[col] = params[pIdx++];
              }
            }
          }
          this.profiles.set(id, updated as any);
          return { rows: [], affectedRows: 1 };
        }
      }
      return { rows: [], affectedRows: 0 };
    }

    // INSERT INTO auth_sessions
    if (cleanSql.startsWith("INSERT INTO AUTH_SESSIONS")) {
      const [id, userId, refreshTokenHash, expiresAt] = params as [
        string,
        string,
        string,
        string | Date
      ];

      this.sessions.set(id, {
        id,
        user_id: userId,
        refresh_token_hash: refreshTokenHash,
        expires_at: expiresAt instanceof Date ? expiresAt.toISOString() : expiresAt,
        revoked_at: null,
        replaced_by_session_id: null,
        created_at: new Date().toISOString(),
        last_used_at: new Date().toISOString(),
      });
      return { rows: [], affectedRows: 1 };
    }

    // UPDATE auth_sessions
    if (cleanSql.startsWith("UPDATE AUTH_SESSIONS")) {
      if (cleanSql.includes("WHERE USER_ID = ?")) {
        const userId = String(params[params.length - 1]);
        let count = 0;
        for (const [id, sess] of this.sessions.entries()) {
          if (sess.user_id === userId && !sess.revoked_at) {
            this.sessions.set(id, {
              ...sess,
              revoked_at: new Date().toISOString(),
            });
            count++;
          }
        }
        return { rows: [], affectedRows: count };
      }

      if (cleanSql.includes("WHERE ID = ?")) {
        const id = String(params[params.length - 1]);
        const sess = this.sessions.get(id);
        if (sess) {
          this.sessions.set(id, {
            ...sess,
            revoked_at: new Date().toISOString(),
            replaced_by_session_id: params[0] ? String(params[0]) : null,
          });
          return { rows: [], affectedRows: 1 };
        }
      }
    }

    // INSERT INTO mentorship_requests
    if (cleanSql.startsWith("INSERT INTO MENTORSHIP_REQUESTS")) {
      const [id, requesterId, recipientId, topicId, message, status] = params as [
        string,
        string,
        string,
        string | null,
        string,
        string
      ];

      this.mentorshipRequests.set(id, {
        id,
        requester_id: requesterId,
        recipient_id: recipientId,
        topic_id: topicId,
        message,
        status: status || "PENDING",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      return { rows: [], affectedRows: 1 };
    }

    // UPDATE mentorship_requests SET status
    if (cleanSql.startsWith("UPDATE MENTORSHIP_REQUESTS SET STATUS")) {
      const status = String(params[0]);
      const id = String(params[1]);
      const req = this.mentorshipRequests.get(id);
      if (req) {
        this.mentorshipRequests.set(id, {
          ...req,
          status,
          updated_at: new Date().toISOString(),
        });
        return { rows: [], affectedRows: 1 };
      }
    }

    return { rows: [], affectedRows: 0 };
  }
}

// ---------------------------------------------------------------------------
// 2. Real MySQL Pool Client (cPanel / Local MySQL)
// ---------------------------------------------------------------------------
class MySQLDatabaseClient implements IDatabaseClient {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  isMock(): boolean {
    return false;
  }

  async ping(): Promise<boolean> {
    try {
      const connection = await this.pool.getConnection();
      await connection.ping();
      connection.release();
      return true;
    } catch {
      return false;
    }
  }

  async close(): Promise<void> {
    await this.pool.end();
  }

  async query<T = unknown>(sql: string, params: unknown[] = []): Promise<T[]> {
    const [rows] = await this.pool.query(sql, params as any);
    return rows as T[];
  }

  async execute(sql: string, params: unknown[] = []): Promise<QueryResult> {
    const [result] = await this.pool.execute(sql, params as any);
    const res = result as { affectedRows?: number; insertId?: number };
    return {
      rows: [],
      affectedRows: res.affectedRows ?? 0,
      insertId: res.insertId,
    };
  }

  async transaction<T>(callback: (client: IDatabaseClient) => Promise<T>): Promise<T> {
    const connection: PoolConnection = await this.pool.getConnection();
    await connection.beginTransaction();

    const trxClient: IDatabaseClient = {
      isMock: () => false,
      ping: async () => true,
      close: async () => {},
      query: async <K = unknown>(sql: string, params: unknown[] = []): Promise<K[]> => {
        const [rows] = await connection.query(sql, params as any);
        return rows as K[];
      },
      execute: async (sql: string, params: unknown[] = []): Promise<QueryResult> => {
        const [result] = await connection.execute(sql, params as any);
        const res = result as { affectedRows?: number; insertId?: number };
        return {
          rows: [],
          affectedRows: res.affectedRows ?? 0,
          insertId: res.insertId,
        };
      },
      transaction: async <K>(subCb: (c: IDatabaseClient) => Promise<K>): Promise<K> => {
        return subCb(trxClient);
      },
    };

    try {
      const result = await callback(trxClient);
      await connection.commit();
      return result;
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }
}

// ---------------------------------------------------------------------------
// 3. Factory & Global Instance
// ---------------------------------------------------------------------------
let dbInstance: IDatabaseClient | null = null;

export function getDatabaseClient(): IDatabaseClient {
  if (dbInstance) {
    return dbInstance;
  }

  // In test environment or when configured for mock testing
  if (env.NODE_ENV === "test") {
    dbInstance = new MockDatabaseClient();
    return dbInstance;
  }

  try {
    const pool = mysql.createPool({
      host: env.DATABASE_HOST,
      port: env.DATABASE_PORT,
      user: env.DATABASE_USER,
      password: env.DATABASE_PASSWORD,
      database: env.DATABASE_NAME,
      waitForConnections: true,
      connectionLimit: env.DATABASE_CONNECTION_LIMIT,
      connectTimeout: env.DATABASE_CONNECT_TIMEOUT_MS,
      charset: "utf8mb4_unicode_ci",
    });

    dbInstance = new MySQLDatabaseClient(pool);
    return dbInstance;
  } catch (error) {
    // Safe logging without credentials
    console.warn("MySQL pool initialization failed. Falling back to test database provider.");
    dbInstance = new MockDatabaseClient();
    return dbInstance;
  }
}

export function setDatabaseClient(client: IDatabaseClient): void {
  dbInstance = client;
}
