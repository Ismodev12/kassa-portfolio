import { ExternalLink, FileBadge2, GraduationCap } from 'lucide-react';
import { education } from '../data/education.js';
import SectionHeading from './ui/SectionHeading.jsx';
import Reveal from './ui/Reveal.jsx';
import TodoText from './ui/TodoText.jsx';

export default function Education() {
  return (
    <section id="formations" className="relative py-24 sm:py-32">
      <div className="shell grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading compact index="04" label="Formations" title={<>Formations <span className="text-paper/40">et certifications.</span></>}>
              Mon parcours de formation. Les certificats seront ajoutés dès qu’ils seront disponibles.
            </SectionHeading>
          </div>
        </div>

        <ol className="relative lg:col-span-7">
          <span aria-hidden="true" className="absolute bottom-4 left-[1.1rem] top-4 w-px bg-gradient-to-b from-volt via-paper/15 to-transparent sm:left-[1.35rem]" />
          {education.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 90} className="relative pb-10 pl-14 last:pb-0 sm:pl-20">
              <span className="absolute left-0 top-1 grid size-9 place-items-center rounded-full border border-volt/40 bg-night text-volt sm:size-11">
                <GraduationCap className="size-4 sm:size-5" aria-hidden="true" />
              </span>

              <div className="rounded-[1.75rem] border border-paper/10 bg-paper/[0.02] p-6 transition-colors duration-500 hover:border-volt/40 sm:p-8">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                  <span className="font-display font-medium text-volt"><TodoText value={item.date} /></span>
                  {item.status && <span className="rounded-full border border-paper/15 px-2.5 py-0.5 text-xs text-paper/60">{item.status}</span>}
                  <span className="text-xs text-paper/40">{item.type}</span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-[1.7rem]">{item.title}</h3>
                <p className="mt-1 text-paper/60">{item.organization}</p>

                <CertificateSlot item={item} />
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Emplacement de certificat : vide tant qu'aucun document réel n'est fourni. */
function CertificateSlot({ item }) {
  const cert = item.certificate;
  if (!cert) {
    return (
      <div className="mt-6 flex items-center gap-4 rounded-2xl border border-dashed border-paper/15 p-4 text-sm text-paper/45">
        <FileBadge2 className="size-5 shrink-0" aria-hidden="true" />
        <span>Emplacement réservé au certificat — à ajouter lorsqu’il sera disponible.</span>
      </div>
    );
  }
  if (cert.type === 'image') {
    return (
      <a href={cert.src} target="_blank" rel="noreferrer" className="mt-6 block overflow-hidden rounded-2xl border border-paper/10">
        <img src={cert.src} alt={`Certificat — ${item.title}`} className="w-full object-cover" loading="lazy" />
      </a>
    );
  }
  return (
    <a
      href={cert.src}
      target="_blank"
      rel="noreferrer"
      className="mt-6 inline-flex items-center gap-2 rounded-full border border-volt/40 px-4 py-2 text-sm transition-colors hover:bg-volt hover:text-night"
    >
      <FileBadge2 className="size-4" aria-hidden="true" /> Voir le certificat
      <ExternalLink className="size-3.5" aria-hidden="true" />
    </a>
  );
}
