import Lenis from 'lenis';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { gsap, prefersReducedMotion, ScrollTrigger } from '~/lib/gsap';

let lenis: Lenis | null = null;

/** Scrolls smoothly when Lenis is running, natively otherwise. */
export function scrollToTarget(target: string | number | HTMLElement) {
  if (lenis) {
    lenis.scrollTo(target, { offset: typeof target === 'number' ? 0 : -88 });
    return;
  }
  if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' });
  else {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    element?.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Inertial smooth scrolling (Lenis) driving GSAP ScrollTrigger. Skipped for
 * reduced motion; native scrolling is kept on touch devices.
 */
export function SmoothScroll() {
  const { pathname } = useLocation();
  const firstRender = useRef(true);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: { offset: -88 },
      autoRaf: false,
    });
    lenis = instance;
    instance.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Layout shifts as fonts load; keep trigger positions honest.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis = null;
    };
  }, []);

  // New page (not the first load, which may carry a #hash): start at the top
  // and recompute every trigger.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    lenis?.scrollTo(0, { immediate: true, force: true });
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
