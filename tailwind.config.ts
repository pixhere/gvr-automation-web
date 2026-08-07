import type { Config } from "tailwindcss";

/**
 * GVR Automation Design System
 * Source of truth: GVR Product Blueprint v1.0 — Phase 0 (Development Constitution)
 * and Phase 1 (Foundation & Design System).
 *
 * Do not add colors, fonts, or radii outside this token set without
 * updating the Constitution first. See /DESIGN_SYSTEM.md for rationale.
 */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          // Revision #2: final brand palette per founder sign-off — a
          // friendlier slate blue (#29597B) instead of a near-black navy.
          // Full scale re-derived from that base (50-400 blend toward white,
          // 600-900 blend toward black), used everywhere the old navy was.
          DEFAULT: "#29597B",
          50: "#F2F5F7",
          100: "#DFE6EB",
          200: "#BFCDD7",
          300: "#9FB4C4",
          400: "#7493A9",
          // Revision #3: footer-specific ~12% lighten of the base navy, so the
          // footer reads a touch softer than the header/hero while staying
          // clearly "navy" (not jumping all the way to the 400 tint step).
          450: "#3F6989",
          500: "#29597B",
          600: "#234C69",
          700: "#1D3E56",
          800: "#173144",
          900: "#102431",
        },
        green: {
          DEFAULT: "#3BAE45",
          hover: "#32943B",
        },
        silver: "#D1D5DB",
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F7FAFC",
        },
        ink: {
          DEFAULT: "#263238",
          secondary: "#6B7280",
        },
        border: "#E6ECEF",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
      },
      fontFamily: {
        heading: ["Manrope", "Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        h1: ["72px", { lineHeight: "1.08", fontWeight: "800" }],
        "h1-mobile": ["44px", { lineHeight: "1.12", fontWeight: "800" }],
        h2: ["56px", { lineHeight: "1.12", fontWeight: "800" }],
        "h2-mobile": ["34px", { lineHeight: "1.16", fontWeight: "800" }],
        h3: ["40px", { lineHeight: "1.18", fontWeight: "700" }],
        "h3-mobile": ["28px", { lineHeight: "1.2", fontWeight: "700" }],
        h4: ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        "h4-mobile": ["24px", { lineHeight: "1.25", fontWeight: "700" }],
        body: ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        small: ["16px", { lineHeight: "1.55", fontWeight: "400" }],
        caption: ["14px", { lineHeight: "1.5", fontWeight: "500" }],
      },
      // Revision #4 root-cause fix: this block used to redefine spacing keys
      // "8"/"16"/"24"/"32"/"48"/"64"/"96" to literal pixel values equal to
      // their own key names (e.g. spacing-8 = 8px). That silently collided
      // with Tailwind's default rem-based scale for those exact numbers
      // (default spacing-8 is 2rem/32px, spacing-16 is 4rem/64px, spacing-96
      // is 24rem/384px, etc.), so every `mt-8`, `gap-8`, `p-8`, `h-8`,
      // `py-16`, `px-8`, `max-h-96`-style class anywhere in the codebase
      // rendered far smaller than the author obviously intended. This has
      // been the root cause of a recurring class of "cramped spacing" /
      // "clipped menu" / "invisible padding" bugs patched one-off across
      // three revisions (mobile nav menu height, trust bar gaps, hero score
      // badge size, timeline icon size, section padding, and — discovered in
      // this revision's full-site audit — button horizontal padding, footer
      // paragraph margins, pricing card grid gaps, and more). Removing this
      // override restores Tailwind's default scale for those keys, which
      // fixes every one of those instances at once without touching the
      // component files that were written assuming the standard scale.
      borderRadius: {
        btn: "16px",
        "btn-lg": "24px",
        card: "24px",
        "card-lg": "32px",
        input: "16px",
        modal: "24px",
        pill: "9999px",
      },
      maxWidth: {
        container: "1440px",
        prose: "70ch",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(11,31,58,0.06), 0 1px 1px rgba(11,31,58,0.04)",
        md: "0 8px 24px rgba(11,31,58,0.08), 0 2px 6px rgba(11,31,58,0.04)",
        lg: "0 24px 48px rgba(11,31,58,0.14), 0 8px 16px rgba(11,31,58,0.06)",
        xl: "0 32px 64px rgba(11,31,58,0.18), 0 12px 24px rgba(11,31,58,0.08)",
      },
      transitionDuration: {
        DEFAULT: "250ms",
        fast: "150ms",
        slow: "400ms",
      },
      keyframes: {
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 400ms ease-out",
        "slide-up": "slide-up 400ms ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
