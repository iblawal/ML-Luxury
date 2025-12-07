import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F6F1E9",
          light: "#F4EDE3",
        },
        brown: {
          deep: "#3C2F2F",
          DEFAULT: "#4A2E1F",
          warm: "#5A3E2B",
        },
        sandy: {
          DEFAULT: "#D8A878",
          brown: "#F4A460",
        },
        gray: {
          warm: "#6E6458",
        },
        background: "#F6F1E9",
        "background-alt": "#F4EDE3",
        text: {
          DEFAULT: "#3C2F2F",
          secondary: "#4A2E1F",
          light: "#5A3E2B",
        },
        accent: {
          DEFAULT: "#F4A460",
          secondary: "#D8A878",
        },
        border: "#6E6458",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 2px 15px rgba(60, 47, 47, 0.08)",
        medium: "0 4px 20px rgba(60, 47, 47, 0.12)",
        hard: "0 10px 40px rgba(60, 47, 47, 0.15)",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-in-delay": "fadeIn 0.8s ease-out 0.2s forwards",
        "fade-in-delay-2": "fadeIn 0.8s ease-out 0.4s forwards",
        float: "float 3s ease-in-out infinite",
        "float-delayed": "floatDelayed 4s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        floatDelayed: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;