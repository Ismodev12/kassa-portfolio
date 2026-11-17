import { forwardRef, useEffect, useRef } from 'react';
import {
  AlertTriangle, ArrowLeft, ArrowRight, Compass, FileText, Flag, Info, KeyRound,
  ListChecks, Route, Target, Trophy, UserRound, Wrench, X,
} from 'lucide-react';
import ProjectVisual from './visuals/ProjectVisual.jsx';
import TodoText from './ui/TodoText.jsx';
import { isTodo } from '../data/todo.js';

/** Fiche détaillée d'un projet (fenêtre modale). */
export default function ProjectDetails({ project, index, total, onClose, onPrev, onNext }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const scrollRef = useRef(null);
  const d = project.details;

  // Blocage du défilement de la page + restauration du focus
  useEffect(() => {
    const previous = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, []);

  // Changement de projet : retour en haut, focus sur « fermer »
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
    closeRef.current?.focus({ preventScroll: true });
  }, [project.id]);

  // Clavier : Échap, flèches, piège à focus
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight' && !isTypingTarget(e.target)) onNext();
      else if (e.key === 'ArrowLeft' && !isTypingTarget(e.target)) onPrev();
      else if (e.key === 'Tab') trapFocus(e, dialogRef.current);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, onNext, onPrev]);

  const number = String(index + 1).padStart(2, '0');
  const titleId = `projet-${project.id}-titre`;

  return (
    <div className="fixed inset-0 z-50" role="presentation">
      <div className="animate-fade-in absolute inset-0 bg-night-deep/85 backdrop-blur-md" onClick={onClose} aria-hidden="true" />

      <div ref={scrollRef} className="absolute inset-0 overflow-y-auto overscroll-contain" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="flex min-h-full items-start justify-center sm:p-6 lg:p-10" onClick={(e) => e.target === e.currentTarget && onClose()}>
          <article
            key={project.id}
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="animate-modal-in relative w-full max-w-6xl overflow-clip border-paper/10 bg-night shadow-2xl shadow-black/60 sm:rounded-[2rem] sm:border"
          >
            {/* Barre supérieure */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-paper/[0.08] bg-night/90 px-5 py-3 backdrop-blur-xl sm:px-8">
              <p className="eyebrow truncate text-paper/50">
                <span className="text-volt">Projet {number}</span> / {String(total).padStart(2, '0')}
              </p>
              <div className="flex items-center gap-2">
                <IconButton label="Projet précédent" onClick={onPrev} icon={ArrowLeft} />
                <IconButton label="Projet suivant" onClick={onNext} icon={ArrowRight} />
                <span className="mx-1 h-6 w-px bg-paper/10" aria-hidden="true" />
                <IconButton ref={closeRef} label="Fermer la fiche" onClick={onClose} icon={X} />
              </div>
            </div>

            <ProjectVisual project={project} className="aspect-[16/10] sm:aspect-[21/9]" />

            <div className="px-5 py-10 sm:px-10 sm:py-12 lg:px-14">
              {/* En-tête */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-paper/50">
                <span className="rounded-full border border-volt/40 bg-volt/10 px-3 py-1 text-paper">{project.kind}</span>
                <span>
                  <TodoText value={project.year} />
                </span>
              </div>
              <h2 id={titleId} className="mt-5 max-w-4xl font-display text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-balance sm:text-5xl">
                {project.title}
              </h2>
              {project.nameNote && (
                <p className="mt-3">
                  <TodoText value={{ todo: project.nameNote }} />
                </p>
              )}
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-paper/65">{project.summary}</p>

              {project.highlights.length > 0 && (
                <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-paper/10 bg-paper/10 sm:grid-cols-3">
                  {project.highlights.map((h) => (
                    <div key={h.label} className="flex flex-col-reverse bg-night p-5">
                      <dt className="mt-1 text-sm text-paper/55">{h.label}</dt>
                      <dd className="font-display text-3xl font-semibold tracking-tight text-volt">{h.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {project.notice && (
                <p className="mt-6 flex gap-3 rounded-2xl border border-paper/10 bg-paper/[0.03] p-4 text-sm leading-relaxed text-paper/75">
                  <Info className="mt-0.5 size-4 shrink-0 text-volt" aria-hidden="true" />
                  {project.notice}
                </p>
              )}

              {/* Corps */}
              <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
                <div className="space-y-12 lg:col-span-8">
                  <Block icon={Compass} title="Contexte">
                    <p className="leading-relaxed text-paper/70"><TodoText value={d.context} /></p>
                  </Block>

                  <Block icon={Target} title="Objectifs">
                    <BulletList items={d.objectives} />
                  </Block>

                  <Block icon={Route} title="Démarche">
                    <ol className="relative space-y-3">
                      {d.approach.map((step, i) => (
                        <li key={step.title} className="flex gap-4 rounded-2xl border border-paper/[0.08] bg-paper/[0.02] p-4 sm:p-5">
                          <span className="font-display text-sm font-medium text-volt">{String(i + 1).padStart(2, '0')}</span>
                          <div>
                            <p className="font-display font-medium">{step.title}</p>
                            <p className="mt-1 text-sm leading-relaxed text-paper/60">{step.text}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </Block>

                  {project.modules && <ModulesGrid modules={project.modules} />}

                  {project.document && <DocumentSlots doc={project.document} />}

                  <Block icon={Trophy} title="Résultats">
                    <BulletList items={d.results} accent />
                  </Block>
                </div>

                <aside className="space-y-8 lg:col-span-4">
                  <SideCard icon={UserRound} title="Rôle personnel">
                    <p className="leading-relaxed text-paper/75"><TodoText value={d.role} /></p>
                  </SideCard>

                  <SideCard icon={Wrench} title="Outils et technologies">
                    <TagList items={d.tools} />
                  </SideCard>

                  <SideCard icon={ListChecks} title="Compétences mobilisées">
                    <TagList items={d.skills} accent />
                  </SideCard>

                  <SideCard icon={AlertTriangle} title="Limites">
                    {d.limits.length > 0 ? (
                      <BulletList items={d.limits} small />
                    ) : (
                      <p className="text-sm text-paper/50">Aucune limite particulière signalée.</p>
                    )}
                  </SideCard>
                </aside>
              </div>
            </div>

            {/* Navigation bas de fiche */}
            <div className="grid grid-cols-2 border-t border-paper/[0.08]">
              <button type="button" onClick={onPrev} className="group flex items-center gap-3 p-5 text-left transition-colors hover:bg-paper/[0.03] sm:p-8">
                <ArrowLeft className="size-5 shrink-0 text-volt transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                <span className="font-display text-sm text-paper/70 sm:text-base">Projet précédent</span>
              </button>
              <button type="button" onClick={onNext} className="group flex items-center justify-end gap-3 border-l border-paper/[0.08] p-5 text-right transition-colors hover:bg-paper/[0.03] sm:p-8">
                <span className="font-display text-sm text-paper/70 sm:text-base">Projet suivant</span>
                <ArrowRight className="size-5 shrink-0 text-volt transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

/* ---------- sous-composants ---------- */

const IconButton = forwardRef(({ label, onClick, icon: Icon }, ref) => (
  <button
    ref={ref}
    type="button"
    onClick={onClick}
    aria-label={label}
    title={label}
    className="grid size-10 place-items-center rounded-full border border-paper/15 text-paper/80 transition-colors hover:border-volt hover:bg-volt hover:text-night"
  >
    <Icon className="size-[18px]" aria-hidden="true" />
  </button>
));
IconButton.displayName = 'IconButton';

function Block({ icon: Icon, title, children }) {
  return (
    <section>
      <h3 className="mb-5 flex items-center gap-3 font-display text-xl font-semibold tracking-tight">
        <span className="grid size-9 place-items-center rounded-xl bg-volt/12 text-volt">
          <Icon className="size-[18px]" aria-hidden="true" />
        </span>
        {title}
      </h3>
      {children}
    </section>
  );
}

function SideCard({ icon: Icon, title, children }) {
  return (
    <section className="rounded-2xl border border-paper/10 bg-paper/[0.025] p-6">
      <h3 className="mb-4 flex items-center gap-2.5 eyebrow text-paper/55">
        <Icon className="size-4 text-volt" aria-hidden="true" />
        {title}
      </h3>
      {children}
    </section>
  );
}

function BulletList({ items, accent, small }) {
  return (
    <ul className={`space-y-3 ${small ? 'text-sm' : ''}`}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 leading-relaxed text-paper/75">
          <span className={`mt-[0.6em] size-1.5 shrink-0 rounded-full ${accent ? 'bg-volt' : 'bg-paper/40'}`} aria-hidden="true" />
          <span><TodoText value={item} /></span>
        </li>
      ))}
    </ul>
  );
}

function TagList({ items, accent }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item, i) =>
        isTodo(item) ? (
          <li key={i}><TodoText value={item} /></li>
        ) : (
          <li key={i} className={`rounded-full border px-3 py-1 text-sm ${accent ? 'border-volt/35 bg-volt/10 text-paper' : 'border-paper/12 text-paper/75'}`}>
            {item}
          </li>
        ),
      )}
    </ul>
  );
}

function ModulesGrid({ modules }) {
  return (
    <Block icon={Flag} title="Modules">
      <ul className="grid gap-3 sm:grid-cols-2">
        {modules.map((m) => (
          <li
            key={m.name}
            className={`flex items-start justify-between gap-3 rounded-2xl border p-4 ${m.api ? 'border-dashed border-paper/20' : 'border-volt/30 bg-volt/[0.06]'}`}
          >
            <div>
              <p className="font-display font-medium">{m.name}</p>
              <p className="mt-0.5 text-sm text-paper/55">{m.detail}</p>
            </div>
            {m.api && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-paper/15 px-2 py-0.5 text-[0.7rem] text-paper/60">
                <KeyRound className="size-3" aria-hidden="true" /> clé API
              </span>
            )}
          </li>
        ))}
      </ul>
    </Block>
  );
}

function DocumentSlots({ doc }) {
  const rows = [
    ['Plateforme de publication', doc.platform],
    ['Public visé', doc.audience],
    ['Nombre de pages', doc.pages],
  ];
  return (
    <Block icon={FileText} title={`Document « ${doc.title} »`}>
      <dl className="divide-y divide-paper/[0.08] rounded-2xl border border-paper/10">
        {rows.map(([label, value]) => (
          <div key={label} className="flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:justify-between">
            <dt className="text-sm text-paper/50">{label}</dt>
            <dd><TodoText value={value} /></dd>
          </div>
        ))}
        <div className="flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:justify-between">
          <dt className="text-sm text-paper/50">Lien</dt>
          <dd>
            {doc.url ? (
              <a href={doc.url} target="_blank" rel="noreferrer" className="text-volt underline-offset-4 hover:underline">Consulter le document</a>
            ) : (
              <TodoText value={{ todo: 'Lien vers le document' }} />
            )}
          </dd>
        </div>
      </dl>
    </Block>
  );
}

/* ---------- utilitaires ---------- */

function isTypingTarget(el) {
  return el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
}

function trapFocus(e, root) {
  if (!root) return;
  const focusables = root.querySelectorAll('a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])');
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}
