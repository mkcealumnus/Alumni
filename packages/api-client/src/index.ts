import type {
  ApiErrorResponse,
  ApiSuccessResponse,
  HealthCheckResponse,
  AuthResponse,
  AuthTokens,
  AuthenticatedUser,
  UserProfile,
  SignupRequest,
  LoginRequest,
  UpdateProfileRequest,
  PublicDirectoryUser,
  DirectoryQueryParams,
  MentorshipRequest,
} from "@alumnux/types";

export interface TokenStorageAdapter {
  getAccessToken(): string | null | Promise<string | null>;
  setAccessToken(token: string | null): void | Promise<void>;
  getRefreshToken(): string | null | Promise<string | null>;
  setRefreshToken(token: string | null): void | Promise<void>;
  clear(): void | Promise<void>;
}

export class InMemoryTokenStorageAdapter implements TokenStorageAdapter {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  getAccessToken(): string | null {
    return this.accessToken;
  }
  setAccessToken(token: string | null): void {
    this.accessToken = token;
  }
  getRefreshToken(): string | null {
    return this.refreshToken;
  }
  setRefreshToken(token: string | null): void {
    this.refreshToken = token;
  }
  clear(): void {
    this.accessToken = null;
    this.refreshToken = null;
  }
}

export interface ApiClientConfig {
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
  timeoutMs?: number;
  tokenStorage?: TokenStorageAdapter;
  onUnauthorized?: () => void;
}

