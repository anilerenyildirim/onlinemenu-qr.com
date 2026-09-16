/**
 * Hizmet sayfaları (/qr-menu/, /nfc-google-yorum-standi/) — içerik verisi.
 *
 * Dil: resmi, açıklayıcı, arama niyetine cevap veren. Her bölüm bir <h2>; bölüm
 * başlıkları insanların arama kutusuna yazdığı sorulara karşılık gelir.
 * Doğrulanmamış iddialar `// TEYİT:` ile işaretli.
 */
import type { ShowcaseMedia } from './services';
import { showcase } from './services';
import type { Faq } from './faq';

export type Block =
  | { kind: 'text'; id: string; title: string; paragraphs: string[]; list?: string[] }
  | { kind: 'steps'; id: string; title: string; intro?: string; steps: { title: string; body: string }[] }
  | { kind: 'media'; id: string; title: string; paragraphs: string[]; media: ShowcaseMedia }
  | { kind: 'clients'; id: string; title: string; paragraphs: string[] };

export interface ServicePage {
  /** Sonda / ile — canonical ve sitemap ile aynı. */
  path: string;
  /** showcase / serviceOptions ile ortak kimlik. */
  serviceId: string;
  breadcrumb: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  lede: string;
  heroMedia: ShowcaseMedia;
  blocks: Block[];
  faq: Faq[];
  cta: { title: string; body: string };
}

const media = (id: string): ShowcaseMedia => {
  const item = showcase.find((s) => s.id === id)?.media[0];
  if (!item) throw new Error(`showcase medyası yok: ${id}`);
  return item;
};

