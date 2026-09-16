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
import { readFileSync, writeFileSync } from 'node:fs';
import opentype from 'opentype.js';

const buf = readFileSync('node_modules/@fontsource/fraunces/files/fraunces-latin-ext-700-normal.woff');
const latin = readFileSync('node_modules/@fontsource/fraunces/files/fraunces-latin-700-normal.woff');
const fontExt = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
const fontLatin = opentype.parse(latin.buffer.slice(latin.byteOffset, latin.byteOffset + latin.byteLength));

// Türkçe ı/ş/ğ latin-ext alt kümesinde, geri kalanı latin'de.
const glyphFont = (ch) => (fontLatin.charToGlyphIndex(ch) > 0 ? fontLatin : fontExt);

// opentype.js toPathData() bazı koordinatlarda "NaN" basıyor; komutları kendimiz yazıyoruz.
const n = (v) => {
  const r = Math.round(v * 10) / 10;
  if (!Number.isFinite(r)) throw new Error('geçersiz koordinat');
  return String(r);
};
function serialize(commands) {
  return commands
    .map((c) => {
      switch (c.type) {
        case 'M':
        case 'L':
          return `${c.type}${n(c.x)} ${n(c.y)}`;
        case 'Q':
          return `Q${n(c.x1)} ${n(c.y1)} ${n(c.x)} ${n(c.y)}`;
        case 'C':
          return `C${n(c.x1)} ${n(c.y1)} ${n(c.x2)} ${n(c.y2)} ${n(c.x)} ${n(c.y)}`;
        default:
          return 'Z';
      }
    })
    .join('');
}

function textPath(text, size, x, y) {
  let d = '';
  let cursor = x;
  for (const ch of text) {
    const f = glyphFont(ch);
    const g = f.charToGlyph(ch);
    d += serialize(g.getPath(cursor, y, size).commands);
    cursor += (g.advanceWidth / f.unitsPerEm) * size;
  }
  return { d, width: cursor - x };
}

function measure(text, size) {
  return textPath(text, size, 0, 0).width;
}

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
