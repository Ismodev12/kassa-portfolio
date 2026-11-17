import ArduinoVisual from './ArduinoVisual.jsx';
import BecVisual from './BecVisual.jsx';
import CtfVisual from './CtfVisual.jsx';
import HygieneVisual from './HygieneVisual.jsx';
import IrVisual from './IrVisual.jsx';
import ReconVisual from './ReconVisual.jsx';
import TenderVisual from './TenderVisual.jsx';

const visuals = {
  bec: BecVisual,
  tender: TenderVisual,
  ir: IrVisual,
  recon: ReconVisual,
  ctf: CtfVisual,
  arduino: ArduinoVisual,
  hygiene: HygieneVisual,
};

/**
 * Visuel d'un projet : la vraie capture si `project.image` est fournie,
 * sinon l'illustration temporaire, clairement signalée comme telle.
 */
export default function ProjectVisual({ project, className = '', showBadge = true }) {
  const Illustration = visuals[project.visual];

  return (
    <div className={`relative overflow-hidden bg-night-deep ${className}`}>
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-70" />
      <div aria-hidden="true" className="absolute -right-24 -top-24 size-72 rounded-full bg-volt/10 blur-3xl" />

      {project.image ? (
        <img src={project.image} alt={`Capture du projet ${project.title}`} className="absolute inset-0 size-full object-cover" loading="lazy" />
      ) : (
        Illustration && (
          <div className={`absolute inset-x-[4%] top-[4%] ${showBadge ? 'bottom-[12%]' : 'bottom-[4%]'}`}>
            <Illustration project={project} />
          </div>
        )
      )}

      {showBadge && !project.image && (
        <span className="absolute bottom-3 left-3 rounded-full border border-paper/15 bg-night/80 px-2.5 py-1 text-[0.68rem] text-paper/60 backdrop-blur">
          Visuel illustratif
        </span>
      )}
    </div>
  );
}
