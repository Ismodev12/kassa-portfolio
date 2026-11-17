# Interface d'administration du portfolio

Le portfolio se gère depuis une interface en français, à l'adresse **`/admin`**
(par exemple `https://mon-portfolio.netlify.app/admin`). Elle permet de modifier
les textes, la photo, les projets, les formations et certifications, et les compétences,
sans toucher au code.

---

## 1. Pour Képhysiase : utiliser l'interface

### Se connecter
1. Ouvrir `https://<adresse-du-site>/admin`.
2. Cliquer sur **« Se connecter avec GitHub »** et entrer ses identifiants GitHub.

### Les quatre rubriques
| Rubrique | Ce qu'on y modifie |
| --- | --- |
| **Profil et textes du site** | Nom, titre, présentation, photo de profil, paragraphes « À propos », domaines, bande défilante, méthode, e-mail, téléphone, liens (LinkedIn, GitHub…) |
| **Projets** | Ajouter, modifier ou supprimer un projet, changer sa photo, son ordre d'affichage |
| **Formations et certifications** | Ajouter une formation ou une certification, déposer le certificat (image ou PDF) |
| **Compétences et outils** | Domaines et outils, avec le logo officiel de l'outil |

### Ajouter un projet
1. **Projets** → bouton **« + projet »**.
2. Remplir les champs (titre, type, résumé, photo…). Les champs « optionnel » peuvent rester vides.
3. **Ordre d'affichage** : 1 = premier de la liste.
4. Cliquer **Publier → Publier maintenant**.

### Ajouter une certification
1. **Formations et certifications** → **« + formation »**.
2. Type : **Certification**. Déposer le certificat dans « Certificat (image ou PDF) ».
3. **Publier → Publier maintenant**.

### Petites règles d'écriture
- Les mots écrits entre `*étoiles*` dans les paragraphes « À propos » s'affichent **en couleur**.
- Un texte qui commence par **`[À compléter]`** s'affiche en pointillés sur le site :
  il suffit de le remplacer par la vraie information.
- Photo de profil : de préférence **détourée** (fond transparent, PNG ou WebP).
  Si elle a un fond, décocher « La photo est détourée ».

### Quand la modification apparaît-elle ?
Après **Publier**, le site se met à jour tout seul en **1 à 2 minutes**
(rechargez la page du site pour voir le changement).

---

## 2. Installation (à faire une seule fois)

Le site est hébergé sur **Netlify** et son contenu est rangé dans un dépôt **GitHub**.
Chaque modification faite dans `/admin` est enregistrée dans GitHub, puis Netlify
reconstruit le site automatiquement.

### Étape 1 — Mettre le projet sur GitHub
Créer un dépôt vide sur github.com (privé ou public), par exemple `kassa-portfolio`, puis
dans le dossier du projet :

```bash
git init
git add .
git commit -m "Portfolio de Képhysiase KASSA"
git branch -M main
git remote add origin https://github.com/VOTRE-COMPTE/kassa-portfolio.git
git push -u origin main
```

### Étape 2 — Mettre le site en ligne sur Netlify
1. Sur app.netlify.com : **Add new site → Import an existing project → GitHub** → choisir le dépôt.
2. Les réglages sont lus automatiquement depuis `netlify.toml` (commande `npm run build`, dossier `dist`).
3. Cliquer **Deploy**. Noter l'adresse du site (ex. `https://kassa-portfolio.netlify.app`).

### Étape 3 — Autoriser la connexion GitHub dans l'admin
1. Sur GitHub : **Settings → Developer settings → OAuth Apps → New OAuth App**
   - *Homepage URL* : l'adresse du site Netlify
   - *Authorization callback URL* : `https://api.netlify.com/auth/done`
   - Créer, puis générer un **Client secret**.
2. Sur Netlify : **Site configuration → Access & security → OAuth → Install provider → GitHub**,
   coller le *Client ID* et le *Client secret*.

### Étape 4 — Indiquer le dépôt à l'admin
Dans `public/admin/config.yml`, remplacer :

```yaml
backend:
  name: github
  repo: VOTRE-COMPTE/VOTRE-DEPOT   # ← ex. ismodev12/kassa-portfolio
```

(et décommenter `site_url` avec l'adresse du site), puis envoyer la modification :

```bash
git commit -am "Configuration de l'admin"
git push
```

### Étape 5 — Donner l'accès à Képhysiase
Elle a besoin d'un compte GitHub. Sur le dépôt : **Settings → Collaborators → Add people**
→ son nom d'utilisateur GitHub (accès en écriture). Elle accepte l'invitation, puis peut se
connecter sur `/admin`.

---

## 3. Utiliser l'admin en local (sans GitHub)

Pratique pour tester : les modifications sont écrites directement dans les fichiers du projet.

```bash
npm run dev
```

```bash
npm run cms
```

Puis ouvrir `http://localhost:5173/admin` et cliquer **Se connecter** (aucun mot de passe en local).
Pensez ensuite à envoyer les fichiers modifiés sur GitHub (`git add`, `git commit`, `git push`).

---

## 4. Où est rangé le contenu ?

| Contenu | Fichier |
| --- | --- |
| Profil, textes, contact | `content/site.json` |
| Projets (un fichier par projet) | `content/projects/*.json` |
| Formations et certifications | `content/education/*.json` |
| Compétences et outils | `content/skills.json` |
| Photos et certificats déposés | `public/uploads/` |
| Réglages de l'admin (champs, listes d'icônes) | `public/admin/config.yml` |
| Catalogue des icônes et logos | `src/data/icons.js` |

Pour proposer un nouveau logo d'outil dans l'admin : l'ajouter dans `src/data/icons.js`
**et** dans la liste « Logo / icône » de `public/admin/config.yml` (même clé, ex. `si:nmap`).
