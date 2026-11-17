import { useState } from 'react';
import { skillGroups } from '../data/skills.js';
import { Reveal, Sigil } from './ui.jsx';

/* Compétences en onglets : la liste des domaines à gauche (survol, clic ou clavier),
   les outils du domaine actif apparaissent en grand à droite. */
export default function Skills() {
  const [active, setActive] = useState(0);
  const g = skillGroups[active];
  const total = skillGroups.reduce((n, x) => n + x.items.length, 0);

  return (
    <section id="competences" className="p-2 sm:p-3">
      <div className="relative overflow-hidden rounded-panel bg-bone py-20 text-ink sm:py-28">
        <div className="shell relative">
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-8">
              <p className="eyebrow">( Compétences et outils — {String(total).padStart(2, '0')} )</p>
              <h2 className="mt-6 font-display text-title font-bold">Mes outils{' '}<br />de <span className="mark">défense.</span></h2>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-10">
            {/* Onglets */}
            <div role="tablist" aria-label="Domaines de compétences" aria-orientation="vertical" className="lg:col-span-5">
              {skillGroups.map((x, i) => {
                const on = i === active;
                return (
                  <button
                    key={x.id} type="button" role="tab" id={`tab-${x.id}`} aria-selected={on} aria-controls="skills-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(i)} onMouseEnter={() => setActive(i)}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); const n = (i + 1) % skillGroups.length; setActive(n); document.getElementById(`tab-${skillGroups[n].id}`)?.focus(); }
                      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); const n = (i - 1 + skillGroups.length) % skillGroups.length; setActive(n); document.getElementById(`tab-${skillGroups[n].id}`)?.focus(); }
                    }}
                    className={`group relative flex w-full items-center gap-4 border-t border-ink/15 py-5 text-left transition-[padding,color] duration-500 last:border-b sm:py-6 ${on ? 'pl-4 text-ink' : 'text-ink/40 hover:text-ink/70'}`}
                  >
                    <span aria-hidden="true" className={`absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-full bg-accent transition-transform duration-500 ${on ? 'scale-y-100' : 'scale-y-0'}`} />
                    <span className="w-8 shrink-0 font-display text-sm font-medium">0{i + 1}</span>
                    <span className="font-display text-[clamp(1.4rem,2.4vw,2.2rem)] font-bold leading-tight tracking-[-0.03em]">{x.title}</span>
                    <span className={`ml-auto shrink-0 font-display text-sm ${on ? 'text-accent-deep' : ''}`}>{String(x.items.length).padStart(2, '0')}</span>
                  </button>
                );
              })}
            </div>

            {/* Panneau actif */}
            <div id="skills-panel" role="tabpanel" aria-labelledby={`tab-${g.id}`} className="lg:col-span-7">
              <div key={g.id} className="relative h-full overflow-hidden rounded-[2rem] bg-ink p-7 text-bone sm:p-10">
                <Sigil className="absolute -bottom-16 -right-16 h-64 w-64 animate-spin-slow text-accent opacity-10" />
                <div className="animate-pop-in relative flex items-center gap-4">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-ink">
                    <g.icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{g.title}</h3>
                    <p className="text-mist-dim">{g.caption}</p>
                  </div>
                </div>
                <ul className="relative mt-10 grid grid-cols-2 gap-3 sm:gap-4">
                  {g.items.map((it, k) => (
                    <li
                      key={it.name}
                      className="animate-pop-in group/t flex min-h-[7.5rem] flex-col justify-between rounded-2xl border border-bone/10 bg-bone/[0.04] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-bone/[0.08]"
                      style={{ '--d': `${120 + k * 70}ms`, '--brand': it.brand ? `#${it.brand.hex}` : 'rgb(var(--c-accent))' }}
                    >
                      {it.brand ? (
                        /* Logo officiel : blanc au repos, couleur de la marque au survol */
                        <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current text-bone transition-colors duration-300 group-hover/t:text-[color:var(--brand)]" aria-hidden="true">
                          <path d={it.brand.path} />
                        </svg>
                      ) : (
                        <it.icon className="h-8 w-8 text-accent" aria-hidden="true" />
                      )}
                      <span className="mt-4 font-display text-lg font-bold leading-tight sm:text-xl">{it.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
