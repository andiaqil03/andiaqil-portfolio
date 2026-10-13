import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { cn } from '~/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'sm';

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-on-accent shadow-xs hover:bg-accent-hover hover:shadow-sm',
  secondary:
    'border border-line-strong bg-surface text-ink shadow-xs hover:border-ink-3 hover:shadow-sm',
  ghost: 'text-ink-2 hover:bg-surface-2 hover:text-ink',
};

const sizes: Record<Size, string> = {
  md: 'h-11 gap-2 px-5 text-[0.9375rem]',
  sm: 'h-9 gap-1.5 px-3.5 text-sm',
};

/** Button look shared by links and buttons (DESIGN.md §6). */
export function buttonStyles(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(
    'group/btn inline-flex shrink-0 items-center justify-center rounded-md font-medium whitespace-nowrap',
    'transition-[background-color,border-color,color,box-shadow,translate] duration-200 ease-(--ease-out-soft)',
    'active:translate-y-px',
    variants[variant],
    sizes[size],
    className,
  );
}

type ActionProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Adds a trailing arrow that nudges on hover. */
  arrow?: boolean;
  children: ReactNode;
} & (
  { to: string; href?: never; external?: never } | { href: string; to?: never; external?: boolean }
);

/** Button-styled link: internal routes use `to`, everything else `href`. */
export function Action({
  variant = 'primary',
  size = 'md',
  className,
  arrow = false,
  children,
  ...target
}: ActionProps) {
  const styles = buttonStyles(variant, size, className);
  const trailing = arrow ? (
    <ArrowRight
      aria-hidden="true"
      className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5"
      strokeWidth={2}
    />
  ) : null;

  if (target.to !== undefined) {
    return (
      <Link to={target.to} viewTransition className={styles}>
        {children}
        {trailing}
      </Link>
    );
  }

  if (target.external) {
    return (
      <a href={target.href} target="_blank" rel="noopener noreferrer" className={styles}>
        {children}
        <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={2} />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }

  return (
    <a href={target.href} className={styles}>
      {children}
      {trailing}
    </a>
  );
}

/** Quiet text link with a trailing arrow, e.g. "View all projects". */
export function ArrowLink({
  to,
  children,
  className,
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      viewTransition
      className={cn(
        'group inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-medium text-accent',
        'transition-colors hover:text-accent-hover',
        className,
      )}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform duration-200 ease-(--ease-out-soft) group-hover:translate-x-1"
        strokeWidth={2}
      />
    </Link>
  );
}
