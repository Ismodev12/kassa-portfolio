import { Canvas, Line, P, V, Window, N } from './shared.jsx';

/* Illustration — diagnostic BEC/phishing (composition, pas une capture). */
export default function BecVisual() {
  const auth = [
    { k: 'SPF', s: 'ok' },
    { k: 'DKIM', s: 'ok' },
    { k: 'DMARC', s: 'warn' },
  ];
  const phases = ['Préparation', 'Détection & analyse', 'Confinement', 'Post-incident'];

  return (
    <Canvas label="Illustration : analyse d'un e-mail frauduleux, vérification SPF/DKIM/DMARC, matrice de risques et cycle NIST">
      {/* E-mail suspect */}
      <Window x={48} y={44} w={410} h={300} title="Boîte de réception — laboratoire">
        <text x="24" y="70" fontSize="13" fill={P} fillOpacity="0.45">De</text>
        <text x="80" y="70" fontSize="14" fill={P}>
          Direction générale{' '}
          <tspan fillOpacity="0.55">&lt;dg@examp</tspan>
          <tspan fill={V} fontWeight="700" textDecoration="underline">1</tspan>
          <tspan fillOpacity="0.55">e.com&gt;</tspan>
        </text>
        <text x="24" y="98" fontSize="13" fill={P} fillOpacity="0.45">Objet</text>
        <text x="80" y="98" fontSize="14" fill={P}>Virement urgent et confidentiel</text>
        <line x1="24" y1="116" x2="386" y2="116" stroke={P} strokeOpacity="0.08" />
        <Line x={24} y={136} w={300} />
        <Line x={24} y={154} w={340} />
        <Line x={24} y={172} w={250} />
        <rect x="24" y="196" width="230" height="34" rx="8" fill={V} fillOpacity="0.1" stroke={V} strokeOpacity="0.5" strokeDasharray="4 4" />
        <text x="40" y="218" fontSize="13" fill={P}>IBAN modifié — à exécuter ce jour</text>
        <Line x={24} y={248} w={190} o={0.08} />
        <Line x={24} y={266} w={260} o={0.08} />
        {/* annotation */}
        <g transform="translate(318 140)">
          <rect width="78" height="44" rx="10" fill={V} />
          <text x="39" y="19" textAnchor="middle" fontSize="11" fill={N} fontWeight="600">domaine</text>
          <text x="39" y="34" textAnchor="middle" fontSize="11" fill={N} fontWeight="600">sosie</text>
        </g>
        <path d="M357 140 L357 84" fill="none" stroke={V} strokeWidth="1.5" strokeDasharray="3 3" />
      </Window>

      {/* Authentification */}
      <g transform="translate(486 44)">
        <rect width="266" height="140" rx="16" fill={N} stroke={P} strokeOpacity="0.12" />
        <text x="22" y="34" fontSize="12" letterSpacing="2" fill={V}>AUTHENTIFICATION</text>
        {auth.map((a, i) => (
          <g key={a.k} transform={`translate(22 ${56 + i * 26})`}>
            <text y="12" fontSize="15" fill={P}>{a.k}</text>
            <line x1="70" y1="7" x2="170" y2="7" stroke={P} strokeOpacity="0.1" strokeDasharray="2 4" />
            <circle cx="210" cy="7" r="9" fill={a.s === 'ok' ? V : P} fillOpacity={a.s === 'ok' ? 0.2 : 0.1} />
            {a.s === 'ok' ? (
              <path d="M205.5 7l3 3 6-6" stroke={V} strokeWidth="2" fill="none" strokeLinecap="round" />
            ) : (
              <text x="210" y="11.5" textAnchor="middle" fontSize="12" fontWeight="700" fill={P}>!</text>
            )}
          </g>
        ))}
      </g>

      {/* Matrice EBIOS RM */}
      <g transform="translate(486 200)">
        <rect width="266" height="144" rx="16" fill={N} stroke={P} strokeOpacity="0.12" />
        <text x="22" y="32" fontSize="12" letterSpacing="2" fill={V}>EBIOS RM</text>
        {Array.from({ length: 16 }).map((_, i) => {
          const r = Math.floor(i / 4);
          const c = i % 4;
          const hot = (r === 0 && c === 3) || (r === 1 && c === 2);
          return (
            <rect
              key={i}
              x={22 + c * 26}
              y={46 + r * 22}
              width="22"
              height="18"
              rx="4"
              fill={hot ? V : P}
              fillOpacity={hot ? 0.85 : 0.04 + (c + (3 - r)) * 0.015}
            />
          );
        })}
        <text x="140" y="80" fontSize="30" fontWeight="700" fill={P}>2</text>
        <text x="140" y="100" fontSize="12" fill={P} fillOpacity="0.6">scénarios</text>
        <text x="140" y="116" fontSize="12" fill={P} fillOpacity="0.6">prioritaires</text>
      </g>

      {/* Cycle NIST SP 800-61 */}
      <g transform="translate(48 372)">
        <text y="0" fontSize="12" letterSpacing="2" fill={P} fillOpacity="0.45">NIST SP 800-61 — PLAN DE RÉPONSE</text>
        {phases.map((ph, i) => (
          <g key={ph} transform={`translate(${i * 178} 18)`}>
            <rect width="164" height="52" rx="12" fill={i === 1 ? V : P} fillOpacity={i === 1 ? 0.14 : 0.035} stroke={i === 1 ? V : P} strokeOpacity={i === 1 ? 0.6 : 0.1} />
            <text x="16" y="22" fontSize="11" fill={V}>0{i + 1}</text>
            <text x="16" y="40" fontSize="14" fill={P}>{ph}</text>
            {i < 3 && <path d={`M164 26h14`} stroke={V} strokeOpacity="0.6" />}
          </g>
        ))}
      </g>

      {/* Mention labo */}
      <g transform="translate(626 14)">
        <rect width="126" height="22" rx="11" fill="none" stroke={P} strokeOpacity="0.2" />
        <text x="63" y="15" textAnchor="middle" fontSize="11" letterSpacing="1.5" fill={P} fillOpacity="0.6">LABO ISOLÉ</text>
      </g>
    </Canvas>
  );
}
