import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n';

import qrCafeLeo from '../assets/showcase/qr-menu-cafe-leo.jpg';
import nfcKartlar from '../assets/showcase/nfc-qr-kartlar.jpg';

export interface ShowcaseMedia {
  image: ImageMetadata;
  alt: string;
  caption: string;
  /** CSS object-position — ürünü kadrajın merkezine almak için. */
  focus?: string;
  /** Kadraj içinde yakınlaştırma (fotoğraf uzaktan çekildiyse / kenarda istenmeyen öğe varsa). */
  zoom?: number;
  /** Kadraj oranı; varsayılan dikey 4 / 5. */
  ratio?: string;
}

export interface Showcase {
  id: string;
  title: string;
  body: string;
  media: ShowcaseMedia[];
}

/** Kadraj ayarları dilden bağımsız; yalnız metinler dile göre değişir. */
const qrFrame = { image: qrCafeLeo, focus: '50% 47%', zoom: 1.35 };
// Sol alt köşedeki kaynak yazısı kadraj dışında kalsın
const nfcFrame = { image: nfcKartlar, focus: '50% 35%', zoom: 1.07, ratio: '16 / 10' };

/**
 * Fotoğraflı ana hizmetler — sayfada en belirgin blok.
 *
 * Görsel değiştirmek için: dosyayı src/assets/showcase/ altına koy, import et,
 * ilgili `image` alanına ver. Uzun kenar ≥ 1400 px önerilir.
 */
export const showcase: Record<Lang, Showcase[]> = {
  tr: [
    {
      id: 'qr-menu',
      title: 'Masadaki QR menü',
      body: 'Misafiriniz kodu okutur, menünüz telefonunda açılır. Ürün, fiyat ve fotoğrafları yönetim panelinden siz güncellersiniz; değişiklik masaya anında yansır, yeniden baskı gerekmez.',
      media: [
        {
          ...qrFrame,
          alt: 'Mermer masa üzerinde altın çerçeveli, Leo logolu QR menü standı',
          caption: 'Cafe Leo Teras — masa QR standı',
        },
      ],
    },
    {
      id: 'nfc-kart',
      title: 'NFC Google yorum ve Instagram stantları',
      body: 'Google yorumlarınız, Instagram hesabınız ve diğer adresleriniz için hem QR hem NFC ile çalışan kartlar. Misafir telefonunu karta yaklaştırır, sayfa açılır. NFC etiketlerimiz şifreli ve korumalıdır; müşterilerinizin güvenliğini riske atmaz.',
      media: [
        {
          ...nfcFrame,
          alt: 'Ahşap tezgâh üzerinde, NFC ve QR ile çalışan iki akrilik stant: Instagram için "Bizi takip edin", Google için "Bize yorum yapın"',
          caption: 'Instagram takip ve Google yorum stantları — NFC + QR',
        },
      ],
    },
  ],
  en: [
    {
      id: 'qr-menu',
      title: 'A QR code menu on every table',
      body: 'Guests scan the code and your menu opens on their phone. You update dishes, prices and photos in the dashboard; changes go live immediately, with nothing to reprint.',
      media: [
        {
          ...qrFrame,
          alt: 'Gold-framed QR code menu stand with the Leo logo on a marble table',
          caption: 'Cafe Leo Teras — QR code menu stand',
        },
      ],
    },
    {
      id: 'nfc-kart',
      title: 'NFC Google review and Instagram stands',
      body: 'Stands that work with both NFC and a QR code: guests tap their phone and your Google review page or Instagram profile opens. Our NFC tags are locked, so nobody can redirect them. Available for businesses in Türkiye only.',
      media: [
        {
          ...nfcFrame,
          alt: 'Two acrylic NFC and QR code stands on a wooden counter: "Follow us" for Instagram and "Leave us a review" for Google',
          caption: 'Instagram follow and Google review stands — NFC + QR',
        },
      ],
    },
  ],
};

export interface Service {
  id: string;
  title: string;
  body: string;
}

/** Fotoğrafsız, tamamlayıcı hizmetler. */
export const services: Record<Lang, Service[]> = {
  tr: [
    {
      id: 'web-sitesi',
      title: 'İşletme web sitesi',
      body: 'Menünüzle aynı tasarım dilinde, hızlı ve mobil öncelikli bir tanıtım sitesi. Şablondan değil, işletmenize göre çizilir.',
    },
    {
      id: 'coklu-dil',
      title: 'Türkçe, İngilizce, Arapça',
      body: 'Menü ve siteniz üç dilde; Arapça için sağdan sola düzen dahil. Misafiriniz menüyü kendi dilinde okur.',
    },
  ],
  en: [
    {
      id: 'web-sitesi',
      title: 'Restaurant and café websites',
      body: 'A fast, mobile-first website in the same design as your menu. Designed for your business, not built from a template.',
    },
    {
      id: 'coklu-dil',
      title: 'English, Turkish, Arabic',
      body: 'Your menu and website in three languages, with a right-to-left layout for Arabic. Guests read the menu in their own language.',
    },
  ],
};

/** Formdaki "ilgilendiğiniz hizmetler" seçenekleri — id'ler backend'de de doğrulanır, dilden bağımsızdır. */
export const serviceOptions: Record<Lang, { id: string; label: string }[]> = {
  tr: [
    { id: 'qr-menu', label: 'QR menü' },
    { id: 'nfc-kart', label: 'NFC yorum standı' },
    { id: 'web-sitesi', label: 'Web sitesi' },
    { id: 'coklu-dil', label: 'Çoklu dil' },
  ],
  // NFC stant Avrupa'ya hazırlanmıyor; İngilizce formda en sonda ve Türkiye kaydıyla.
  en: [
    { id: 'qr-menu', label: 'QR code menu' },
    { id: 'web-sitesi', label: 'Website' },
    { id: 'coklu-dil', label: 'Multilingual menu' },
    { id: 'nfc-kart', label: 'NFC review stand (Türkiye)' },
  ],
};

export const steps: Record<Lang, { title: string; body: string }[]> = {
  tr: [
    { title: 'Görüşme', body: 'İşletmenizi, menünüzü ve ihtiyaçlarınızı dinliyor; size uygun kapsamı birlikte belirliyoruz.' },
    { title: 'Tasarım ve kurulum', body: 'Markanıza özel tasarımı hazırlıyor, menünüzü, kartlarınızı ve sitenizi kuruyoruz.' },
    { title: 'Yayın ve destek', body: 'Yayına alıyoruz. Sonrasında güncellemelerde ve sorularınızda yanınızdayız.' },
  ],
  en: [
    { title: 'Call', body: 'We learn about your business, your menu and what you need, and agree on the scope together.' },
    { title: 'Design and setup', body: 'We design a menu that fits your brand and set up your menu and website remotely.' },
    { title: 'Launch and support', body: 'We take it live, then help you with updates and questions afterwards.' },
  ],
};
