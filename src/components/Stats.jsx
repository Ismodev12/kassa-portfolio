import { useEffect, useRef, useState } from 'react';
import { stats } from '../data/content.js';
import { Reveal } from './ui.jsx';

/* Chiffre qui compte de 0 jusqu'à sa valeur quand il entre dans l'écran. */
function Counter({ value }) {
  const [, digits, suffix] = value.match(/^(\d+)(.*)$/) || [null, '0', value];
  const target = Number(digits);
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(target); return undefined; }
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - start) / 1400);
        setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      <span aria-hidden="true">{String(n).padStart(digits.length, '0')}<span className="text-accent">{suffix}</span></span>
      <span className="sr-only">{value}</span>
    </span>
  );
}

/* Quatre chiffres géants en contour, en escalier ; au survol, le chiffre se remplit de bleu. */
const offsets = ['', 'lg:mt-16', 'lg:mt-8', 'lg:mt-24'];

export default function Stats() {
  return (
    <section className="shell pb-16 pt-4 sm:pb-24" aria-label="Quelques chiffres">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 90} className={`group flex flex-col-reverse ${offsets[i]}`}>
            <dt className="mt-4 flex items-center gap-3 border-t border-bone/15 pt-4 text-sm text-mist sm:text-base">
              <span className="font-display text-xs text-accent">0{i + 1}</span>{s.label}
            </dt>
            <dd className="font-display text-transparent [-webkit-text-stroke:1.5px_rgb(var(--c-bone)/.5)] text-[clamp(5rem,11vw,10rem)] font-bold leading-[0.8] tracking-[-0.06em] transition-[color,-webkit-text-stroke-color] duration-500 group-hover:text-accent group-hover:[-webkit-text-stroke-color:transparent]">
              <Counter value={s.value} />
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
