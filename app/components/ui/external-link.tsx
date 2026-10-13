import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '~/lib/cn';

/** Text link that opens in a new tab and says so to screen readers. */
export function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('link group inline-flex items-center gap-1', className)}
    >
      {children}
      <ArrowUpRight
        aria-hidden="true"
        className="size-[0.95em] shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-px group-hover:-translate-y-px"
        strokeWidth={1.75}
      />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
