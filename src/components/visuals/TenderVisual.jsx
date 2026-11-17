import { Canvas, Line, N, P, V } from './shared.jsx';

/* Illustration — ANC2026 Cyber Challenge (composition, pas un document réel). */
export default function TenderVisual() {
  const deliverables = ['Étude comparative SIEM', 'Fiches CMM', 'Playbook', 'Synthèse & présentation'];
  return (
    <Canvas label="Illustration : dossier d'appel d'offres et contributions de l'équipe HIN'EGO">
      {/* Pile de documents */}
      <g transform="translate(70 70) rotate(-5)">
        <rect width="280" height="350" rx="14" fill={P} fillOpacity="0.03" stroke={P} strokeOpacity="0.08" />
      </g>
      <g transform="translate(84 62) rotate(-2)">
        <rect width="280" height="350" rx="14" fill={P} fillOpacity="0.04" stroke={P} strokeOpacity="0.1" />
      </g>
      <g transform="translate(98 56)">
        <rect width="280" height="350" rx="14" fill={N} stroke={P} strokeOpacity="0.16" />
        <rect width="280" height="6" rx="3" fill={V} />
        <text x="26" y="52" fontSize="11" letterSpacing="2" fill={V}>APPEL D’OFFRES</text>
        <text x="26" y="70" fontSize="11" letterSpacing="2" fill={V}>INTERNATIONAL</text>
        <text x="26" y="118" fontSize="24" fontWeight="600" fill={P}>Architecture SI</text>
        <text x="26" y="148" fontSize="24" fontWeight="600" fill={P}>&amp; cybersécurité</text>
        <text x="26" y="178" fontSize="15" fill={P} fillOpacity="0.55">Groupe bancaire</text>
        <Line x={26} y={214} w={200} o={0.1} />
        <Line x={26} y={230} w={228} o={0.1} />
        <Line x={26} y={246} w={160} o={0.1} />
        <line x1="26" y1="292" x2="254" y2="292" stroke={P} strokeOpacity="0.1" />
        <text x="26" y="322" fontSize="13" fill={P} fillOpacity="0.5">Équipe</text>
        <text x="254" y="322" textAnchor="end" fontSize="15" fontWeight="600" fill={P}>HIN’EGO</text>
      </g>

      {/* Contributions */}
      <g transform="translate(430 56)">
        <text y="4" fontSize="12" letterSpacing="2" fill={P} fillOpacity="0.45">CONTRIBUTIONS</text>
        {deliverables.map((d, i) => (
          <g key={d} transform={`translate(0 ${24 + i * 70})`}>
            <rect width="310" height="56" rx="14" fill={i === 0 ? V : P} fillOpacity={i === 0 ? 0.12 : 0.035} stroke={i === 0 ? V : P} strokeOpacity={i === 0 ? 0.55 : 0.1} />
            <text x="20" y="34" fontSize="11" fill={V}>0{i + 1}</text>
            <text x="48" y="34" fontSize="15" fill={P}>{d}</text>
            {i === 0 && (
              <g transform="translate(232 16)">
                {[22, 14, 18, 9].map((h, j) => (
                  <rect key={j} x={j * 14} y={24 - h} width="8" height={h} rx="2" fill={V} fillOpacity={0.4 + j * 0.15} />
                ))}
              </g>
            )}
          </g>
        ))}
        {/* mini architecture */}
        <g transform="translate(0 316)">
          {['Sources', 'SIEM', 'SOC'].map((s, i) => (
            <g key={s} transform={`translate(${i * 112} 0)`}>
              <rect width="86" height="34" rx="10" fill="none" stroke={i === 1 ? V : P} strokeOpacity={i === 1 ? 0.8 : 0.2} />
              <text x="43" y="22" textAnchor="middle" fontSize="13" fill={P} fillOpacity={i === 1 ? 1 : 0.6}>{s}</text>
              {i < 2 && <path d="M86 17h26" stroke={V} strokeOpacity="0.6" strokeDasharray="3 3" className="animate-dash" />}
            </g>
          ))}
        </g>
      </g>

      {/* Badge responsable */}
      <g transform="translate(270 404)">
        <rect width="190" height="40" rx="20" fill={V} />
        <text x="95" y="25" textAnchor="middle" fontSize="13" fontWeight="600" fill={N}>Responsable d’équipe</text>
      </g>
    </Canvas>
  );
}
