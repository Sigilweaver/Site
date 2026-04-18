/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        mystic: {
          900: '#0b0d12',
          800: '#121621',
          700: '#1c2230',
          600: '#2c3347',
          400: '#7a8499',
          200: '#d7dce8',
        },
        gold: {
          500: '#d4a24c',
          400: '#e4b866',
        },
      },
    },
  },
  plugins: [],
};
