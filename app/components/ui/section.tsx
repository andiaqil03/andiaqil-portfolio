import type { ReactNode } from 'react';
import { cn } from '~/lib/cn';
import { Container } from './container';
import { Reveal } from './reveal';

interface SectionHeaderProps {
  id: string;
  /** Short mono label above the heading, e.g. "Selected work". */
  kicker?: string;
  title: ReactNode;
  description?: ReactNode;
  /** A follow-on link such as "View all projects", aligned right on wide screens. */
  action?: ReactNode;
  as?: 'h2' | 'h3';
  className?: string;
}

export function SectionHeader({
  id,
  kicker,
  title,
  description,
  action,
  as: Heading = 'h2',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-10',
        className,
      )}
    >
      <div className="max-w-3xl">
        {kicker ? (
          <p className="mb-4 inline-flex items-center gap-2 font-mono text-meta tracking-[0.12em] text-ink-3 uppercase">
            <span
              aria-hidden="true"
              className="h-px w-8"
              style={{ background: 'var(--gradient-aurora)' }}
            />
            {kicker}
          </p>
        ) : null}
        <Heading id={id} className="font-display text-section font-semibold">
          {title}
        </Heading>
        {description ? <p className="mt-4 max-w-2xl text-lead text-ink-2">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

interface SectionProps extends Omit<SectionHeaderProps, 'id' | 'as' | 'className'> {
  id: string;
  className?: string;
  children: ReactNode;
}

/** Standard page section: header, then content, with consistent vertical rhythm. */
export function Section({
  id,
  kicker,
  title,
  description,
  action,
  className,
  children,
}: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn('relative py-20 sm:py-24 lg:py-32', className)}
    >
      <Container>
        <Reveal>
          <SectionHeader
            id={headingId}
            kicker={kicker}
            title={title}
            description={description}
            action={action}
          />
        </Reveal>
        <div className="mt-12 sm:mt-14">{children}</div>
      </Container>
    </section>
  );
}
