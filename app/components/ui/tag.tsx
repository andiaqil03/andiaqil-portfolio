import type { ReactNode } from 'react';
import { cn } from '~/lib/cn';

type Tone = 'neutral' | 'accent' | 'accent-2' | 'outline';

const tones: Record<Tone, string> = {
  neutral: 'bg-surface-2 text-ink-2',
  accent: 'bg-accent-soft text-accent',
  'accent-2': 'bg-accent-2-soft text-accent-2',
  outline: 'border border-line text-ink-2',
};

/** Small label: project kinds, honest notes, status. */
export function Tag({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center gap-1.5 rounded-sm px-2 text-[0.75rem] leading-none font-medium whitespace-nowrap',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Technology names as monospace chips. */
export function TechChips({
  items,
  className,
  label = 'Technologies',
}: {
  items: string[];
  className?: string;
  label?: string;
}) {
  if (items.length === 0) return null;
  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)} aria-label={label}>
      {items.map((item) => (
        <li
          key={item}
          className="inline-flex h-6 items-center rounded-sm bg-surface-2 px-2 font-mono text-meta font-medium text-ink-2"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
