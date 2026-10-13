import { useRef } from 'react';
// useGSAP reverts the tween and its ScrollTrigger on unmount.
import { gsap, prefersReducedMotion, useGSAP } from '~/lib/gsap';

/**
 * A real figure that counts up when it scrolls into view. The final value is
 * what prerenders, so no-JS, reduced motion and screen readers all get the
 * true number.
 */
export function Counter({
  value,
  decimals = 0,
  suffix = '',
  className,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (n: number) =>
    `${n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;

  useGSAP(
    () => {
      const element = ref.current;
      if (!element || prefersReducedMotion()) return;
      if (element.getBoundingClientRect().top < window.innerHeight * 0.9) return;
      const state = { n: 0 };
      element.textContent = format(0);
      gsap.to(state, {
        n: value,
        duration: 1.8,
        ease: 'power3.out',
        onUpdate: () => {
          element.textContent = format(state.n);
        },
        scrollTrigger: { trigger: element, start: 'top 88%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
