import type { Config } from 'tailwindcss'

/**
 * Every colour resolves to a CSS custom property defined in `src/index.css`,
 * so one set of utility classes renders correctly in both light and dark.
 * Channels are stored space-separated ("250 250 249") to keep `/opacity` working.
 */
const token = (name: string) => `rgb(var(${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: token('--bg'),
        surface: token('--surface'),
        elevated: token('--elevated'),
        line: token('--line'),
        fg: token('--fg'),
        muted: token('--muted'),
        accent: token('--accent'),
        'accent-contrast': token('--accent-contrast'),
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        hand: ['Caveat', 'ui-rounded', 'cursive'],
      },
      fontSize: {
        display: ['clamp(2.75rem, 7vw, 5.5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        headline: ['clamp(2rem, 4.5vw, 3.25rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        title: ['clamp(1.375rem, 2.4vw, 1.875rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
      },
      maxWidth: {
        content: '72rem',
        prose: '46rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        caret: {
          '0%, 45%': { opacity: '1' },
          '50%, 95%': { opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        caret: 'caret 1.1s step-end infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
