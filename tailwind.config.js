const { fontFamily } = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss');

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'aot',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/application/**/*.{js,ts,jsx,tsx}',
    './src/features/**/*.{js,ts,jsx,tsx}',
    './src/shared/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      spacing: {
        DEFAULT: '1rem',
        safe: 'env(safe-area-inset-bottom)',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', ...fontFamily.sans],
      },
      fontSize: {
        '3xs': '0.625rem',
        '2xs': '0.75rem',
        xs: '0.875rem',
        md: '1.375rem',
        '2md': '1.125rem',
        '3md': '1.25rem',
        lg: '1.75rem',
        '2lg': '1.625rem',
        '3lg': '1.5rem',
        '4lg': '2rem',
        '5lg': '3rem',
        xl: '2.5rem',
        '2xl': '3.75rem',
        '3xl': '4.635rem',
      },
      borderRadius: {
        '4xl': '3rem',
      },
      boxShadow: {
        popover: '0px 4px 15px rgba(10, 4, 29, 0.15);',
      },
      colors: {
        bg: {
          secondary: '#FFFFFF',
          tertiary: '#E9E4DE',
          primary: '#F6F3F0',
          quaternary: '#F6F6F6',
          inverse: {
            primary: '#2F2F2F',
            secondary: '#3A3A3A',
          },
        },
        content: {
          primary: '#121718',
          secondary: '#535657',
          tertiary: '#9E9EA7',
          inverse: '#FFFFFF',
          error: '#C03567',
          accent: {
            vivid: '#FF6422',
            DEFAULT: '#35C0B7',
          },
          golden: {
            DEFAULT: '#FDB600',
          },
        },
        border: {
          primary: '#D7D7D7',
          tertiary: 'rgba(215, 215, 215, 0.5)',
          active: '#0A041D',
        },
      },
    },
  },
  corePlugins: { aspectRatio: false },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    function ({ addUtilities }) {
      const hideScrollBar = {
        '.hide-scrollbar::-webkit-scrollbar': {
          display: 'none',
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      };

      const overflowWrap = {
        '.overflow-wrap-anywhere': {
          'overflow-wrap': 'anywhere',
        },
      };

      const overflowScrolling = {
        '.overflow-scrolling-touch': {
          WebkitOverflowScrolling: 'touch',
        },
      };

      const scrollbarWidthNone = {
        '.scrollbar-width-none': {
          scrollbarWidth: 'none',
        },
      };

      addUtilities(hideScrollBar, ['responsive', 'hover']);
      addUtilities(overflowWrap, ['responsive', 'hover']);
      addUtilities(overflowScrolling, ['responsive', 'hover']);
      addUtilities(scrollbarWidthNone, ['responsive', 'hover']);
    },
  ],
};
