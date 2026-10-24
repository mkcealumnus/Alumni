/**
 * ALUMNUX DESIGN SYSTEM: REFINED NANO-BRUTALISM TOKENS
 *
 * Principles:
 * - Editorial minimalism, precise geometry, restrained 1px borders
 * - Clean typography, functional layouts, purposeful whitespace
 * - No thick cartoon outlines, no exaggerated drop-shadows, no glassmorphism
 */

export const TOKENS = {
  colors: {
    pageBg: "#F8F8F5",
    surface: "#FFFFFF",
    textPrimary: "#171717",
    textSecondary: "#666660",
    border: "#D8D8D2",
    borderFocus: "#171717",
    accent: "#3157D5",
    accentHover: "#2647B8",
    accentSubtle: "#EEF2FF",
    semantic: {
      success: "#16A34A",
      successSubtle: "#F0FDF4",
      successBorder: "#BBF7D0",
      warning: "#D97706",
      warningSubtle: "#FFFBEB",
      warningBorder: "#FDE68A",
      error: "#DC2626",
      errorSubtle: "#FEF2F2",
      errorBorder: "#FECACA",
    },
  },
  geometry: {
    borderWidth: "1px",
    radii: {
      none: "0px",
      sm: "4px",
      md: "6px",
      lg: "8px",
    },
  },
  transitions: {
    fast: "150ms ease-in-out",
    standard: "200ms ease-in-out",
  },
  typography: {
    sans: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
} as const;

export type DesignTokens = typeof TOKENS;
