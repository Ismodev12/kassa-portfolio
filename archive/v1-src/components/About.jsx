import { ArrowRight, BookOpenCheck, FileCheck2, GraduationCap, MapPin, Search, Users, Wrench } from 'lucide-react';
import { profile } from '../config/profile.js';
import SectionHeading from './ui/SectionHeading.jsx';
import Reveal from './ui/Reveal.jsx';

const Hl = ({ children }) => <strong className="font-medium text-volt">{children}</strong>;

const facts = [
  { icon: MapPin, label: 'Basée au', value: profile.location },
  { icon: GraduationCap, label: 'Formation', value: 'Analyse en cybersécurité — École des Métiers du Numérique' },
  { icon: Users, label: 'Équipe', value: 'HIN’EGO — consultants en cybersécurité' },
];

export default function About() {
  return (
    <section id="a-propos" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          index="01"
          label="À propos"
          title={
            <>
              Comprendre l’attaque,{' '}
              <span className="text-paper/40">puis la transformer en</span>{' '}
              mesures concrètes.
            </>
          }
        />

        {/* Bloc 1 — texte / fiche */}
        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          <Reveal className="space-y-6 text-lg leading-relaxed text-paper/70 lg:col-span-7">
            <p className="font-display text-2xl leading-snug tracking-tight text-paper sm:text-[1.7rem]">
              Je suis {profile.fullName}, <Hl>analyste en cybersécurité</Hl>.
            </p>
            <p>
              Je termine ma formation en analyse en cybersécurité à l’<Hl>École des Métiers du Numérique</Hl> et je
              vis et travaille au <Hl>Bénin</Hl>.
            </p>
            <p>
              Je m’intéresse à la <Hl>protection contre la fraude</Hl>, notamment le phishing et la fraude au
              président, à l’<Hl>analyse des risques</Hl> et à la <Hl>réponse aux incidents</Hl>.
            </p>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-paper/10 bg-paper/[0.025] p-7 sm:p-8">
              <div aria-hidden="true" className="absolute inset-0 bg-dots opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <p className="eyebrow text-volt">Fiche</p>
                  <span className="font-display text-xs text-paper/35">KASSA / D.K.</span>
                </div>
                <dl className="mt-6 divide-y divide-paper/[0.08]">
                  {facts.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                      <Icon className="mt-0.5 size-5 shrink-0 text-volt" aria-hidden="true" />
                      <div>
                        <dt className="text-sm text-paper/45">{label}</dt>
                        <dd className="mt-0.5 font-display font-medium leading-snug">{value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bloc 2 — visuel méthode / texte */}
        <div className="mt-20 grid items-center gap-12 lg:mt-28 lg:grid-cols-12 lg:gap-16">
          <Reveal className="order-2 lg:order-1 lg:col-span-6">
            <MethodDiagram />
          </Reveal>
          <Reveal delay={120} className="order-1 space-y-6 text-lg leading-relaxed text-paper/70 lg:order-2 lg:col-span-6">
            <p>
              J’aime <Hl>comprendre comment une attaque se déroule</Hl>, puis transformer cette compréhension en
              mesures concrètes : un plan de réponse, un outil ou un conseil simple à appliquer.
            </p>
            <p>
              Je fais partie de <Hl>HIN’EGO</Hl>, une équipe de consultants en cybersécurité qui réalise des audits
              de sécurité pour les entreprises et assure une veille sur les menaces.
            </p>
          </Reveal>
        </div>

        {/* Bloc 3 — parcours + citation */}
        <div className="mt-20 grid gap-12 lg:mt-28 lg:grid-cols-12 lg:gap-16">
          <Reveal className="space-y-6 text-lg leading-relaxed text-paper/70 lg:col-span-7">
            <p>
              Au fil de mes projets, j’ai construit des <Hl>plateformes de réponse aux incidents et de
              reconnaissance</Hl>, travaillé en équipe sur un <Hl>appel d’offres international</Hl> concernant la
              sécurité d’un groupe bancaire et progressé en <Hl>CTF</Hl>, en <Hl>cryptographie</Hl> et en{' '}
              <Hl>forensic</Hl>.
            </p>
            <p>
              Je partage également des conseils d’<Hl>hygiène numérique</Hl>, car je crois qu’une bonne protection
              commence par des gestes simples.
            </p>
          </Reveal>
          <Reveal delay={120} as="blockquote" className="relative border-l border-volt pl-7 lg:col-span-5 lg:self-end">
            <p className="font-display text-3xl font-medium leading-[1.15] tracking-tight text-balance sm:text-4xl">
              « Une bonne protection commence par des <span className="text-volt">gestes simples</span>. »
            </p>
            <footer className="mt-5 text-sm text-paper/45">— Képhysiase KASSA</footer>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* Schéma : de l'attaque à la réponse concrète */
function MethodDiagram() {
  const outputs = [
    { icon: FileCheck2, label: 'Un plan de réponse' },
    { icon: Wrench, label: 'Un outil' },
    { icon: BookOpenCheck, label: 'Un conseil simple' },
  ];
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-paper/10 bg-night-deep p-6 sm:p-8">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-60" />
      <div className="relative">
        <p className="eyebrow text-paper/45">Méthode</p>
        <div className="mt-6 grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr_auto_1.15fr]">
          <Step tone="muted" label="Menace" title="Attaque" icon={Search} />
          <ArrowRight className="mx-auto size-5 rotate-90 text-volt sm:rotate-0" aria-hidden="true" />
          <Step label="Analyse" title="Compréhension" icon={Search} />
          <ArrowRight className="mx-auto size-5 rotate-90 text-volt sm:rotate-0" aria-hidden="true" />
          <ul className="space-y-2">
            {outputs.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5 rounded-xl border border-volt/30 bg-volt/10 px-3 py-2.5 text-sm font-medium">
                <Icon className="size-4 shrink-0 text-volt" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Step({ label, title, tone }) {
  return (
    <div className={`rounded-2xl border px-4 py-5 text-center ${tone === 'muted' ? 'border-paper/10 bg-paper/[0.03]' : 'border-volt/40 bg-volt/[0.07]'}`}>
      <p className="text-xs text-paper/45">{label}</p>
      <p className="mt-1 font-display font-medium">{title}</p>
    </div>
  );
}
