/**
 * JSON-LD parçaları — sayfalar kendi @graph'larını bu yardımcılarla kurar.
 * Organization tam tanımı ana sayfada; alt sayfalar ona @id ile bağlanır.
 */
import { site } from '../data/site';
import type { Faq } from '../data/faq';
import type { Lang } from '../i18n';
import { t } from '../i18n';

export const ORG_ID = `${site.url}/#organization`;
export const WEBSITE_ID = `${site.url}/#website`;

/** Hizmet bölgesi: Türkiye'nin tüm illeri + Avrupa (Avrupa'da baskı yok, bkz. data/site.ts). */
export const areaServed = (lang: Lang) =>
  [
    { '@type': 'Country', name: 'Türkiye' },
    { '@type': 'Continent', name: lang === 'tr' ? 'Avrupa' : 'Europe' },
  ] as const;

export const abs = (path: string) => new URL(path, site.url).href;

export const faqPage = (lang: Lang, url: string, items: Faq[]) => ({
  '@type': 'FAQPage',
  '@id': `${url}#${t(lang).anchors.faq}`,
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
});

export const breadcrumbList = (url: string, items: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  '@id': `${url}#breadcrumb`,
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: abs(item.path),
  })),
});

export const jsonLd = (graph: object[]) => JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
