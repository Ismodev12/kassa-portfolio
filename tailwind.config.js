/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Trois couleurs : fond sombre (ink), blanc (bone), accent — valeurs dans src/index.css.
      // Les valeurs se modifient en haut de src/index.css.
      colors: {
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        deep: 'rgb(var(--c-deep) / <alpha-value>)',
        bone: 'rgb(var(--c-bone) / <alpha-value>)',
        accent: { DEFAULT: 'rgb(var(--c-accent) / <alpha-value>)', deep: 'rgb(var(--c-accent-deep) / <alpha-value>)' },
        card: 'rgb(var(--c-card) / <alpha-value>)',
        mist: { DEFAULT: 'rgb(var(--c-mist) / <alpha-value>)', dim: 'rgb(var(--c-mist-dim) / <alpha-value>)' }, // texte sur fond ink
        slate: { DEFAULT: 'rgb(var(--c-slate) / <alpha-value>)', dim: 'rgb(var(--c-slate-dim) / <alpha-value>)' }, // texte sur fond bone
      },
      fontFamily: {
        display: ['"Space Grotesk Variable"', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        mega: ['clamp(2.4rem, 6vw, 6.25rem)', { lineHeight: '0.92', letterSpacing: '-0.05em' }],
        title: ['clamp(2.1rem, 4.4vw, 4.5rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
      },
      borderRadius: { panel: 'clamp(1.5rem, 3vw, 2.75rem)' },
      keyframes: {
        marquee: { to: { transform: 'translateX(-50%)' } },
        spinSlow: { to: { transform: 'rotate(360deg)' } },
        scan: { '0%': { transform: 'translateY(-120%)' }, '100%': { transform: 'translateY(520%)' } },
        dash: { to: { strokeDashoffset: '-40' } },
        blink: { '50%': { opacity: '0' } },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        'spin-slow': 'spinSlow 18s linear infinite',
        scan: 'scan 7s linear infinite',
        dash: 'dash 2.4s linear infinite',
        blink: 'blink 1.1s steps(1) infinite',
      },
    },
  },
  plugins: [],
};
