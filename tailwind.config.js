const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        nasa: ['Nasalization'],
      },
      animation: {
        fall: 'fall 1.5s infinite ease-in',
      },
      keyframes: {
        fall: {
          '0%, 90%': { opacity: '1' },
          '100%': {
            opacity: '0',
            // 'transform': 'translateZ(0vmin) rotateY(90deg) rotateX(var(--rx)) translateZ(var(--x)) scaleX(6)',
            // 'transform': 'translateZ(0vmin)_rotateY(90deg)_rotateX(var(--rx))_translateZ(var(--x))_scaleX(6)',
            
            // transform: 'translateZ(0vmin)',
            // transform: 'rotateY(90deg)',
            // transform: 'rotateX(var(--rx))',
            // transform: 'translateZ(var(--x))',
            // transform: 'scaleX(6)',

            // transform: {
            //   translateZ: '0vmin',
            //   rotateY: '90deg',
            //   rotateX: 'var(--rx)',
            //   translateZ: 'var(--x)',
            //   scaleX: '6',
            // }
          }
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      addUtilities({
        '.text-decoration-none': {
          'text-decoration': 'none',
        }
      })
    })
  ],
}

