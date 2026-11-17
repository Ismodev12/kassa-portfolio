import { todo } from './todo.js';

/* ==================================================================
   FORMATIONS
   Pour ajouter un certificat lorsqu'il est disponible :
     1. placez le fichier dans src/assets/certificates/
     2. importez-le en haut de ce fichier :
          import certCisco from '../assets/certificates/cisco.pdf';
     3. renseignez : certificate: { src: certCisco, type: 'pdf' }
        (type : 'image' pour un .jpg/.png, 'pdf' pour un PDF)
   Ne jamais renseigner de certificat qui n'existe pas.
   ================================================================== */

export const education = [
  {
    id: 'emn',
    date: todo('Dates de la formation'),
    status: 'Fin de formation',
    title: 'Analyse en cybersécurité',
    organization: 'École des Métiers du Numérique',
    type: 'Formation',
    certificate: null,
  },
  {
    id: 'cisco',
    date: 'Août 2026',
    status: null,
    title: 'Network Basics',
    organization: 'Cisco',
    type: 'Formation',
    certificate: null,
  },
  {
    id: 'odoo-ia',
    date: 'Septembre 2026',
    status: null,
    title: 'Principes fondamentaux de l’Intelligence Artificielle',
    organization: 'Odoo',
    type: 'Formation',
    certificate: null,
  },
];
