import { Canvas, N, P, V } from './shared.jsx';

/* Illustration — carte des modules de la plateforme de reconnaissance. */
export default function ReconVisual({ project }) {
  const modules = project?.modules ?? [];
  const cx = 400;
  const cy = 240;
  const rx = 300;
  const ry = 170;

  return (
    <Canvas label="Illustration : carte des modules de reconnaissance passive autour d'un domaine">
      {/* Orbites */}
      {[1, 0.66, 0.34].map((k) => (
        <ellipse key={k} cx={cx} cy={cy} rx={rx * k} ry={ry * k} fill="none" stroke={P} strokeOpacity="0.07" strokeDasharray={k === 1 ? '0' : '3 6'} />
      ))}

      {modules.map((m, i) => {
        const a = (i / modules.length) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(a) * rx;
        const y = cy + Math.sin(a) * ry;
        const w = Math.max(m.name.length * 8.4 + 30, 76);
        return (
          <g key={m.name}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke={V} strokeOpacity={m.api ? 0.18 : 0.35} strokeDasharray={m.api ? '4 6' : '0'} />
            <g transform={`translate(${x - w / 2} ${y - 17})`}>
              <rect width={w} height="34" rx="17" fill={N} stroke={m.api ? P : V} strokeOpacity={m.api ? 0.3 : 0.6} strokeDasharray={m.api ? '4 4' : '0'} />
              <circle cx="16" cy="17" r="3.5" fill={m.api ? 'none' : V} stroke={V} />
              <text x={w / 2 + 6} y="22" textAnchor="middle" fontSize="14" fill={P} fillOpacity={m.api ? 0.65 : 1}>{m.name}</text>
            </g>
          </g>
        );
      })}

      {/* Domaine central */}
      <circle cx={cx} cy={cy} r="62" fill={V} fillOpacity="0.08" />
      <circle cx={cx} cy={cy} r="44" fill={N} stroke={V} strokeWidth="1.5" />
      <text x={cx} y={cy - 2} textAnchor="middle" fontSize="11" letterSpacing="1.5" fill={V}>DOMAINE</text>
      <text x={cx} y={cy + 16} textAnchor="middle" fontSize="14" fontWeight="600" fill={P}>example.com</text>

      {/* Légende */}
      <g transform="translate(24 468)">
        <circle cx="6" cy="0" r="4" fill={V} />
        <text x="18" y="4.5" fontSize="12.5" fill={P} fillOpacity="0.65">Sans clé API (8)</text>
        <circle cx="150" cy="0" r="4" fill="none" stroke={V} />
        <text x="162" y="4.5" fontSize="12.5" fill={P} fillOpacity="0.65">Clé API requise (2)</text>
      </g>
    </Canvas>
  );
}
