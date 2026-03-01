import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#fafafa",
        card: "#ffffff",
        primary: "#7c3aed",
        secondary: "#3b82f6"
      },
      boxShadow: {
        soft: "0 8px 24px rgba(0,0,0,0.08)"
      }
    }
  },
  plugins: []
} satisfies Config;
