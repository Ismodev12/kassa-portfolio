import { useRef } from 'react';
import { profile } from '../config/profile.js';
import { focusAreas } from '../data/content.js';
import { useScramble } from '../hooks.js';
import { Arrow } from './ui.jsx';

// Effet de profondeur (repris du portfolio Batista) : chaque calque se décale selon la
// position du curseur (--mx / --my, de -1 à 1), à des vitesses différentes.
const layer = 'transition-transform duration-500 ease-out will-change-transform';
const depth = (px) => ({ transform: `translate3d(calc(var(--mx) * ${px}px), calc(var(--my) * ${px}px), 0)` });
const disc = 'absolute left-1/2 top-[12%] aspect-square w-[92%] -ml-[46%] [container-type:inline-size]';
const tilt = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
  e.currentTarget.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
};
const untilt = (e) => { e.currentTarget.style.setProperty('--mx', 0); e.currentTarget.style.setProperty('--my', 0); };

/* Hero sombre et plein écran :
   - « KASSA » occupe toute la largeur, se déchiffre de bas en haut au chargement (ligne de scan) ;
   - le portrait, au centre, passe devant le bas des lettres ;
   - présentation à gauche, domaines à droite. */
export default function Hero() {
  const ref = useRef(null);
  const [title] = useScramble(`${profile.title} · ${profile.location}`, { delay: 500, duration: 1100 });
  const { src, alt, isPlaceholder, cutout } = profile.portrait;

  const spot = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--x', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--y', `${e.clientY - r.top}px`);
  };

  return (
    <section
      id="accueil" ref={ref} onPointerMove={spot}
      className="relative isolate overflow-hidden bg-ink pb-12 pt-28 lg:h-[100svh] lg:min-h-[44rem] lg:pb-0 lg:pt-[7.5rem]"
      style={{ '--x': '50%', '--y': '35%' }}
    >
      {/* Halo lumineux qui suit le curseur (pas de grille) */}
      <div aria-hidden="true" className="absolute left-1/2 top-[45%] -z-10 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[140px]" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden lg:block"
        style={{ background: 'radial-gradient(420px circle at var(--x) var(--y), rgb(var(--c-accent) / .14), transparent 70%)' }}
      />

      <div className="shell relative flex flex-col items-center text-center">
        <p className="animate-rise flex items-center gap-3 text-mist" style={{ '--d': '100ms' }}>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="eyebrow min-h-[1.2em] font-mono !text-sm !tracking-[0.18em] sm:!text-base" aria-label={`${profile.title} · ${profile.location}`}>{title}</span>
        </p>

        <h1 className="mt-5 w-full font-display font-bold">
          <span className="animate-rise block text-[clamp(1.7rem,3vw,2.9rem)] font-medium tracking-tight text-bone/85" style={{ '--d': '200ms' }}>
            {profile.firstNames}
          </span>
          {/* Nom géant : contour fixe + remplissage qui se déchiffre */}
          <span className="relative mt-1 block select-none text-[clamp(6.6rem,min(30vw,39svh),31rem)] leading-[0.8] tracking-[-0.065em]">
            <span aria-hidden="true" className="text-stroke block">KASSA</span>
            <span className="animate-decode absolute inset-0 block">
              KASS<span className="text-accent">A</span>
            </span>
            <span aria-hidden="true" className="animate-scan-down pointer-events-none absolute inset-x-[-5%] h-[3px] bg-accent shadow-[0_0_30px_8px_rgb(var(--c-accent)/.6)]" />
          </span>
          <span className="sr-only"> — {profile.title}</span>
        </h1>
      </div>

      {/* Portrait détouré au centre, posé sur le bas de l'écran, devant le bas des lettres */}
      {cutout ? (
        /* Survol du portrait — même animation que le portfolio Batista :
           1. profondeur : le disque, l'anneau, le trait et la photo suivent le curseur à des vitesses différentes ;
           2. couleur : la photo, en noir et blanc au repos, retrouve ses vraies couleurs ;
           3. orbite : un anneau en pointillés apparaît et les trois domaines tournent autour de Képhysiase. */
        <figure className="relative z-10 mx-auto mt-6 w-[min(34rem,100vw)] lg:absolute lg:bottom-0 lg:left-1/2 lg:mt-0 lg:h-[min(80svh,60rem,44vw,calc(100svh-15rem))] lg:w-auto lg:-translate-x-1/2">
          <div
            onMouseMove={tilt} onMouseLeave={untilt} style={{ '--mx': 0, '--my': 0, '--d': '600ms' }}
            className="animate-rise group/portrait relative h-full"
          >
            {/* Disque derrière la tête */}
            <div aria-hidden="true" className={`${disc} ${layer}`} style={depth(-16)}>
              <div className="h-full w-full rounded-full bg-accent/[0.16] transition-transform duration-700 group-hover/portrait:scale-[1.05]" />
            </div>
            {/* Anneau en pointillés qui apparaît et tourne */}
            <div aria-hidden="true" className={`${disc} ${layer}`} style={depth(-8)}>
              <div className="h-full w-full scale-90 animate-spin-slow rounded-full border-2 border-dashed border-accent opacity-0 transition-[opacity,transform] duration-700 group-hover/portrait:scale-[1.14] group-hover/portrait:opacity-100" />
            </div>
            {/* Trait courbe décoratif */}
            <svg viewBox="0 0 200 200" className={`absolute -left-[8%] top-[34%] w-[44%] text-bone/40 ${layer}`} style={depth(-30)} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <path d="M150 20C70 10 10 70 30 130s90 70 130 30-10-110-60-90-50 80 0 90" />
            </svg>

            {/* Photo : noir et blanc au repos, couleurs au survol */}
            <img
              src={src} alt={alt} width={996} height={1080} fetchpriority="high" draggable="false"
              className={`relative mx-auto block h-auto w-full select-none grayscale contrast-[1.05] transition-[transform,filter] duration-700 ease-out will-change-transform group-hover/portrait:grayscale-0 lg:h-full lg:w-auto`}
              style={depth(10)}
            />

            {/* Domaines en orbite, devant le portrait */}
            <div aria-hidden="true" className={`pointer-events-none ${disc} ${layer}`} style={depth(-8)}>
              <div className="h-full w-full scale-[1.14] animate-spin-slow">
                {focusAreas.map((f, i) => (
                  <span key={f.name} className="absolute left-1/2 top-1/2 h-0 w-0" style={{ transform: `rotate(${i * 120 + 35}deg) translateY(-50cqw)` }}>
                    <span className="absolute -left-7 -top-7 block h-14 w-14 animate-spin-slow [animation-direction:reverse]">
                      <span
                        className="grid h-14 w-14 scale-0 place-items-center rounded-full bg-ink text-accent shadow-xl ring-2 ring-accent transition-transform duration-500 ease-[cubic-bezier(.2,1.4,.4,1)] group-hover/portrait:scale-100"
                        style={{ transitionDelay: `${i * 90}ms`, rotate: `${-(i * 120 + 35)}deg` }}
                      >
                        <f.icon className="h-6 w-6" />
                      </span>
                    </span>
                  </span>
                ))}
              </div>
            </div>

            {/* Fondu vers le bas pour poser le buste sur la page */}
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t from-ink to-transparent" />
          </div>
        </figure>
      ) : (
      <figure className="group relative z-10 mx-auto mt-8 w-[min(21rem,80vw)] lg:absolute lg:bottom-0 lg:left-1/2 lg:mt-0 lg:h-[min(58svh,40rem)] lg:w-auto lg:-translate-x-1/2">
        <div className="animate-rise relative aspect-[4/5] overflow-hidden rounded-t-full border border-b-0 border-bone/20 bg-deep shadow-[0_-20px_80px_-20px_rgb(var(--c-accent)/.45)] lg:h-full" style={{ '--d': '600ms' }}>
          <img
            src={src} alt={alt} width={880} height={1100}
            className="h-full w-full object-cover object-[50%_28%] grayscale contrast-[1.08] transition-[filter] duration-700 group-hover:grayscale-0"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-accent opacity-35 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0" />
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink to-transparent" />
          {isPlaceholder && (
            <span className="absolute left-1/2 top-[16%] -translate-x-1/2 whitespace-nowrap rounded-full bg-ink/80 px-3 py-1 text-[0.7rem] text-bone/80 backdrop-blur">
              Photo temporaire
            </span>
          )}
        </div>
        {/* Repères de visée autour du portrait */}
        <span aria-hidden="true" className="absolute -left-4 top-1/3 h-px w-8 bg-accent" />
        <span aria-hidden="true" className="absolute -right-4 top-1/3 h-px w-8 bg-accent" />
      </figure>
      )}

      {/* Bas gauche : présentation + boutons */}
      <div className="shell relative z-20 mt-10 lg:absolute lg:bottom-10 lg:left-0 lg:mt-0 lg:w-auto lg:px-12">
        <div className="animate-rise mx-auto max-w-md text-center lg:mx-0 lg:w-[min(27rem,25vw)] lg:text-left" style={{ '--d': '900ms' }}>
          <p className="text-lg leading-relaxed text-bone/90 [text-shadow:0_2px_18px_rgb(var(--c-ink)),0_0_4px_rgb(var(--c-ink))] lg:text-[1.2rem]">{profile.intro}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 lg:flex-nowrap lg:justify-start">
            <a href="#projets" className="btn group !gap-2 bg-accent !px-7 !py-4 !text-base text-ink hover:bg-bone">
              Découvrir mes projets <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </a>
            <a href="#contact" className="btn border border-bone/25 !px-7 !py-4 !text-base text-bone hover:border-bone hover:bg-bone hover:text-ink">
              Me contacter
            </a>
          </div>
        </div>
      </div>

      {/* Bas droite : les trois domaines en pastilles (le libellé apparaît au survol) */}
      <div className="shell relative z-20 mt-10 lg:absolute lg:bottom-12 lg:right-0 lg:mt-0 lg:w-auto lg:px-16">
        <ul className="animate-rise flex justify-center gap-3 lg:flex-col lg:items-end" style={{ '--d': '1100ms' }} aria-label="Domaines">
          {focusAreas.map((f) => (
            <li key={f.name} className="group/f flex items-center gap-3">
              <span className="hidden whitespace-nowrap rounded-full bg-bone px-3 py-1.5 font-display text-sm font-bold text-ink opacity-0 transition-all duration-300 group-hover/f:translate-x-0 group-hover/f:opacity-100 lg:block lg:translate-x-2">
                {f.role}
              </span>
              <span title={f.role} className="grid h-12 w-12 place-items-center rounded-full border border-bone/15 bg-ink/60 text-accent backdrop-blur transition-colors group-hover/f:border-accent group-hover/f:bg-accent group-hover/f:text-ink">
                <f.icon className="h-5 w-5" aria-hidden="true" /><span className="sr-only lg:hidden">{f.role}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
