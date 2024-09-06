import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'custom-gold': '#bdae7a',
        'deep-blue': '#0C3C60',
        'electric-blue': '#23B2EE',
        'sky-blue': '#87CEEB',
        'platinum': '#E5E4E2',
        'charcoal': '#36454F',
      },
    },
  },
  plugins: [],
};
export default config;
