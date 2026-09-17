/**
 * Ajans bilgileri — sayfadaki tüm iletişim/künye verisi buradan okunur.
 */
import type { Lang } from '../i18n';

export interface Phone {
  /** Ekranda görünen biçim. */
  display: string;
  /** tel: ve wa.me için E.164 (başında + olmadan). */
  e164: string;
}

const primaryPhone: Phone = { display: '+90 543 817 22 35', e164: '905438172235' };
const secondaryPhone: Phone = { display: '+90 546 729 57 48', e164: '905467295748' };

export const site = {
  name: 'onlinemenu-qr',
  url: 'https://onlinemenu-qr.com',
  email: 'cabukrandevu@gmail.com',
  phones: [primaryPhone, secondaryPhone],
  whatsappPhone: primaryPhone,

  /** Şahıs şirketi — unvan kullanıcı tarafından verildi. */
  legalName: 'Anıl Eren YILDIRIM',

  sampleMenuUrl: 'https://cafe-leo.onlinemenu-qr.com',
  parent: { name: 'ORDER', url: 'https://cabukrandevu.com' },
  copyrightYear: 2026,
} as const;

/**
 * Dile bağlı künye metinleri. Hizmet bölgesi ve Avrupa şartları SSS, hizmet
 * sayfaları ve footer tarafından buradan okunur.
 */
export const siteCopy = {
  tr: {
    /** Arama sonucu başlığı — ~60 karakter altında, ana anahtar kelime başta. */
    title: 'Dijital QR Menü ve NFC Google Yorum Standı | onlinemenu-qr',
    /** Arama sonucu açıklaması — ~155 karakter. */
    description:
      'Kafe ve restoranlar için dijital QR menü, NFC Google yorum ve Instagram standı, işletme web sitesi. Panelden anında güncellenir; Türkçe, İngilizce, Arapça.',
    whatsappMessage: 'Merhaba, onlinemenu-qr hakkında bilgi ve teklif almak istiyorum.',
    serviceArea: {
      short: "Türkiye'nin tüm illerinde ve Avrupa'da hizmet veriyoruz.",
      /** NFC / QR stantları fiziksel üretim — yalnız Türkiye. */
      stands: "NFC ve QR stantlar yalnızca Türkiye'deki işletmeler için hazırlanır.",
      europe:
        "Avrupa'daki işletmeler için dijital QR menü, web sitesi ve çoklu dil hizmetleri uzaktan kurulur. Avrupa'da baskı hizmeti verilmez ve NFC stant hazırlanmaz. Fotoğraflı menü isteniyorsa ürün fotoğraflarının işletme tarafından sağlanması gerekir.",
    },
  },
  en: {
    title: 'QR Code Menu for Restaurants & Cafés | onlinemenu-qr',
    description:
      'Digital QR code menus and websites for restaurants and cafés in Europe and Türkiye. Update prices instantly from your dashboard; English, Turkish, Arabic.',
    whatsappMessage: "Hello, I'd like information and a quote for onlinemenu-qr.",
    serviceArea: {
      short: 'Serving businesses across Türkiye and Europe.',
      stands: 'NFC and QR stands are produced for businesses in Türkiye only.',
      europe:
        'For businesses in Europe, digital QR code menus, websites and multilingual menus are set up remotely. Printing services and NFC stands are not available in Europe. If you want a menu with photos, your business provides the product photos.',
    },
  },
} as const;

export const whatsappHref = (lang: Lang) =>
  `https://wa.me/${site.whatsappPhone.e164}?text=${encodeURIComponent(siteCopy[lang].whatsappMessage)}`;
