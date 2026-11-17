import { useCallback, useState } from 'react';
import { projects } from '../data/projects.js';
import { isTodo } from '../data/todo.js';
import ProjectDetails from './ProjectDetails.jsx';
import { Arrow, Reveal } from './ui.jsx';

const pad = (n) => String(n).padStart(2, '0');

/* Projets — « index + aperçu » :
   à gauche la liste des sept projets en grand ; à droite, une photo collée à l'écran
   qui change (fondu + zoom) selon le projet survolé. Un clic ouvre la fiche détaillée.
   Sur mobile : une carte par projet, avec sa photo. */
export default function Projects() {
  const [active, setActive] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);
  const close = useCallback(() => setOpenIndex(null), []);
  const go = useCallback(
    (delta) => setOpenIndex((i) => (i === null ? i : (i + delta + projects.length) % projects.length)),
    [],
  );
  const p = projects[active];

  return (
    <section id="projets" className="py-24 sm:py-32">
      <div className="shell">
        <div className="flex items-end justify-between gap-8">
          <Reveal>
            <p className="eyebrow text-accent">( Projets — {pad(projects.length)} )</p>
            <h2 className="mt-6 font-display text-mega font-bold">
              De l’analyse{' '}<br /><span className="text-accent">à la solution</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 sm:mt-20 lg:grid-cols-12 lg:gap-14">
          {/* Liste */}
          <ol className="border-b border-bone/10 lg:col-span-7">
            {projects.map((x, i) => {
              const on = i === active;
              return (
                <li key={x.id} className="border-t border-bone/10">
                  {/* Photo (mobile uniquement) */}
                  <button type="button" onClick={() => setOpenIndex(i)} className="relative mt-6 block w-full overflow-hidden rounded-[1.5rem] lg:hidden" aria-label={`Ouvrir la fiche : ${x.title}`}>
                    <img src={x.photo} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />
                    <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 text-[0.65rem] text-bone/80 backdrop-blur">Photo d’illustration</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-haspopup="dialog"
                    className="group relative flex w-full items-center gap-5 py-6 text-left lg:py-7"
                  >
                    <span aria-hidden="true" className={`absolute left-0 top-1/2 hidden h-10 w-1 -translate-y-1/2 rounded-full bg-accent transition-transform duration-500 lg:block ${on ? 'scale-y-100' : 'scale-y-0'}`} />
                    <span className={`w-8 shrink-0 font-display text-sm transition-all duration-500 lg:pl-4 ${on ? 'text-accent' : 'text-mist-dim'}`}>{pad(i + 1)}</span>
                    <span className={`min-w-0 flex-1 transition-[transform,color] duration-500 lg:pl-4 ${on ? 'lg:translate-x-3 text-bone' : 'text-bone lg:text-bone/45'}`}>
                      <span className="block font-display text-[clamp(1.45rem,2.6vw,2.4rem)] font-bold leading-[1.08] tracking-[-0.035em]">{x.title}</span>
                      <span className="mt-2 block text-sm text-mist-dim">
                        {x.kind}{!isTodo(x.year) && <> · {x.year}</>}
                      </span>
                    </span>
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-all duration-500 ${on ? 'border-accent bg-accent text-ink lg:rotate-45' : 'border-bone/20 text-bone'}`}>
                      <Arrow className="h-4 w-4" />
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Aperçu collant (grand écran) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] max-h-[calc(100svh-9rem)] w-full overflow-hidden rounded-panel bg-card">
                {projects.map((x, i) => (
                  <img
                    key={x.id} src={x.photo} alt={i === active ? `Illustration : ${x.title}` : ''} loading="lazy"
                    className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out ${i === active ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
                  />
                ))}
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-[0.7rem] text-bone/80 backdrop-blur">Photo d’illustration</span>
                <span aria-hidden="true" className="absolute right-5 top-2 font-display text-[7rem] font-bold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_rgb(var(--c-bone)/.5)]">{pad(active + 1)}</span>

                <div key={p.id} className="absolute inset-x-0 bottom-0 p-7">
                  <p className="animate-pop-in line-clamp-3 text-bone/90">{p.summary}</p>
                  {p.highlights.length > 0 && (
                    <ul className="animate-pop-in mt-4 flex flex-wrap gap-2" style={{ '--d': '80ms' }}>
                      {p.highlights.map((h) => (
                        <li key={h.label} className="flex items-baseline gap-1.5 rounded-full bg-accent px-3 py-1 text-xs text-ink">
                          <span className="font-display text-sm font-bold">{h.value}</span>{h.label}
                        </li>
                      ))}
                    </ul>
                  )}
                  <button
                    type="button" onClick={() => setOpenIndex(active)} aria-haspopup="dialog"
                    className="animate-pop-in group mt-6 inline-flex items-center gap-3 rounded-full bg-bone py-1.5 pl-5 pr-1.5 font-display text-sm font-bold text-ink transition-colors hover:bg-accent"
                    style={{ '--d': '140ms' }}
                  >
                    Voir la fiche
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-bone transition-transform duration-500 group-hover:rotate-45"><Arrow className="h-4 w-4" /></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openIndex !== null && (
        <ProjectDetails
          project={projects[openIndex]}
          index={openIndex}
          total={projects.length}
          onClose={close}
          onPrev={() => go(-1)}
          onNext={() => go(1)}
        />
      )}
    </section>
  );
}
