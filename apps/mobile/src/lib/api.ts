import { createApiClient, AlumnuxApiClient } from "@alumnux/api-client";
import { mobileTokenStorage } from "./storage";

const configuredApiUrl = typeof process !== "undefined" ? process.env.EXPO_PUBLIC_API_URL : undefined;
if (!configuredApiUrl && !__DEV__) {
  throw new Error("EXPO_PUBLIC_API_URL must be configured for production mobile builds.");
}

export const mobileApi: AlumnuxApiClient = createApiClient({
  baseUrl: configuredApiUrl || "http://localhost:4000",
  tokenStorage: mobileTokenStorage,
});