export class ApiClientError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly details?: unknown;

  constructor(status: number, message: string, code = "API_ERROR", details?: unknown) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export class AlumnuxApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;
  private timeoutMs: number;
  public readonly tokenStorage: TokenStorageAdapter;
  private onUnauthorized?: () => void;
  private activeRefreshPromise: Promise<AuthTokens> | null = null;

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/+$/, "");
    this.defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...config.defaultHeaders,
    };
    this.timeoutMs = config.timeoutMs ?? 15000;
    this.tokenStorage = config.tokenStorage || new InMemoryTokenStorageAdapter();
    this.onUnauthorized = config.onUnauthorized;
  }

  public setBaseUrl(url: string): void {
    this.baseUrl = url.replace(/\/+$/, "");
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    isRetry = false
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

    const headers: Record<string, string> = {
      ...this.defaultHeaders,
      ...(options.headers as Record<string, string>),
    };

    const token = await this.tokenStorage.getAccessToken();
    if (token && !headers["Authorization"]) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle 401 Unauthorized for authenticated endpoints (avoid infinite loop on /auth endpoints)
      if (
        response.status === 401 &&
        !isRetry &&
        !endpoint.includes("/v1/auth/login") &&
        !endpoint.includes("/v1/auth/signup") &&
        !endpoint.includes("/v1/auth/refresh")
      ) {
        const refreshToken = await this.tokenStorage.getRefreshToken();
        if (refreshToken) {
          try {
            await this.refreshTokensConcurrently(refreshToken);
            return this.request<T>(endpoint, options, true);
          } catch (refreshErr) {
            await this.tokenStorage.clear();
            if (this.onUnauthorized) {
              this.onUnauthorized();
            }
            throw refreshErr;
          }
        } else {
          await this.tokenStorage.clear();
          if (this.onUnauthorized) {
            this.onUnauthorized();
          }
        }
      }

      const contentType = response.headers.get("content-type");
      const isJson = contentType && contentType.includes("application/json");
      const body = isJson ? await response.json() : await response.text();

      if (!response.ok) {
        if (isJson && typeof body === "object" && body !== null) {
          const errBody = body as Partial<ApiErrorResponse>;
          const message = errBody.error?.message || response.statusText || "Request failed";
          const code = errBody.error?.code || `HTTP_${response.status}`;
          throw new ApiClientError(response.status, message, code, errBody.error?.details);
        }
        throw new ApiClientError(
          response.status,
          typeof body === "string" && body.length > 0 ? body : response.statusText,
          `HTTP_${response.status}`
        );
      }

      return body as T;
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      if (err instanceof ApiClientError) {
        throw err;
      }
      if (err instanceof Error && err.name === "AbortError") {
        throw new ApiClientError(408, "Request timed out", "TIMEOUT_ERROR");
      }
      const message = err instanceof Error ? err.message : "Network error";
      throw new ApiClientError(0, message, "NETWORK_ERROR", err);
    }
  }

  // Refresh Coordination: Avoid races by sharing a single in-flight promise
  private async refreshTokensConcurrently(refreshToken: string): Promise<AuthTokens> {
    if (this.activeRefreshPromise) {
      return this.activeRefreshPromise;
    }

    this.activeRefreshPromise = (async () => {
      try {
        const res = await this.request<ApiSuccessResponse<AuthTokens>>(
          "/v1/auth/refresh",
          {
            method: "POST",
            body: JSON.stringify({ refreshToken }),
          },
          true
        );

        await this.tokenStorage.setAccessToken(res.data.accessToken);
        await this.tokenStorage.setRefreshToken(res.data.refreshToken);
        return res.data;
      } finally {
        this.activeRefreshPromise = null;
      }
    })();

    return this.activeRefreshPromise;
  }

  // Generic HTTP Methods
  public async get<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: "GET", headers });
  }

  public async post<T>(endpoint: string, body?: unknown, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: body !== undefined ? JSON.stringify(body) : undefined,
      headers,
    });
  }

  public async patch<T>(endpoint: string, body?: unknown, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: body !== undefined ? JSON.stringify(body) : undefined,
      headers,
    });
  }

  public async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE", headers });
  }

  // Health
  public async health(): Promise<HealthCheckResponse> {
    return this.get<HealthCheckResponse>("/health");
  }

  // Authentication Endpoints
  public async signup(data: SignupRequest): Promise<AuthResponse> {
    const res = await this.post<ApiSuccessResponse<AuthResponse>>("/v1/auth/signup", data);
    await this.tokenStorage.setAccessToken(res.data.tokens.accessToken);
    await this.tokenStorage.setRefreshToken(res.data.tokens.refreshToken);
    return res.data;
  }

  public async login(data: LoginRequest): Promise<AuthResponse> {
    const res = await this.post<ApiSuccessResponse<AuthResponse>>("/v1/auth/login", data);
    await this.tokenStorage.setAccessToken(res.data.tokens.accessToken);
    await this.tokenStorage.setRefreshToken(res.data.tokens.refreshToken);
    return res.data;
  }

  public async refresh(refreshToken?: string): Promise<AuthTokens> {
    const token = refreshToken || (await this.tokenStorage.getRefreshToken());
    if (!token) {
      throw new ApiClientError(401, "No refresh token available", "NO_REFRESH_TOKEN");
    }
    return this.refreshTokensConcurrently(token);
  }

  public async logout(): Promise<void> {
    const refreshToken = await this.tokenStorage.getRefreshToken();
    try {
      await this.post("/v1/auth/logout", { refreshToken });
    } finally {
      await this.tokenStorage.clear();
    }
  }

  public async logoutAll(): Promise<{ revokedCount: number; message: string }> {
    try {
      const res = await this.post<ApiSuccessResponse<{ revokedCount: number; message: string }>>(
        "/v1/auth/logout-all"
      );
      return res.data;
    } finally {
      await this.tokenStorage.clear();
    }
  }

  public async getMe(): Promise<{ user: AuthenticatedUser; profile: UserProfile }> {
    const res = await this.get<ApiSuccessResponse<{ user: AuthenticatedUser; profile: UserProfile }>>(
      "/v1/auth/me"
    );
    return res.data;
  }

  public async updateMe(
    data: UpdateProfileRequest
  ): Promise<{ user: AuthenticatedUser; profile: UserProfile }> {
    const res = await this.patch<ApiSuccessResponse<{ user: AuthenticatedUser; profile: UserProfile }>>(
      "/v1/auth/me",
      data
    );
    return res.data;
  }

  // Directory Endpoints
  public async getDirectory(
    params?: DirectoryQueryParams
  ): Promise<ApiSuccessResponse<PublicDirectoryUser[]>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", String(params.page));
    if (params?.limit) searchParams.set("limit", String(params.limit));
    if (params?.query) searchParams.set("query", params.query);
    if (params?.department) searchParams.set("department", params.department);
    if (params?.graduationYear) searchParams.set("graduationYear", String(params.graduationYear));
    if (params?.role) searchParams.set("role", params.role);

    const queryStr = searchParams.toString();
    const endpoint = `/v1/directory${queryStr ? `?${queryStr}` : ""}`;
    return this.get<ApiSuccessResponse<PublicDirectoryUser[]>>(endpoint);
  }

  // Mentorship Endpoints
  public async getMentorshipRequests(): Promise<MentorshipRequest[]> {
    const res = await this.get<ApiSuccessResponse<MentorshipRequest[]>>("/v1/mentorship/requests");
    return res.data;
  }

  public async createMentorshipRequest(data: {
    recipientId: string;
    topicId?: string;
    message: string;
  }): Promise<MentorshipRequest> {
    const res = await this.post<ApiSuccessResponse<MentorshipRequest>>(
      "/v1/mentorship/requests",
      data
    );
    return res.data;
  }

  public async updateMentorshipStatus(
    id: string,
    status: "ACCEPTED" | "DECLINED" | "CANCELLED"
  ): Promise<MentorshipRequest> {
    const res = await this.patch<ApiSuccessResponse<MentorshipRequest>>(
      `/v1/mentorship/requests/${id}/status`,
      { status }
    );
    return res.data;
  }
}

export function createApiClient(config: ApiClientConfig): AlumnuxApiClient {
  return new AlumnuxApiClient(config);
}
