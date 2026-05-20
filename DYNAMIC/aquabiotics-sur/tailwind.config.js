/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './src/locales/**/*.json'],
  theme: {
    extend: {
      colors: {
        coral: {
          DEFAULT: '#D9715A',
          light: '#F0A892',
          dark: '#A04030',
        },
        teal: {
          DEFAULT: '#3ABFB2',
          light: '#7ADBD3',
          dark: '#1E8C82',
        },
        navy: {
          DEFAULT: '#0A1628',
          mid: '#142236',
          light: '#1E3350',
        },
        lavender: {
          DEFAULT: '#7B7DC0',
          light: '#A9AADC',
        },
        steel: '#6B8FAB',
        cream: '#F7F3ED',
        'warm-white': '#FAFAF8',
        charcoal: '#1E1E2A',
        ocean: '#0A1628', /* fallback to map old classes to navy */
        emerald: '#3ABFB2', /* fallback to map old classes to teal */
        aqua: '#3ABFB2', /* fallback */
      },
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        mono: ['Space Mono', 'monospace'],
      },
      animation: {
        'wave': 'wave 8s ease-in-out infinite',
        'wave-slow': 'wave 12s ease-in-out infinite reverse',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        blob: "blob 7s infinite",
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateX(0) scaleY(1)' },
          '50%': { transform: 'translateX(-25px) scaleY(0.95)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" }
        }
      },
    },
  },
  plugins: [],
}
