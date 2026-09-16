# SEO planı — onlinemenu-qr.com

## 1. Sitede yapılanlar (kod)

| Alan | Durum |
|---|---|
| `<title>` / meta description | Ana anahtar kelimeler başta; 58 / 155 karakter (`src/data/site.ts`) |
| Canonical | Her sayfada, sonda `/` ile |
| Open Graph + Twitter kartı | `public/og.jpg` 1200×630 (`npm run assets` ile yeniden üretilir) |
| JSON-LD | Ana sayfa: Organization + WebSite + 4 × Service + FAQPage. Hizmet sayfaları: WebPage + BreadcrumbList + Service + FAQPage (`src/lib/schema.ts`) |
| Hizmet sayfaları | `/qr-menu/`, `/nfc-google-yorum-standi/` — içerik `src/data/pages.ts` |
| SSS | Ana sayfada 8 soru, her hizmet sayfasında 5 soru (`<details>`, JS gerektirmez) |
| İç bağlantı | Header, hizmet blokları ve footer hizmet sayfalarına bağlanıyor; hizmet sayfalarındaki tüm CTA'lar `/#iletisim` |
| sitemap | `sitemap-index.xml`; taslak `/kvkk/` hariç |
| robots.txt | Tüm siteye izin + sitemap adresi |
| KVKK sayfası | `noindex, follow` (hukuki metin tamamlanana kadar) |
| Favicon seti | `favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, `icon-192/512.png`, `site.webmanifest` |
| Başlık hiyerarşisi | Her sayfada tek `<h1>` (ana sayfa: "QR menü ve NFC stantlarla işletmenizin dijital vitrini.") |
| Görseller | Tüm `<img>`'lerde açıklayıcı `alt`; AVIF/WebP + responsive `srcset` |

## 2. Hedef aramalar

Rakip sonuçlarına bakılarak seçildi (Eylül 2026). Rakiplerin çoğu her arama için **ayrı sayfa** kullanıyor.

| Arama | Niyet | Sayfadaki karşılığı |
|---|---|---|
| dijital qr menü, qr menü, karekod menü | Ürün arıyor | Hero, "Masadaki QR menü" bloğu |
| kafe qr menü, restoran qr menü | Sektörel | Meta description, JSON-LD |
| nfc google yorum standı, google yorum kartı | Ürün arıyor | "NFC ve QR kartlar" bloğu |
| instagram nfc stand | Ürün arıyor | NFC bloğu, fotoğraf alt metni |
| restoran web sitesi, kafe web sitesi | Hizmet arıyor | "İşletme web sitesi" kartı |
| qr menü fiyatları | Fiyat karşılaştırıyor | **Karşılık yok** — kapsamda fiyat tablosu yok |

## 3. Site dışında yapılması gerekenler (öncelik sırasıyla)

Tek sayfalık yeni bir sitenin öne çıkmasını en çok bunlar belirler.

1. **Google Search Console**
   - Deploy sonrası `onlinemenu-qr.com` alan adı mülkü olarak ekle (DNS TXT kaydı Cloudflare'de).
   - `https://onlinemenu-qr.com/sitemap-index.xml` gönder.
   - Ana sayfa için "URL denetimi → Dizine eklenmesini iste".
2. **Google İşletme Profili** ("qr menü + ilçe" gibi yerel aramaların asıl kaynağı)
   - Kategori: "Web sitesi tasarımcısı" / "Pazarlama ajansı" gibi en yakın kategori.
   - Açık adres göstermek istemiyorsan **hizmet bölgesi işletmesi** olarak kur, adresi gizle.
   - Fotoğraflar: QR stant, NFC stantlar, müşteri menü ekran görüntüleri.
   - Her müşteriden bir Google yorumu iste — kendi NFC yorum standınla.
   - Profil açılınca linki `StructuredData.astro` → `sameAs` alanına ekle.
3. **Müşteri menülerinden geri bağlantı**
   - Tüm müşteri menülerinin (`*.onlinemenu-qr.com`) alt bilgisine tek satır ekle: "Dijital menü: onlinemenu-qr" → `https://onlinemenu-qr.com/`.
   - Her QR okutma bir ziyaretçi de getirir.
4. **Bing Webmaster Tools:** Search Console'dan tek tıkla içe aktarılır.
5. **Instagram hesabı:** Profil linki siteye verilsin. JSON-LD'deki `sameAs` alanına eklenecek.
6. **Yerel rehberler:** Yandex Haritalar, Apple Business Connect, sektörel firma rehberleri. Her yerde **aynı isim, telefon ve e-posta** kullanılsın.

## 4. Sıradaki öneriler

- **Web sitesi hizmet sayfası** (`/restoran-web-sitesi/`): Aynı `ServicePage` layout'uyla, yalnızca içerik verisi eklenerek yapılır.
- **Font subsetting** (aşama 4): Mobil hız, sıralama sinyallerinden biri.
- **Müşteri vaka içerikleri:** Her müşteri için kısa bir anlatım. Gerçek işler en güçlü içerik türüdür.

## 5. TEYİT

- Instagram / Google İşletme Profili bağlantıları (`sameAs` boş).
- Açık adres: yok. Bu yüzden `LocalBusiness` yerine `Organization` kullanıldı.
