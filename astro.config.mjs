// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { routes } from './src/i18n/index.ts';

const SITE = 'https://onlinemenu-qr.com';

/** Sitemap'te her sayfaya dil karşılıkları (hreflang) — eşleme src/i18n'deki `routes` tablosundan. */
/** @param {string} url */
const alternateLinks = (url) => {
  const path = new URL(url).pathname;
  const pair = Object.values(routes).find((r) => r.tr === path || r.en === path);
  if (!pair) return undefined;
  return [
    { lang: 'tr', url: new URL(pair.tr, SITE).href },
    { lang: 'en', url: new URL(pair.en, SITE).href },
    { lang: 'x-default', url: new URL(pair.tr, SITE).href },
  ];
};

export default defineConfig({
  site: SITE,
  trailingSlash: 'ignore',
  // kvkk: taslak yasal metin, noindex — sitemap'te de yer almaz
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/kvkk'),
      serialize: (item) => ({ ...item, links: alternateLinks(item.url) }),
    }),
  ],
  build: {
    // CSP: script'ler dosya olarak çıksın, inline script sayısı minimumda kalsın.
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
    build: { assetsInlineLimit: 0 },
  },
});
