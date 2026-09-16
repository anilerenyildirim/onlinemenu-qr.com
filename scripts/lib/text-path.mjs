/**
 * Metni SVG path'ine çevirir — üretilen görseller font yüklemeden her yerde aynı görünür.
 * Türkçe ı/ş/ğ/İ latin-ext alt kümesinde; karakter başına doğru dosyadan glif alınır.
 */
import { readFileSync } from 'node:fs';
import opentype from 'opentype.js';

const load = (file) => {
  const buf = readFileSync(file);
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
};

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

/** @param {{ latin: string, ext: string }} files woff dosya yolları */
export function createFont(files) {
  const latin = load(files.latin);
  const ext = load(files.ext);
  const pick = (ch) => (latin.charToGlyphIndex(ch) > 0 ? latin : ext);

  /** @returns {{ d: string, width: number }} */
  function path(text, size, x = 0, y = 0, tracking = 0) {
    let d = '';
    let cursor = x;
    for (const ch of text) {
      const f = pick(ch);
      const g = f.charToGlyph(ch);
      d += serialize(g.getPath(cursor, y, size).commands);
      cursor += (g.advanceWidth / f.unitsPerEm) * size + tracking * size;
    }
    return { d, width: cursor - x };
  }

  return { path, measure: (text, size, tracking = 0) => path(text, size, 0, 0, tracking).width };
}
