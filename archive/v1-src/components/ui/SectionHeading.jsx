import Reveal from './Reveal.jsx';

/** En-tête de section : index, libellé, grand titre, chapeau. */
export default function SectionHeading({ index, label, title, children, compact = false, className = '' }) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <Reveal className="flex items-center gap-3 text-volt">
        <span className="eyebrow">{index}</span>
        <span className="h-px w-10 bg-volt/50" aria-hidden="true" />
        <span className="eyebrow text-paper/60">{label}</span>
      </Reveal>
      <Reveal as="h2" delay={80} className={`mt-6 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-balance sm:text-5xl ${compact ? '' : 'lg:text-6xl'}`}>
        {title}
      </Reveal>
      {children && (
        <Reveal delay={160} className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/65">
          {children}
        </Reveal>
      )}
    </div>
  );
}
