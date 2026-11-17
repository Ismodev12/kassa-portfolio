import { useEffect, useRef, useState } from 'react';
import { Megaphone, Radar, ScanSearch, ShieldCheck } from 'lucide-react';
import { method } from '../data/content.js';
import { Reveal } from './ui.jsx';

/* 0 quand le bloc entre par le bas de l'écran (85 %), 1 quand il atteint 25 % du haut. */
function useFill(ref) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      setV(Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.6))));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, [ref]);
  return v;
}

const icons = [ScanSearch, Radar, ShieldCheck, Megaphone];

/* Méthode — quatre étapes côte à côte (grand écran), reliées par une ligne
   qui se remplit au fil du scroll ; chaque étape s'allume quand la ligne l'atteint.
   Sur mobile : même principe à la verticale. */
export default function Method() {
  const ref = useRef(null);
  const fill = useFill(ref);

  return (
    <section className="relative overflow-hidden py-24 sm:py-32" aria-labelledby="methode-titre">
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 -z-10 h-[30rem] w-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[140px]" />
      <div className="shell">
        <Reveal className="text-center">
          <p className="eyebrow text-accent">( Démarche — 04 étapes )</p>
          <h2 id="methode-titre" className="mt-6 font-display text-mega font-bold">Ma <span className="mark">méthode</span></h2>
        </Reveal>

        <div ref={ref} className="relative mt-16 sm:mt-24">
          {/* Ligne horizontale (grand écran) */}
          <span aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-bone/15 lg:block" />
          <span
            aria-hidden="true"
            className="absolute left-[12.5%] top-8 hidden h-[2px] origin-left bg-accent shadow-[0_0_14px_2px_rgb(var(--c-accent)/.6)] lg:block"
            style={{ width: '75%', transform: `scaleX(${fill})` }}
          />
          {/* Ligne verticale (mobile) */}
          <span aria-hidden="true" className="absolute bottom-8 left-8 top-8 w-px bg-bone/15 lg:hidden" />
          <span aria-hidden="true" className="absolute left-8 top-8 w-[2px] origin-top bg-accent lg:hidden" style={{ height: `calc((100% - 4rem) * ${fill})` }} />

          <ol className="relative grid gap-12 lg:grid-cols-4 lg:gap-8">
            {method.map((s, i) => {
              const Icon = icons[i];
              const on = fill >= i / (method.length - 1) - 0.02;
              return (
                <li key={s.n} className="relative flex gap-6 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
                  <span
                    className={`relative z-10 grid h-16 w-16 shrink-0 place-items-center rounded-full border-2 transition-all duration-500 ${on ? 'scale-110 border-accent bg-accent text-ink shadow-[0_0_40px_8px_rgb(var(--c-accent)/.35)]' : 'border-bone/20 bg-ink text-mist-dim'}`}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div className={`transition-all duration-700 lg:mt-8 ${on ? 'opacity-100 lg:translate-y-0' : 'opacity-40 lg:translate-y-3'}`}>
                    <p className={`font-display text-[clamp(3.5rem,6vw,5.5rem)] font-bold leading-[0.85] tracking-[-0.06em] transition-colors duration-700 ${on ? 'text-accent' : 'text-transparent [-webkit-text-stroke:1.5px_rgb(var(--c-bone)/.3)]'}`}>
                      {s.n}
                    </p>
                    <h3 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em]">{s.title}</h3>
                    <p className="mx-auto mt-2 max-w-[16rem] text-mist lg:text-[1.05rem]">{s.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
