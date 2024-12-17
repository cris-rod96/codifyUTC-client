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

      boxShadow: {
        'green-available':
          '0 4px 6px -1px rgba(34, 197, 94, 0.5), 0 2px 4px -1px rgba(34, 197, 94, 0.3)', // Verde
        'red-unavailable':
          '0 4px 6px -1px rgba(239, 68, 68, 0.5), 0 2px 4px -1px rgba(239, 68, 68, 0.3)', // Rojo
      },
    },
  },
  plugins: [],
}
