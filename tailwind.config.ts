import type { Config } from "tailwindcss";

/**
 * Tailwind is configured *to the tokens* (src/styles/tokens.css = §19).
 * Every utility below resolves to a CSS var — there are no literal hex values
 * here and none are permitted in components. Editing a value happens in
 * tokens.css, never here.
 */
const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        petrol: {
          DEFAULT: "var(--petrol)",
          900: "var(--petrol-900)",
          700: "var(--petrol-700)",
          600: "var(--petrol-600)",
          500: "var(--petrol-500)",
        },
        fog: {
          DEFAULT: "var(--fog)",
          raised: "var(--fog-raised)",
          sunk: "var(--fog-sunk)",
        },
        saddle: "var(--saddle)",
        gold: {
          DEFAULT: "var(--gold)",
          hover: "var(--gold-hover)",
          press: "var(--gold-press)",
        },
        abyss: "var(--abyss)",
        horizon: "var(--horizon)",
        sand: "var(--sand)",
        ink: {
          DEFAULT: "var(--ink)",
          soft: "var(--ink-soft)",
          faint: "var(--ink-faint)",
        },
        line: {
          DEFAULT: "var(--line)",
          dark: "var(--line-dark)",
        },
        paper: {
          "on-dark": "var(--paper-on-dark)",
          soft: "var(--paper-soft)",
        },
        focus: "var(--focus)",
        success: "var(--success)",
        error: "var(--error)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      fontSize: {
        display: ["var(--t-display)", { lineHeight: "1.02", letterSpacing: "var(--track-display)" }],
        h1: ["var(--t-h1)", { lineHeight: "1.06", letterSpacing: "var(--track-h1)" }],
        h2: ["var(--t-h2)", { lineHeight: "1.12" }],
        h3: ["var(--t-h3)", { lineHeight: "1.2" }],
        lead: ["var(--t-lead)", { lineHeight: "1.5" }],
        body: ["var(--t-body)", { lineHeight: "1.6" }],
        small: ["var(--t-small)", { lineHeight: "1.5" }],
        eyebrow: ["var(--t-eyebrow)", { lineHeight: "1", letterSpacing: "var(--track-eyebrow)" }],
      },
      letterSpacing: {
        display: "var(--track-display)",
        h1: "var(--track-h1)",
        eyebrow: "var(--track-eyebrow)",
      },
      spacing: {
        s1: "var(--s-1)",
        s2: "var(--s-2)",
        s3: "var(--s-3)",
        s4: "var(--s-4)",
        s5: "var(--s-5)",
        s6: "var(--s-6)",
        s7: "var(--s-7)",
        s8: "var(--s-8)",
        s9: "var(--s-9)",
        s10: "var(--s-10)",
        s11: "var(--s-11)",
      },
      borderRadius: {
        sm: "var(--r-sm)",
        md: "var(--r-md)",
        lg: "var(--r-lg)",
      },
      boxShadow: {
        float: "var(--shadow-float)",
      },
      maxWidth: {
        content: "var(--content-max)",
        measure: "var(--measure-body)",
        lead: "var(--measure-lead)",
      },
      transitionTimingFunction: {
        calm: "var(--ease-calm)",
        horizon: "var(--ease-horizon)",
      },
      transitionDuration: {
        fast: "var(--dur-fast)",
        base: "var(--dur-base)",
        slow: "var(--dur-slow)",
        line: "var(--dur-line)",
      },
      backgroundImage: {
        "petrol-abyss": "linear-gradient(180deg, var(--petrol-700) 0%, var(--abyss) 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
