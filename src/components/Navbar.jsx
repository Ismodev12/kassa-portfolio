import { useEffect, useState } from 'react';
import { navigation } from '../config/profile.js';
import { Arrow, Sigil } from './ui.jsx';

// Liens affichés de part et d'autre du logo centré (Accueil = le logo).
const links = navigation.filter((l) => l.id !== 'accueil');
const left = links.slice(0, 3);
const right = links.slice(3);

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const item = (l) => (
    <li key={l.id}><a href={`#${l.id}`} className="link-line transition-colors hover:text-accent">{l.label}</a></li>
  );

  return (
    <>
      <header className="fixed inset-x-0 top-5 z-50 px-5 sm:top-7 sm:px-10">
        <nav
          aria-label="Navigation principale"
          className="mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center rounded-full border border-bone/10 bg-ink/90 px-3 py-2.5 text-bone backdrop-blur-xl md:grid-cols-[1fr_auto_1fr] md:px-10 md:py-5"
        >
          <ul className="hidden items-center justify-around text-sm text-mist md:flex">{left.map(item)}</ul>
          <a href="#accueil" className="flex items-center gap-2.5 pl-3 font-display text-base font-bold tracking-[0.14em] md:px-10 md:text-xl" onClick={() => setOpen(false)}>
            <Sigil className="h-5 w-5 text-accent md:h-6 md:w-6" />KASSA
          </a>
          <ul className="hidden items-center justify-around text-sm text-mist md:flex">
            {right.map(item)}
            <li>
              <a href="#contact" className="rounded-full bg-accent px-4 py-2 font-display font-medium text-ink transition-colors hover:bg-bone">Me contacter</a>
            </li>
          </ul>
          <button
            type="button" aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open} aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
            className="relative grid h-11 w-11 place-items-center justify-self-end rounded-full bg-accent text-ink md:hidden"
          >
            <span className={`absolute h-0.5 w-5 bg-current transition-transform duration-300 ${open ? 'rotate-45' : '-translate-y-1'}`} />
            <span className={`absolute h-0.5 w-5 bg-current transition-transform duration-300 ${open ? '-rotate-45' : 'translate-y-1'}`} />
          </button>
        </nav>
      </header>

      {/* Menu mobile plein écran */}
      <div
        id="menu-mobile"
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-ink px-6 pb-10 pt-32 transition-[clip-path,visibility] duration-700 ease-[cubic-bezier(.7,0,.2,1)] md:hidden ${open ? 'visible' : 'invisible'}`}
        style={{ clipPath: open ? 'circle(150% at calc(100% - 3rem) 3rem)' : 'circle(0% at calc(100% - 3rem) 3rem)' }}
      >
        <ul className="space-y-1">
          {navigation.map((l, i) => (
            <li key={l.id} className="border-b border-bone/10">
              <a
                href={`#${l.id}`} onClick={() => setOpen(false)}
                className={`flex items-baseline justify-between py-4 font-display text-[2.6rem] font-bold tracking-tight transition-all duration-500 ${open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                style={{ transitionDelay: open ? `${200 + i * 70}ms` : '0ms' }}
              >
                {l.label}<span className="text-sm font-medium text-accent">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" onClick={() => setOpen(false)} className="btn mt-8 w-full bg-accent text-ink">Me contacter <Arrow /></a>
      </div>
    </>
  );
}
