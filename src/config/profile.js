/* ==================================================================
   PROFIL — lu depuis content/site.json.
   Ce fichier se modifie depuis l'interface d'administration (/admin),
   rubrique « Profil et textes du site ». Tout champ vide s'affiche
   comme « À compléter » sur le site.
   ================================================================== */
import site from '../../content/site.json';

const slug = (s) => String(s).toLowerCase().normalize('NFD').replace(/[^a-z0-9]+/g, '');

export const profile = {
  firstNames: site.firstNames,
  lastName: site.lastName,
  fullName: `${site.firstNames} ${site.lastName}`.trim(),
  title: site.title,
  location: site.location,
  intro: site.intro,

  portrait: {
    src: site.portrait,
    alt: `Portrait de ${site.firstNames} ${site.lastName}`,
    isPlaceholder: false,
    // true = portrait détouré (fond transparent) ; false = photo avec fond (affichée dans une arche)
    cutout: site.portraitCutout !== false,
  },
  aboutImage: site.aboutImage || site.portrait,

  contact: {
    email: site.email || '',
    phone: site.phone || '',
    location: site.location,
  },

  links: (site.links || []).map((l, i) => ({ id: slug(l.label) || `lien-${i}`, label: l.label, url: l.url || '' })),

  // Formulaire : URL d'un service type Formspree ; sinon ouverture de la messagerie vers l'e-mail.
  contactForm: { endpoint: site.formEndpoint || '' },
};

export const navigation = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'a-propos', label: 'À propos' },
  { id: 'projets', label: 'Projets' },
  { id: 'competences', label: 'Compétences' },
  { id: 'formations', label: 'Formations' },
  { id: 'contact', label: 'Contact' },
];
