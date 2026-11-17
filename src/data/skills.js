/* Compétences et outils — lus depuis content/skills.json (modifiable dans /admin).
   Volontairement sans niveau chiffré. Les icônes viennent du catalogue src/data/icons.js :
   logos officiels (« si:… ») ou icônes génériques. */
import data from '../../content/skills.json';
import { lucideIcons, resolveIcon } from './icons.js';
import { Shield } from 'lucide-react';

export const skillGroups = (data.groups || []).map((g, i) => ({
  id: `domaine-${i + 1}`,
  title: g.title,
  caption: g.caption || '',
  icon: lucideIcons[g.icon] || Shield,
  items: (g.items || []).map((it) => {
    const { brand, Icon } = resolveIcon(it.icon);
    return { name: it.name, brand, icon: Icon };
  }),
}));
