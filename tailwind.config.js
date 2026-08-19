/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Outfit"', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      colors: {
        whiskar: {
          magenta: '#e91e8c',
          pink: '#f472b6',
          light: '#fce7f3',
          cream: '#fff5f7',
          deep: '#d6127a',
          plum: '#1a0e14',
          night: '#0d0509',
        },
      },
    },
  },
  plugins: [],
}
