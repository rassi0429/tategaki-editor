/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      writingMode: {
        'vertical-rl': 'vertical-rl',
        'vertical-lr': 'vertical-lr',
        'horizontal-tb': 'horizontal-tb',
      },
      textOrientation: {
        'mixed': 'mixed',
        'upright': 'upright',
        'sideways': 'sideways',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.writing-mode-vertical-rl': {
          'writing-mode': 'vertical-rl',
        },
        '.writing-mode-vertical-lr': {
          'writing-mode': 'vertical-lr',
        },
        '.writing-mode-horizontal-tb': {
          'writing-mode': 'horizontal-tb',
        },
        '.text-orientation-mixed': {
          'text-orientation': 'mixed',
        },
        '.text-orientation-upright': {
          'text-orientation': 'upright',
        },
        '.text-orientation-sideways': {
          'text-orientation': 'sideways',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}