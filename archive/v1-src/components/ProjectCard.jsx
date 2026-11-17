import { ArrowUpRight } from 'lucide-react';
import ProjectVisual from './visuals/ProjectVisual.jsx';
import Reveal from './ui/Reveal.jsx';
import TodoText from './ui/TodoText.jsx';
import { isTodo } from '../data/todo.js';

/** Grande carte de projet. Toute la carte ouvre la fiche détaillée. */
export default function ProjectCard({ project, index, reverse, onOpen }) {
  const wide = project.size === 'wide';
  const number = String(index + 1).padStart(2, '0');

  return (
    <Reveal
      as="article"
      delay={wide ? 0 : (index % 2) * 90}
      className={`group relative overflow-hidden rounded-[2rem] border border-paper/10 bg-paper/[0.02] transition-colors duration-500 hover:border-volt/45 ${
        wide ? 'lg:col-span-2 lg:grid lg:grid-cols-12' : 'flex flex-col'
      }`}
    >
      <ProjectVisual
        project={project}
        className={`aspect-[16/10] transition-transform duration-700 ${
          wide ? `lg:col-span-7 lg:aspect-auto lg:min-h-[30rem] ${reverse ? 'lg:order-2' : ''}` : ''
        }`}
      />

      <div className={`relative flex flex-1 flex-col p-7 sm:p-9 ${wide ? 'lg:col-span-5 lg:justify-center lg:p-12' : ''}`}>
        <div className="flex items-center justify-between gap-4">
          <span className="font-display text-sm font-medium text-volt">{number}</span>
          <span className="text-right text-xs text-paper/45">
            {project.kind}
            {!isTodo(project.year) && <> · {project.year}</>}
          </span>
        </div>

        <h3 className={`mt-5 font-display font-semibold leading-[1.08] tracking-[-0.02em] text-balance ${wide ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'}`}>
          <button
            type="button"
            onClick={onOpen}
            className="text-left after:absolute after:inset-0 after:rounded-[2rem] after:content-[''] focus-visible:outline-none"
            aria-haspopup="dialog"
          >
            {project.title}
          </button>
        </h3>
        {project.nameNote && (
          <p className="mt-2">
            <TodoText value={{ todo: project.nameNote }} />
          </p>
        )}

        <p className="mt-4 leading-relaxed text-paper/60">{project.summary}</p>

        {wide && project.highlights.length > 0 && (
          <ul className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
            {project.highlights.map((h) => (
              <li key={h.label}>
                <span className="block font-display text-3xl font-semibold tracking-tight">{h.value}</span>
                <span className="mt-0.5 block text-sm text-paper/50">{h.label}</span>
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-7 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-paper/10 px-3 py-1 text-xs text-paper/60">
              {tag}
            </li>
          ))}
        </ul>

        <span className="mt-8 inline-flex items-center gap-2 self-start font-display text-sm font-medium text-paper transition-colors group-hover:text-volt group-has-[:focus-visible]:text-volt">
          Voir la fiche détaillée
          <span className="grid size-8 place-items-center rounded-full border border-paper/15 transition-all duration-300 group-hover:rotate-45 group-hover:border-volt group-hover:bg-volt group-hover:text-night">
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </span>
        </span>
      </div>

      {/* anneau de focus clavier sur toute la carte */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[2rem] ring-2 ring-volt opacity-0 group-has-[:focus-visible]:opacity-100" />
    </Reveal>
  );
}
