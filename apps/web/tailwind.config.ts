import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      // 1. Mobile (6.1" to 6.3" Standard: iPhone 15, Pixel 8)
      xs: "375px",
      // 2. Mobile (6.7" to 6.8" Max / Ultra: Pro Max, S24 Ultra)
      sm: "430px",
      // 3. Mobile (7.6" to 8.0"+ Foldable: Galaxy Z Fold, Pixel Fold)
      foldable: "640px",
      // Tablet / Foldable open landscape
      md: "768px",
      // 4. Laptop (11.6" Compact/Budget: Chromebooks & Education)
      lg: "1024px",
      // 5. Laptop (13.0" to 13.3" Ultraportable: MacBook Air 13", Dell XPS 13)
      xl: "1280px",
      // 6. Laptop (14.0" The Modern Standard: MacBook Pro 14", ThinkPad)
      "2xl": "1440px",
      // 7. Laptop (15.6" Traditional Standard: Mid-range laptops)
      "3xl": "1536px",
      // 8. Laptop (16.0" Modern Powerhouse: MacBook Pro 16", Creator laptops)
      "4xl": "1680px",
      // 9 & 10. Laptop (17.3"-18.0" Desktop Replacement) & Monitor (21.5"-24.0" Baseline Desktop)
      desktop: "1920px",
      // 11. Monitor (27.0" The Sweet Spot 1440p / 4K scaled)
      qhd: "2560px",
      // 12. Monitor (32.0" Large Format 4K)
      large: "2880px",
      // 13. Monitor (34.0" to 38.0" Ultrawide 21:9: 3440x1440)
      ultrawide: "3440px",
      // 14. Monitor (49.0" Super Ultrawide 32:9: 5120x1440 Dual-QHD)
      superwide: "5120px",
    },
    extend: {
      maxWidth: {
        "8xl": "88rem",     // 1408px
        "9xl": "96rem",     // 1536px
        "10xl": "108rem",   // 1728px
        "desktop": "120rem", // 1920px
        "qhd": "160rem",     // 2560px
        "ultrawide": "215rem", // 3440px
        "superwide": "320rem", // 5120px
      },
      colors: {
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
          "success-subtle": "#F0FDF4",
          "success-border": "#BBF7D0",
          warning: "#D97706",
          "warning-subtle": "#FFFBEB",
          "warning-border": "#FDE68A",
          error: "#DC2626",
          "error-subtle": "#FEF2F2",
          "error-border": "#FECACA",
        },
      },
      borderRadius: {
        none: "0",
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "8px", // Refined nano-brutalist ceiling: max 8px
      },
      boxShadow: {
        none: "none",
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
