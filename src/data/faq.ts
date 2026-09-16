import { site } from './site';

export interface Faq {
  q: string;
  a: string;
}

/** Ana sayfa SSS — genel sorular. Hizmete özel sorular ilgili sayfanın verisinde. */
export const homeFaq: Faq[] = [
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
    a: `${site.serviceArea.short} ${site.serviceArea.europe}`,
  },
  {
    q: 'Kurulum ne kadar sürer?',
    a: 'Süre; menünüzdeki ürün sayısına, dil seçeneklerine ve talep ettiğiniz hizmetlere göre değişir. İlk görüşmede işletmenize özel takvim net olarak paylaşılır.',
  },
  {
    q: 'Fiyatlandırma nasıl belirleniyor?',
    a: 'Her işletme için hizmet kapsamı, dil sayısı ve stant adedine göre özel teklif hazırlanır. Teklif almak için sayfadaki formu doldurmanız veya bizi aramanız yeterlidir.',
  },
];
