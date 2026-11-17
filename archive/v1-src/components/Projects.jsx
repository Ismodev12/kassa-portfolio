import { useCallback, useState } from 'react';
import { projects } from '../data/projects.js';
import SectionHeading from './ui/SectionHeading.jsx';
import ProjectCard from './ProjectCard.jsx';
import ProjectDetails from './ProjectDetails.jsx';

export default function Projects() {
  const [openIndex, setOpenIndex] = useState(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const go = useCallback(
    (delta) => setOpenIndex((i) => (i === null ? i : (i + delta + projects.length) % projects.length)),
    [],
  );

  // Les cartes « wide » alternent visuel à gauche / à droite
  let wideCount = 0;

  return (
    <section id="projets" className="relative py-24 sm:py-32">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-paper/10 to-transparent" />
      <div className="shell">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading index="02" label="Projets" title={<>Sept projets, <span className="text-paper/40">de l’analyse</span> à la solution.</>}>
            Projet de fin d’études, compétition en équipe, outils personnels, pratique CTF, prototype et sensibilisation.
            Chaque fiche détaille le contexte, la démarche, les résultats et les limites.
          </SectionHeading>
          <p className="max-w-xs text-sm leading-relaxed text-paper/45 lg:text-right">
            Les visuels présentés sont des illustrations temporaires, pas des captures des outils.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-2 lg:gap-8">
          {projects.map((project, index) => {
            const reverse = project.size === 'wide' ? wideCount++ % 2 === 1 : false;
            return (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                reverse={reverse}
                onOpen={() => setOpenIndex(index)}
              />
            );
          })}
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
