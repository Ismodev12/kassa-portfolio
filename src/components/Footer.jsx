import { useEffect, useRef, useState } from 'react';
import { navigation, profile } from '../config/profile.js';
import { Sigil } from './ui.jsx';

/* Pied de page : liens, puis « KASSA » géant qui se remplit de bleu en arrivant en bas de page. */
export default function Footer() {
  const ref = useRef(null);
  const [p, setP] = useState(0);

  // 0 quand le pied de page entre à l'écran, 1 tout en bas de la page.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = ref.current.getBoundingClientRect();
      setP(Math.min(1, Math.max(0, (window.innerHeight - r.top) / r.height)));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, []);
  const links = profile.links.filter((l) => l.url);

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-bone/10 bg-deep pt-16">
      <div className="shell flex flex-col justify-between gap-10 md:flex-row md:items-start">
        <div>
          <p className="flex items-center gap-2.5 font-display text-xl font-bold tracking-[0.14em]">
            <Sigil className="h-5 w-5 text-accent" />KASSA
          </p>
          <p className="mt-2 text-mist-dim">{profile.fullName} — {profile.title}, {profile.location}</p>
        </div>
        <nav aria-label="Navigation du pied de page">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-3 font-display sm:grid-cols-3">
            {navigation.map((l) => (
              <li key={l.id}><a className="link-line hover:text-accent" href={`#${l.id}`}>{l.label}</a></li>
            ))}
            {links.map((l) => (
              <li key={l.id}><a className="link-line hover:text-accent" href={l.url} target="_blank" rel="noreferrer">{l.label} ↗</a></li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Signature géante : le remplissage monte avec le scroll */}
      <div aria-hidden="true" className="relative mt-12 select-none text-center font-display text-[27vw] font-bold leading-[0.78] tracking-[-0.07em]">
        <span className="text-stroke block">KASSA</span>
        <span className="absolute inset-0 block text-accent" style={{ clipPath: `inset(${(1 - p) * 100}% 0 0 0)` }}>KASSA</span>
      </div>

      <div className="relative border-t border-bone/10 bg-deep">
        <div className="shell flex flex-col gap-3 py-6 text-sm text-mist-dim sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.fullName}. Tous droits réservés.</p>
          <p>Visuels de projets : illustrations temporaires.</p>
          <a href="#accueil" className="link-line w-fit">Retour en haut ↑</a>
        </div>
      </div>
    </footer>
  );
}
