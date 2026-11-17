import { useEffect, useState } from 'react';

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Texte qui se « déchiffre » : caractères aléatoires puis le vrai texte, lettre par lettre. */
export function useScramble(text, { delay = 300, duration = 1300 } = {}) {
  const [out, setOut] = useState(reduced() ? text : '');
  const [done, setDone] = useState(reduced());

  useEffect(() => {
    if (reduced()) return undefined;
    const glyphs = '01#$%&*<>/\\[]{}=+?ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let raf;
    let start;
    const tick = (t) => {
      start ??= t;
      const p = Math.max(0, (t - start - delay) / duration);
      const fixed = Math.floor(p * text.length);
      setOut(
        text
          .split('')
          .map((c, i) => (i < fixed ? c : glyphs[Math.floor(Math.random() * glyphs.length)]))
          .join(''),
      );
      if (p < 1) raf = requestAnimationFrame(tick);
      else { setOut(text); setDone(true); }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, delay, duration]);

  return [out, done];
}

/** Progression (0 → 1) du défilement à travers un élément : 0 quand son haut atteint
 *  le haut de l'écran, 1 quand son bas atteint le bas de l'écran. */
export function useScrollProgress(ref) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.4;
      const v = (window.innerHeight * 0.6 - r.top) / Math.max(1, total);
      setP(Math.min(1, Math.max(0, v)));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, [ref]);
  return p;
}

export const prefersReducedMotion = reduced;
