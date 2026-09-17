/**
 * SEO görselleri — çıktılar public/ altına yazılır ve commit'lenir.
 *   og.jpg / og-en.jpg     1200×630  paylaşım önizlemesi, Türkçe ve İngilizce (WhatsApp, LinkedIn, X, Google Discover)
 *   apple-touch-icon.png   180×180
 *   icon-192.png / 512     web manifest
 *   favicon.ico            32×32 (PNG gömülü ICO) — /favicon.ico'yu doğrudan isteyen tarayıcı/botlar için
 *
 * Çalıştırma: node scripts/build-seo-assets.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';
import { createFont } from './lib/text-path.mjs';

const FONT_DIR = 'node_modules/@fontsource/hanken-grotesk/files';
const h500 = createFont({ latin: `${FONT_DIR}/hanken-grotesk-latin-500-normal.woff`, ext: `${FONT_DIR}/hanken-grotesk-latin-ext-500-normal.woff` });
const h600 = createFont({ latin: `${FONT_DIR}/hanken-grotesk-latin-600-normal.woff`, ext: `${FONT_DIR}/hanken-grotesk-latin-ext-600-normal.woff` });

const C = { bg: '#0C0C0A', surface: '#151513', line: '#34342F', text: '#ECEBE6', muted: '#9C9B93', accent: '#CFE38A' };

// ─── Glyph (Glyph.astro ile aynı geometri, 40'lık ızgara) ──────────────────
const rr = (x, y, w, h, r) =>
  `M${x + r} ${y}H${x + w - r}A${r} ${r} 0 0 1 ${x + w} ${y + r}V${y + h - r}A${r} ${r} 0 0 1 ${x + w - r} ${y + h}H${x + r}A${r} ${r} 0 0 1 ${x} ${y + h - r}V${y + r}A${r} ${r} 0 0 1 ${x + r} ${y}Z`;
const glyph = (stroke = C.text) =>
  `<g fill="none" stroke="${stroke}" stroke-width="2.2">${[rr(2, 2, 36, 36, 11), rr(9.5, 9.5, 8, 8, 2.4), rr(22.5, 9.5, 8, 8, 2.4), rr(9.5, 22.5, 8, 8, 2.4)]
    .map((d) => `<path d="${d}"/>`)
    .join('')}</g><circle cx="26.5" cy="26.5" r="3.4" fill="${C.accent}"/>`;

// ─── OG görseli ─────────────────────────────────────────────────────────────
const W = 1200;
const H = 630;
const PAD = 72;

const photoW = 430;
const photoH = 486;
const photoX = W - PAD - photoW;
const photoY = (H - photoH) / 2;

const brand = h600.path('onlinemenu', 30, PAD + 54, PAD + 30, -0.015);
const brandQr = h600.path('-qr', 30, PAD + 54 + brand.width, PAD + 30, -0.015);
const url = h500.path('onlinemenu-qr.com', 22, PAD, H - PAD + 6, 0);

// QR stant fotoğrafı: ürün ortada, yakın kadraj
const photo = await sharp('src/assets/showcase/qr-menu-cafe-leo.jpg')
  .extract({ left: 90, top: 330, width: 720, height: 814 })
  .resize(photoW, photoH)
  .composite([{ input: Buffer.from(`<svg width="${photoW}" height="${photoH}"><rect width="${photoW}" height="${photoH}" rx="22" fill="#fff"/></svg>`), blend: 'dest-in' }])
  .png()
  .toBuffer();

const ogImage = async (titleLines, subText) => {
  const titleSize = 60;
  const title = titleLines.map((line, i) => h500.path(line, titleSize, PAD, 250 + i * 70, -0.03).d).join('');
  const sub = h500.path(subText, 26, PAD, 250 + titleLines.length * 70 + 22, -0.01);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="0.82" cy="0" r="0.75">
      <stop offset="0" stop-color="${C.accent}" stop-opacity="0.16"/>
      <stop offset="1" stop-color="${C.accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${C.bg}"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <g transform="translate(${PAD} ${PAD}) scale(1)">${glyph()}</g>
  <path d="${brand.d}" fill="${C.text}"/>
  <path d="${brandQr.d}" fill="${C.accent}"/>
  <path d="${title}" fill="${C.text}"/>
  <path d="${sub.d}" fill="${C.muted}"/>
  <path d="${url.d}" fill="${C.muted}"/>
  <rect x="${photoX - 1}" y="${photoY - 1}" width="${photoW + 2}" height="${photoH + 2}" rx="23" fill="none" stroke="${C.line}" stroke-width="2"/>
</svg>`;

  return sharp(Buffer.from(svg))
    .composite([{ input: photo, left: photoX, top: photoY }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer();
};

const og = await ogImage(['Dijital QR menü,', 'NFC yorum standı', 've web sitesi'], 'Kafe ve restoranlar için, tek elden.');
writeFileSync('public/og.jpg', og);
const ogEn = await ogImage(['QR code menus', 'and websites for', 'restaurants'], 'For cafés in Europe and Türkiye, set up remotely.');
writeFileSync('public/og-en.jpg', ogEn);

// ─── İkonlar ────────────────────────────────────────────────────────────────
const iconSvg = (size, pad) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" fill="${C.bg}"/><g transform="translate(${pad} ${pad}) scale(${(size - pad * 2) / 40})">${glyph()}</g></svg>`,
  );

writeFileSync('public/apple-touch-icon.png', await sharp(iconSvg(180, 30)).png().toBuffer());
writeFileSync('public/icon-192.png', await sharp(iconSvg(192, 32)).png().toBuffer());
// 512: maskable güvenli alan (%80) içinde kalsın
writeFileSync('public/icon-512.png', await sharp(iconSvg(512, 96)).png().toBuffer());

// favicon.ico: tek 32×32 PNG gömülü ICO kapsayıcısı
const png32 = await sharp(readFileSync('public/favicon.svg')).resize(32, 32).png().toBuffer();
const ico = Buffer.alloc(6 + 16);
ico.writeUInt16LE(0, 0); // reserved
ico.writeUInt16LE(1, 2); // tip: icon
ico.writeUInt16LE(1, 4); // görsel sayısı
ico.writeUInt8(32, 6); // genişlik
ico.writeUInt8(32, 7); // yükseklik
ico.writeUInt8(0, 8); // palet
ico.writeUInt8(0, 9);
ico.writeUInt16LE(1, 10); // renk planı
ico.writeUInt16LE(32, 12); // bit derinliği
ico.writeUInt32LE(png32.length, 14);
ico.writeUInt32LE(22, 18); // veri ofseti
writeFileSync('public/favicon.ico', Buffer.concat([ico, png32]));

console.log(`og.jpg ${(og.length / 1024).toFixed(0)} KB · og-en.jpg ${(ogEn.length / 1024).toFixed(0)} KB · ikonlar yazıldı`);
