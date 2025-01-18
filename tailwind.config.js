/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      colors: {
        green: {
          50: '#f0fdf4',
          // ... other shades
          900: '#14532d',
        },
        blue: {
          50: '#eff6ff',
          // ... other shades
          900: '#1e3a8a',
        },
        purple: {
          50: '#faf5ff',
          // ... other shades
          900: '#581c87',
        },
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-green-100',
    'bg-blue-100',
    'bg-purple-100',
    'text-green-600',
    'text-blue-600',
    'text-purple-600',
    'dark:bg-green-900/30',
    'dark:bg-blue-900/30',
    'dark:bg-purple-900/30',
    'dark:text-green-400',
    'dark:text-blue-400',
    'dark:text-purple-400',
  ],
};
