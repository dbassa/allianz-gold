import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './emails/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A1628',
          soft: '#1B2A3F',
        },
        paper: '#F7F4EE',
        bone: '#E8E2D5',
        champagne: {
          DEFAULT: '#B8985A',
          soft: '#D4B97D',
        },
        rule: '#2B3A52',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        'arabic-display': ['var(--font-arabic-display)', 'serif'],
        'arabic-sans': ['var(--font-arabic-sans)', 'sans-serif'],
      },
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        '8xl': ['6rem', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      maxWidth: {
        prose: '65ch',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 400ms cubic-bezier(0.22, 1, 0.36, 1)',
        'accordion-up': 'accordion-up 400ms cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('ar', '&:where(:lang(ar), [lang="ar"] *)');
      addVariant('rtl', '&:where([dir="rtl"], [dir="rtl"] *)');
    }),
  ],
};

export default config;
