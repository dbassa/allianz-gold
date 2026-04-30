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
          DEFAULT: '#0C0C0E',   // negro mate, quasi sense blau
          soft: '#161E26',       // gris carbonell profund
        },
        petroleum: {
          DEFAULT: '#162D3A',   // blau petroli fosc
          soft: '#1E3D4F',       // blau petroli mitj
        },
        paper: '#F4F0E8',        // blanc trencat, càlid
        bone: '#E3DDD1',         // beix suau
        champagne: {
          DEFAULT: '#9C8660',   // or envellit, mat
          soft: '#B5A07C',       // or xampany, apagat
          pale: '#CFC0A4',       // reflex molt subtil
        },
        rule: '#1E3040',         // separador petroli fosc
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
