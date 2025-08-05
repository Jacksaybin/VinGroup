/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vinfast: {
          primary: '#0066CC',
          secondary: '#00AA44',
        }
      }
    },
  },
  plugins: [],
}
