import { forwardRef, useEffect, useRef } from 'react';
import {
  AlertTriangle, ArrowLeft, ArrowRight, Compass, FileText, Flag, Info, KeyRound,
  ListChecks, Route, Target, Trophy, UserRound, Wrench, X,
} from 'lucide-react';
import ProjectVisual from './visuals/ProjectVisual.jsx';
import { TodoText } from './ui.jsx';
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
      previous?.focus?.({ preventScroll: true });
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
      else if (e.key === 'ArrowRight') onNext();
      else if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'Tab') trapFocus(e, dialogRef.current);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, onNext, onPrev]);

  const n = String(index + 1).padStart(2, '0');
  const titleId = `projet-${project.id}-titre`;
  const closeOnBackdrop = (e) => e.target === e.currentTarget && onClose();

  return (
    <div className="fixed inset-0 z-[60]" role="presentation">
      <div className="animate-fade-in absolute inset-0 bg-deep/85 backdrop-blur-md" aria-hidden="true" />

      <div ref={scrollRef} className="absolute inset-0 overflow-y-auto overscroll-contain" onClick={closeOnBackdrop}>
        <div className="flex min-h-full items-start justify-center sm:p-6 lg:p-10" onClick={closeOnBackdrop}>
          <article
            key={project.id}
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="animate-modal-in relative w-full max-w-6xl overflow-clip bg-ink shadow-2xl shadow-black/60 sm:rounded-panel sm:border sm:border-bone/10"
          >
            {/* Barre supérieure */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-bone/[0.08] bg-ink/90 px-5 py-3 backdrop-blur-xl sm:px-8">
              <p className="eyebrow truncate text-mist-dim">
                <span className="text-accent">Projet {n}</span> / {String(total).padStart(2, '0')}
              </p>
              <div className="flex items-center gap-2">
                <IconButton label="Projet précédent" onClick={onPrev} icon={ArrowLeft} />
                <IconButton label="Projet suivant" onClick={onNext} icon={ArrowRight} />
                <span className="mx-1 h-6 w-px bg-bone/10" aria-hidden="true" />
                <IconButton ref={closeRef} label="Fermer la fiche" onClick={onClose} icon={X} accent />
              </div>
            </div>

            {/* Photo d'illustration en tête de fiche */}
            {project.photo ? (
              <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[21/9]">
                <img src={project.photo} alt={`Illustration : ${project.title}`} className="h-full w-full object-cover" />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-full bg-ink/75 px-2.5 py-1 text-[0.68rem] text-bone/70 backdrop-blur">Photo d’illustration</span>
              </div>
            ) : (
              <ProjectVisual project={project} className="aspect-[16/10] sm:aspect-[21/9]" showBadge />
            )}

            <div className="px-5 py-10 sm:px-10 sm:py-14 lg:px-14">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-mist">
                <span className="rounded-full bg-accent px-3.5 py-1.5 font-display font-bold text-ink">{project.kind}</span>
                <TodoText value={project.year} />
              </div>
              <h2 id={titleId} className="mt-6 max-w-4xl font-display text-[clamp(2.1rem,4.4vw,4rem)] font-bold leading-[0.98] tracking-[-0.04em]">
                {project.title}
              </h2>
              {project.nameNote && <p className="mt-3 text-mist"><TodoText value={{ todo: project.nameNote }} /></p>}
              <p className="mt-6 max-w-3xl font-display text-xl leading-snug text-mist sm:text-2xl">{project.summary}</p>

              {project.highlights.length > 0 && (
                <dl className="mt-10 grid grid-cols-2 overflow-hidden rounded-[2rem] border border-bone/15 bg-bone/[0.04] sm:grid-cols-3">
                  {project.highlights.map((h, i) => (
                    <div key={h.label} className={`flex flex-col-reverse gap-1 p-6 ${i ? 'border-l border-bone/10' : ''}`}>
                      <dt className="text-sm text-mist-dim">{h.label}</dt>
                      <dd className="font-display text-4xl font-bold tracking-tight text-accent">{h.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {project.notice && (
                <p className="mt-6 flex gap-3 rounded-2xl border border-accent/40 bg-accent/10 p-4 text-sm leading-relaxed text-bone">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  {project.notice}
                </p>
              )}

              <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-14">
                <div className="space-y-12 lg:col-span-8">
                  <Block icon={Compass} title="Contexte">
                    <p className="text-lg leading-relaxed text-mist"><TodoText value={d.context} /></p>
                  </Block>

                  <Block icon={Target} title="Objectifs">
                    <BulletList items={d.objectives} />
                  </Block>

                  <Block icon={Route} title="Démarche">
                    <ol className="space-y-3">
                      {d.approach.map((step, i) => (
                        <li key={step.title} className="flex gap-5 rounded-2xl border border-bone/10 bg-bone/[0.03] p-5">
                          <span className="font-display text-sm font-bold text-accent">{String(i + 1).padStart(2, '0')}</span>
                          <div>
                            <p className="font-display text-lg font-bold tracking-tight">{step.title}</p>
                            <p className="mt-1 leading-relaxed text-mist">{step.text}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </Block>

                  {project.photo && (
                    <Block icon={Flag} title="Aperçu illustratif">
                      <ProjectVisual project={project} className="aspect-[16/10] rounded-[1.5rem]" showBadge />
                    </Block>
                  )}

                  {project.modules && <ModulesGrid modules={project.modules} />}
                  {project.document && <DocumentSlots doc={project.document} />}

                  <Block icon={Trophy} title="Résultats">
                    <BulletList items={d.results} accent />
                  </Block>
                </div>

                <aside className="space-y-5 lg:col-span-4">
                  <SideCard icon={UserRound} title="Rôle personnel">
                    <p className="leading-relaxed text-bone"><TodoText value={d.role} /></p>
                  </SideCard>
                  <SideCard icon={Wrench} title="Outils et technologies">
                    <TagList items={d.tools} />
                  </SideCard>
                  <SideCard icon={ListChecks} title="Compétences mobilisées" highlight>
                    <TagList items={d.skills} dark />
                  </SideCard>
                  <SideCard icon={AlertTriangle} title="Limites">
                    {d.limits.length > 0 ? <BulletList items={d.limits} small /> : <p className="text-sm text-mist-dim">Aucune limite particulière signalée.</p>}
                  </SideCard>
                </aside>
              </div>
            </div>

            <div className="grid grid-cols-2 border-t border-bone/10">
              <button type="button" onClick={onPrev} className="group flex items-center gap-3 p-5 text-left transition-colors hover:bg-bone/[0.04] sm:p-8">
                <ArrowLeft className="h-5 w-5 shrink-0 text-accent transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                <span className="font-display font-medium">Projet précédent</span>
              </button>
              <button type="button" onClick={onNext} className="group flex items-center justify-end gap-3 border-l border-bone/10 p-5 text-right transition-colors hover:bg-bone/[0.04] sm:p-8">
                <span className="font-display font-medium">Projet suivant</span>
                <ArrowRight className="h-5 w-5 shrink-0 text-accent transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

/* ---------- sous-composants ---------- */

const IconButton = forwardRef(({ label, onClick, icon: Icon, accent }, ref) => (
  <button
    ref={ref} type="button" onClick={onClick} aria-label={label} title={label}
    className={`grid h-10 w-10 place-items-center rounded-full transition-colors ${accent ? 'bg-accent text-ink hover:bg-bone' : 'border border-bone/15 text-bone hover:border-accent hover:text-accent'}`}
  >
    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
  </button>
));
IconButton.displayName = 'IconButton';

function Block({ icon: Icon, title, children }) {
  return (
    <section>
      <h3 className="mb-5 flex items-center gap-3 font-display text-2xl font-bold tracking-tight">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-ink">
          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
        </span>
        {title}
      </h3>
      {children}
    </section>
  );
}

function SideCard({ icon: Icon, title, highlight, children }) {
  return (
    <section className={`rounded-[1.75rem] p-6 ${highlight ? 'bg-bone text-ink' : 'border border-bone/10 bg-bone/[0.03]'}`}>
      <h3 className={`eyebrow mb-4 flex items-center gap-2.5 ${highlight ? 'text-slate' : 'text-mist-dim'}`}>
        <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
        {title}
      </h3>
      {children}
    </section>
  );
}

function BulletList({ items, accent, small }) {
  return (
    <ul className={`space-y-3 ${small ? 'text-sm' : 'text-lg'}`}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 leading-relaxed text-mist">
          <span className={`mt-[0.62em] h-1.5 w-1.5 shrink-0 rounded-full ${accent ? 'bg-accent' : 'bg-mist-dim'}`} aria-hidden="true" />
          <span><TodoText value={item} /></span>
        </li>
      ))}
    </ul>
  );
}

function TagList({ items, dark }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <li key={i} className={isTodo(item) ? '' : `rounded-full border px-3.5 py-1.5 text-sm ${dark ? 'border-ink/20' : 'border-bone/20'}`}>
          <TodoText value={item} />
        </li>
      ))}
    </ul>
  );
}

function ModulesGrid({ modules }) {
  return (
    <Block icon={Flag} title="Modules">
      <ul className="grid gap-3 sm:grid-cols-2">
        {modules.map((m) => (
          <li key={m.name} className={`flex items-start justify-between gap-3 rounded-2xl border p-4 ${m.api ? 'border-dashed border-bone/25' : 'border-accent/40 bg-accent/[0.08]'}`}>
            <div>
              <p className="font-display text-lg font-bold tracking-tight">{m.name}</p>
              <p className="mt-0.5 text-sm text-mist">{m.detail}</p>
            </div>
            {m.api && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-bone/20 px-2 py-0.5 text-[0.7rem] text-mist">
                <KeyRound className="h-3 w-3" aria-hidden="true" /> clé API
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
      <dl className="divide-y divide-bone/10 rounded-2xl border border-bone/10">
        {rows.map(([label, value]) => (
          <div key={label} className="flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:justify-between">
            <dt className="text-sm text-mist-dim">{label}</dt>
            <dd className="text-mist"><TodoText value={value} /></dd>
          </div>
        ))}
        <div className="flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:justify-between">
          <dt className="text-sm text-mist-dim">Lien</dt>
          <dd className="text-mist">
            {doc.url
              ? <a href={doc.url} target="_blank" rel="noreferrer" className="link-line text-accent">Consulter le document</a>
              : <TodoText value={{ todo: 'Lien vers le document' }} />}
          </dd>
        </div>
      </dl>
    </Block>
  );
}

function trapFocus(e, root) {
  if (!root) return;
  const focusables = root.querySelectorAll('a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])');
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}
