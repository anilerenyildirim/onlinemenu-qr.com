/**
 * Sistem işletmelerinin tipografik logolarını üretir.
 *
 * Gerçek logo dosyaları yok; işletmelerin kendi sitelerinde kullandıkları
 * font (Fraunces 700) ile isim yazılıyor ve metin PATH'e çevriliyor —
 * logo SVG'si font yüklemeden her yerde birebir aynı görünür.
 *
 *   "Sistem"  → marka sarısı  (#F3B21B, işletme sitelerindeki accent)
 *   alt satır → siyah         (koyu zeminde CSS ile --logo-sub ezilir)
 *
 * Çalıştırma: node scripts/build-wordmarks.mjs  (çıktı commit'lenir)
 */
import { writeFileSync } from 'node:fs';
import { createFont } from './lib/text-path.mjs';

const DIR = 'node_modules/@fontsource/fraunces/files';
const fraunces = createFont({ latin: `${DIR}/fraunces-latin-700-normal.woff`, ext: `${DIR}/fraunces-latin-ext-700-normal.woff` });
const textPath = (text, size, x, y) => fraunces.path(text, size, x, y);
const measure = (text, size) => fraunces.measure(text, size);

function wordmark(sub) {
  const TOP = 100;
  const SUB = 40;
  const w1 = measure('Sistem', TOP);
  const w2 = measure(sub, SUB);
  const W = Math.ceil(Math.max(w1, w2));
  const H = 158;
  const l1 = textPath('Sistem', TOP, (W - w1) / 2, 84);
  const l2 = textPath(sub, SUB, (W - w2) / 2, 142);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}"><path fill="currentColor" style="fill:var(--logo-main,#F3B21B)" d="${l1.d}"/><path style="fill:var(--logo-sub,#000)" d="${l2.d}"/></svg>\n`;
}

writeFileSync('src/assets/clients/sistem-simit-firini.svg', wordmark('Simit Fırını'));
writeFileSync('src/assets/clients/sistem-pide-lahmacun-firini.svg', wordmark('Pide & Lahmacun Fırını'));
console.log('ok');
