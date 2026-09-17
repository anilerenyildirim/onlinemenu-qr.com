/**
 * Sayfa davranışları — hydration gerektirmeyen tüm etkileşim burada.
 *   header   : scroll'da blur zemin
 *   reveal   : bölümlerin tek seferlik girişi
 *   logoloop : şerit hızını px/sn'ye çevirir
 *   spotlight: kart ışığının konumu (React Bits SpotlightCard mantığı)
 *   magnet   : CTA'nın imlece hafifçe çekilmesi (React Bits Magnet mantığı)
 */

const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  let ticking = false;
  const update = () => {
    header.toggleAttribute('data-scrolled', scrollY > 8);
    ticking = false;
  };
  addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
}

function initReveal() {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  els.forEach((el) => io.observe(el));
}

function initLogoLoop() {
  document.querySelectorAll<HTMLElement>('[data-logoloop]').forEach((loop) => {
    const seq = loop.querySelector<HTMLElement>('.loop-seq');
    const speed = Number(loop.dataset.speed) || 36;
    if (!seq) return;
    const apply = () => {
      const width = seq.getBoundingClientRect().width;
      if (width > 0) loop.style.setProperty('--loop-duration', `${(width / speed).toFixed(2)}s`);
    };
    new ResizeObserver(apply).observe(seq);
  });
}

function initSpotlight() {
  if (!finePointer.matches) return;
  addEventListener(
    'pointermove',
    (e) => {
      const card = (e.target as Element | null)?.closest?.<HTMLElement>('[data-spotlight]');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
    },
    { passive: true },
  );
}

function initMagnet() {
  if (!finePointer.matches || reducedMotion.matches) return;
  const PADDING = 60;
  const STRENGTH = 6; // orijinal: offset / magnetStrength
  const MAX = 6; // px — "hafif" çekim tavanı

  const magnets = [...document.querySelectorAll<HTMLElement>('[data-magnet]')]
    .map((wrap) => ({ wrap, inner: wrap.firstElementChild as HTMLElement | null }))
    .filter((m): m is { wrap: HTMLElement; inner: HTMLElement } => m.inner !== null);
  if (!magnets.length) return;

  magnets.forEach(({ inner }) => {
    inner.style.willChange = 'transform';
  });

  let frame = 0;
  let px = 0;
  let py = 0;
  const clamp = (v: number) => Math.max(-MAX, Math.min(MAX, v));

  const update = () => {
    frame = 0;
    for (const { wrap, inner } of magnets) {
      const { left, top, width, height } = wrap.getBoundingClientRect();
      const cx = left + width / 2;
      const cy = top + height / 2;
      const active = Math.abs(px - cx) < width / 2 + PADDING && Math.abs(py - cy) < height / 2 + PADDING;
      inner.style.transition = active ? 'transform 0.3s ease-out' : 'transform 0.5s ease-in-out';
      inner.style.transform = active ? `translate3d(${clamp((px - cx) / STRENGTH)}px, ${clamp((py - cy) / STRENGTH)}px, 0)` : '';
    }
  };

  addEventListener(
    'pointermove',
    (e) => {
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = requestAnimationFrame(update);
    },
    { passive: true },
  );
}

/**
 * GEÇİCİ form gönderimi — /api/contact (aşama 3) yazılana kadar doğrulanmış talebi
 * WhatsApp mesajı olarak açar. Hiçbir veri tarayıcıda saklanmaz.
 */
const formText = {
  tr: {
    invalidPhone: 'Geçerli bir telefon numarası girin (örn. 0532 123 45 67 veya +49 151 2345 6789).',
    checkFields: 'Lütfen işaretli alanları kontrol edin.',
    noChannel: 'Talep şu an iletilemedi. Lütfen bizi telefonla arayın.',
    greeting: 'Merhaba, onlinemenu-qr için teklif almak istiyorum.',
    name: 'Ad soyad',
    business: 'İşletme',
    phone: 'Telefon',
    email: 'E-posta',
    services: 'İlgilendiğim hizmetler',
    message: 'Mesaj',
    sent: 'WhatsApp açıldı. Mesajı göndermeniz yeterli; en kısa sürede size dönüş yapacağız.',
  },
  en: {
    invalidPhone: 'Please enter a valid phone number with country code (e.g. +49 151 2345 6789).',
    checkFields: 'Please check the highlighted fields.',
    noChannel: 'Your request could not be sent right now. Please give us a call.',
    greeting: "Hello, I'd like a quote for onlinemenu-qr.",
    name: 'Name',
    business: 'Business',
    phone: 'Phone',
    email: 'Email',
    services: 'Services',
    message: 'Message',
    sent: "WhatsApp has opened. Just send the message and we'll get back to you soon.",
  },
};

function initContactForm() {
  const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
  const status = document.querySelector<HTMLElement>('[data-form-status]');
  if (!form || !status) return;

  // Türkiye: 05xx / 0212 … (başında 0, 90 veya +90 olabilir). Yurt dışı: + veya 00 ile ülke kodu, 8–15 hane.
  const TR_PHONE = /^(?:\+?90|0)?[2-5]\d{9}$/;
  const INTL_PHONE = /^(?:\+|00)(?!90)[1-9]\d{7,14}$/;
  const phone = form.elements.namedItem('phone') as HTMLInputElement;
  const waNumber = form.dataset.wa;
  const text = document.documentElement.lang === 'en' ? formText.en : formText.tr;

  const show = (text: string, tone: 'ok' | 'error') => {
    status.textContent = text;
    status.dataset.tone = tone;
    status.hidden = false;
  };

  phone.addEventListener('input', () => {
    phone.setCustomValidity('');
    phone.removeAttribute('aria-invalid');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const digits = phone.value.replace(/[\s()-]/g, '');
    const phoneOk = TR_PHONE.test(digits) || INTL_PHONE.test(digits);
    phone.setCustomValidity(digits && !phoneOk ? text.invalidPhone : '');

    if (!form.checkValidity()) {
      form.querySelectorAll<HTMLInputElement>('input, textarea').forEach((el) => {
        el.toggleAttribute('aria-invalid', !el.validity.valid);
      });
      form.reportValidity();
      show(text.checkFields, 'error');
      return;
    }
    if (!waNumber) {
      show(text.noChannel, 'error');
      return;
    }

    const data = new FormData(form);
    const labels = [...form.querySelectorAll<HTMLInputElement>('input[name="services"]:checked')].map(
      (el) => el.nextElementSibling?.textContent?.trim() ?? el.value,
    );
    const lines = [
      text.greeting,
      '',
      `${text.name}: ${data.get('name')}`,
      `${text.business}: ${data.get('business')}`,
      `${text.phone}: ${data.get('phone')}`,
      data.get('email') ? `${text.email}: ${data.get('email')}` : '',
      labels.length ? `${text.services}: ${labels.join(', ')}` : '',
      data.get('message') ? `${text.message}: ${data.get('message')}` : '',
    ].filter((line, i) => line !== '' || i === 1);

    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
    show(text.sent, 'ok');
    form.reset();
  });
}

initHeader();
initReveal();
initLogoLoop();
initSpotlight();
initMagnet();
initContactForm();
