// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwind from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://coutodev.github.io',
  integrations: [mdx(), sitemap(), react()],

  redirects: {
    '/': '/blog',
  },

  vite: {
    plugins: [tailwind()]
  }
});