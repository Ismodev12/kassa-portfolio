import { Canvas, Line, N, P, V } from './shared.jsx';

/* Illustration — sensibilisation et document « Bouclier numérique africain ».
   La couverture est une composition temporaire, pas le vrai document. */
export default function HygieneVisual() {
  return (
    <Canvas label="Illustration : couverture du document « Bouclier numérique africain » et fiches de conseils">
      {/* Pages en éventail */}
      <g transform="translate(150 74) rotate(-8 130 170)">
        <rect width="250" height="340" rx="14" fill={P} fillOpacity="0.03" stroke={P} strokeOpacity="0.08" />
      </g>
      <g transform="translate(160 66) rotate(-3 130 170)">
        <rect width="250" height="340" rx="14" fill={P} fillOpacity="0.04" stroke={P} strokeOpacity="0.1" />
      </g>

      {/* Couverture */}
      <g transform="translate(176 60)">
        <rect width="250" height="350" rx="14" fill={N} stroke={P} strokeOpacity="0.18" />
        <rect x="0" y="0" width="250" height="160" rx="14" fill={V} fillOpacity="0.1" />
        <g transform="translate(95 34)">
          <path d="M30 0 58 11v24c0 22-12.5 37-28 43C14.5 72 2 57 2 35V11z" fill={N} stroke={V} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M18 38l9 9 16-18" stroke={V} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <text x="24" y="200" fontSize="12" letterSpacing="2" fill={V}>DOCUMENT</text>
        <text x="24" y="232" fontSize="23" fontWeight="600" fill={P}>Bouclier</text>
        <text x="24" y="260" fontSize="23" fontWeight="600" fill={P}>numérique africain</text>
        <Line x={24} y={290} w={170} o={0.1} />
        <Line x={24} y={306} w={130} o={0.1} />
        <text x="24" y="334" fontSize="12" fill={P} fillOpacity="0.45">D. K. KASSA</text>
      </g>

      {/* Fiches conseils */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(480 ${78 + i * 108})`}>
          <rect width="250" height="88" rx="16" fill={i === 0 ? V : P} fillOpacity={i === 0 ? 0.1 : 0.035} stroke={i === 0 ? V : P} strokeOpacity={i === 0 ? 0.5 : 0.1} />
          <circle cx="40" cy="44" r="20" fill={V} fillOpacity="0.15" />
          <path d="M33 44l5 5 9-10" stroke={V} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="76" y="36" fontSize="12" letterSpacing="1.5" fill={V}>CONSEIL 0{i + 1}</text>
          <Line x={76} y={50} w={140 - i * 20} o={0.18} />
          <Line x={76} y={64} w={100 + i * 14} o={0.1} />
        </g>
      ))}
    </Canvas>
  );
}
