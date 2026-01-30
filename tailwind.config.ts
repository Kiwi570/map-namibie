import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Day mode
        day: {
          primary: '#B8602A',
          secondary: '#D4A853',
          background: '#F5EBD9',
          surface: '#FFFDF7',
          text: '#1A1814',
          'text-secondary': '#3D3428',
          'text-muted': '#8B7355',
        },
        // Night mode
        night: {
          primary: '#E8C872',
          secondary: '#C9956C',
          background: '#0D1117',
          surface: '#161B22',
          text: '#F0E6D3',
          'text-secondary': '#8B949E',
          'text-muted': '#484F58',
        },
        // Location colors
        safari: {
          orange: '#B8602A',
          gold: '#D4A853',
          sand: '#C9956C',
          green: '#4A7C59',
          blue: '#4682B4',
          red: '#A0522D',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        accent: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      animation: {
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
