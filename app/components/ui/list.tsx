import { Check } from 'lucide-react';
import { cn } from '~/lib/cn';

/** Bulleted list. `check` suits features and outcomes; `dot` suits plain detail. */
export function List({
  items,
  marker = 'dot',
  className,
}: {
  items: string[];
  marker?: 'dot' | 'check';
  className?: string;
}) {
  return (
    <ul className={cn('grid gap-2.5', className)}>
      {items.map((item) => (
        <li key={item} className="flex max-w-[68ch] gap-3 text-ink-2">
          {marker === 'check' ? (
            <Check
              aria-hidden="true"
              className="mt-[0.3em] size-4 shrink-0 text-accent"
              strokeWidth={2.25}
            />
          ) : (
            <span
              aria-hidden="true"
              className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-line-strong"
            />
          )}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
