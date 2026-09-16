import type { ImageMetadata } from 'astro';

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

/**
 * Fotoğraflı ana hizmetler — sayfada en belirgin blok.
 *
 * Görsel değiştirmek için: dosyayı src/assets/showcase/ altına koy, import et,
 * ilgili `image` alanına ver. Uzun kenar ≥ 1400 px önerilir.
 */
export const showcase: Showcase[] = [
  {
    id: 'qr-menu',
    title: 'Masadaki QR menü',
    body: 'Misafiriniz kodu okutur, menünüz telefonunda açılır. Ürün, fiyat ve fotoğrafları yönetim panelinden siz güncellersiniz; değişiklik masaya anında yansır, yeniden baskı gerekmez.',
    media: [
      {
        image: qrCafeLeo,
        alt: 'Mermer masa üzerinde altın çerçeveli, Leo logolu QR menü standı',
        caption: 'Cafe Leo Teras — masa QR standı',
        focus: '50% 47%',
        zoom: 1.35,
      },
    ],
  },
  {
    id: 'nfc-kart',
    title: 'NFC Google yorum ve Instagram stantları',
    body: 'Google yorumlarınız, Instagram hesabınız ve diğer adresleriniz için hem QR hem NFC ile çalışan kartlar. Misafir telefonunu karta yaklaştırır, sayfa açılır. NFC etiketlerimiz şifreli ve korumalıdır; müşterilerinizin güvenliğini riske atmaz.',
    media: [
      {
        image: nfcKartlar,
        alt: 'Ahşap tezgâh üzerinde, NFC ve QR ile çalışan iki akrilik stant: Instagram için "Bizi takip edin", Google için "Bize yorum yapın"',
        caption: 'Instagram takip ve Google yorum stantları — NFC + QR',
        // Sol alt köşedeki kaynak yazısı kadraj dışında kalsın
        focus: '50% 35%',
        zoom: 1.07,
        ratio: '16 / 10',
      },
    ],
  },
];

export interface Service {
  id: string;
  title: string;
  body: string;
}

/** Fotoğrafsız, tamamlayıcı hizmetler. */
export const services: Service[] = [
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
];

/** Formdaki "ilgilendiğiniz hizmetler" seçenekleri — id'ler backend'de de doğrulanır. */
export const serviceOptions = [
  { id: 'qr-menu', label: 'QR menü' },
  { id: 'nfc-kart', label: 'NFC yorum standı' },
  { id: 'web-sitesi', label: 'Web sitesi' },
  { id: 'coklu-dil', label: 'Çoklu dil' },
] as const;

export const steps = [
  { title: 'Görüşme', body: 'İşletmenizi, menünüzü ve ihtiyaçlarınızı dinliyor; size uygun kapsamı birlikte belirliyoruz.' },
  { title: 'Tasarım ve kurulum', body: 'Markanıza özel tasarımı hazırlıyor, menünüzü, kartlarınızı ve sitenizi kuruyoruz.' },
  { title: 'Yayın ve destek', body: 'Yayına alıyoruz. Sonrasında güncellemelerde ve sorularınızda yanınızdayız.' },
] as const;
