import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        "surface-muted": "var(--color-surface-muted)",
        text: "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
        border: "var(--color-border)",
        sage: "var(--color-accent-sage)",
        clay: "var(--color-accent-clay)",
        mist: "var(--color-accent-mist)",
        focus: "var(--color-focus)"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"]
      },
      borderRadius: {
        xs: "2px",
        sm: "4px",
        md: "8px"
      },
      boxShadow: {
        soft: "0 8px 24px rgba(37, 37, 37, 0.06)",
        lift: "0 14px 36px rgba(37, 37, 37, 0.08)"
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 1, 0.36, 1)"
      }
    }
  },
  plugins: []
};

export default config;

