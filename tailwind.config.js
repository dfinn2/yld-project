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
        'legal-yellow': '#FAFF03',
      },
      backgroundImage: {
        'legal-note': "repeating-linear-gradient(180deg, transparent, transparent 29px, red 29px, red 30px)",
      },
          },
    
    },
  

  
  plugins: [],
}