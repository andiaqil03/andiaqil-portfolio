import type { CSSProperties, ReactNode } from 'react';
import { cn } from '~/lib/cn';

/**
 * Infinite horizontal ribbon. The content is rendered twice for a seamless
 * loop; the copy is hidden from assistive tech. Pauses on hover; static with
 * reduced motion.
 */
export function Marquee({
  children,
  reverse = false,
  duration = 40,
  className,
}: {
  children: ReactNode;
  reverse?: boolean;
  duration?: number;
  className?: string;
}) {
  const style = {
    '--marquee-duration': `${duration}s`,
    animationDirection: reverse ? 'reverse' : undefined,
  } as CSSProperties;

  return (
    <div
      className={cn(
        'marquee relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]',
        className,
      )}
    >
      <div className="marquee-track flex w-max shrink-0" style={style}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div aria-hidden="true" className="flex shrink-0 items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
