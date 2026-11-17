import { profile } from '../config/profile.js';
import ContactForm from './ContactForm.jsx';
import { Reveal } from './ui.jsx';

/* Ligne du terminal : clé → valeur, ou mention « à compléter » si la donnée manque. */
function Line({ k, children, missing }) {
  return (
    <p className="flex flex-wrap gap-x-3">
      <span className="w-28 shrink-0 text-mist-dim">{k}</span>
      {missing ? <span className="text-mist-dim">[à compléter]</span> : <span className="text-bone">{children}</span>}
    </p>
  );
}

/* Contact : grand titre sur toute la largeur, coordonnées présentées comme la sortie
   d'un terminal, formulaire à droite. */
export default function Contact() {
  const { email, phone, location } = profile.contact;
  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="absolute left-1/2 top-0 -z-10 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[140px]" />

      <div className="shell">
        <Reveal className="eyebrow text-accent">( Contact )</Reveal>
        <Reveal as="h2" delay={80} className="mt-6 font-display text-[clamp(3rem,9.5vw,9.5rem)] font-bold leading-[0.86] tracking-[-0.06em]">
          Un projet de sécurité{' '}?{' '}
          <span className="block text-accent">Échangeons ensemble.</span>
        </Reveal>

        <div className="mt-16 grid items-start gap-8 lg:mt-20 lg:grid-cols-12">
          {/* Terminal */}
          <Reveal className="lg:col-span-5">
            <div className="overflow-hidden rounded-[1.75rem] border border-bone/10 bg-deep shadow-[0_40px_80px_-40px_rgba(0,0,0,.8)]">
              <div className="flex items-center gap-2 border-b border-bone/10 px-5 py-3">
                <i className="h-2.5 w-2.5 rounded-full bg-bone/30" /><i className="h-2.5 w-2.5 rounded-full bg-bone/20" /><i className="h-2.5 w-2.5 rounded-full bg-bone/10" />
                <span className="ml-3 font-mono text-xs text-mist-dim">kassa — contact</span>
              </div>
              <div className="space-y-2 p-6 font-mono text-sm leading-relaxed sm:p-7 sm:text-[0.95rem]">
                <p><span className="text-accent">$</span> whois kephysiase</p>
                <div className="space-y-1.5 pt-2">
                  <Line k="nom">{profile.fullName}</Line>
                  <Line k="rôle">{profile.title}</Line>
                  <Line k="lieu">{location}</Line>
                  <Line k="e-mail" missing={!email}><a className="link-line" href={`mailto:${email}`}>{email}</a></Line>
                  <Line k="téléphone" missing={!phone}><a className="link-line" href={`tel:${(phone || '').replace(/\s/g, '')}`}>{phone}</a></Line>
                </div>
                <p className="pt-4"><span className="text-accent">$</span> ls ./liens</p>
                {/* Seuls les liens renseignés s'affichent ; aucun → une seule ligne « à compléter ». */}
                {profile.links.some((l) => l.url) ? (
                  <ul className="space-y-1.5 pt-2">
                    {profile.links.filter((l) => l.url).map((l) => (
                      <li key={l.id}>
                        <Line k={l.label.toLowerCase()}>
                          <a className="link-line text-accent" href={l.url} target="_blank" rel="noreferrer">{l.url.replace(/^https?:\/\/(www\.)?/, '')} ↗</a>
                        </Line>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="pt-2"><Line k="liens" missing /></div>
                )}
                <p className="pt-4"><span className="text-accent">$</span> <span className="inline-block h-4 w-2 translate-y-0.5 animate-blink bg-accent" aria-hidden="true" /></p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
