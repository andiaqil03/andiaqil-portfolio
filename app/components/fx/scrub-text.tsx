import { useRef } from 'react';
import { gsap, prefersReducedMotion, useGSAP } from '~/lib/gsap';
import { cn } from '~/lib/cn';

/**
 * A statement whose words light up one by one as it scrolls through the
 * viewport. Fully readable without JavaScript or with reduced motion.
 * `highlight` words are set in the pine accent.
 */
export function ScrubText({
  text,
  highlight = [],
  as: Tag = 'p',
  className,
}: {
  text: string;
  highlight?: string[];
  as?: 'p' | 'h2';
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement & HTMLHeadingElement>(null);
  const marked = new Set(highlight.map((word) => word.toLowerCase()));

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      gsap.fromTo(
        ref.current.querySelectorAll('[data-word]'),
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: 'top 82%', end: 'bottom 42%', scrub: 0.6 },
        },
      );
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={cn('font-display', className)}>
      {text.split(' ').map((word, index) => {
        const bare = word.replace(/[^\p{L}\p{N}.+#-]/gu, '').toLowerCase();
        return (
          <span key={index}>
            <span data-word className={marked.has(bare) ? 'text-accent' : undefined}>
              {word}
            </span>{' '}
          </span>
        );
      })}
    </Tag>
  );
}
