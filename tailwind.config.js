/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          950: '#020f0f',
          900: '#041a1a',
          800: '#073333',
          700: '#0a4d4d',
          600: '#0d6666',
          500: '#108080',
          400: '#14a0a0',
        },
        gold: {
          300: '#fde68a',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        cream: '#fdf6e3',
      },
      fontFamily: {
        arabic: ['Scheherazade New', 'serif'],
        display: ['Cormorant Garamond', 'serif'],
        body: ['Raleway', 'sans-serif'],
      },
      animation: {
        sway: 'sway 3s ease-in-out infinite',
        'sway-slow': 'sway 4.5s ease-in-out infinite',
        'fade-up': 'fadeUp 1.2s ease forwards',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
        'moon-rise': 'moonRise 1.8s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        sway: {
          '0%,100%': { transform: 'rotate(-6deg)' },
          '50%': { transform: 'rotate(6deg)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%,100%': { filter: 'drop-shadow(0 0 8px #fbbf24aa)' },
          '50%': { filter: 'drop-shadow(0 0 22px #fbbf24ff)' },
        },
        moonRise: {
          '0%': { opacity: '0', transform: 'translateY(60px) scale(0.7)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

