/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        wiggle: 'wiggle 10s ease-in-out infinite',
      }
    },
    screens: {
      'sm': {'min': '220px', 'max': '767px'},
    
      'md': {'min': '768px', 'max': '1244px'},
    
      'lg': {'min': '1245px'},
    },
    
  },
  plugins: [],
}