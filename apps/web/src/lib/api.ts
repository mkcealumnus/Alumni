import {
  createApiClient,
  AlumnuxApiClient,
  TokenStorageAdapter,
} from "@alumnux/api-client";

const ACCESS_TOKEN_KEY = "alumnux_access_token";
const REFRESH_TOKEN_KEY = "alumnux_refresh_token";

export class WebTokenStorageAdapter implements TokenStorageAdapter {
  private inMemoryAccessToken: string | null = null;

  constructor() {
    try {
      this.inMemoryAccessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY) || localStorage.getItem(ACCESS_TOKEN_KEY);
    } catch {
      this.inMemoryAccessToken = null;
    }
  }

  getAccessToken(): string | null {
    return this.inMemoryAccessToken;
  }

  setAccessToken(token: string | null): void {
    this.inMemoryAccessToken = token;
    try {
      if (token) {
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
      } else {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        sessionStorage.removeItem(ACCESS_TOKEN_KEY);
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }

  getRefreshToken(): string | null {
    try {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    } catch {
      return null;
    }
  }

  setRefreshToken(token: string | null): void {
    try {
      if (token) {
        localStorage.setItem(REFRESH_TOKEN_KEY, token);
      } else {
        localStorage.removeItem(REFRESH_TOKEN_KEY);
      }
    } catch {
      // Ignore storage errors
    }
  }

  clear(): void {
    this.inMemoryAccessToken = null;
    try {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    } catch {
      // Ignore storage errors
    }
  }
}

export const webTokenStorage = new WebTokenStorageAdapter();

export const api: AlumnuxApiClient = createApiClient({
  baseUrl: (import.meta.env.VITE_API_URL as string) ||
    (import.meta.env.DEV ? "http://localhost:4000" : window.location.origin),
  tokenStorage: webTokenStorage,
});
