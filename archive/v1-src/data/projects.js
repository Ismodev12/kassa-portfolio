import { todo } from './todo.js';

/* ==================================================================
   PROJETS
   - `visual` : clé de l'illustration temporaire (voir
     components/visuals). Ce sont des compositions illustratives,
     PAS des captures de vrais outils.
   - `image`  : pour utiliser une vraie capture, importez-la puis
     renseignez-la ici (ex. image: captureIR). Elle remplace alors
     automatiquement l'illustration.
   - `size`   : 'wide' (pleine largeur) ou 'half' (demi-largeur).
   - Les valeurs todo('…') s'affichent comme « À compléter ».
   ================================================================== */

export const projects = [
  {
    id: 'bec-phishing',
    title: 'Diagnostic BEC/Phishing et plan de réponse aux incidents',
    kind: 'Projet de fin d’études',
    year: '2026',
    visual: 'bec',
    image: null,
    size: 'wide',
    summary:
      'Analyse des risques EBIOS RM, vérification SPF/DKIM/DMARC, simulation de phishing en laboratoire isolé et plan de réponse aux incidents selon NIST SP 800-61.',
    tags: ['EBIOS RM', 'SPF · DKIM · DMARC', 'GoPhish', 'NIST SP 800-61'],
    highlights: [
      { value: '3', label: 'livrables documentés' },
      { value: '2', label: 'scénarios prioritaires identifiés' },
    ],
    notice:
      'Simulations réalisées uniquement dans un laboratoire isolé : aucun test en conditions réelles, aucune analyse de journaux.',
    details: {
      context:
        'Projet de fin d’études réalisé dans le cadre de ma formation en analyse en cybersécurité à l’École des Métiers du Numérique. Il porte sur la compromission de messagerie professionnelle (BEC) et le phishing.',
      objectives: [
        'Analyser les risques avec la méthode EBIOS RM.',
        'Évaluer la configuration de messagerie par reconnaissance DNS et vérification SPF, DKIM et DMARC.',
        'Simuler une campagne de phishing en laboratoire isolé.',
        'Rédiger un plan de réponse aux incidents selon NIST SP 800-61.',
      ],
      role: todo('Préciser le périmètre de mon rôle (projet individuel ou en binôme / équipe).'),
      tools: ['EBIOS RM', 'Reconnaissance DNS', 'SPF / DKIM / DMARC', 'GoPhish', 'Mailtrap', 'Kali Linux', 'NIST SP 800-61'],
      approach: [
        { title: 'Analyse des risques', text: 'Analyse des risques menée avec la méthode EBIOS RM.' },
        { title: 'Reconnaissance DNS', text: 'Reconnaissance DNS et vérification des enregistrements SPF, DKIM et DMARC.' },
        { title: 'Simulation en laboratoire', text: 'Simulation de phishing en laboratoire isolé avec GoPhish, Mailtrap et Kali Linux.' },
        { title: 'Plan de réponse', text: 'Rédaction d’un plan de réponse aux incidents selon NIST SP 800-61.' },
      ],
      results: ['Trois livrables documentés.', 'Deux scénarios prioritaires identifiés.'],
      limits: [
        'Simulations réalisées uniquement dans un laboratoire isolé.',
        'Aucun test en conditions réelles.',
        'Aucune analyse de journaux.',
      ],
      skills: ['Analyse des risques', 'Sécurité de la messagerie', 'Simulation de phishing', 'Réponse aux incidents', 'Rédaction de livrables'],
    },
  },

  {
    id: 'anc2026',
    title: 'ANC2026 Cyber Challenge',
    kind: 'Compétition en équipe · HIN’EGO',
    year: '2026',
    visual: 'tender',
    image: null,
    size: 'half',
    summary:
      'Réponse en équipe à un appel d’offres international portant sur l’architecture du système d’information et la cybersécurité d’un groupe bancaire.',
    tags: ['Responsable d’équipe', 'SIEM', 'CMM', 'Playbook'],
    highlights: [{ value: '4', label: 'contributions personnelles' }],
    notice: 'Compétition en équipe : ce n’est pas une certification.',
    details: {
      context:
        'Compétition en équipe avec HIN’EGO. Le travail portait sur un appel d’offres international concernant l’architecture du système d’information et la cybersécurité d’un groupe bancaire.',
      objectives: [
        'Répondre en équipe à un appel d’offres international.',
        'Traiter l’architecture du système d’information et la cybersécurité d’un groupe bancaire.',
      ],
      role: 'Responsable de l’équipe HIN’EGO pour cette compétition.',
      tools: ['SIEM (étude comparative)', 'CMM', 'Playbook'],
      approach: [
        { title: 'Étude comparative des SIEM', text: 'Comparaison de solutions SIEM.' },
        { title: 'Fiches CMM et Playbook', text: 'Rédaction des fiches CMM et du Playbook.' },
        { title: 'Document de synthèse', text: 'Rédaction du document de synthèse.' },
        { title: 'Présentation', text: 'Préparation de la présentation.' },
      ],
      results: [
        'Contributions livrées : étude comparative des SIEM, fiches CMM et Playbook, document de synthèse et présentation.',
        todo('Ajouter le résultat ou le classement de l’équipe, s’il est communiqué.'),
      ],
      limits: ['Exercice réalisé dans le cadre d’une compétition : il ne s’agit pas d’une certification.'],
      skills: ['Coordination d’équipe', 'Architecture SI', 'Comparaison d’outils SIEM', 'Rédaction', 'Présentation orale'],
    },
  },

  {
    id: 'ir-platform',
    title: 'Plateforme web de réponse aux incidents',
    kind: 'Projet personnel',
    year: todo('Année'),
    visual: 'ir',
    image: null,
    size: 'half',
    summary:
      'Le plan de réponse aux incidents NIST SP 800-61 numérisé en procédure interactive : type d’incident, gravité, puis étapes et actions à mener.',
    tags: ['NIST SP 800-61', 'Développement web', 'Procédure interactive'],
    highlights: [],
    notice: null,
    details: {
      context:
        'Projet personnel qui numérise le plan de réponse aux incidents NIST SP 800-61 sous forme de procédure interactive.',
      objectives: [
        'Transformer le plan de réponse aux incidents en procédure interactive.',
        'Guider l’utilisateur selon le type et la gravité de l’incident.',
      ],
      role: 'Conception et développement (projet personnel).',
      tools: ['NIST SP 800-61', 'Développement web', todo('Technologies utilisées')],
      approach: [
        { title: 'Type d’incident', text: 'L’utilisateur choisit le type d’incident.' },
        { title: 'Gravité', text: 'Il indique ensuite la gravité de l’incident.' },
        { title: 'Étapes et actions', text: 'Il suit les différentes étapes et les actions à mener.' },
      ],
      results: [
        'Une procédure interactive fondée sur NIST SP 800-61.',
        todo('Lien vers la démo ou le dépôt du projet.'),
      ],
      limits: [todo('Limites éventuelles du projet.')],
      skills: ['Réponse aux incidents', 'NIST SP 800-61', 'Développement web', 'Conception de parcours utilisateur'],
    },
  },

  {
    id: 'recon-platform',
    title: 'Plateforme de recherche intelligente',
    nameNote: 'Nom du projet à confirmer',
    kind: 'Projet personnel · Reconnaissance passive',
    year: todo('Année'),
    visual: 'recon',
    image: null,
    size: 'wide',
    summary:
      'Un outil de reconnaissance passive qui centralise l’analyse d’un domaine pour évaluer son exposition : DNS, sous-domaines, WHOIS, IP/ASN, en-têtes HTTP, ports, Google Dorks, Shodan et VirusTotal.',
    tags: ['Reconnaissance passive', 'DNS', 'crt.sh', 'Shodan', 'VirusTotal'],
    highlights: [
      { value: '8', label: 'modules sans clé API' },
      { value: '14', label: 'ports TCP courants' },
      { value: '50+', label: 'Google Dorks · 6 catégories' },
    ],
    notice:
      'Usage défensif uniquement : sur les domaines que vous possédez ou pour lesquels une autorisation a été obtenue.',
    modules: [
      { name: 'DNS', detail: 'A, AAAA, MX, NS, TXT, CNAME', api: false },
      { name: 'Sous-domaines', detail: 'via crt.sh', api: false },
      { name: 'WHOIS', detail: 'Informations d’enregistrement', api: false },
      { name: 'IP & ASN', detail: 'Informations IP, ASN', api: false },
      { name: 'En-têtes HTTP', detail: 'Analyse des en-têtes', api: false },
      { name: 'Ports TCP', detail: '14 ports courants', api: false },
      { name: 'robots.txt', detail: 'Lecture du fichier', api: false },
      { name: 'Google Dorks', detail: '50+ requêtes · 6 catégories', api: false },
      { name: 'Shodan', detail: 'Intégration (clé API)', api: true },
      { name: 'VirusTotal', detail: 'Intégration (clé API)', api: true },
    ],
    details: {
      context:
        'Outil personnel de reconnaissance passive qui centralise l’analyse d’un domaine afin d’évaluer son exposition.',
      objectives: [
        'Centraliser en un seul outil les principales vérifications de reconnaissance passive.',
        'Évaluer l’exposition d’un domaine.',
      ],
      role: 'Conception et développement (projet personnel).',
      tools: ['DNS', 'crt.sh', 'WHOIS', 'ASN', 'HTTP', 'Google Dorks', 'Shodan', 'VirusTotal', todo('Langage / technologies utilisés')],
      approach: [
        { title: 'DNS', text: 'Enregistrements A, AAAA, MX, NS, TXT et CNAME.' },
        { title: 'Sous-domaines', text: 'Découverte de sous-domaines via crt.sh.' },
        { title: 'WHOIS, IP et ASN', text: 'Informations WHOIS, informations IP et ASN.' },
        { title: 'Exposition web', text: 'En-têtes HTTP, analyse de 14 ports TCP courants et robots.txt.' },
        { title: 'Google Dorks', text: 'Plus de 50 requêtes réparties en six catégories.' },
        { title: 'Intégrations', text: 'Shodan et VirusTotal (clé API requise).' },
      ],
      results: ['Huit modules fonctionnent sans clé API.', todo('Lien vers la démo ou le dépôt du projet.')],
      limits: [
        'Outil destiné à un usage défensif, uniquement sur les domaines possédés ou pour lesquels une autorisation a été obtenue.',
        'Les modules Shodan et VirusTotal nécessitent une clé API.',
      ],
      skills: ['Reconnaissance passive (OSINT)', 'DNS', 'Évaluation de l’exposition', 'Développement d’outils'],
    },
  },

  {
    id: 'ctf',
    title: 'CTF, cryptographie et forensic',
    kind: 'Pratique · Root-Me, HackerLab, TryHackMe',
    year: 'En continu',
    visual: 'ctf',
    image: null,
    size: 'half',
    summary:
      'Investigations et challenges : serveur DNS compromis, reconstitution d’une attaque ransomware à partir de journaux, AES, RSA, CBC/ECB, XOR, XSS, JWT, buffer overflow, stéganographie.',
    tags: ['Root-Me', 'HackerLab', 'TryHackMe', 'Forensic', 'Crypto'],
    highlights: [],
    notice: 'Challenges d’entraînement : il ne s’agit pas de certifications.',
    details: {
      context: 'Pratique régulière sur les plateformes Root-Me, HackerLab et TryHackMe.',
      objectives: ['Progresser en CTF, en cryptographie et en forensic.'],
      role: 'Pratique personnelle.',
      tools: ['Root-Me', 'HackerLab', 'TryHackMe'],
      approach: [
        { title: 'Forensic', text: 'Analyse d’un serveur DNS compromis.' },
        { title: 'Investigation', text: 'Reconstitution d’une attaque ransomware à partir de journaux.' },
        { title: 'Cryptographie', text: 'Cryptographie symétrique et asymétrique (AES, RSA), étude des modes CBC/ECB, XOR.' },
        { title: 'Web & système', text: 'XSS, JWT, buffer overflow.' },
        { title: 'Stéganographie', text: 'Recherche d’informations dissimulées.' },
      ],
      results: [todo('Ajouter classements, nombre de challenges ou liens de profils.')],
      limits: ['Exercices réalisés sur des plateformes d’entraînement.'],
      skills: ['Forensic', 'Analyse de journaux', 'Cryptographie', 'Sécurité web', 'Exploitation système'],
    },
  },

  {
    id: 'arduino',
    title: 'Veilleuse Arduino à commande vocale',
    kind: 'Prototype',
    year: todo('Année'),
    visual: 'arduino',
    image: null,
    size: 'half',
    summary:
      'Un prototype de 15 LED (5 rouges, 5 vertes, 5 jaunes) piloté par des commandes vocales comme « allume le vert ».',
    tags: ['Arduino', 'Commande vocale', '15 LED'],
    highlights: [{ value: '15', label: 'LED · 3 couleurs' }],
    notice: null,
    details: {
      context: 'Prototype de veilleuse composé de 15 LED, piloté par la voix.',
      objectives: ['Piloter des groupes de LED par des commandes vocales, par exemple « allume le vert ».'],
      role: 'Conception du prototype.',
      tools: ['Arduino', '15 LED (5 rouges, 5 vertes, 5 jaunes)', todo('Module ou méthode de reconnaissance vocale')],
      approach: [
        { title: 'Montage', text: '15 LED réparties en trois couleurs : 5 rouges, 5 vertes et 5 jaunes.' },
        { title: 'Commande vocale', text: 'Pilotage par des commandes comme « allume le vert ».' },
      ],
      results: [todo('Photo ou vidéo du prototype.')],
      limits: [todo('Limites éventuelles du prototype.')],
      skills: ['Arduino', 'Électronique', 'Prototypage'],
    },
  },

  {
    id: 'hygiene',
    title: 'Sensibilisation à l’hygiène numérique',
    kind: 'Sensibilisation',
    year: 'En continu',
    visual: 'hygiene',
    image: null,
    size: 'wide',
    summary:
      'Des conseils de sécurité simples à appliquer et un document : « Bouclier numérique africain ». Une bonne protection commence par des gestes simples.',
    tags: ['Hygiène numérique', 'Sensibilisation', 'Bouclier numérique africain'],
    highlights: [],
    notice: null,
    // Emplacements prévus pour le document « Bouclier numérique africain »
    document: {
      title: 'Bouclier numérique africain',
      platform: todo('Plateforme de publication'),
      audience: todo('Public visé'),
      pages: todo('Nombre de pages'),
      url: '',
    },
    details: {
      context:
        'Activités de sensibilisation et partage de conseils d’hygiène numérique, avec la conviction qu’une bonne protection commence par des gestes simples.',
      objectives: ['Partager des conseils de sécurité simples à appliquer.'],
      role: 'Autrice du document « Bouclier numérique africain » et des conseils partagés.',
      tools: ['Document « Bouclier numérique africain »', todo('Supports / canaux utilisés')],
      approach: [
        { title: 'Conseils de sécurité', text: 'Partage de conseils d’hygiène numérique.' },
        { title: 'Document', text: 'Rédaction du document « Bouclier numérique africain ».' },
      ],
      results: [todo('Retours ou portée des actions de sensibilisation.')],
      limits: [],
      skills: ['Hygiène numérique', 'Vulgarisation', 'Rédaction'],
    },
  },
];
