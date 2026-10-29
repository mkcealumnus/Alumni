/**
 * ALUMNUX MOBILE — NANO-BRUTALIST DESIGN TOKENS
 * Strict, high-contrast, tactile editorial design system for native mobile.
 * Implements pure nano-brutalism with 4px spatial units and 2px ink borders.
 */

export const BRUTAL_COLORS = {
  // Surfaces & Backgrounds
  background: "#F7F6F2", // Warm ivory page background
  surface: "#FFFFFF",    // Pure white card / panel surface
  muted: "#E8E6DF",      // Putty / neutral card secondary surface
  ink: "#171717",        // Near-black text, borders, and hard shadows
  
  // Brand Accents
  accent: "#D7FF3F",     // Acid Lime / Chartreuse - iconic signature accent
  accentPressed: "#BEE82B",
  accentSubtle: "#F3FED1",

  // Typography
  textPrimary: "#171717",
  textSecondary: "#626262",
  textMuted: "#8C8A84",
  textInverse: "#FFFFFF",

  // Semantic Feedback
  success: "#C9F7A4",    // Pastel lime
  successInk: "#1B4706",
  warning: "#FFE29A",    // Pastel amber
  warningInk: "#523B00",
  danger: "#FF8C82",     // Pastel coral red
  dangerInk: "#59110B",
  info: "#BFE1FF",       // Pastel cyan
  infoInk: "#093863",

  // Role Badges
  roleStudent: "#C9F7A4",
  roleAlumni: "#D7FF3F",
  roleAdmin: "#FFE29A",

  // Uppercase Master Prompt Aliases
  BACKGROUND: "#F7F6F2",
  SURFACE: "#FFFFFF",
  MUTED: "#E8E6DF",
  INK: "#171717",
  ACCENT: "#D7FF3F",
  SECONDARY_TEXT: "#626262",
  SUCCESS: "#C9F7A4",
  WARNING: "#FFE29A",
  DANGER: "#FF8C82",
} as const;

export const BRUTAL_BORDERS = {
  width: 2,
  standard: 2,
  thin: 1.5,
  color: BRUTAL_COLORS.ink,
} as const;

export const BRUTAL_RADII = {
  sharp: 0,
  micro: 2,
  standard: 4,
  pill: 9999,
} as const;

export const BRUTAL_SHADOWS = {
  // Hard offset shadows with 0 blur
  sm: {
    shadowColor: BRUTAL_COLORS.ink,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  base: {
    shadowColor: BRUTAL_COLORS.ink,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  lg: {
    shadowColor: BRUTAL_COLORS.ink,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
  },
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  // Aliases for screen layouts
  subtle: {
    shadowColor: BRUTAL_COLORS.ink,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
  card: {
    shadowColor: BRUTAL_COLORS.ink,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
} as const;

export const BRUTAL_SPACING = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
} as const;

const TYPO_SIZES = {
  micro: 10,
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
} as const;

const TYPO_WEIGHTS = {
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
  heavy: "800" as const,
  black: "900" as const,
} as const;

export const BRUTAL_TYPOGRAPHY = {
  sizes: TYPO_SIZES,
  weights: TYPO_WEIGHTS,
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    tracked: 1.5,
  },
  // Flattened aliases for ergonomic screen styles
  micro: TYPO_SIZES.micro,
  xs: TYPO_SIZES.xs,
  sm: TYPO_SIZES.sm,
  base: TYPO_SIZES.base,
  lg: TYPO_SIZES.lg,
  xl: TYPO_SIZES.xl,
  "2xl": TYPO_SIZES["2xl"],
  "3xl": TYPO_SIZES["3xl"],
  "4xl": TYPO_SIZES["4xl"],
  regular: TYPO_WEIGHTS.regular,
  medium: TYPO_WEIGHTS.medium,
  semibold: TYPO_WEIGHTS.semibold,
  bold: TYPO_WEIGHTS.bold,
  heavy: TYPO_WEIGHTS.heavy,
  black: TYPO_WEIGHTS.black,
} as const;
