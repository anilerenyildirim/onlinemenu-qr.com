import type { Lang } from '../i18n';
import { siteCopy } from './site';

export interface Faq {
  q: string;
  a: string;
}

/** Ana sayfa SSS — genel sorular. Hizmete özel sorular ilgili sayfanın verisinde. */
export const homeFaq: Record<Lang, Faq[]> = {
  tr: [
    {
      q: 'QR menüyü kullanmak için misafirin uygulama indirmesi gerekir mi?',
      a: 'Hayır. Misafir telefonunun kamerasıyla masadaki QR kodu okutur ve menü doğrudan tarayıcıda açılır. Herhangi bir uygulama veya üyelik gerekmez.',
    },
    {
      q: 'Menüdeki fiyatları ve ürünleri kendimiz güncelleyebilir miyiz?',
      a: 'Evet. Ürün, fiyat, açıklama ve fotoğraf değişikliklerini yönetim panelinden kendiniz yaparsınız. Değişiklik kaydedildiği anda masadaki menüye yansır; QR kodu yeniden bastırmanız gerekmez.',
    },
    {
      q: 'NFC stantları hangi telefonlarla çalışır?',
      a: 'NFC özelliği bulunan güncel iPhone ve Android telefonlarda telefonu standa yaklaştırmak yeterlidir. NFC özelliği olmayan veya kapalı olan telefonlar için her stantta QR kod da bulunur.',
    },
    {
      q: 'NFC etiketleri güvenli mi?',
      a: 'NFC etiketlerimiz şifreli ve korumalıdır. Etiketin yönlendirdiği adres yetkisiz kişilerce değiştirilemez; misafirleriniz farklı bir sayfaya yönlendirilme riskiyle karşılaşmaz.',
    },
    {
      q: 'Menü birden fazla dilde sunulabilir mi?',
      a: 'Evet. Menünüz ve web siteniz Türkçe, İngilizce ve Arapça olarak hazırlanabilir. Arapça içerik, sağdan sola okuma düzenine uygun şekilde gösterilir.',
    },
    {
      q: 'Menü tasarımında logomuz ve kurumsal renklerimiz kullanılır mı?',
      a: 'Evet. Tasarım hazır bir şablondan değil, işletmenizin logosu, renkleri ve tarzı esas alınarak hazırlanır.',
    },
    {
      q: 'Hangi bölgelerde hizmet veriyorsunuz?',
      a: `${siteCopy.tr.serviceArea.short} ${siteCopy.tr.serviceArea.europe}`,
    },
    {
      q: 'Kurulum ne kadar sürer?',
      a: 'Süre; menünüzdeki ürün sayısına, dil seçeneklerine ve talep ettiğiniz hizmetlere göre değişir. İlk görüşmede işletmenize özel takvim net olarak paylaşılır.',
    },
    {
      q: 'Fiyatlandırma nasıl belirleniyor?',
      a: 'Her işletme için hizmet kapsamı, dil sayısı ve stant adedine göre özel teklif hazırlanır. Teklif almak için sayfadaki formu doldurmanız veya bizi aramanız yeterlidir.',
    },
  ],
  en: [
    {
      q: 'Do guests need to download an app to use the QR code menu?',
      a: 'No. Guests scan the QR code on the table with their phone camera and the menu opens straight in the browser. No app, no sign-up.',
    },
    {
      q: 'Can we update prices and dishes ourselves?',
      a: 'Yes. You change dishes, prices, descriptions and photos in the dashboard. Changes appear on the menu as soon as you save them, and the QR code on the table stays the same, so nothing needs reprinting.',
    },
    {
      q: 'Do you work with businesses outside Türkiye?',
      a: `Yes. ${siteCopy.en.serviceArea.europe}`,
    },
    {
      q: 'Which languages can the menu be in?',
      a: 'Your menu and website can be in English, Turkish and Arabic. Guests choose the language inside the menu, and Arabic is shown right-to-left.',
    },
    {
      q: 'Is the menu designed with our logo and brand colours?',
      a: 'Yes. The design is not a template. It is built around your logo, your colours and the style of your venue.',
    },
    {
      q: 'Do you offer NFC review stands?',
      a: `${siteCopy.en.serviceArea.stands} Every stand has an NFC tag and a QR code that take guests to your Google review page or Instagram profile.`,
    },
    {
      q: 'How long does setup take?',
      a: 'It depends on the number of items on your menu, the languages and the services you need. We share a clear timeline for your business in the first call.',
    },
    {
      q: 'How is pricing set?',
      a: 'Every business gets its own quote based on the scope of work and the number of languages. Fill in the form on this page or call us to get one.',
    },
  ],
};
