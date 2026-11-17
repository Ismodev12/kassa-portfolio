import { useEffect, useRef, useState } from 'react';
import { PencilLine } from 'lucide-react';
import { isTodo, todoHint } from '../data/todo.js';

let brickCount = 0;

/** Apparition au scroll façon « brique » : le bloc tombe à sa place avec un léger rebond,
 *  en alternant côté gauche / côté droit. `delay` en ms. */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  const side = useRef(brickCount++ % 2 ? 1 : -1).current;
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={{ '--d': `${delay}ms`, '--bx': `${side * 36}px`, '--br': `${side * 2.5}deg`, ...style }}
      className={`${className} ${shown ? 'is-in' : ''}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Photo en noir & blanc teintée bleu nuit, avec repli propre si le fichier manque. */
export function Media({ src, alt, className = '', imgClassName = '' }) {
  const [missing, setMissing] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-bone/10 ${className}`}>
      {missing || !src ? (
        <div className="absolute inset-0 grid place-items-center bg-[repeating-linear-gradient(135deg,rgb(var(--c-bone)/.06)_0_2px,transparent_2px_18px)] p-6 text-center">
          <p className="eyebrow !tracking-[0.12em] text-mist-dim">Photo à placer</p>
        </div>
      ) : (
        <>
          <img
            src={src} alt={alt} loading="lazy" onError={() => setMissing(true)}
            className={`absolute inset-0 h-full w-full object-cover grayscale contrast-[1.05] ${imgClassName}`}
          />
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-accent opacity-25 mix-blend-multiply" />
        </>
      )}
    </div>
  );
}

export function Arrow({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

/** Motif signature du site : une cible / un radar (anneau, repères et point central). */
export function Sigil({ className = '' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" fill="currentColor">
      <path fillRule="evenodd" d="M50 2a48 48 0 1 1 0 96 48 48 0 0 1 0-96Zm0 16a32 32 0 1 0 0 64 32 32 0 0 0 0-64Z" />
      <circle cx="50" cy="50" r="13" />
      <rect x="46" y="0" width="8" height="26" rx="4" />
      <rect x="46" y="74" width="8" height="26" rx="4" />
      <rect x="0" y="46" width="26" height="8" rx="4" />
      <rect x="74" y="46" width="26" height="8" rx="4" />
    </svg>
  );
}

/** Affiche une valeur, ou un emplacement « À compléter » si elle manque. */
export function TodoText({ value, fallback = 'À compléter', className = '' }) {
  if (!isTodo(value)) return <>{value}</>;
  const hint = todoHint(value, fallback);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border border-dashed border-current px-2 py-0.5 text-[0.85em] opacity-60 ${className}`}
      title="Information à compléter"
    >
      <PencilLine className="h-3 w-3 shrink-0" aria-hidden="true" />
      <span><span className="sr-only">À compléter : </span>{hint}</span>
    </span>
  );
}
