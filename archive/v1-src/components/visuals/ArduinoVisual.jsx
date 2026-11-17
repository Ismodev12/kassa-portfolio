import { Canvas, N, P, V } from './shared.jsx';

/* Illustration technique — veilleuse à 15 LED pilotée par la voix.
   Les teintes rouge / vert / jaune ne servent qu'à représenter les LED. */
const LED = {
  rouge: '#e5484d',
  vert: '#3dd68c',
  jaune: '#f5c242',
};

export default function ArduinoVisual() {
  const rows = [
    { name: 'rouge', on: false },
    { name: 'vert', on: true },
    { name: 'jaune', on: false },
  ];

  return (
    <Canvas label="Illustration technique : carte Arduino reliée à 15 LED, la rangée verte allumée par la commande vocale « allume le vert »">
      <defs>
        <radialGradient id="glow">
          <stop offset="0" stopColor={LED.vert} stopOpacity="0.55" />
          <stop offset="1" stopColor={LED.vert} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Carte microcontrôleur */}
      <g transform="translate(60 150)">
        <rect width="200" height="140" rx="12" fill={N} stroke={V} strokeOpacity="0.6" />
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x={16 + i * 14} y="10" width="8" height="8" rx="1.5" fill={P} fillOpacity="0.25" />
        ))}
        <rect x="60" y="48" width="80" height="44" rx="6" fill={P} fillOpacity="0.06" stroke={P} strokeOpacity="0.2" />
        <text x="100" y="75" textAnchor="middle" fontSize="13" fill={P} fillOpacity="0.8">MCU</text>
        <text x="16" y="124" fontSize="13" letterSpacing="1.5" fill={V}>ARDUINO</text>
      </g>

      {/* Câblage */}
      {rows.map((r, i) => (
        <path
          key={r.name}
          d={`M260 ${190 + i * 30} C 330 ${190 + i * 30}, 330 ${130 + i * 100}, 380 ${130 + i * 100}`}
          fill="none"
          stroke={r.on ? LED.vert : P}
          strokeOpacity={r.on ? 0.8 : 0.2}
          strokeWidth="1.5"
          strokeDasharray={r.on ? '4 4' : '0'}
          className={r.on ? 'animate-dash' : ''}
        />
      ))}

      {/* Breadboard + LED */}
      <g transform="translate(380 80)">
        <rect width="380" height="300" rx="16" fill={P} fillOpacity="0.025" stroke={P} strokeOpacity="0.1" />
        {rows.map((r, i) => (
          <g key={r.name} transform={`translate(0 ${50 + i * 100})`}>
            <text x="24" y="5" fontSize="12" letterSpacing="1.5" fill={P} fillOpacity="0.5">{r.name.toUpperCase()}</text>
            {Array.from({ length: 5 }).map((_, j) => {
              const x = 130 + j * 50;
              return (
                <g key={j}>
                  {r.on && <circle cx={x} cy="0" r="30" fill="url(#glow)" />}
                  <circle cx={x} cy="0" r="12" fill={LED[r.name]} fillOpacity={r.on ? 1 : 0.18} stroke={LED[r.name]} strokeOpacity={r.on ? 1 : 0.5} />
                  <circle cx={x - 4} cy="-4" r="3" fill={P} fillOpacity={r.on ? 0.7 : 0.15} />
                </g>
              );
            })}
          </g>
        ))}
        <text x="356" y="286" textAnchor="end" fontSize="12" fill={P} fillOpacity="0.45">15 LED · 5 × 3 couleurs</text>
      </g>

      {/* Commande vocale */}
      <g transform="translate(60 330)">
        <rect width="270" height="64" rx="18" fill={V} fillOpacity="0.12" stroke={V} strokeOpacity="0.5" />
        <circle cx="34" cy="32" r="16" fill={V} />
        <rect x="29.5" y="21" width="9" height="15" rx="4.5" fill={N} />
        <path d="M27 31a7 7 0 0 0 14 0M34 38v4" stroke={N} strokeWidth="2" fill="none" strokeLinecap="round" />
        <text x="62" y="38" fontSize="17" fill={P}>« allume le vert »</text>
        <g transform="translate(212 20)">
          {[10, 20, 14, 24, 8, 16].map((h, i) => (
            <rect key={i} x={i * 8} y={12 - h / 2} width="4" height={h} rx="2" fill={V} fillOpacity={0.5 + (i % 3) * 0.2} />
          ))}
        </g>
      </g>
    </Canvas>
  );
}
