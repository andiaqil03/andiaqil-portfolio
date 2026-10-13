import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { cn } from '~/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'sm';

const variants: Record<Variant, string> = {
  // Brand gradient that slowly rotates, a coloured glow, and a shine sweep on hover.
  primary:
    'bg-brand is-animated btn-shine relative overflow-hidden text-white shadow-[0_8px_24px_-8px_rgb(79_70_229/0.55)] hover:shadow-[0_14px_34px_-10px_rgb(79_70_229/0.7)] hover:-translate-y-0.5',
  secondary: 'glass text-ink hover:border-line-strong hover:-translate-y-0.5 hover:shadow-md',
  ghost: 'text-ink-2 hover:bg-surface-2 hover:text-ink',
};

const sizes: Record<Size, string> = {
  md: 'h-12 gap-2 px-6 text-[0.9375rem]',
  sm: 'h-10 gap-1.5 px-4 text-sm',
};

/** Pill button look shared by links and buttons (DESIGN.md §6). */
export function buttonStyles(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(
    'group/btn inline-flex shrink-0 items-center justify-center rounded-full font-medium whitespace-nowrap',
    'transition-[background-color,border-color,color,box-shadow,translate] duration-300 ease-out-expo',
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
