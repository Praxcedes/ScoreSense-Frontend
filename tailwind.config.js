/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#050505", // Deepest black
        surface: "#111827",    // Card background
        primary: "#10b981",    // Emerald Green (Brand)
        secondary: "#34d399",  // Lighter Green
        muted: "#9ca3af",      // Gray text
        border: "#1f2937",     // Dark gray borders
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}