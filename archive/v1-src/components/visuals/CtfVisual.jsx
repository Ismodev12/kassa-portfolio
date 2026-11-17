import { Canvas, N, P, V, Window } from './shared.jsx';

/* Illustration — CTF, cryptographie et forensic (terminal fictif). */
export default function CtfVisual() {
  const lines = [
    ['$', 'grep -i "encrypt" logs/*.log'],
    ['$', 'dig axfr @ns1.lab.local lab.local'],
    ['$', 'openssl enc -d -aes-256-cbc -in flag.enc'],
    ['$', 'steghide extract -sf image.jpg'],
  ];
  const block = (x, y, label, hot) => (
    <g transform={`translate(${x} ${y})`}>
      <rect width="52" height="30" rx="7" fill={hot ? V : P} fillOpacity={hot ? 0.18 : 0.05} stroke={hot ? V : P} strokeOpacity={hot ? 0.7 : 0.18} />
      <text x="26" y="20" textAnchor="middle" fontSize="13" fill={P}>{label}</text>
    </g>
  );

  return (
    <Canvas label="Illustration : terminal d'investigation et schéma des modes de chiffrement ECB et CBC">
      <Window x={36} y={40} w={440} h={300} title="kassa@lab — terminal">
        {lines.map(([p, c], i) => (
          <text key={i} x="22" y={78 + i * 44} fontSize="14" fontFamily="ui-monospace, Menlo, Consolas, monospace">
            <tspan fill={V}>{p} </tspan>
            <tspan fill={P} fillOpacity="0.85">{c}</tspan>
          </text>
        ))}
        {lines.map((_, i) => (
          <rect key={i} x="36" y={88 + i * 44} width={120 + ((i * 53) % 140)} height="6" rx="3" fill={P} fillOpacity="0.08" />
        ))}
        <text x="22" y="262" fontSize="14" fontFamily="ui-monospace, Menlo, Consolas, monospace" fill={V}>$ <tspan className="animate-blink" fill={P}>▌</tspan></text>
      </Window>

      {/* ECB vs CBC */}
      <g transform="translate(504 40)">
        <rect width="260" height="300" rx="16" fill={N} stroke={P} strokeOpacity="0.12" />
        <text x="22" y="36" fontSize="12" letterSpacing="2" fill={V}>ECB</text>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            {block(22 + i * 76, 52, `P${i + 1}`)}
            <path d={`M${48 + i * 76} 82v14`} stroke={P} strokeOpacity="0.3" />
            {block(22 + i * 76, 96, `C${i + 1}`, true)}
          </g>
        ))}
        <line x1="22" y1="150" x2="238" y2="150" stroke={P} strokeOpacity="0.08" />
        <text x="22" y="180" fontSize="12" letterSpacing="2" fill={V}>CBC</text>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            {block(22 + i * 76, 194, `P${i + 1}`)}
            <circle cx={48 + i * 76} cy="238" r="8" fill="none" stroke={V} />
            <path d={`M${40 + i * 76} 238h16M${48 + i * 76} 230v16`} stroke={V} />
            <path d={`M${48 + i * 76} 224v6M${48 + i * 76} 246v6`} stroke={P} strokeOpacity="0.3" />
            {block(22 + i * 76, 252, `C${i + 1}`, true)}
            {i < 2 && <path d={`M${74 + i * 76} 267 C ${90 + i * 76} 267, ${92 + i * 76} 238, ${114 + i * 76} 238`} fill="none" stroke={V} strokeOpacity="0.5" strokeDasharray="3 3" />}
          </g>
        ))}
      </g>

      {/* Plateformes */}
      <g transform="translate(36 372)">
        <text y="0" fontSize="12" letterSpacing="2" fill={P} fillOpacity="0.45">PLATEFORMES</text>
        {['Root-Me', 'HackerLab', 'TryHackMe'].map((pf, i) => (
          <g key={pf} transform={`translate(${i * 150} 16)`}>
            <rect width="136" height="40" rx="20" fill={P} fillOpacity="0.04" stroke={P} strokeOpacity="0.14" />
            <text x="68" y="25" textAnchor="middle" fontSize="14" fill={P}>{pf}</text>
          </g>
        ))}
        {['AES', 'RSA', 'XOR', 'JWT', 'XSS'].map((t, i) => (
          <g key={t} transform={`translate(${468 + i * 58} 16)`}>
            <rect width="50" height="40" rx="10" fill={V} fillOpacity="0.1" stroke={V} strokeOpacity="0.4" />
            <text x="25" y="25" textAnchor="middle" fontSize="13" fill={P}>{t}</text>
          </g>
        ))}
      </g>
    </Canvas>
  );
}
