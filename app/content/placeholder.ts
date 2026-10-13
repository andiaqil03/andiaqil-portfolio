/**
 * Marks content that hasn't been supplied yet.
 *
 * Placeholders render as dashed notes in development (`npm run dev`) and are
 * hidden from production builds, so the live site never shows broken links or
 * empty sections. Run `npm run check:content` to list every remaining one.
 */
export interface Placeholder {
  readonly todo: string;
}

export type MaybePlaceholder<T> = T | Placeholder;

export function todo(note: string): Placeholder {
  return { todo: note };
}

export function isPlaceholder(value: unknown): value is Placeholder {
  return typeof value === 'object' && value !== null && 'todo' in value;
}

/** Returns the value, or `undefined` when it is still a placeholder. */
export function resolved<T>(value: MaybePlaceholder<T> | undefined): T | undefined {
  return value === undefined || isPlaceholder(value) ? undefined : value;
}
