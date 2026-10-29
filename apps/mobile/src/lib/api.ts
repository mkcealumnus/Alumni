import { createApiClient, AlumnuxApiClient } from "@alumnux/api-client";
import { mobileTokenStorage } from "./storage";

export const mobileApi: AlumnuxApiClient = createApiClient({
  baseUrl: process.env.EXPO_PUBLIC_API_URL || "http://localhost:4000",
  tokenStorage: mobileTokenStorage,
});
