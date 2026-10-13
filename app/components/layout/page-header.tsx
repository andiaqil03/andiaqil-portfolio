import type { CSSProperties, ReactNode } from 'react';
import { Container } from '../ui/container';

interface PageHeaderProps {
  title: ReactNode;
  lead?: ReactNode;
  /** Above the title, e.g. a back link or badges. */
  before?: ReactNode;
  /** Below the lead, e.g. actions or meta. */
  children?: ReactNode;
  titleStyle?: CSSProperties;
}

/** Opening block for inner pages. */
export function PageHeader({ title, lead, before, children, titleStyle }: PageHeaderProps) {
  return (
    <header>
      <Container className="pt-12 pb-10 sm:pt-16 sm:pb-12 lg:pt-20 lg:pb-14">
        {before ? <div className="mb-6">{before}</div> : null}
        <h1 className="max-w-[24ch] text-title font-semibold" style={titleStyle}>
          {title}
        </h1>
        {lead ? <div className="mt-4 max-w-[62ch] text-lead text-ink-2">{lead}</div> : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </header>
  );
}
