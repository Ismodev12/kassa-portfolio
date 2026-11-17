/* ==================================================================
   PROJETS — un fichier JSON par projet dans content/projects/.
   Ils se gèrent depuis l'interface d'administration (/admin), rubrique « Projets » :
   ajout, modification, suppression, photo, ordre d'affichage.
   - `visual` : schéma illustratif affiché dans la fiche (voir components/visuals).
   - Une valeur commençant par « [À compléter] » s'affiche en pointillés sur le site.
   ================================================================== */
const files = import.meta.glob('../../content/projects/*.json', { eager: true, import: 'default' });

const arr = (v) => (Array.isArray(v) ? v.filter((x) => x !== null && x !== undefined) : []);

export const projects = Object.entries(files)
  .map(([path, d]) => ({
    id: path.split('/').pop().replace(/\.json$/, ''),
    order: Number(d.order) || 99,
    title: d.title || 'Projet sans titre',
    nameNote: d.nameNote || '',
    kind: d.kind || '',
    year: d.year || '',
    photo: d.photo || '',
    visual: d.visual || '',
    image: null,
    summary: d.summary || '',
    tags: arr(d.tags),
    highlights: arr(d.highlights),
    notice: d.notice || '',
    modules: arr(d.modules).length ? arr(d.modules) : undefined,
    document: d.document && d.document.title ? d.document : undefined,
    details: {
      context: d.context || '',
      objectives: arr(d.objectives),
      role: d.role || '',
      tools: arr(d.tools),
      approach: arr(d.approach),
      results: arr(d.results),
      limits: arr(d.limits),
      skills: arr(d.skills),
    },
  }))
  .sort((a, b) => a.order - b.order);
