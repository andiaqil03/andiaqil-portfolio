import {
  useRef,
  type ElementType,
  type HTMLAttributes,
  type PointerEvent,
  type ReactNode,
} from 'react';
import { hasFinePointer, prefersReducedMotion } from '~/lib/gsap';
import { cn } from '~/lib/cn';

interface TiltCardProps extends Omit<
  HTMLAttributes<HTMLElement>,
  'onPointerMove' | 'onPointerLeave'
> {
  as?: ElementType;
  /** Maximum tilt in degrees. */
  max?: number;
  className?: string;
  /** Classes for the inner surface (radius should match). */
  children: ReactNode;
}

/**
 * Glass card that tilts toward the pointer in 3D, with a cursor spotlight and
 * a soft glare. Mouse/trackpad only; static with reduced motion.
 */
export function TiltCard({
  as: Tag = 'div',
  max = 6,
  className,
  children,
  ...rest
}: TiltCardProps) {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef(0);

  function onPointerMove(event: PointerEvent<HTMLElement>) {
    const element = ref.current;
    if (!element || event.pointerType !== 'mouse' || !hasFinePointer()) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      element.style.setProperty('--mx', `${x * 100}%`);
      element.style.setProperty('--my', `${y * 100}%`);
      if (prefersReducedMotion()) return;
      element.style.setProperty('--rx', `${(0.5 - y) * max}deg`);
      element.style.setProperty('--ry', `${(x - 0.5) * max}deg`);
    });
  }

  function onPointerLeave() {
    const element = ref.current;
    if (!element) return;
    cancelAnimationFrame(frame.current);
    element.style.setProperty('--rx', '0deg');
    element.style.setProperty('--ry', '0deg');
  }

  return (
    <Tag
      {...rest}
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(
        'group/tilt relative [transform:perspective(1100px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] transition-transform duration-500 ease-out-soft [transform-style:preserve-3d] will-change-transform',
        className,
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className="spotlight pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
      />
      <span
        aria-hidden="true"
        className="glare pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-soft-light transition-opacity duration-300 group-hover/tilt:opacity-100"
      />
    </Tag>
  );
}
