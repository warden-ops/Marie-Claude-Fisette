# Marie-Claude Fisette

Site statique. Courtage hypothécaire résidentiel, partout au Québec.

Marie-Claude Fisette est courtière hypothécaire. Le courtage est exercé par l’entremise d’Intelligence Hypothécaire, du réseau Groupe Financier Signature.

Le gabarit (mise en page, feuilles de style, polices, animations au défilement) est celui du site statique partagé. L’habillage est plus simple et plus chaud: fond papier, texte encre, accent prune. Pas de grands champs noirs.

## Remplacer la marque

Les fichiers actuellement dans le dépôt sont la version déjà en ligne. De nouveaux fichiers de marque sont attendus. Un seul chemin est utilisé dans les pages:

- Logo: `assets/brand/logo.svg`
- Favicon: `assets/brand/favicon.svg`
- Icône Apple: `assets/brand/apple-touch-icon.png`
- Intelligence Hypothécaire: `assets/brand/logo-intelligence-hypothecaire.png`
- Groupe Financier Signature: `assets/brand/logo-groupe-financier-signature.png`

Les deux logos du réseau sont affichés sous l’accueil, dans le pied de page et sur la page Contact. Le fichier sombre joint (initiales MCF) n’était pas dans le dossier de travail. L’en-tête utilise donc le mot-symbole déjà sur le site, au chemin unique ci-dessus, en attendant la nouvelle marque.

Les couleurs sont les variables au début de `assets/mcf.css`: `--mcf-accent`, `--mcf-accent-deep`, `--mcf-accent-soft`, `--mcf-ink`, `--mcf-paper`. Remplacer le fichier de logo et ces variables suffit. Le contenu, les photos et le formulaire ne changent pas.

## Lancer en local

```bash
python -m http.server 4173
```

http://localhost:4173/

GitHub Pages publie la branche `main` à https://warden-ops.github.io/Marie-Claude-Fisette/. Les liens sont relatifs pour ce sous-dossier. Ne pas ajouter de fichier CNAME.
