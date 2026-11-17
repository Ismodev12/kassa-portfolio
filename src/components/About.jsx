import { useEffect, useRef, useState } from 'react';
import { profile } from '../config/profile.js';
import { aboutFacts, aboutParagraphs } from '../data/content.js';
import { Media, Reveal, Sigil } from './ui.jsx';

const Hl = ({ children }) => <span className="text-accent-deep">{children}</span>;

// Les mots écrits entre *étoiles* dans l'admin sont mis en couleur.
const emphasize = (text) =>
  String(text)
    .split(/(\*[^*]+\*)/g)
    .map((part, i) => (/^\*[^*]+\*$/.test(part) ? <Hl key={i}>{part.slice(1, -1)}</Hl> : part));

/* Paragraphe qui s'allume quand il passe au centre de l'écran. */
function FocusParagraph({ children, index }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: '-35% 0px -35% 0px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <p ref={ref} className={`flex gap-5 font-display text-[clamp(1.4rem,2.4vw,2.2rem)] font-medium leading-[1.25] tracking-tight transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-25 max-md:opacity-100'}`}>
      <span className={`mt-[0.5em] shrink-0 text-xs transition-colors duration-500 ${on ? 'text-accent-deep' : 'text-slate-dim'}`}>{String(index + 1).padStart(2, '0')}</span>
      <span>{children}</span>
    </p>
  );
}

/* À propos — section claire (contraste avec les sections sombres) :
   photo collée à gauche pendant que trois phrases défilent et s'allument à droite. */
export default function About() {
  return (
    <section id="a-propos" className="p-2 sm:p-3">
      <div className="rounded-panel bg-bone py-24 text-ink sm:py-32">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal className="eyebrow text-accent-deep">( À propos )</Reveal>
              <Reveal as="h2" delay={80} className="mt-6 font-display text-mega font-bold">
                Comprendre.{' '}<br /><span className="text-slate-dim">Analyser.</span>{' '}<br /><span className="text-accent-deep">Protéger.</span>
              </Reveal>
              <Reveal className="group relative mt-10 max-w-sm">
                {profile.portrait.cutout ? (
                  /* Portrait détouré posé sur un panneau violet */
                  <div className="relative aspect-square overflow-hidden rounded-panel bg-gradient-to-br from-accent to-accent-deep">
                    <Sigil className="absolute -left-10 -top-10 h-48 w-48 text-white/10 transition-transform duration-[1200ms] group-hover:rotate-90" />
                    <img
                      src={profile.aboutImage} alt={profile.fullName} loading="lazy"
                      className="absolute inset-x-0 bottom-0 mx-auto h-[94%] w-auto origin-bottom object-contain transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <Media
                    src={profile.aboutImage} alt={profile.fullName}
                    className="aspect-square rounded-panel"
                    imgClassName="object-[50%_25%] transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                )}
                {profile.portrait.isPlaceholder && (
                  <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-[0.7rem] text-bone/80 backdrop-blur">Photo temporaire</span>
                )}
                <div className="absolute -bottom-6 -right-6 grid h-24 w-24 place-items-center rounded-full bg-ink text-accent sm:h-28 sm:w-28">
                  <Sigil className="h-12 w-12 animate-spin-slow sm:h-14 sm:w-14" />
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pt-36">
            <div className="space-y-12 lg:space-y-[22vh]">
              {aboutParagraphs.map((p, i) => <FocusParagraph key={i} index={i}>{emphasize(p)}</FocusParagraph>)}
            </div>

            <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] border border-ink/10 bg-ink/10 lg:mt-[22vh]">
              {aboutFacts.map((f) => (
                <div key={f.label} className="bg-bone p-6 transition-colors duration-500 hover:bg-white sm:p-8">
                  <dt className="eyebrow text-accent-deep">{f.label}</dt>
                  <dd className="mt-3 font-display text-lg font-bold leading-tight sm:text-2xl">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
