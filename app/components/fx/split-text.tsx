import { Fragment, type CSSProperties } from 'react';
import { cn } from '~/lib/cn';

interface SplitTextProps {
  text: string;
  /** Delay before the first character, in ms. */
  delay?: number;
  /** Delay between characters, in ms. */
  stagger?: number;
  className?: string;
  charClassName?: string;
}

/**
 * Characters that flip up into place on first paint. Rendered on the server
 * and animated with CSS, so it never waits for hydration. Screen readers get
 * the plain text; the per-character spans are hidden from them.
 */
export function SplitText({
  text,
  delay = 0,
  stagger = 28,
  className,
  charClassName,
}: SplitTextProps) {
  let index = 0;
  const words = text.split(' ');

  return (
    <span className={cn('[perspective:600px]', className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, w) => (
          // The space sits between word boxes: inside an inline-block it would collapse.
          <Fragment key={w}>
            {w > 0 ? ' ' : null}
            <span className="inline-block whitespace-nowrap">
              {[...word].map((char, c) => {
                const style = { '--d': `${delay + index++ * stagger}ms` } as CSSProperties;
                return (
                  <span key={c} className={cn('anim-char', charClassName)} style={style}>
                    {char}
                  </span>
                );
              })}
            </span>
          </Fragment>
        ))}
      </span>
    </span>
  );
}
