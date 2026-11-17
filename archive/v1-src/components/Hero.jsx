import { ArrowDown, ArrowRight, Mail, ShieldCheck } from 'lucide-react';
import { profile } from '../config/profile.js';
import Button from './ui/Button.jsx';
import Portrait from './Portrait.jsx';

const focus = ['Protection contre la fraude', 'Analyse des risques', 'Réponse aux incidents'];

export default function Hero() {
  return (
    <section id="accueil" className="relative isolate overflow-hidden pb-16 pt-28 sm:pt-32 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-20 lg:pt-28">
      {/* Fond : grille + halo + réseau */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_75%_70%_at_65%_40%,black,transparent)]"
      />
      <div aria-hidden="true" className="absolute -right-40 -top-40 -z-10 size-[42rem] rounded-full bg-volt/[0.13] blur-[150px]" />
      <NetworkBackdrop />

      <div className="shell grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p className="reveal is-visible flex items-center gap-3 text-paper/70">
            <span className="relative flex size-2">
              <span className="absolute inset-0 rounded-full bg-volt animate-pulse-ring" />
              <span className="relative size-2 rounded-full bg-volt" />
            </span>
            <span className="eyebrow">{profile.title} · {profile.location}</span>
          </p>

          <h1 className="mt-8">
            <span className="block font-display text-xl font-medium tracking-tight text-paper/75 sm:text-2xl">
              {profile.firstNames}
            </span>
            <span className="relative mt-1 block font-display text-[clamp(5.2rem,17vw,12.5rem)] font-bold leading-[0.8] tracking-[-0.055em]">
              KASS<span className="text-volt">A</span>
              <span className="sr-only"> — {profile.title}</span>
            </span>
          </h1>

          <div className="mt-9 flex items-center gap-4">
            <span className="h-px w-12 bg-volt" aria-hidden="true" />
            <p className="font-display text-xl font-medium tracking-tight sm:text-2xl">{profile.title}</p>
          </div>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/65">{profile.intro}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="#projets" icon={ArrowRight}>Découvrir mes projets</Button>
            <Button href="#contact" variant="ghost" icon={Mail}>Me contacter</Button>
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-paper/[0.08] pt-6 text-sm text-paper/55">
            {focus.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-volt" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <Portrait />
        </div>
      </div>

      <a
        href="#a-propos"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs text-paper/40 transition-colors hover:text-paper lg:flex"
      >
        <ArrowDown className="size-4" aria-hidden="true" />
        <span className="eyebrow">Défiler</span>
      </a>
    </section>
  );
}

/* Quelques nœuds de réseau, très discrets, derrière le portrait */
function NetworkBackdrop() {
  const nodes = [
    [620, 120], [760, 210], [700, 360], [880, 300], [940, 140], [560, 470], [820, 520], [980, 430],
  ];
  const links = [[0, 1], [1, 2], [1, 3], [3, 4], [2, 5], [2, 6], [3, 7], [6, 7], [0, 4]];
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-y-0 right-0 -z-10 hidden h-full w-[70%] opacity-60 lg:block"
      viewBox="500 60 520 520"
      preserveAspectRatio="xMidYMid slice"
    >
      {links.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
          stroke="#268BFF" strokeOpacity="0.22" strokeWidth="1" strokeDasharray="3 6"
          className="animate-dash"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3" fill="#268BFF" fillOpacity={i % 3 === 0 ? 0.9 : 0.45} />
          <circle cx={x} cy={y} r="9" fill="none" stroke="#268BFF" strokeOpacity="0.15" />
        </g>
      ))}
    </svg>
  );
}
