/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#1E3A2B',
          dark: '#16291F',
          deep: '#122219',
          light: '#2C5238',
          mid: '#24452F',
        },
        leaf: {
          DEFAULT: '#3F6B45',
          light: '#4E7D52',
          olive: '#6E8F64',
        },
        sage: {
          DEFAULT: '#A9BFA0',
          light: '#CBD8C5',
          tint: '#E7EEDF',
        },
        cream: {
          DEFAULT: '#F6F1E7',
          paper: '#FFFDF8',
          sand: '#EDE6D6',
        },
        harvest: {
          DEFAULT: '#C08A2E',
          gold: '#E2C27D',
          dark: '#7A5410',
          light: '#F4E4C3',
        },
        clay: {
          DEFAULT: '#8B4A2B',
          light: '#A8693F',
          soft: '#F2D9C9',
          tint: '#FBEFE6',
        },
        ink: {
          DEFAULT: '#1F2420',
          muted: '#5B6359',
          line: '#DCD4C3',
        }
      },
      fontFamily: {
        sans: ['Manrope', 'Poppins', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Manrope', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
        hindi: ['"Noto Sans Devanagari"', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      }
    },
  },
  plugins: [],
}
