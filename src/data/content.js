/* Contenu des sections Hero, bandeau, chiffres, À propos et méthode —
   lu depuis content/site.json (modifiable dans /admin, rubrique « Profil et textes du site »). */
import { Shield } from 'lucide-react';
import site from '../../content/site.json';
import { projects } from './projects.js';
import { skillGroups } from './skills.js';
import { education } from './education.js';
import { lucideIcons } from './icons.js';

const pad = (n) => String(n).padStart(2, '0');

// Les trois domaines au cœur de son travail (Hero).
export const focusAreas = (site.focusAreas || []).map((f, i) => ({
  n: pad(i + 1),
  name: f.name,
  role: f.role,
  detail: f.detail,
  icon: lucideIcons[f.icon] || Shield,
}));

// Bande défilante après la Hero.
export const marquee = site.marquee || [];

// Paragraphes « À propos » : les mots entre *étoiles* sont mis en couleur.
export const aboutParagraphs = site.aboutParagraphs || [];

export const aboutFacts = site.aboutFacts || [];

export const method = (site.method || []).map((m, i) => ({ n: pad(i + 1), title: m.title, text: m.text }));

// Chiffres : calculés à partir du contenu, donc toujours exacts.
export const stats = [
  { value: pad(projects.length), label: 'Projets présentés' },
  { value: pad(education.length), label: 'Formations' },
  { value: pad(skillGroups.reduce((n, g) => n + g.items.length, 0)), label: 'Outils et compétences' },
  { value: pad(Number(site.ctfPlatforms) || 0), label: 'Plateformes de CTF' },
];
