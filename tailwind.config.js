/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        redUTC: '#f60000',
        blueUTC: '#400085',
      },
      backgroundImage: {
        'gradient-UTC': 'linear-gradient(135deg, #f60000, #400085)',
      },
    },
  },
  plugins: [],
}
