import { Canvas, Chip, Line, N, P, V, Window } from './shared.jsx';

/* Illustration — plateforme de réponse aux incidents (maquette, pas une capture). */
export default function IrVisual() {
  const steps = ['Préparation', 'Détection & analyse', 'Confinement', 'Post-incident'];
  const actions = [
    { done: true, w: 210 },
    { done: true, w: 250 },
    { done: false, w: 180 },
  ];
  return (
    <Canvas label="Illustration : procédure interactive de réponse aux incidents, choix du type et de la gravité puis étapes">
      <Window x={40} y={36} w={720} h={428} title="Réponse aux incidents · NIST SP 800-61">
        {/* Barre latérale des étapes */}
        <rect x="0" y="36" width="200" height="392" fill={P} fillOpacity="0.02" />
        <line x1="200" y1="36" x2="200" y2="428" stroke={P} strokeOpacity="0.08" />
        <text x="22" y="72" fontSize="11" letterSpacing="2" fill={P} fillOpacity="0.45">ÉTAPES</text>
        <line x1="35" y1="102" x2="35" y2="276" stroke={P} strokeOpacity="0.12" />
        <line x1="35" y1="102" x2="35" y2="160" stroke={V} strokeWidth="2" />
        {steps.map((s, i) => (
          <g key={s} transform={`translate(22 ${90 + i * 60})`}>
            <circle cx="13" cy="12" r="13" fill={i <= 1 ? V : N} stroke={i <= 1 ? V : P} strokeOpacity={i <= 1 ? 1 : 0.25} />
            {i === 0 ? (
              <path d="M8 12l3.5 3.5 6.5-7" stroke={N} strokeWidth="2.2" fill="none" strokeLinecap="round" />
            ) : (
              <text x="13" y="16.5" textAnchor="middle" fontSize="12" fontWeight="600" fill={i === 1 ? N : P} fillOpacity={i === 1 ? 1 : 0.5}>{i + 1}</text>
            )}
            <text x="38" y="17" fontSize="13" fill={P} fillOpacity={i === 1 ? 1 : 0.55}>{s}</text>
          </g>
        ))}

        {/* Contenu */}
        <g transform="translate(228 70)">
          <text fontSize="11" letterSpacing="2" fill={P} fillOpacity="0.45">TYPE D’INCIDENT</text>
          <Chip x={0} y={14} label="Phishing" active />
          <Chip x={98} y={14} label="Logiciel malveillant" />
          <Chip x={268} y={14} label="Fuite de données" />

          <text y="86" fontSize="11" letterSpacing="2" fill={P} fillOpacity="0.45">GRAVITÉ</text>
          {['Faible', 'Moyenne', 'Élevée', 'Critique'].map((g, i) => (
            <g key={g} transform={`translate(${i * 112} 100)`}>
              <rect width="104" height="34" rx="10" fill={i === 2 ? V : P} fillOpacity={i === 2 ? 0.16 : 0.035} stroke={i === 2 ? V : P} strokeOpacity={i === 2 ? 0.7 : 0.1} />
              {[0, 1, 2, 3].map((b) => (
                <rect key={b} x={14 + b * 6} y={22 - b * 3} width="4" height={4 + b * 3} rx="1" fill={b <= i ? V : P} fillOpacity={b <= i ? 0.9 : 0.2} />
              ))}
              <text x="46" y="22" fontSize="13" fill={P} fillOpacity={i === 2 ? 1 : 0.6}>{g}</text>
            </g>
          ))}

          <text y="176" fontSize="11" letterSpacing="2" fill={P} fillOpacity="0.45">ACTIONS À MENER</text>
          {actions.map((a, i) => (
            <g key={i} transform={`translate(0 ${192 + i * 44})`}>
              <rect width="440" height="34" rx="10" fill={P} fillOpacity="0.03" stroke={P} strokeOpacity="0.08" />
              <rect x="12" y="9" width="16" height="16" rx="4" fill={a.done ? V : 'none'} stroke={a.done ? V : P} strokeOpacity={a.done ? 1 : 0.3} />
              {a.done && <path d="M16 17l3 3 5-6" stroke={N} strokeWidth="2" fill="none" strokeLinecap="round" />}
              <Line x={42} y={13.5} w={a.w} o={a.done ? 0.22 : 0.12} />
            </g>
          ))}
          {/* progression */}
          <rect y="330" width="440" height="6" rx="3" fill={P} fillOpacity="0.08" />
          <rect y="330" width="186" height="6" rx="3" fill={V} />
          <text x="440" y="320" textAnchor="end" fontSize="12" fill={P} fillOpacity="0.5">Étape 2 / 4</text>
        </g>
      </Window>
    </Canvas>
  );
}
