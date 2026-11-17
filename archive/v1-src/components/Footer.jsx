import { ArrowUp } from 'lucide-react';
import { navigation, profile } from '../config/profile.js';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-paper/[0.08] bg-night-deep">
      <div className="shell py-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div className="max-w-sm">
            <a href="#accueil" className="font-display text-2xl font-bold tracking-[0.12em]">KASSA</a>
            <p className="mt-3 text-paper/55">
              {profile.fullName} — {profile.title.toLowerCase()}, {profile.location}.
            </p>
          </div>
          <nav aria-label="Navigation du pied de page">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-3">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-paper/60 transition-colors hover:text-volt">{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Signature typographique */}
      <p aria-hidden="true" className="select-none text-center font-display text-[clamp(5rem,26vw,22rem)] font-bold leading-[0.75] tracking-[-0.06em] text-outline">
        KASSA
      </p>

      <div className="border-t border-paper/[0.08]">
        <div className="shell flex flex-col items-start justify-between gap-4 py-6 text-sm text-paper/45 sm:flex-row sm:items-center">
          <p>© {year} {profile.fullName}. Tous droits réservés.</p>
          <p className="hidden md:block">Visuels de projets : illustrations temporaires.</p>
          <a href="#accueil" className="inline-flex items-center gap-2 transition-colors hover:text-paper">
            Haut de page <ArrowUp className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
