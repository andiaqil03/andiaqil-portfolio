import type { CSSProperties, ReactNode } from 'react';
import { SplitText } from '../fx/split-text';
import { Container } from '../ui/container';

interface PageHeaderProps {
  /** Plain string titles get the split-character entrance. */
  title: ReactNode;
  /** Optional gradient word(s) appended to the title. */
  accent?: string;
  kicker?: string;
  lead?: ReactNode;
  /** Above the title, e.g. a back link or badges. */
  before?: ReactNode;
  /** Below the lead, e.g. actions or meta. */
  children?: ReactNode;
  titleStyle?: CSSProperties;
}

const at = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

/** Opening block for inner pages, clear of the floating nav. */
export function PageHeader({
  title,
  accent,
  kicker,
  lead,
  before,
  children,
  titleStyle,
}: PageHeaderProps) {
  return (
    <header className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="dot-grid absolute inset-0 -z-10 [mask-image:radial-gradient(60%_70%_at_20%_0%,#000_20%,transparent_75%)]"
      />
      <Container className="pt-32 pb-12 sm:pt-36 sm:pb-14 lg:pt-44 lg:pb-16">
        {before ? (
          <div className="anim-rise mb-6" style={at(0)}>
            {before}
          </div>
        ) : null}
        {kicker ? (
          <p
            className="anim-rise mb-5 inline-flex items-center gap-2 font-mono text-meta tracking-[0.12em] text-ink-3 uppercase"
            style={at(40)}
          >
            <span
              aria-hidden="true"
              className="h-px w-8"
              style={{ background: 'var(--gradient-aurora)' }}
            />
            {kicker}
          </p>
        ) : null}
        <h1 className="max-w-[18ch] font-display text-title font-semibold" style={titleStyle}>
          {typeof title === 'string' ? <SplitText text={title} delay={80} /> : title}
          {accent ? (
            <>
              {' '}
              <span className="anim-rise text-gradient is-animated inline-block" style={at(380)}>
                {accent}
              </span>
            </>
          ) : null}
        </h1>
        {lead ? (
          <div className="anim-rise mt-6 max-w-[62ch] text-lead text-ink-2" style={at(480)}>
            {lead}
          </div>
        ) : null}
        {children ? (
          <div className="anim-rise mt-8" style={at(580)}>
            {children}
          </div>
        ) : null}
      </Container>
    </header>
  );
}
