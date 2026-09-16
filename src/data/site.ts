/**
 * Ajans bilgileri — sayfadaki tüm iletişim/künye verisi buradan okunur.
 */

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
  /** Arama sonucu başlığı — ~60 karakter altında, ana anahtar kelime başta. */
  title: 'Dijital QR Menü ve NFC Google Yorum Standı | onlinemenu-qr',
  /** Arama sonucu açıklaması — ~155 karakter. */
  description:
    'Kafe ve restoranlar için dijital QR menü, NFC Google yorum ve Instagram standı, işletme web sitesi. Panelden anında güncellenir; Türkçe, İngilizce, Arapça.',

  email: 'cabukrandevu@gmail.com',
  phones: [primaryPhone, secondaryPhone],
  whatsapp: {
    phone: primaryPhone,
    message: 'Merhaba, onlinemenu-qr hakkında bilgi ve teklif almak istiyorum.',
  },

  /** Şahıs şirketi — unvan kullanıcı tarafından verildi. */
  legalName: 'Anıl Eren YILDIRIM',

  /** Hizmet bölgesi ve Avrupa şartları — SSS, hizmet sayfası ve footer buradan okur. */
  serviceArea: {
    short: "Türkiye'nin tüm illerinde ve Avrupa'da hizmet veriyoruz.",
    europe:
      "Avrupa'daki işletmeler için dijital QR menü, web sitesi ve çoklu dil hizmetleri uzaktan kurulur. Avrupa'da baskı hizmeti verilmez. Fotoğraflı menü isteniyorsa ürün fotoğraflarının işletme tarafından sağlanması gerekir.",
  },

  sampleMenuUrl: 'https://cafe-leo.onlinemenu-qr.com',
  parent: { name: 'ORDER', url: 'https://cabukrandevu.com' },
  copyrightYear: 2026,
} as const;

export const whatsappHref = `https://wa.me/${site.whatsapp.phone.e164}?text=${encodeURIComponent(site.whatsapp.message)}`;
