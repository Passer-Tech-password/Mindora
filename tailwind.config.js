/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        deepPurple: "#24143D",
        primaryPurple: "#5B3FA8",
        brightPurple: "#6D3FE8",
        lavender: "#B9A5E8",
        softLavender: "#F0EAFB",
        offWhite: "#FCFAFF",
        softGold: "#D9B86C",
        brandText: "#211A2B",
        brandSecondaryText: "#766D80",
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(36, 20, 61, 0.15)",
        card: "0 8px 24px -8px rgba(91, 63, 168, 0.18)",
        glow: "0 20px 50px -20px rgba(109, 63, 232, 0.4)",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(20px, -30px) scale(1.08)" },
          "66%": { transform: "translate(-16px, 16px) scale(0.95)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.7s ease-out forwards",
        blob: "blob 14s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
