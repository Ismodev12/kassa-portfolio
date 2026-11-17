/**
 * Informations manquantes : une valeur vide, ou un texte qui commence par « [À compléter] »,
 * s'affiche sur le site sous forme d'emplacement en pointillés.
 * Dans l'interface d'administration, il suffit de remplacer ce texte par la vraie information.
 */
export const TODO_PREFIX = '[À compléter]';

export const todo = (hint) => `${TODO_PREFIX} ${hint}`;

export const isTodo = (value) =>
  value === '' ||
  value == null ||
  (typeof value === 'object' && 'todo' in value) ||
  (typeof value === 'string' && value.trim().startsWith(TODO_PREFIX));

/** Texte d'aide à afficher pour une valeur « à compléter ». */
export const todoHint = (value, fallback = 'À compléter') => {
  if (value && typeof value === 'object' && 'todo' in value) return value.todo;
  if (typeof value === 'string' && value.trim().startsWith(TODO_PREFIX)) {
    return value.trim().slice(TODO_PREFIX.length).trim() || fallback;
  }
  return fallback;
};
