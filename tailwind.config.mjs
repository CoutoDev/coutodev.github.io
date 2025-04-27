/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'atkinson': ['Atkinson', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        'mightyline': ['Mightyline', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      colors: {
        green: {
          400: '#59F22E',
          500: '#4AD926',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')({
      className: 'prose',
      modifiers: ['invert', 'green'],
    }),
  ],
} 