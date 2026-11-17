import { marquee } from '../data/content.js';
import { Sigil } from './ui.jsx';

/* Une bande défilante légèrement inclinée, juste après la Hero. */
export default function Marquee() {
  const line = (key) => (
    <div key={key} className="flex shrink-0 items-center">
      {[...marquee, ...marquee].map((w, i) => (
        <span key={i} className="flex items-center font-display text-xl font-bold uppercase tracking-[0.04em] sm:text-[2rem]">
          <span className="whitespace-nowrap px-6 sm:px-10">{w}</span>
          <Sigil className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="overflow-hidden py-10 sm:py-14">
      <p className="sr-only">Outils et référentiels : {marquee.join(', ')}.</p>
      <div className="-mx-6 -rotate-2 bg-accent py-5 text-ink shadow-[0_20px_60px_-15px_rgb(var(--c-accent)/.55)] sm:py-6">
        <div className="flex w-max animate-marquee" aria-hidden="true">{line('a')}{line('b')}</div>
      </div>
    </div>
  );
}
