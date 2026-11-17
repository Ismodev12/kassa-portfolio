import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navigation } from '../config/profile.js';
import { useActiveSection } from '../hooks/useActiveSection.js';

const ids = navigation.map((n) => n.id);

export default function Navbar() {
  const active = useActiveSection(ids);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Menu mobile : fermeture avec Échap et blocage du défilement
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled || open
          ? 'border-b border-paper/[0.07] bg-night/80 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="shell flex h-16 items-center justify-between lg:h-[4.5rem]" aria-label="Navigation principale">
        <a href="#accueil" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="relative grid size-8 place-items-center rounded-lg border border-volt/40 bg-volt/10">
            <span className="size-1.5 rounded-full bg-volt" />
            <span className="absolute inset-0 rounded-lg border border-volt/30 animate-pulse-ring" aria-hidden="true" />
          </span>
          <span className="font-display text-xl font-bold tracking-[0.12em]">KASSA</span>
        </a>

        <ul className="hidden items-center gap-1 rounded-full border border-paper/[0.08] bg-paper/[0.03] p-1 lg:flex">
          {navigation.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? 'true' : undefined}
                className={`relative block rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                  active === item.id ? 'bg-paper/[0.08] text-paper' : 'text-paper/55 hover:text-paper'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-full bg-volt px-5 py-2.5 font-display text-sm font-medium text-night transition-colors duration-300 hover:bg-paper sm:inline-flex"
          >
            Me contacter
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-paper/15 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="menu-mobile" className="animate-fade-in h-[calc(100svh-4rem)] border-t border-paper/[0.07] bg-night lg:hidden">
          <ul className="shell flex flex-col pt-6">
            {navigation.map((item, i) => (
              <li key={item.id} className="border-b border-paper/[0.07]">
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={`flex items-baseline gap-4 py-5 font-display text-3xl font-medium tracking-tight ${
                    active === item.id ? 'text-paper' : 'text-paper/60'
                  }`}
                >
                  <span className="eyebrow text-volt">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="shell mt-8">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-volt py-4 font-display font-medium text-night"
            >
              Me contacter <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
