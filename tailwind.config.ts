import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1B3A4B',
          light: '#2D5F7C',
          dark: '#0F2634',
          50: '#EEF4F7',
          100: '#D4E4EB',
          200: '#A9C9D7',
          500: '#1B3A4B',
          600: '#153347',
          700: '#0F2634',
          800: '#0A1A24',
          900: '#050D12',
        },
        accent: {
          DEFAULT: '#E8A838',
          light: '#F0C060',
          dark: '#C88B20',
          50: '#FDF5E6',
          100: '#FAE6BF',
          200: '#F5D08A',
          500: '#E8A838',
          600: '#D49528',
          700: '#B07A18',
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          150: '#EEEEEE',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        heading: ['var(--font-poppins)', 'sans-serif'],
        body: ['var(--font-poppins)', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
