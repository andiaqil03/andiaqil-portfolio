import { cn } from '~/lib/cn';

/**
 * Visible only in development: marks content still to be supplied.
 * Production builds render nothing, so the live site never shows gaps.
 */
export function PlaceholderNote({ note, className }: { note: string; className?: string }) {
  if (!import.meta.env.DEV) return null;

  return (
    <span
      className={cn(
        'inline-block rounded-[2px] border border-dashed border-[#b7791f] bg-[#fdf6e3] px-2 py-1 font-mono text-[0.75rem] leading-snug text-[#7a4e0e]',
        'dark:border-[#d69e2e] dark:bg-[#2a2210] dark:text-[#f6d38b]',
        className,
      )}
    >
      Placeholder: {note}
    </span>
  );
}
