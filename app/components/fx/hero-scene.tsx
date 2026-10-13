import { useEffect, useRef, useState } from 'react';
import { cn } from '~/lib/cn';
import { prefersReducedMotion } from '~/lib/gsap';

/** Hubs on the globe: real parts of the stack. */
const LABELS = ['NestJS API', 'Angular', 'React', 'Laravel', '.NET', 'MySQL', 'Firebase', 'Gemini'];

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Host for the WebGL "Living System". Shows a soft CSS orb immediately (and
 * as the fallback without WebGL), then loads three.js in its own chunk and
 * fades the live scene in.
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

    import('./living-system').then(({ createLivingSystem }) => {
      if (disposed) return;
      dispose = createLivingSystem(container, labelLayer, {
        labels: LABELS,
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
      {/* Placeholder orb: visible until the scene is ready, and the fallback without WebGL. */}
      <div
        className={cn(
          'absolute inset-[14%] rounded-full transition-opacity duration-1000',
          ready ? 'opacity-0' : 'opacity-100',
        )}
        style={{
          background:
            'radial-gradient(circle at 35% 30%, color-mix(in srgb, var(--g-indigo) 38%, transparent), transparent 60%), radial-gradient(circle at 70% 75%, color-mix(in srgb, var(--g-emerald) 30%, transparent), transparent 55%)',
          filter: 'blur(8px)',
        }}
      />
      <div
        ref={mount}
        className={cn(
          'absolute inset-0 transition-[opacity,transform] duration-[1400ms] ease-out-expo',
          ready ? 'scale-100 opacity-100' : 'scale-90 opacity-0',
        )}
      />
      <div ref={labels} className="pointer-events-none absolute inset-0 overflow-hidden" />
    </div>
  );
}
