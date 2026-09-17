/**
 * Dil altyapısı — Türkçe kökte, İngilizce /en/ altında.
 *
 * Dil sayfanın adresinden okunur (`langOf(Astro.url)`); bileşenlere prop olarak
 * taşınmaz. Karşılık sayfalar `routes` tablosunda eşlenir: hreflang, dil seçici
 * ve sitemap alternatifleri buradan üretilir.
 */

export const langs = ['tr', 'en'] as const;
export type Lang = (typeof langs)[number];
export const defaultLang: Lang = 'tr';

/** <html lang>, JSON-LD inLanguage, og:locale. */
export const locale = {
  tr: { html: 'tr', bcp47: 'tr-TR', og: 'tr_TR' },
  en: { html: 'en', bcp47: 'en', og: 'en_GB' },
} as const satisfies Record<Lang, { html: string; bcp47: string; og: string }>;

/** Birbirinin karşılığı olan sayfalar. Sonda / ile — canonical ve sitemap ile aynı. */
export const routes = {
  home: { tr: '/', en: '/en/' },
  qrMenu: { tr: '/qr-menu/', en: '/en/qr-menu/' },
  nfc: { tr: '/nfc-google-yorum-standi/', en: '/en/nfc-google-review-stand/' },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;

const withSlash = (path: string) => (path.endsWith('/') ? path : `${path}/`);

export const langOf = (url: URL | string): Lang => {
  const path = typeof url === 'string' ? url : url.pathname;
  return path === '/en' || path.startsWith('/en/') ? 'en' : 'tr';
};

/** Adresin tüm dillerdeki karşılıkları; eşi olmayan sayfa (kvkk, 404) için null. */
export const alternatesOf = (url: URL | string): Record<Lang, string> | null => {
  const path = withSlash(typeof url === 'string' ? url : url.pathname);
  return Object.values(routes).find((r) => r.tr === path || r.en === path) ?? null;
};

export const path = (key: RouteKey, lang: Lang) => routes[key][lang];

/** Arayüz metinleri — içerik (SSS, hizmet sayfaları) src/data altında. */
export const ui = {
  tr: {
    skipLink: 'İçeriğe geç',
    newTab: '(yeni sekmede açılır)',
    homeLabel: 'onlinemenu-qr — ana sayfa',
    home: 'Ana sayfa',
    nav: { label: 'Ana menü', qrMenu: 'QR Menü', nfc: 'NFC Stantlar', faq: 'SSS', contact: 'İletişim' },
    langSwitch: { label: 'EN', title: 'English version', hreflang: 'en' },
    cta: 'Teklif Al',
    anchors: { main: 'icerik', services: 'hizmetler', how: 'nasil-calisir', faq: 'sss', contact: 'iletisim' },
    breadcrumbLabel: 'Sayfa konumu',
    ogImageAlt: 'onlinemenu-qr: dijital QR menü, NFC yorum standı ve web sitesi',
    hero: {
      title: 'QR menü ve NFC stantlarla işletmenizin dijital vitrini.',
      lede: "Masadaki QR menüden Google yorumlarınıza ve Instagram'ınıza yönlendiren NFC kartlara, oradan web sitenize kadar. Tasarım bir kalıba değil, işletmenize göre şekillenir.",
      sample: 'Örnek Menü',
    },
    clients: { title: 'Bizi tercih eden işletmeler', menuOf: (name: string) => `${name} dijital menüsü`, logoOf: (name: string) => `${name} logosu` },
    services: {
      title: 'Masada QR ve NFC, internette web sitesi.',
      lede: 'Misafirin telefonuyla menünüze, yorum sayfanıza ve sitenize ulaştığı her noktayı biz tasarlayıp kuruyoruz.',
      more: { qrMenu: 'QR menü hakkında detaylı bilgi', nfc: 'NFC stantlar hakkında detaylı bilgi' },
      liveMenu: 'Canlı menüyü açın',
    },
    how: { title: 'Nasıl çalışıyoruz' },
    faq: { title: 'Sık sorulan sorular' },
    contact: {
      title: 'Teklif alın',
      lede: "Formu doldurun, işletmenize uygun kapsamla size dönelim. Beklemek istemezseniz doğrudan arayın ya da WhatsApp'tan yazın.",
      channels: 'Bize ulaşın',
      whatsapp: "WhatsApp'tan yazın",
      name: 'Ad soyad',
      business: 'İşletme adı',
      phone: 'Telefon',
      phonePlaceholder: '05xx xxx xx xx veya +49 ...',
      phoneHint: 'Yurt dışı numaraları ülke koduyla (+49, +31 …)',
      email: 'E-posta',
      optional: '(opsiyonel)',
      services: 'İlgilendiğiniz hizmetler',
      message: 'Mesaj',
      consentLink: 'KVKK Aydınlatma Metni',
      consentRest: "'ni okudum; bilgilerimin teklif amacıyla işlenmesini kabul ediyorum.",
      submit: 'Teklif İste',
      submitHint: 'Talebiniz WhatsApp üzerinden bize iletilir.',
    },
    servicePage: {
      whatsapp: 'WhatsApp ile yazın',
      toc: 'Bu sayfada',
      faq: 'Sık sorulan sorular',
      toForm: 'Teklif formuna git',
      menuOf: 'dijital menüsü',
    },
    footer: {
      tag: 'QR menüden web sitesine, işletmenizin dijital vitrini.',
      kvkk: 'KVKK Aydınlatma Metni',
      legalForm: 'Şahıs Şirketi',
      parent: (link: string) => `onlinemenu-qr, bir ${link} altyapısı ürünüdür.`,
      rights: 'Tüm hakları saklıdır.',
    },
  },
  en: {
    skipLink: 'Skip to content',
    newTab: '(opens in a new tab)',
    homeLabel: 'onlinemenu-qr — home',
    home: 'Home',
    nav: { label: 'Main menu', qrMenu: 'QR Menu', nfc: 'NFC Stands', faq: 'FAQ', contact: 'Contact' },
    langSwitch: { label: 'TR', title: 'Türkçe sürüm', hreflang: 'tr' },
    cta: 'Get a Quote',
    anchors: { main: 'content', services: 'services', how: 'how-it-works', faq: 'faq', contact: 'contact' },
    breadcrumbLabel: 'Breadcrumb',
    ogImageAlt: 'onlinemenu-qr: digital QR code menus, NFC review stands and websites',
    hero: {
      title: 'QR code menus and websites for cafés and restaurants.',
      lede: 'A digital menu your guests open by scanning the QR code on the table, a website in the same design, and menus in English, Turkish and Arabic. Designed around your business, not a template, and set up remotely.',
      sample: 'Live Menu Example',
    },
    clients: { title: 'Businesses using onlinemenu-qr', menuOf: (name: string) => `${name} digital menu`, logoOf: (name: string) => `${name} logo` },
    services: {
      title: 'QR menus on the table, a website online.',
      lede: 'We design and set up every point where guests reach your menu, your reviews and your website from their phone.',
      more: { qrMenu: 'More about QR code menus', nfc: 'More about NFC stands' },
      liveMenu: 'Open a live menu',
    },
    how: { title: 'How we work' },
    faq: { title: 'Frequently asked questions' },
    contact: {
      title: 'Get a quote',
      lede: "Fill in the form and we'll get back to you with a proposal for your business. Prefer not to wait? Call us or send a WhatsApp message.",
      channels: 'Contact us',
      whatsapp: 'Message us on WhatsApp',
      name: 'Full name',
      business: 'Business name',
      phone: 'Phone',
      phonePlaceholder: '+49 151 ... or +44 7700 ...',
      phoneHint: 'Please include your country code (+49, +31 …)',
      email: 'Email',
      optional: '(optional)',
      services: 'Services you are interested in',
      message: 'Message',
      consentLink: 'Privacy Notice (KVKK, in Turkish)',
      consentRest: ' I have read it and agree that my details are processed to prepare a quote.',
      submit: 'Request a Quote',
      submitHint: 'Your request is sent to us via WhatsApp.',
    },
    servicePage: {
      whatsapp: 'Message us on WhatsApp',
      toc: 'On this page',
      faq: 'Frequently asked questions',
      toForm: 'Go to the quote form',
      menuOf: 'digital menu',
    },
    footer: {
      tag: 'From QR code menus to websites: your business, online.',
      kvkk: 'Privacy Notice (KVKK, Turkish)',
      legalForm: 'Sole proprietorship',
      parent: (link: string) => `onlinemenu-qr is a product built on ${link} infrastructure.`,
      rights: 'All rights reserved.',
    },
  },
} as const;

export type Ui = (typeof ui)[Lang];
export const t = (lang: Lang): Ui => ui[lang];
