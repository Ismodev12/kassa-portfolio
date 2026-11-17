/* Éléments partagés par les illustrations de projets (SVG 800 × 500). */

export const V = '#976BFF'; // accent (violet électrique)
export const P = '#F6F3FB'; // blanc lavande
export const N = '#100B1C'; // fond sombre
export const D = '#090611'; // fond très sombre

export const FONT = { fontFamily: '"Space Grotesk", ui-sans-serif, sans-serif' };

/** Canevas SVG commun. */
export function Canvas({ children, label }) {
  return (
    <svg
      viewBox="0 0 800 500"
      className="absolute inset-0 size-full"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={label}
      style={FONT}
    >
      {children}
    </svg>
  );
}

/** Fenêtre d'application stylisée. */
export function Window({ x, y, w, h, title, children }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} rx="16" fill={N} stroke={P} strokeOpacity="0.12" />
      <path d={`M0 16a16 16 0 0 1 16-16h${w - 32}a16 16 0 0 1 16 16v20H0z`} fill={P} fillOpacity="0.04" />
      <line x1="0" y1="36" x2={w} y2="36" stroke={P} strokeOpacity="0.08" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={20 + i * 14} cy="18" r="4" fill={P} fillOpacity={i === 0 ? 0.35 : 0.15} />
      ))}
      {title && (
        <text x={w / 2} y="23" textAnchor="middle" fontSize="12" fill={P} fillOpacity="0.45" letterSpacing="0.5">
          {title}
        </text>
      )}
      {children}
    </g>
  );
}

/** Ligne de texte factice. */
export function Line({ x, y, w, o = 0.12, h = 7 }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={P} fillOpacity={o} />;
}

/** Pastille (chip). */
export function Chip({ x, y, label, active = false, w }) {
  const width = w ?? label.length * 7.6 + 26;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        width={width}
        height="28"
        rx="14"
        fill={active ? V : P}
        fillOpacity={active ? 0.16 : 0.04}
        stroke={active ? V : P}
        strokeOpacity={active ? 0.7 : 0.14}
      />
      <text x={width / 2} y="18.5" textAnchor="middle" fontSize="13" fill={active ? P : P} fillOpacity={active ? 1 : 0.6}>
        {label}
      </text>
    </g>
  );
}
