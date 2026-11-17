import { skillGroups } from '../data/skills.js';
import SectionHeading from './ui/SectionHeading.jsx';
import Reveal from './ui/Reveal.jsx';

// Disposition bento : la première catégorie occupe deux colonnes
const spans = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7', 'lg:col-span-12'];

export default function Skills() {
  return (
    <section id="competences" className="relative overflow-hidden bg-night-deep py-24 sm:py-32">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div className="shell relative">
        <SectionHeading index="03" label="Compétences" title={<>Compétences <span className="text-paper/40">et</span> outils.</>}>
          Les domaines et les outils que j’utilise, de la défense à la sensibilisation.
        </SectionHeading>

        <div className="mt-16 grid gap-5 lg:mt-20 lg:grid-cols-12">
          {skillGroups.map((group, i) => {
            const Icon = group.icon;
            const isLast = i === skillGroups.length - 1;
            return (
              <Reveal
                key={group.id}
                delay={(i % 2) * 90}
                className={`group relative overflow-hidden rounded-[1.75rem] border border-paper/10 bg-night p-7 transition-colors duration-500 hover:border-volt/40 sm:p-8 ${spans[i] ?? 'lg:col-span-6'}`}
              >
                <div className={`flex flex-col gap-8 ${isLast ? 'lg:flex-row lg:items-center lg:justify-between' : ''}`}>
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <span className="grid size-12 place-items-center rounded-2xl border border-volt/30 bg-volt/10 text-volt transition-colors duration-500 group-hover:bg-volt group-hover:text-night">
                        <Icon className="size-[22px]" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{group.title}</h3>
                        <p className="mt-0.5 text-sm text-paper/50">{group.caption}</p>
                      </div>
                    </div>
                    <span className="font-display text-sm text-paper/25 lg:hidden">0{i + 1}</span>
                  </div>

                  <ul className={`flex flex-wrap gap-2.5 ${isLast ? 'lg:justify-end' : ''}`}>
                    {group.items.map(({ name, icon: ItemIcon }) => (
                      <li
                        key={name}
                        className="flex items-center gap-2.5 rounded-xl border border-paper/10 bg-paper/[0.03] px-3.5 py-2.5 text-[0.95rem] transition-colors duration-300 hover:border-volt/40 hover:bg-volt/[0.08]"
                      >
                        <ItemIcon className="size-4 text-volt" aria-hidden="true" />
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
