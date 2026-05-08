/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        manila: {
          DEFAULT: "#e6d4a3",
          light: "#f0e2bb",
          edge: "#c8b070",
        },
        cream: "#f6ecd2",
        paper: {
          DEFAULT: "#faf3df",
          shadow: "#e8dca8",
        },
        wine: {
          DEFAULT: "#7a1f1f",
          deep: "#4a0f0f",
        },
        amber: {
          DEFAULT: "#c97614",
          deep: "#8b4f08",
        },
        teal: {
          DEFAULT: "#0d5d5d",
          deep: "#073838",
        },
        classified: "#c0322a",
        ink: {
          DEFAULT: "#1a1612",
          soft: "#2c2620",
        },
        pencil: "#4a423a",
        redacted: "#0c0a08",
        pinkfile: {
          DEFAULT: "#b8456e",
          soft: "#d97b9b",
        },
      },
      fontFamily: {
        display: ["Anton", "Bebas Neue", "Special Elite", "sans-serif"],
        stencil: ["Bebas Neue", "Special Elite", "sans-serif"],
        mono: ["IBM Plex Mono", "Courier New", "monospace"],
        typewriter: ["Special Elite", "Courier Prime", "monospace"],
        serif: ["Playfair Display", "EB Garamond", "serif"],
      },
      boxShadow: {
        case: "6px 6px 0 var(--ink)",
        "case-lg": "10px 10px 0 var(--ink)",
        "case-double": "10px 10px 0 var(--ink), 14px 14px 0 var(--wine)",
      },
    },
  },
  plugins: [],
};