export const qrMenuPage: ServicePage = {
  path: '/qr-menu/',
  serviceId: 'qr-menu',
  breadcrumb: 'QR Menü',
  seoTitle: 'Restoran ve Kafe için Dijital QR Menü | onlinemenu-qr',
  seoDescription:
    'Restoran ve kafeler için dijital QR menü: yönetim panelinden anlık fiyat ve ürün güncelleme, Türkçe, İngilizce ve Arapça dil desteği, işletmeye özel tasarım.',
  h1: 'Restoran ve kafeler için dijital QR menü',
  lede: 'Misafirleriniz masadaki QR kodu okutarak menünüze telefonlarından ulaşır. Fiyat ve ürün değişikliklerini yönetim panelinden siz yaparsınız; menünüz her zaman günceldir.',
  heroMedia: media('qr-menu'),
  blocks: [
    {
      kind: 'text',
      id: 'qr-menu-nedir',
      title: 'QR menü nedir?',
      paragraphs: [
        'QR menü, işletmenizin menüsünün internet üzerinde yayınlanan dijital bir sürümüdür. Masaya, tezgâha veya girişe yerleştirilen QR kod, telefon kamerasıyla okutulduğunda menüyü doğrudan tarayıcıda açar.',
        'Misafirin uygulama indirmesi, üye olması veya internet ayarı yapması gerekmez. Menü; ürün adları, açıklamalar, fiyatlar ve fotoğraflarla birlikte telefon ekranına uygun şekilde görüntülenir.',
      ],
    },
    {
      kind: 'steps',
      id: 'nasil-calisir',
      title: 'QR menü nasıl çalışır?',
      steps: [
        { title: 'Misafir QR kodu okutur', body: 'Telefon kamerası masadaki QR koda tutulur; ekranda beliren bağlantıya dokunulur.' },
        { title: 'Menü tarayıcıda açılır', body: 'Kategoriler, ürünler ve fiyatlar işletmenize özel tasarımla, hızlı ve okunaklı biçimde görüntülenir.' },
        { title: 'Siz panelden güncellersiniz', body: 'Fiyat, ürün veya fotoğraf değişikliği yönetim panelinden yapılır ve anında yayına yansır.' },
      ],
    },
    {
      kind: 'text',
      id: 'yonetim-paneli',
      title: 'Yönetim paneliyle anlık güncelleme',
      paragraphs: [
        'Basılı menülerde her fiyat değişikliği yeni bir baskı maliyeti ve bekleme süresi anlamına gelir. Dijital QR menüde değişiklikler yönetim panelinden birkaç dakika içinde yapılır ve kaydedildiği anda misafirin ekranına yansır.',
      ],
      // TEYİT: Panel yetenek listesi panel.onlinemenu-qr.com ile karşılaştırılmalı.
      list: [
        'Ürün ekleme, düzenleme ve kaldırma',
        'Fiyat güncelleme',
        'Ürün açıklaması ve fotoğraf değiştirme',
        'Kategori düzenleme ve sıralama',
        'Geçici olarak sunulmayan ürünleri menüden gizleme',
      ],
    },
    {
      kind: 'text',
      id: 'ozel-tasarim',
      title: 'İşletmenize özel tasarım',
      paragraphs: [
        'Menünüz hazır bir şablona yerleştirilmez. Logonuz, kurumsal renkleriniz ve işletmenizin tarzı esas alınarak tasarlanır; misafir menüyü açtığında mekânınızın havasını telefon ekranında da görür.',
        'Aynı tasarım dili, isterseniz işletmenizin web sitesine ve masa stantlarına da taşınır. Böylece dijital vitrininiz her noktada bütünlüklü görünür.',
      ],
    },
    {
      kind: 'text',
      id: 'coklu-dil',
      title: 'Türkçe, İngilizce ve Arapça menü',
      paragraphs: [
        'Yabancı misafir ağırlayan işletmeler için menü Türkçe, İngilizce ve Arapça olarak hazırlanabilir. Misafir dil seçimini menü içinden yapar.',
        'Arapça içerik, sağdan sola (RTL) okuma düzenine uygun şekilde gösterilir; metin hizası ve sayfa yerleşimi dile göre otomatik olarak değişir.',
      ],
    },
    {
      kind: 'media',
      id: 'masa-standi',
      title: 'Masa standı ve QR kod',
      paragraphs: [
        'QR kodun misafir tarafından kolayca fark edilmesi ve okutulması için işletmenize uygun masa stantları hazırlanır. Stant tasarımında logonuz ve kurumsal renkleriniz kullanılır.',
        // TEYİT: Stant malzemesi / ebat seçenekleri netleşince eklenebilir.
        'QR kod menünüzün adresine bağlı olduğundan, menü içeriği değişse bile stantları yeniden bastırmanız gerekmez.',
      ],
      media: media('qr-menu'),
    },
    {
      kind: 'text',
      id: 'avantajlar',
      title: 'Basılı menüye göre avantajları',
      paragraphs: ['Dijital QR menü, basılı menünün yerini alırken işletmeye hem maliyet hem zaman kazandırır.'],
      list: [
        'Fiyat veya ürün değişikliğinde yeniden baskı maliyeti oluşmaz.',
        'Değişiklikler anında yayına girer; eski fiyatlı menü masada kalmaz.',
        'Menü birden fazla dilde sunulabilir.',
        'Ürün fotoğrafları misafirin seçim yapmasını kolaylaştırır.',
        'Yıpranan, kirlenen veya kaybolan menü sorunu ortadan kalkar.',
      ],
    },
    {
      kind: 'text',
      id: 'kimler-icin',
      title: 'Hangi işletmeler için uygundur?',
      paragraphs: [
        'Dijital QR menü, menüsünü misafirine hızlı ve güncel biçimde sunmak isteyen her ölçekteki yeme-içme işletmesi için uygundur.',
      ],
      list: ['Kafeler ve kahve dükkânları', 'Restoranlar', 'Pastane ve fırınlar', 'Lounge ve barlar', 'Birden fazla mekânı veya şubesi olan işletmeler'],
    },
    {
      kind: 'clients',
      id: 'ornek-menuler',
      title: 'Canlı örnek menüler',
      paragraphs: ['Aşağıdaki işletmelerin menüleri onlinemenu-qr altyapısıyla yayında. Bağlantılara dokunarak menüleri misafir gözüyle inceleyebilirsiniz.'],
    },
  ],
  faq: [
    {
      q: 'QR menü için internet bağlantısı gerekir mi?',
      a: 'Menü misafirin telefonunda internet üzerinden açılır. Misafirin mobil verisi veya işletmenizin kablosuz ağı yeterlidir.',
    },
    {
      q: 'QR kodu değiştirmeden menüyü güncelleyebilir miyim?',
      a: 'Evet. QR kod menünüzün sabit adresine yönlendirir. Menü içeriğinde yaptığınız tüm değişiklikler aynı QR kod üzerinden görüntülenir.',
    },
    {
      q: 'Menüye ürün fotoğrafı eklenebilir mi?',
      a: 'Evet. Ürünlere fotoğraf ve açıklama eklenebilir. Fotoğraflar telefonda hızlı açılacak şekilde optimize edilir.',
    },
    {
      q: 'Birden fazla mekânım var, her biri için ayrı menü olabilir mi?',
      // TEYİT: Şube bazlı fiyat/ürün farkı panelde destekleniyor mu?
      a: 'Evet. Her mekân için ayrı menü hazırlanabilir; aynı işletmenin farklı bölümleri veya şubeleri kendi menüleriyle yayınlanabilir.',
    },
    {
      q: 'QR menü fiyatı ne kadar?',
      a: 'Fiyat; ürün sayısı, dil seçenekleri, tasarım kapsamı ve stant adedine göre belirlenir. İşletmenize özel teklif için iletişim formunu doldurmanız yeterlidir.',
    },
  ],
  cta: {
    title: 'İşletmeniz için QR menü teklifi alın',
    body: 'Formu doldurun veya bizi arayın; menünüzün büyüklüğüne ve ihtiyaçlarınıza göre size özel teklif hazırlayalım.',
  },
};

