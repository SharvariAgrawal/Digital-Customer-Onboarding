/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#8B5CF6', // Vibrant purple
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        accent: {
          DEFAULT: '#0EA5E9', // Sky blue
          light: '#BAE6FD',
          dark: '#0369A1',
        },
        secondary: {
          DEFAULT: '#14B8A6', // Teal
          light: '#5EEAD4',
          dark: '#0F766E',
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
