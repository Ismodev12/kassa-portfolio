/* ==================================================================
   FORMATIONS & CERTIFICATIONS — un fichier JSON par entrée dans content/education/.
   Elles se gèrent depuis l'interface d'administration (/admin) : ajout, modification,
   suppression, et dépôt du certificat (image ou PDF) quand il est disponible.
   Ne jamais déposer de certificat qui n'existe pas.
   ================================================================== */
const files = import.meta.glob('../../content/education/*.json', { eager: true, import: 'default' });

export const education = Object.entries(files)
  .map(([path, d]) => ({
    id: path.split('/').pop().replace(/\.json$/, ''),
    order: Number(d.order) || 99,
    title: d.title || '',
    organization: d.organization || '',
    date: d.date || '',
    status: d.status || null,
    type: d.type || 'Formation',
    certificate: d.certificate
      ? { src: d.certificate, type: /\.pdf$/i.test(d.certificate) ? 'pdf' : 'image' }
      : null,
  }))
  .sort((a, b) => a.order - b.order);
