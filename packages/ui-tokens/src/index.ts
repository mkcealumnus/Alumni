/**
 * Framework-neutral Alumnux Design Tokens
 * Usable across Web (Tailwind/CSS), React Native, and Desktop (Tauri).
 */

export const colors = {
  page: "#F8F8F5",
  surface: "#FFFFFF",
  primary: {
    DEFAULT: "#171717",
    foreground: "#FFFFFF",
  },
  secondary: {
    DEFAULT: "#666660",
    foreground: "#171717",
  },
  border: "#D8D8D2",
  accent: {
    DEFAULT: "#3157D5",
    hover: "#2647B8",
    subtle: "#EEF2FF",
    foreground: "#FFFFFF",
  },
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
} as const;

export const radii = {
  none: 0,
  sm: 4,
  base: 6,
  md: 8,
  lg: 8, // Refined nano-brutalist ceiling: max 8px
  full: 9999,
} as const;

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
} as const;

export const typography = {
  fonts: {
    sans: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

export const breakpoints = {
  xs: 375,
  sm: 430,
  foldable: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1440,
  desktop: 1920,
} as const;

export const motion = {
  duration: {
    fast: 150,
    normal: 250,
    slow: 400,
  },
  easing: {
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  },
} as const;

export type Colors = typeof colors;
export type Radii = typeof radii;
export type Spacing = typeof spacing;
export type Typography = typeof typography;
