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

initHeader();
initReveal();
initLogoLoop();
initSpotlight();
initMagnet();