export const nfcPage: ServicePage = {
  path: '/nfc-google-yorum-standi/',
  serviceId: 'nfc-kart',
  breadcrumb: 'NFC Google Yorum Standı',
  seoTitle: 'NFC Google Yorum ve Instagram Standı | onlinemenu-qr',
  seoDescription:
    'Misafirlerin telefonu yaklaştırarak Google yorumu bırakabildiği ve Instagram hesabınızı takip edebildiği NFC ve QR kodlu stantlar. Şifreli ve korumalı NFC etiketleri.',
  h1: 'NFC Google yorum ve Instagram stantları',
  lede: 'Misafirleriniz telefonlarını standa yaklaştırır; Google yorum sayfanız veya Instagram hesabınız tek dokunuşla açılır. NFC özelliği olmayan telefonlar için her stantta QR kod da bulunur.',
  heroMedia: media('nfc-kart'),
  blocks: [
    {
      kind: 'text',
      id: 'nfc-stant-nedir',
      title: 'NFC standı nedir?',
      paragraphs: [
        'NFC (Near Field Communication — yakın alan iletişimi), telefonların birkaç santimetre mesafedeki bir etiketi temassız olarak okumasını sağlayan teknolojidir. Temassız kartla ödeme yaparken kullanılan teknolojinin aynısıdır.',
        'NFC standı, içine yerleştirilmiş etiket sayesinde misafirin telefonunu belirli bir adrese yönlendirir. Misafir telefonunu standa yaklaştırdığında Google yorum sayfanız, Instagram profiliniz veya belirlediğiniz başka bir bağlantı ekranda açılır.',
      ],
    },
    {
      kind: 'steps',
      id: 'nasil-calisir',
      title: 'NFC standı nasıl çalışır?',
      steps: [
        { title: 'Telefon standa yaklaştırılır', body: 'Misafir kilidi açık telefonunun üst arka kısmını standdaki NFC alanına yaklaştırır.' },
        { title: 'Bağlantı bildirimi çıkar', body: 'Telefon etiketi okur ve ekranda bağlantı bildirimi gösterir; bildirime dokunulur.' },
        { title: 'Sayfa açılır', body: 'Google yorum penceresi veya Instagram profili doğrudan açılır. NFC kullanılamıyorsa standdaki QR kod okutulur.' },
      ],
    },
    {
      kind: 'text',
      id: 'google-yorum-standi',
      title: 'Google yorum standı',
      paragraphs: [
        'Google haritalarda ve aramalarda işletmeler, yorum sayısı ve puanlarıyla birlikte listelenir. Memnun ayrılan misafirlerin çoğu yorum yazmayı ister ancak işletmeyi aramak, profili bulmak ve yorum alanına ulaşmak gibi adımlar bu isteği yarıda bırakır.',
        'Google yorum standı bu adımları ortadan kaldırır. Stant, misafiri doğrudan işletmenizin yorum yazma penceresine yönlendirir; misafirin yalnızca puanını ve yorumunu girmesi kalır.',
      ],
    },
    {
      kind: 'text',
      id: 'instagram-standi',
      title: 'Instagram takip standı',
      paragraphs: [
        'Instagram takip standı, misafiri işletmenizin Instagram profiline yönlendirir. Misafir, kullanıcı adını aramak zorunda kalmadan profilinizi açar ve tek dokunuşla takip eder.',
        'Mekânınızda paylaşım yapan misafirlerin hesabınızı etiketlemesi de kolaylaşır; işletmenizin sosyal medyada görünürlüğü artar.',
      ],
    },
    {
      kind: 'media',
      id: 'nfc-ve-qr',
      title: 'Her stantta NFC ve QR kod birlikte',
      paragraphs: [
        'Tüm stantlarımızda NFC etiketi ve QR kod birlikte bulunur. Böylece NFC özelliği olmayan veya NFC’si kapalı olan telefonlarla gelen misafirler de aynı sayfaya QR kod üzerinden ulaşır.',
        'Stant üzerindeki yönlendirme metinleri ve simgeler, misafirin ne yapması gerektiğini açıklama gerektirmeden anlatacak şekilde tasarlanır.',
      ],
      media: media('nfc-kart'),
    },
    {
      kind: 'text',
      id: 'guvenlik',
      title: 'Şifreli ve korumalı NFC etiketleri',
      paragraphs: [
        // TEYİT: Kilitleme / şifreleme yöntemi teknik olarak doğrulanmalı.
        'Korumasız NFC etiketleri, uygun bir uygulamayla başkaları tarafından yeniden yazılabilir ve misafirler istenmeyen bir sayfaya yönlendirilebilir. onlinemenu-qr NFC etiketleri şifreli ve korumalıdır; etiketin yönlendirdiği adres yetkisiz kişilerce değiştirilemez.',
        'Bu sayede stantlarınız misafirlerinizin güvenliğini riske atmaz ve işletmenizin itibarını korur.',
      ],
    },
    {
      kind: 'text',
      id: 'uyumlu-telefonlar',
      title: 'Hangi telefonlarla çalışır?',
      paragraphs: [
        'NFC özelliği bulunan güncel iPhone ve Android telefonlar stantları okuyabilir. iPhone XS ve sonraki modeller NFC etiketlerini ek bir uygulama veya ayar gerektirmeden okur.',
        'Android telefonlarda NFC özelliğinin ayarlardan açık olması gerekir. NFC kullanılamayan her durumda standdaki QR kod, telefon kamerasıyla okutularak aynı sayfaya ulaşılır.',
      ],
    },
    {
      kind: 'text',
      id: 'kullanim-alanlari',
      title: 'Stantlar nerede kullanılır?',
      paragraphs: ['Stantlar, misafirin memnuniyetini dile getirmeye en yakın olduğu noktalara yerleştirildiğinde en iyi sonucu verir.'],
      list: ['Masalar', 'Kasa ve ödeme noktası', 'Tezgâh ve bar alanı', 'Giriş ve bekleme alanı'],
    },
  ],
  faq: [
    {
      q: 'Misafirin yorum yazması için uygulama indirmesi gerekir mi?',
      a: 'Hayır. Telefon standı okuduğunda Google yorum sayfası tarayıcıda veya telefonda yüklü Google Haritalar uygulamasında açılır. Yorum için misafirin Google hesabıyla oturum açmış olması yeterlidir.',
    },
    {
      q: 'NFC standı pil veya elektrik gerektirir mi?',
      a: 'Hayır. NFC etiketleri enerjisini okuyan telefondan alır; pil, şarj veya elektrik bağlantısı gerektirmez.',
    },
    {
      q: 'Stantlar Google yorumlarının puanını etkiler mi?',
      a: 'Stant yalnızca yorum bırakmayı kolaylaştırır; puanı ve yorumu misafir kendisi belirler. Google yönergeleri gereği yorum karşılığında indirim, hediye gibi teşvikler sunulmamalıdır.',
    },
    {
      q: 'Stant başka bir adrese yönlendirilebilir mi?',
      // TEYİT: Yönlendirme sonradan değiştirilebiliyor mu (dinamik adres)?
      a: 'Google yorum ve Instagram dışında menünüz, web siteniz veya harita konumunuz gibi farklı adresler için de stant hazırlanabilir. İhtiyacınızı görüşmede belirlemeniz yeterlidir.',
    },
    {
      q: 'NFC standı fiyatı ne kadar?',
      a: 'Fiyat; stant adedine, stant türüne ve tasarım kapsamına göre belirlenir. İşletmenize özel teklif için iletişim formunu doldurmanız yeterlidir.',
    },
  ],
  cta: {
    title: 'NFC yorum ve Instagram standı teklifi alın',
    body: 'İhtiyacınız olan stant adedini ve yönlendirmek istediğiniz hesapları iletin; işletmenize özel teklif hazırlayalım.',
  },
};

export const servicePages = [qrMenuPage, nfcPage];
