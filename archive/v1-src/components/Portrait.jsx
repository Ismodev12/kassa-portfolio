import { Fingerprint, MailWarning, Workflow } from 'lucide-react';
import { profile } from '../config/profile.js';

/** Grand portrait de la Hero. La photo se change dans config/profile.js. */
export default function Portrait() {
  const { src, alt, isPlaceholder, treatment } = profile.portrait;
  const duotone = treatment === 'duotone';

  return (
    <figure className="relative mx-auto w-full max-w-[26rem] lg:ml-auto lg:mr-0">
      {/* Repères de cadrage */}
      <Corner className="-left-3 -top-3" />
      <Corner className="-right-3 -top-3 rotate-90" />
      <Corner className="-bottom-3 -right-3 rotate-180" />
      <Corner className="-bottom-3 -left-3 -rotate-90" />

      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-paper/10 bg-night-deep">
        <img
          src={src}
          alt={alt}
          width="880"
          height="1100"
          fetchpriority="high"
          className={`size-full object-cover object-[50%_30%] ${duotone ? 'grayscale contrast-[1.1] brightness-110' : ''}`}
        />
        {duotone && (
          <>
            <div aria-hidden="true" className="absolute inset-0 bg-volt mix-blend-multiply opacity-35" />
            <div aria-hidden="true" className="absolute inset-0 bg-night mix-blend-color opacity-30" />
          </>
        )}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night via-night/5 to-transparent" />
        <div aria-hidden="true" className="absolute inset-0 bg-dots opacity-40 mix-blend-overlay" />
        {/* Ligne de balayage */}
        <div aria-hidden="true" className="animate-scan absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-transparent via-volt/20 to-transparent" />

        <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
          <div>
            <p className="eyebrow text-volt">Profil</p>
            <p className="mt-1 font-display text-lg font-medium leading-tight">{profile.fullName}</p>
          </div>
          <Fingerprint className="size-9 shrink-0 text-paper/40" strokeWidth={1.2} aria-hidden="true" />
        </figcaption>

        {isPlaceholder && (
          <span className="absolute left-4 top-4 rounded-full border border-paper/20 bg-night/70 px-3 py-1 text-[0.7rem] text-paper/70 backdrop-blur">
            Photo temporaire
          </span>
        )}
      </div>

      {/* Étiquettes flottantes */}
      <div className="absolute -left-4 top-[18%] hidden items-center gap-3 rounded-2xl border border-paper/10 bg-night/85 px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur-md sm:flex lg:-left-14">
        <span className="grid size-9 place-items-center rounded-xl bg-volt/15 text-volt">
          <MailWarning className="size-[18px]" aria-hidden="true" />
        </span>
        <span className="text-sm leading-tight">
          <span className="block text-paper/50">Fraude</span>
          <span className="font-display font-medium">Phishing · BEC</span>
        </span>
      </div>
      <div className="absolute -right-3 bottom-[22%] hidden items-center gap-3 rounded-2xl border border-paper/10 bg-night/85 px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur-md sm:flex lg:-right-8">
        <span className="grid size-9 place-items-center rounded-xl bg-volt/15 text-volt">
          <Workflow className="size-[18px]" aria-hidden="true" />
        </span>
        <span className="text-sm leading-tight">
          <span className="block text-paper/50">Réponse aux incidents</span>
          <span className="font-display font-medium">NIST SP 800-61</span>
        </span>
      </div>
    </figure>
  );
}

function Corner({ className }) {
  return (
    <span aria-hidden="true" className={`absolute z-10 size-6 ${className}`}>
      <span className="absolute left-0 top-0 h-px w-full bg-volt" />
      <span className="absolute left-0 top-0 h-full w-px bg-volt" />
    </span>
  );
}
