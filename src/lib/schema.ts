/**
 * JSON-LD parçaları — sayfalar kendi @graph'larını bu yardımcılarla kurar.
 * Organization tam tanımı ana sayfada; alt sayfalar ona @id ile bağlanır.
 */
import { site } from '../data/site';
import type { Faq } from '../data/faq';

export const ORG_ID = `${site.url}/#organization`;
export const WEBSITE_ID = `${site.url}/#website`;

// TEYİT: Hizmet verilen bölge — şimdilik Türkiye geneli. Yalnız belli şehirler ise daraltılmalı.
export const areaServed = { '@type': 'Country', name: 'Türkiye' } as const;

export const abs = (path: string) => new URL(path, site.url).href;

export const faqPage = (url: string, items: Faq[]) => ({
  '@type': 'FAQPage',
  '@id': `${url}#sss`,
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
