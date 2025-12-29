import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#06C755",
          dark: "#00B900",
        },
        accent: "#FF6B35",
        ui: {
          dark: "#1A1A1A",
          default: "#666666",
          soft: "#9CA3AF",
          light: "#D1D5DB",
          pale: "#F5F5F5",
        },
      },
    },
  },
  plugins: [],
};

export default config;
