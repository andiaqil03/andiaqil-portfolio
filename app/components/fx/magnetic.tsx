import { useRef, type ReactNode } from 'react';
import { gsap, hasFinePointer, prefersReducedMotion, useGSAP } from '~/lib/gsap';
import { cn } from '~/lib/cn';

/** Pulls its child gently toward the pointer, then springs back. Mouse only. */
export function Magnetic({
  strength = 0.35,
  className,
  children,
}: {
  strength?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element || !hasFinePointer() || prefersReducedMotion()) return;
      const xTo = gsap.quickTo(element, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      const yTo = gsap.quickTo(element, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });

      const onMove = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        xTo((event.clientX - (rect.left + rect.width / 2)) * strength);
        yTo((event.clientY - (rect.top + rect.height / 2)) * strength);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };
      element.addEventListener('pointermove', onMove);
      element.addEventListener('pointerleave', onLeave);
      return () => {
        element.removeEventListener('pointermove', onMove);
        element.removeEventListener('pointerleave', onLeave);
      };
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={cn('inline-flex', className)}>
      {children}
    </span>
  );
}
