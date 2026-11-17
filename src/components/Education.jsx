import { FileBadge2 } from 'lucide-react';
import { education } from '../data/education.js';
import { Arrow, Reveal, Sigil, TodoText } from './ui.jsx';

// Éventail : chaque carte est inclinée ; au survol elle se redresse et passe devant.
const fan = [
  'lg:-rotate-[7deg] lg:translate-y-6',
  'lg:-rotate-[1deg] lg:-translate-y-2',
  'lg:rotate-[6deg] lg:translate-y-8',
];

/* Formations présentées comme des certificats posés en éventail.
   L'emplacement du certificat reste vide tant qu'aucun document réel n'est fourni. */
export default function Education() {
  return (
    <section id="formations" className="relative overflow-hidden py-24 sm:py-32">
      <div className="shell">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <p className="eyebrow text-accent">( Formations — {String(education.length).padStart(2, '0')} )</p>
            <h2 className="mt-6 font-display text-mega font-bold">Formations{' '}<br /><span className="text-mist-dim">& </span><span className="text-accent">certifications</span></h2>
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-6 sm:mt-24 lg:grid-cols-3 lg:gap-0 lg:px-6">
          {education.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 120} className="lg:-mx-3">
              <article
                tabIndex={0}
                className={`group relative flex h-full min-h-[24rem] flex-col rounded-[1.75rem] bg-bone p-3 text-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,.7)] transition-all duration-500 ease-[cubic-bezier(.2,1.2,.3,1)] hover:z-10 hover:!rotate-0 hover:!-translate-y-4 hover:shadow-[0_50px_100px_-30px_rgb(var(--c-accent)/.55)] focus-visible:z-10 focus-visible:!rotate-0 ${fan[i % fan.length]}`}
              >
                {/* Double cadre façon diplôme */}
                <div className="relative flex flex-1 flex-col rounded-[1.25rem] border-2 border-ink/80 p-6 sm:p-7">
                  <div className="absolute inset-1.5 rounded-[1rem] border border-ink/20" aria-hidden="true" />
                  <div className="relative flex items-center justify-between">
                    <span className="eyebrow !text-[0.7rem]">{item.type}</span>
                    <span className="font-display text-sm font-bold text-accent-deep">0{i + 1}</span>
                  </div>
                  <p className="relative mt-6 font-display text-lg font-bold text-accent-deep"><TodoText value={item.date} /></p>
                  {item.status && <p className="relative text-sm text-slate-dim">{item.status}</p>}
                  <h3 className="relative mt-3 font-display text-[clamp(1.6rem,2.4vw,2.2rem)] font-bold leading-[1.02] tracking-[-0.035em]">{item.title}</h3>
                  <p className="relative mt-2 text-slate">{item.organization}</p>

                  <div className="relative mt-auto flex items-end justify-between gap-4 pt-8">
                    <Certificate item={item} />
                    <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-ink text-accent transition-transform duration-700 group-hover:rotate-180" aria-hidden="true">
                      <Sigil className="h-8 w-8" />
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Certificate({ item }) {
  const cert = item.certificate;
  if (!cert) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-ink/40 px-3.5 py-2 text-sm text-slate-dim">
        <FileBadge2 className="h-4 w-4" aria-hidden="true" />
        Certificat à ajouter
      </span>
    );
  }
  return (
    <a href={cert.src} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-ink py-1.5 pl-4 pr-1.5 font-display text-sm font-bold text-bone">
      Voir le certificat
      <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-ink"><Arrow className="h-3.5 w-3.5" /></span>
    </a>
  );
}
