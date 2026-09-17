/**
 * Hizmet sayfaları — içerik verisi. Adresler ve dil karşılıkları src/i18n'de.
 *
 * İngilizce sayfalar Türkçenin çevirisi değil: İngilizce arama niyetine göre
 * ("QR code menu", "NFC Google review stand") ve Avrupa şartları öne alınarak yazıldı.
 *
 * Dil: resmi, açıklayıcı, arama niyetine cevap veren. Her bölüm bir <h2>; bölüm
 * başlıkları insanların arama kutusuna yazdığı sorulara karşılık gelir.
 * Doğrulanmamış iddialar `// TEYİT:` ile işaretli.
 */
import type { Lang, RouteKey } from '../i18n';
import { routes } from '../i18n';
import type { ShowcaseMedia } from './services';
import { showcase } from './services';
import type { Faq } from './faq';
import { siteCopy } from './site';

export type Block =
  | { kind: 'text'; id: string; title: string; paragraphs: string[]; list?: string[] }
  | { kind: 'steps'; id: string; title: string; intro?: string; steps: { title: string; body: string }[] }
  | { kind: 'media'; id: string; title: string; paragraphs: string[]; media: ShowcaseMedia }
  | { kind: 'clients'; id: string; title: string; paragraphs: string[] };

export interface ServicePage {
  route: RouteKey;
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

const media = (lang: Lang, id: string): ShowcaseMedia => {
  const item = showcase[lang].find((s) => s.id === id)?.media[0];
  if (!item) throw new Error(`showcase medyası yok: ${id}`);
  return item;
};

const qrMenuTr: ServicePage = {
  route: 'qrMenu',
  path: routes.qrMenu.tr,
  serviceId: 'qr-menu',
  breadcrumb: 'QR Menü',
  seoTitle: 'Restoran ve Kafe için Dijital QR Menü | onlinemenu-qr',
  seoDescription:
    'Restoran ve kafeler için dijital QR menü: yönetim panelinden anlık fiyat ve ürün güncelleme, Türkçe, İngilizce ve Arapça dil desteği, işletmeye özel tasarım.',
  h1: 'Restoran ve kafeler için dijital QR menü',
  lede: 'Misafirleriniz masadaki QR kodu okutarak menünüze telefonlarından ulaşır. Fiyat ve ürün değişikliklerini yönetim panelinden siz yaparsınız; menünüz her zaman günceldir.',
  heroMedia: media('tr', 'qr-menu'),
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
      media: media('tr', 'qr-menu'),
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
      kind: 'text',
      id: 'hizmet-bolgesi',
      title: "Türkiye ve Avrupa'da QR menü",
      paragraphs: [
        "Dijital QR menü hizmetimizi Türkiye'nin tüm illerindeki işletmelere sunuyoruz. Kurulum ve güncellemeler uzaktan yapıldığı için işletmenizin bulunduğu şehir süreci etkilemez.",
        "Avrupa'daki kafe ve restoranlara da dijital QR menü, işletme web sitesi ve Türkçe, İngilizce, Arapça dil desteği sunuyoruz. Avrupa'daki işletmeler için şartlar farklıdır:",
      ],
      list: [
        'Masa standı, NFC stant ve QR kod baskısı yapılmaz; QR kodun baskısı işletme tarafından yaptırılır.',
        'Fotoğraflı menü isteniyorsa ürün fotoğraflarının işletme tarafından sağlanması gerekir.',
      ],
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
      q: 'Birden fazla şubem var, her şube için ayrı menü olabilir mi?',
      a: 'Evet. Şube menüsü desteklenir; her şube kendi menüsüyle yayınlanır ve misafir, bulunduğu şubenin menüsünü görür. Aynı işletmenin farklı bölümleri için de ayrı menüler hazırlanabilir.',
    },
    {
      q: "Avrupa'daki işletmemiz için QR menü hazırlıyor musunuz?",
      a: siteCopy.tr.serviceArea.europe,
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

const nfcTr: ServicePage = {
  route: 'nfc',
  path: routes.nfc.tr,
  serviceId: 'nfc-kart',
  breadcrumb: 'NFC Google Yorum Standı',
  seoTitle: 'NFC Google Yorum ve Instagram Standı | onlinemenu-qr',
  seoDescription:
    'Misafirlerin telefonu yaklaştırarak Google yorumu bırakabildiği ve Instagram hesabınızı takip edebildiği NFC ve QR kodlu stantlar. Şifreli ve korumalı NFC etiketleri.',
  h1: 'NFC Google yorum ve Instagram stantları',
  lede: 'Misafirleriniz telefonlarını standa yaklaştırır; Google yorum sayfanız veya Instagram hesabınız tek dokunuşla açılır. NFC özelliği olmayan telefonlar için her stantta QR kod da bulunur.',
  heroMedia: media('tr', 'nfc-kart'),
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
      media: media('tr', 'nfc-kart'),
    },
    {
      kind: 'text',
      id: 'guvenlik',
      title: 'Şifreli ve korumalı NFC etiketleri',
      paragraphs: [
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
    {
      kind: 'text',
      id: 'hizmet-bolgesi',
      title: 'Hizmet bölgesi',
      paragraphs: [
        `${siteCopy.tr.serviceArea.stands} Türkiye'nin tüm illerindeki işletmeler stant talebinde bulunabilir.`,
        "Avrupa'daki işletmeler için NFC stant hazırlanmaz; bu işletmelere dijital QR menü, web sitesi ve çoklu dil hizmetleri sunulur.",
      ],
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
      q: 'Standın yönlendirdiği adres sonradan değiştirilebilir mi?',
      a: 'Hayır. Güvenlik gereği NFC etiketi ve QR kod üretim sırasında tek bir adrese sabitlenir ve sonradan değiştirilemez. Bu nedenle yönlendirilecek Google yorum sayfası, Instagram hesabı veya diğer adresler sipariş aşamasında birlikte netleştirilir. Farklı bir adres için ayrı stant hazırlanır.',
    },
    {
      q: "Avrupa'daki işletmeler için NFC stant hazırlıyor musunuz?",
      a: `Hayır. ${siteCopy.tr.serviceArea.stands} Avrupa'daki işletmelere dijital QR menü, web sitesi ve çoklu dil hizmetleri sunuyoruz.`,
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

const qrMenuEn: ServicePage = {
  route: 'qrMenu',
  path: routes.qrMenu.en,
  serviceId: 'qr-menu',
  breadcrumb: 'QR Code Menu',
  seoTitle: 'QR Code Menu for Restaurants & Cafés | onlinemenu-qr',
  seoDescription:
    'Digital QR code menus for restaurants and cafés in Europe and Türkiye: update prices from your dashboard, menus in English, Turkish and Arabic, custom design.',
  h1: 'QR code menus for restaurants and cafés',
  lede: 'Guests scan the QR code on the table and your menu opens on their phone. You change prices and dishes in the dashboard, so the menu is always up to date.',
  heroMedia: media('en', 'qr-menu'),
  blocks: [
    {
      kind: 'text',
      id: 'what-is-a-qr-code-menu',
      title: 'What is a QR code menu?',
      paragraphs: [
        'A QR code menu is a digital version of your menu, published online. A QR code on the table, the counter or at the entrance opens it straight in the browser when a guest points their phone camera at it.',
        'Guests do not need to download an app, sign up or change any settings. Dish names, descriptions, prices and photos are laid out for a phone screen.',
      ],
    },
    {
      kind: 'steps',
      id: 'how-it-works',
      title: 'How does a QR code menu work?',
      steps: [
        { title: 'The guest scans the QR code', body: 'They point their phone camera at the code on the table and tap the link that appears.' },
        { title: 'The menu opens in the browser', body: 'Categories, dishes and prices appear quickly and clearly, in a design made for your venue.' },
        { title: 'You update it from the dashboard', body: 'Price, dish and photo changes are made in the dashboard and go live straight away.' },
      ],
    },
    {
      kind: 'text',
      id: 'dashboard',
      title: 'Update your menu in real time',
      paragraphs: [
        'With a printed menu, every price change means paying for a new print run and waiting for it. With a digital QR code menu you make the change in the dashboard in a few minutes, and guests see it as soon as you save.',
      ],
      list: [
        'Add, edit and remove dishes',
        'Update prices',
        'Change descriptions and photos',
        'Organise and reorder categories',
        'Hide dishes that are temporarily unavailable',
      ],
    },
    {
      kind: 'text',
      id: 'custom-design',
      title: 'Designed for your venue',
      paragraphs: [
        'Your menu is not dropped into a ready-made template. It is designed around your logo, brand colours and the style of your venue, so guests get the same feel on their phone as they do at the table.',
        'If you like, the same design carries over to your website, so your business looks consistent everywhere guests find you online.',
      ],
    },
    {
      kind: 'text',
      id: 'multilingual-menu',
      title: 'Menus in English, Turkish and Arabic',
      paragraphs: [
        'If you welcome guests from abroad, your menu can be in English, Turkish and Arabic. Guests pick their language inside the menu.',
        'Arabic is displayed right-to-left: text alignment and page layout switch automatically with the language.',
      ],
    },
    {
      kind: 'media',
      id: 'qr-code-and-stands',
      title: 'Your QR code and table stands',
      paragraphs: [
        'The QR code points to the fixed address of your menu. When you change the menu, the code stays the same and nothing needs reprinting.',
        'For businesses in Türkiye we also produce table stands with your logo and colours. Businesses in Europe receive their QR code and have it printed locally.',
      ],
      media: media('en', 'qr-menu'),
    },
    {
      kind: 'text',
      id: 'benefits',
      title: 'Why switch from a printed menu?',
      paragraphs: ['A digital QR code menu replaces the printed menu and saves you both money and time.'],
      list: [
        'No reprinting costs when prices or dishes change.',
        'Changes go live immediately, so no table is left with old prices.',
        'The menu can be offered in more than one language.',
        'Dish photos help guests decide.',
        'No more worn, stained or missing menus.',
      ],
    },
    {
      kind: 'text',
      id: 'who-is-it-for',
      title: 'Who is it for?',
      paragraphs: ['A digital QR code menu suits any food and drink business that wants to give guests a fast, up-to-date menu.'],
      list: ['Cafés and coffee shops', 'Restaurants', 'Bakeries and patisseries', 'Lounges and bars', 'Businesses with several venues or branches'],
    },
    {
      kind: 'text',
      id: 'qr-code-menus-in-europe',
      title: 'QR code menus for businesses in Europe',
      paragraphs: [
        'We set up digital QR code menus, websites and multilingual menus for cafés and restaurants in Europe. Setup and updates are done remotely, so it does not matter which city you are in.',
        'Terms for businesses in Europe:',
      ],
      list: [
        'Table stands, NFC stands and QR code printing are not available; you have the QR code printed locally.',
        'If you want a menu with photos, your business provides the product photos.',
      ],
    },
    {
      kind: 'clients',
      id: 'live-examples',
      title: 'Live menu examples',
      paragraphs: ['These businesses run their menus on onlinemenu-qr. Open the links to see the menus the way their guests do.'],
    },
  ],
  faq: [
    {
      q: 'Does a QR code menu need an internet connection?',
      a: "The menu opens over the internet on the guest's phone. Their mobile data or your venue's Wi-Fi is enough.",
    },
    {
      q: 'Can I update the menu without changing the QR code?',
      a: 'Yes. The QR code points to the fixed address of your menu, so every change you make shows up behind the same code.',
    },
    {
      q: 'Can I add photos of my dishes?',
      a: 'Yes. Each item can have a photo and a description, optimised to load quickly on phones. Businesses in Europe provide their own product photos.',
    },
    {
      q: 'I have several branches. Can each one have its own menu?',
      a: 'Yes. Each branch is published with its own menu and guests see the menu of the branch they are in. Separate menus can also be set up for different areas of the same venue.',
    },
    {
      q: 'Do you set up QR code menus for businesses in Europe?',
      a: `Yes. ${siteCopy.en.serviceArea.europe}`,
    },
    {
      q: 'How much does a QR code menu cost?',
      a: 'The price depends on the number of items, the languages and the scope of the design. Fill in the contact form to get a quote for your business.',
    },
  ],
  cta: {
    title: 'Get a quote for your QR code menu',
    body: "Fill in the form or give us a call, and we'll prepare a quote based on the size of your menu and what you need.",
  },
};

const nfcEn: ServicePage = {
  route: 'nfc',
  path: routes.nfc.en,
  serviceId: 'nfc-kart',
  breadcrumb: 'NFC Google Review Stand',
  seoTitle: 'NFC Google Review & Instagram Stands | onlinemenu-qr',
  seoDescription:
    'NFC and QR code stands that take guests straight to your Google review page or Instagram profile with one tap. Locked NFC tags. For businesses in Türkiye.',
  h1: 'NFC Google review and Instagram stands',
  lede: 'Guests tap their phone on the stand and your Google review page or Instagram profile opens. Every stand also has a QR code for phones without NFC. Stands are available for businesses in Türkiye only.',
  heroMedia: media('en', 'nfc-kart'),
  blocks: [
    {
      kind: 'text',
      id: 'what-is-an-nfc-stand',
      title: 'What is an NFC stand?',
      paragraphs: [
        'NFC (Near Field Communication) lets a phone read a tag a few centimetres away without touching it. It is the same technology used for contactless card payments.',
        'An NFC stand has a tag inside that sends the phone to a set address. When a guest holds their phone near the stand, your Google review page, your Instagram profile or another link you choose opens on the screen.',
      ],
    },
    {
      kind: 'steps',
      id: 'how-it-works',
      title: 'How does an NFC stand work?',
      steps: [
        { title: 'The guest taps the stand', body: 'They hold the top back of their unlocked phone near the NFC area on the stand.' },
        { title: 'A notification appears', body: 'The phone reads the tag and shows a link notification; the guest taps it.' },
        { title: 'The page opens', body: 'The Google review window or Instagram profile opens directly. Without NFC, the guest scans the QR code on the stand.' },
      ],
    },
    {
      kind: 'text',
      id: 'google-review-stand',
      title: 'Google review stand',
      paragraphs: [
        'Google Maps and Search list businesses with their number of reviews and rating. Many happy guests would leave a review, but searching for the business, finding the profile and getting to the review form makes them give up.',
        'A Google review stand removes those steps. It takes guests straight to the review window for your business, so all they need to do is add their rating and comment.',
      ],
    },
    {
      kind: 'text',
      id: 'instagram-stand',
      title: 'Instagram follow stand',
      paragraphs: [
        'An Instagram follow stand opens your Instagram profile. Guests do not have to search for your username; they open your profile and follow you with one tap.',
        'It also makes it easier for guests who post from your venue to tag you, which helps your business get seen on social media.',
      ],
    },
    {
      kind: 'media',
      id: 'nfc-and-qr',
      title: 'NFC and a QR code on every stand',
      paragraphs: [
        'All our stands have both an NFC tag and a QR code, so guests whose phones have no NFC, or have it switched off, reach the same page through the QR code.',
        'The wording and icons on the stand are designed to show guests what to do without any explanation.',
      ],
      media: media('en', 'nfc-kart'),
    },
    {
      kind: 'text',
      id: 'security',
      title: 'Locked, protected NFC tags',
      paragraphs: [
        'Unprotected NFC tags can be rewritten by anyone with the right app, sending guests to an unwanted page. onlinemenu-qr NFC tags are locked and protected, so no unauthorised person can change where they point.',
        "Your stands do not put your guests at risk and protect your business's reputation.",
      ],
    },
    {
      kind: 'text',
      id: 'compatible-phones',
      title: 'Which phones does it work with?',
      paragraphs: [
        'Current iPhone and Android phones with NFC can read the stands. iPhone XS and later models read NFC tags without an extra app or setting.',
        'On Android phones NFC needs to be switched on in settings. Whenever NFC is not available, scanning the QR code on the stand with the camera opens the same page.',
      ],
    },
    {
      kind: 'text',
      id: 'where-to-use',
      title: 'Where do stands work best?',
      paragraphs: ['Stands work best where guests are most likely to say they enjoyed their visit.'],
      list: ['Tables', 'Till and payment point', 'Counter and bar', 'Entrance and waiting area'],
    },
    {
      kind: 'text',
      id: 'service-area',
      title: 'Where are stands available?',
      paragraphs: [
        `${siteCopy.en.serviceArea.stands} Businesses in any province of Türkiye can order stands.`,
        'We do not produce NFC stands for businesses in Europe; for them we offer digital QR code menus, websites and multilingual menus.',
      ],
    },
  ],
  faq: [
    {
      q: 'Do guests need an app to leave a review?',
      a: 'No. When the phone reads the stand, the Google review page opens in the browser or in the Google Maps app if it is installed. Guests only need to be signed in to their Google account.',
    },
    {
      q: 'Does an NFC stand need batteries or power?',
      a: 'No. NFC tags draw their energy from the phone that reads them; no battery, charging or power supply is needed.',
    },
    {
      q: 'Do the stands affect our Google rating?',
      a: 'The stand only makes it easier to leave a review; guests choose their own rating and comment. Under Google guidelines, you should not offer discounts, gifts or other incentives in exchange for reviews.',
    },
    {
      q: 'Can the link on the stand be changed later?',
      a: 'No. For security, the NFC tag and QR code are fixed to a single address during production and cannot be changed afterwards. That is why the Google review page, Instagram account or other links are confirmed when you order. A different link needs a separate stand.',
    },
    {
      q: 'Do you make NFC stands for businesses in Europe?',
      a: `No. ${siteCopy.en.serviceArea.stands} For businesses in Europe we offer digital QR code menus, websites and multilingual menus.`,
    },
    {
      q: 'How much does an NFC stand cost?',
      a: 'The price depends on the number of stands, the type of stand and the scope of the design. Fill in the contact form to get a quote for your business.',
    },
  ],
  cta: {
    title: 'Get a quote for NFC review and Instagram stands',
    body: "Tell us how many stands you need and which accounts they should open, and we'll prepare a quote for your business.",
  },
};

export const servicePages: Record<Lang, ServicePage[]> = {
  tr: [qrMenuTr, nfcTr],
  en: [qrMenuEn, nfcEn],
};

export const servicePage = (lang: Lang, route: RouteKey) => {
  const page = servicePages[lang].find((p) => p.route === route);
  if (!page) throw new Error(`hizmet sayfası yok: ${lang}/${route}`);
  return page;
};

