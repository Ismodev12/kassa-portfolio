/**
 * Marque une information manquante. Elle s'affiche sur le site sous
 * forme d'emplacement « À compléter » (style pointillé), facile à
 * repérer puis à remplacer par une simple chaîne de caractères.
 *
 *   role: todo('Préciser mon rôle exact')   →   role: 'Mon vrai rôle…'
 */
export const todo = (hint) => ({ todo: hint });

export const isTodo = (value) =>
  value === '' || value == null || (typeof value === 'object' && 'todo' in value);
