/* ==================================================================
   PROFIL — c'est ici que l'on complète / modifie les informations.
   Tout champ laissé vide ('') s'affiche comme « À compléter »
   sur le site, sans jamais inventer de donnée.
   ================================================================== */

// ▸ PHOTO : remplacez simplement ce fichier par la vraie photo
//   (même nom), ou changez l'import ci-dessous vers votre fichier.
//   Format conseillé : portrait vertical 4:5, au moins 900 × 1125 px.
import portrait from '../assets/images/portrait-placeholder.jpg';

export const profile = {
  firstNames: 'Ditouagui Képhysiase',
  lastName: 'KASSA',
  fullName: 'Ditouagui Képhysiase KASSA',
  shortName: 'Képhysiase',
  title: 'Analyste en cybersécurité',
  location: 'Bénin',
  intro:
    'Je m’intéresse à la protection contre la fraude, à l’analyse des risques et à la réponse aux incidents. Mon objectif : comprendre les menaces pour transformer leur analyse en solutions concrètes.',

  portrait: {
    src: portrait,
    alt: 'Portrait de Ditouagui Képhysiase KASSA',
    // Passez à false une fois la vraie photo en place
    // (retire la mention « Photo temporaire »).
    isPlaceholder: true,
    // 'duotone' = traitement bleu nuit ; 'natural' = couleurs d'origine
    treatment: 'duotone',
  },

  /* ▸ COORDONNÉES — à compléter (laisser '' tant que non disponible) */
  contact: {
    email: '',
    phone: '',
    location: 'Bénin',
  },

  /* ▸ LIENS PROFESSIONNELS — renseignez l'URL complète (https://…) */
  links: [
    { id: 'linkedin', label: 'LinkedIn', url: '' },
    { id: 'github', label: 'GitHub', url: '' },
    { id: 'rootme', label: 'Root-Me', url: '' },
    { id: 'tryhackme', label: 'TryHackMe', url: '' },
    { id: 'hackerlab', label: 'HackerLab', url: '' },
  ],

  /* ▸ FORMULAIRE DE CONTACT
     - endpoint : URL d'un service de formulaire (ex. Formspree :
       https://formspree.io/f/xxxxxx). Si renseigné, le message est
       envoyé directement.
     - Sinon, si contact.email est renseigné, le formulaire ouvre la
       messagerie du visiteur (mailto) avec le message pré-rempli.
     - Sinon, le formulaire indique que l'envoi n'est pas encore actif. */
  contactForm: {
    endpoint: '',
  },
};

export const navigation = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'a-propos', label: 'À propos' },
  { id: 'projets', label: 'Projets' },
  { id: 'competences', label: 'Compétences' },
  { id: 'formations', label: 'Formations' },
  { id: 'contact', label: 'Contact' },
];
