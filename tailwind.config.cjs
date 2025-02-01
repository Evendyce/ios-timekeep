/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enables class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ Ensure this is correct!
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1d1d1d", // Example primary color (change to your corporate color)
        secondary: "#0d9caf", // Example accent color
        accent: "#105B75", // Accent for Secondary
        background: "#E9E9E9", // Light background
        darkBackground: "#BBBDC0", // Dark mode background
      },
    },
  },
  plugins: [],
};