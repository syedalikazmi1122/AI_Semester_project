/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': {
          '50': '#e8f5e9',
          '100': '#c8e6c9',
          '200': '#a5d6a7',
          '300': '#81c784',
          '400': '#66bb6a',
          '500': '#4caf50',
          '600': '#43a047',
          '700': '#388e3c',
          '800': '#2e7d32',
          '900': '#1b5e20',
        },
        'secondary': {
          '50': '#e3f2fd',
          '100': '#bbdefb',
          '200': '#90caf9',
          '300': '#64b5f6',
          '400': '#42a5f5',
          '500': '#2196f3',
          '600': '#1e88e5',
          '700': '#1976d2',
          '800': '#1565c0',
          '900': '#0d47a1',
        },
        'accent': {
          '50': '#efebe9',
          '100': '#d7ccc8',
          '200': '#bcaaa4',
          '300': '#a1887f',
          '400': '#8d6e63',
          '500': '#795548',
          '600': '#6d4c41',
          '700': '#5d4037',
          '800': '#4e342e',
          '900': '#3e2723',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};