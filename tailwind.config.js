/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a", // Deep black background
        surface: "#111827",    // Card background
        primary: "#10b981",    // Emerald Green (ScoreSense Brand)
        secondary: "#34d399",  // Lighter green for accents
        accent: "#064e3b",     // Dark green for backgrounds
        text: "#f3f4f6",       // White/Gray text
        muted: "#9ca3af",      // Muted text
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}