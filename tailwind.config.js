const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './client/*.{css,html,tsx}',
    './imports/**/*.{tsx,html}',
    './node_modules/react-tailwind-table/dist/index.modern.js',
  ],
  theme: {
    transitionDuration: {
      DEFAULT: '322ms',
    },
    extend: {
      boxShadowColor: {
        DEFAULT: '#160116',
        xs: '#160116',
        sm: '#160116',
        md: '#160116',
        lg: '#160116',
        xl: '#160116',
        '2xl': '#160116',
        '3xl': '#160116',
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        blood: '#740110',
        brightblood: '#880110',
        crimson: '#440101',
        gold: '#f0d700',
        sapphire: '#0f52ba',
      },
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(0, 1fr))',
        'auto-fill': 'repeat(auto-fill, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        'auto-fit': 'repeat(auto-fit, minmax(0, 1fr))',
        'auto-fill': 'repeat(auto-fill, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
}
