import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from 'react';

interface RevealProps extends Omit<HTMLAttributes<HTMLElement>, 'style'> {
  as?: ElementType;
  /** Stagger within a group, in milliseconds. */
  delay?: number;
  className?: string;
  children: ReactNode;
}

/**
 * Fades and lifts its content in once, when it scrolls into view.
 *
 * Content that is already on screen when the page hydrates is never touched,
 * so prerendered HTML is never hidden and nothing flashes. Only elements that
 * start below the fold are armed. Skipped entirely with prefers-reduced-motion.
 */
export function Reveal({ as: Tag = 'div', delay = 0, className, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (element.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    element.dataset.reveal = 'pending';
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        element.dataset.reveal = 'in';
        observer.disconnect();
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      {...rest}
      ref={ref}
      className={className}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
