/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // This ensures 'Plus Jakarta Sans' is the primary font across the app
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        // Deep 'Cosy' neutrals for the background and UI
        zinc: {
          950: '#09090b',
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'node-breathing': 'nodePulse 4s ease-in-out infinite',
      },
      keyframes: {
        nodePulse: {
          '0%, 100%': { 
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(255, 255, 255, 0.1)' 
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.15)',
            borderColor: 'rgba(255, 255, 255, 0.3)' 
          },
        }
      },
      backdropBlur: {
        '2xl': '40px',
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"), // This plugin makes the 'animate-in' classes work
  ],
}
