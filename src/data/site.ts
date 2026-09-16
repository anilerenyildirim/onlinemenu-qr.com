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
  title: 'onlinemenu-qr — QR Menü ve İşletme Web Sitesi',
  description:
    'QR menüden web sitesine, işletmenizin dijital vitrini tek elden. Panelden anında güncellenen, çok dilli ve işletmenize özel tasarlanan dijital menüler.',

  email: 'cabukrandevu@gmail.com',
  phones: [primaryPhone, secondaryPhone],
  whatsapp: {
    phone: primaryPhone,
    message: 'Merhaba, onlinemenu-qr hakkında bilgi ve teklif almak istiyorum.',
  },

  /** Şahıs şirketi — unvan kullanıcı tarafından verildi. */
  legalName: 'Anıl Eren YILDIRIM',

  sampleMenuUrl: 'https://cafe-leo.onlinemenu-qr.com',
  parent: { name: 'ORDER', url: 'https://cabukrandevu.com' },
  copyrightYear: 2026,
} as const;

export const whatsappHref = `https://wa.me/${site.whatsapp.phone.e164}?text=${encodeURIComponent(site.whatsapp.message)}`;
