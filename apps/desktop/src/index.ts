/**
 * Alumnux Desktop Application Foundation
 * Future Tauri v2 wrapper integration consuming @alumnux/api-client and @alumnux/ui-tokens.
 */

import { createApiClient } from "@alumnux/api-client";
import type { HealthCheckResponse } from "@alumnux/types";

export interface DesktopAppConfig {
  apiUrl: string;
}

export function initDesktopClient(config: DesktopAppConfig) {
  const client = createApiClient({
    baseUrl: config.apiUrl,
  });

  return {
    client,
    checkConnection: async (): Promise<HealthCheckResponse> => {
      return client.health();
    },
  };
}
