import type { ReactNode } from 'react';
import { cn } from '~/lib/cn';
import { Container } from './container';
import { Reveal } from './reveal';

interface SectionHeaderProps {
  id: string;
  title: string;
  /** One or two sentences under the heading. */
  description?: ReactNode;
  /** A follow-on link such as "View all projects", aligned right on wide screens. */
  action?: ReactNode;
  as?: 'h2' | 'h3';
  className?: string;
}

export function SectionHeader({
  id,
  title,
  description,
  action,
  as: Heading = 'h2',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8',
        className,
      )}
    >
      <div className="max-w-2xl">
        <Heading id={id} className="text-section font-semibold">
          {title}
        </Heading>
        {description ? <p className="mt-3 text-lead text-ink-2">{description}</p> : null}
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
export function Section({ id, title, description, action, className, children }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn('py-16 sm:py-20 lg:py-28', className)}
    >
      <Container>
        <Reveal>
          <SectionHeader id={headingId} title={title} description={description} action={action} />
        </Reveal>
        <div className="mt-10 sm:mt-12">{children}</div>
      </Container>
    </section>
  );
}
