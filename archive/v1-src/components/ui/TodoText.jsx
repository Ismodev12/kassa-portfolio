import { PencilLine } from 'lucide-react';
import { isTodo } from '../../data/todo.js';

/** Affiche une valeur, ou un emplacement « À compléter » si elle manque. */
export default function TodoText({ value, fallback = 'À compléter', className = '' }) {
  if (!isTodo(value)) return <>{value}</>;
  const hint = value && typeof value === 'object' ? value.todo : fallback;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border border-dashed border-paper/25 px-2 py-0.5 text-[0.85em] text-paper/50 ${className}`}
      title="Information à compléter"
    >
      <PencilLine className="size-3 shrink-0" aria-hidden="true" />
      <span>
        <span className="sr-only">À compléter : </span>
        {hint}
      </span>
    </span>
  );
}
