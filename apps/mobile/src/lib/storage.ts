import * as SecureStore from "expo-secure-store";
import type { TokenStorageAdapter } from "@alumnux/api-client";

const SECURE_REFRESH_KEY = "alumnux_mobile_refresh_token";

export class ExpoSecureTokenStorageAdapter implements TokenStorageAdapter {
  private inMemoryAccessToken: string | null = null;

  async getAccessToken(): Promise<string | null> {
    return this.inMemoryAccessToken;
  }

  async setAccessToken(token: string | null): Promise<void> {
    this.inMemoryAccessToken = token;
  }

  async getRefreshToken(): Promise<string | null> {
    try {
      const isAvailable = await SecureStore.isAvailableAsync();
      if (isAvailable) {
        return await SecureStore.getItemAsync(SECURE_REFRESH_KEY);
      }
      return null;
    } catch {
      return null;
    }
  }

  async setRefreshToken(token: string | null): Promise<void> {
    try {
      const isAvailable = await SecureStore.isAvailableAsync();
      if (isAvailable) {
        if (token) {
          await SecureStore.setItemAsync(SECURE_REFRESH_KEY, token);
        } else {
          await SecureStore.deleteItemAsync(SECURE_REFRESH_KEY);
        }
      }
    } catch {
      // Ignore secure storage errors in simulator/mock
    }
  }

  async clear(): Promise<void> {
    this.inMemoryAccessToken = null;
    try {
      const isAvailable = await SecureStore.isAvailableAsync();
      if (isAvailable) {
        await SecureStore.deleteItemAsync(SECURE_REFRESH_KEY);
      }
    } catch {
      // Ignore
    }
  }
}

export const mobileTokenStorage = new ExpoSecureTokenStorageAdapter();
