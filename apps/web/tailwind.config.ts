import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        base: '#0A0714',
        surface: '#120D22',
        panel: '#171129',
        line: 'rgba(255,255,255,0.08)',
        plasma: {
          purple: '#A855F7',
          cyan: '#06B6D4',
        },
        ink: '#F1EEFB',
        muted: '#9B93B5',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        blink: 'blink 1s step-start infinite',
      },
    },
  },
  plugins: [],
};

export default config;
