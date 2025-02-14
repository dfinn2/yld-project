/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBackground: '#f8f9fa', // Light background color
        darkBackground: '#343a40', // Dark background color
        lightText: '#ffffff', // White text color
        darkText: '#000000', // Black text color
      },
    },
  },
  plugins: [],
}