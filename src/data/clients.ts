/**
 * "Bizi Tercih Eden İşletmeler" — logo loop verisi.
 *
 * Yeni müşteri = logoyu src/assets/clients/ altına koy, import et, diziye tek satır ekle.
 *
 * Logo türleri:
 *  - SVG (`?raw`): inline sprite'a basılır. Renkli halde `--logo-main` / `--logo-sub`
 *    değişkenlerini kullanır; monokrom halde ikisi de currentColor olur.
 *  - Raster (ImageMetadata): astro:assets ile WebP'ye çevrilir; monokrom CSS filter ile.
 */
import type { ImageMetadata } from 'astro';

import cafeLeo from '../assets/clients/cafe-leo.svg?raw';
import leoLounge from '../assets/clients/leo-lounge.png';
import sistemSimit from '../assets/clients/sistem-simit-firini.svg?raw';
import sistemLahmacun from '../assets/clients/sistem-pide-lahmacun-firini.svg?raw';

export interface Client {
  name: string;
  url: string;
  /** Ham SVG metni veya astro:assets görseli. */
  logo: string | ImageMetadata;
  /** Opsiyonel optik düzeltme: dikey/ince logolar yatay logoların yanında küçük kalıyor. */
  scale?: number;
}

export const clients: Client[] = [
  { name: 'Cafe Leo Teras', url: 'https://cafe-leo.onlinemenu-qr.com', logo: cafeLeo, scale: 1.3 },
  { name: 'Leo Lounge', url: 'https://leo-lounge.onlinemenu-qr.com', logo: leoLounge, scale: 1.3 },
  { name: 'Sistem Simit Fırını', url: 'https://sistemsimitfirini.onlinemenu-qr.com', logo: sistemSimit },
  // Kök adres 301 ile /menu/'ye yönleniyor; doğrudan hedefe bağlanıyoruz.
  { name: 'Sistem Pide & Lahmacun Fırını', url: 'https://sistemlahmacunfirini.onlinemenu-qr.com/menu/', logo: sistemLahmacun },
];
