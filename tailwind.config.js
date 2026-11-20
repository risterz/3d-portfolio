/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--surface-canvas)',
        ink: {
          DEFAULT: 'var(--ink-primary)',
          muted: 'var(--ink-muted)',
          inverted: 'var(--ink-on-inverted)',
        },
        crimson: {
          DEFAULT: 'var(--raw-crimson-500)',
          brand: 'var(--raw-crimson-400)',
          bright: 'var(--raw-crimson-300)',
        },
      },
      fontFamily: {
        display: ['Clash Display', 'var(--font-jakarta)', 'sans-serif'],
        editorial: ['var(--font-jakarta)', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        media: 'var(--radius-xl)',
        pill: 'var(--radius-pill)',
        drawer: 'var(--radius-md)',
      },
      transitionTimingFunction: {
        quart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
      },
    },
  },
  plugins: [],
}
