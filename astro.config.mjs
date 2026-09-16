// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://onlinemenu-qr.com',
  trailingSlash: 'ignore',
  integrations: [react(), sitemap()],
  build: {
    // CSP: script'ler dosya olarak çıksın, inline script sayısı minimumda kalsın.
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
    build: { assetsInlineLimit: 0 },
  },
});
