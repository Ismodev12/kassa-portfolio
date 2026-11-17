# Portfolio — Ditouagui Képhysiase KASSA

Portfolio d'analyste en cybersécurité. React 18 + Vite + Tailwind CSS 3 + Lucide React + Simple Icons,
avec une interface d'administration en français (Decap CMS) à l'adresse `/admin`.

```bash
npm install
npm run dev      # le site : http://localhost:5173
npm run cms      # (à côté) pour utiliser l'admin en local : http://localhost:5173/admin
npm run build    # version de production dans dist/
```

## Modifier le contenu

**Le plus simple : l'interface d'administration `/admin`.** Guide complet (installation sur
GitHub + Netlify, et utilisation pas à pas) : **[ADMIN.md](ADMIN.md)**.

Tout le contenu est rangé dans des fichiers JSON lisibles :

| Contenu | Fichier |
| --- | --- |
| Profil, textes, À propos, méthode, contact | `content/site.json` |
| Projets (un fichier par projet) | `content/projects/*.json` |
| Formations et certifications | `content/education/*.json` |
| Compétences et outils | `content/skills.json` |
| Photos et certificats | `public/uploads/` |
| Couleurs | haut de `src/index.css` |

Les chiffres (projets, formations, outils) sont calculés à partir du contenu : ils restent exacts.

### Informations « À compléter »
Un texte qui commence par `[À compléter]` (ou un champ vide) s'affiche en pointillés sur le site.
Pour les lister :

```bash
grep -rn "À compléter" content
```

### Photos
- Portrait détouré : `public/uploads/kephy-cutout.webp` (original : `kephy-original.jpg`).
- Photos des projets : photos d'illustration Unsplash (licence gratuite), signalées
  « Photo d'illustration » : `public/uploads/projects/`. Elles se remplacent depuis l'admin.

### Logos des outils
Logos officiels via `simple-icons` (catalogue : `src/data/icons.js`). Zeek (logo réservé par le
projet) et GoPhish (pas de logo SVG officiel) gardent une icône générique.

### Schémas des projets
Les schémas (`src/components/visuals/`) sont des illustrations temporaires, signalées
« Visuel illustratif », choisies dans l'admin (champ « Schéma illustratif »).

### Formulaire de contact
Adresse d'un service de formulaire (ex. Formspree) → envoi direct ; sinon l'e-mail →
ouverture de la messagerie ; sinon le formulaire indique que l'envoi n'est pas encore actif.

## Version précédente
La première version (design « dossier » bleu nuit, Tailwind 4) est conservée dans `archive/v1-src/`.
