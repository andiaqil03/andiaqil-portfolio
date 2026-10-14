import { useEffect, useRef, useState } from 'react';
import { cn } from '~/lib/cn';
import { prefersReducedMotion } from '~/lib/gsap';
import type { TrailWaypoint } from './trail-scene';

/** Real milestones along the trail, trailhead to summit. */
const WAYPOINTS: TrailWaypoint[] = [
  { label: 'UNITEN · 2021', t: 0.04 },
  { label: 'TM R&D · 2025', t: 0.34 },
  { label: 'PNB · 2025–26', t: 0.6 },
  { label: 'Freelance · now', t: 0.84 },
  { label: 'Next: Software Engineer', t: 1, summit: true },
];

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2'));
  } catch {
    return false;
  }
}

/**
 * Host for the WebGL trail map. Shows the flat topographic texture right away
 * (and as the fallback without WebGL), then loads three.js in its own chunk
 * and fades the 3D mountain in.
 */
export function HeroScene({ className }: { className?: string }) {
  const mount = useRef<HTMLDivElement>(null);
  const labels = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = mount.current;
    const labelLayer = labels.current;
    if (!container || !labelLayer || !supportsWebGL()) return;

    let disposed = false;
    let dispose: (() => void) | undefined;

    import('./trail-scene').then(({ createTrailScene }) => {
      if (disposed) return;
      dispose = createTrailScene(container, labelLayer, {
        waypoints: WAYPOINTS,
        reducedMotion: prefersReducedMotion(),
        onReady: () => setReady(true),
      });
    });

    return () => {
      disposed = true;
      dispose?.();
    };
  }, []);

  return (
    <div aria-hidden="true" className={className ?? 'relative'}>
      {/* Flat contour map: visible until the 3D scene is ready, and the fallback without WebGL. */}
      <div
        className={cn(
          'topo absolute inset-[6%] rounded-full transition-opacity duration-1000 [--topo:color-mix(in_srgb,var(--pine)_30%,transparent)]',
          ready ? 'opacity-0' : 'opacity-100',
        )}
      />
      <div
        ref={mount}
        className={cn(
          'absolute inset-0 transition-[opacity,transform] duration-[1400ms] ease-out-expo',
          ready ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
        )}
      />
      <div ref={labels} className="pointer-events-none absolute inset-0 overflow-hidden" />
    </div>
  );
}
