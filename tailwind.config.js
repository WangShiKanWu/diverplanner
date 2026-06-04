/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#effaff',
          100: '#dff4ff',
          200: '#b8e8ff',
          300: '#78d5ff',
          400: '#32bcf6',
          500: '#0aa0dd',
          600: '#0180bd',
          700: '#066696',
          800: '#0b557c',
          900: '#0f4868'
        },
        reef: {
          100: '#dbf7ef',
          500: '#20b99a',
          700: '#137864'
        },
        coral: {
          100: '#ffe6de',
          500: '#f2755d',
          700: '#bc4935'
        }
      },
      boxShadow: {
        soft: '0 14px 40px rgba(6, 102, 150, 0.12)'
      }
    },
  },
  plugins: [],
};
