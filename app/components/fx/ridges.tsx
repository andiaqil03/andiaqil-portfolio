import { cn } from '~/lib/cn';

/* Layered mountain ridges, generated once (deterministically) at module load. */

const WIDTH = 1440;
const HEIGHT = 240;

function ridge(seed: number, base: number, amplitude: number): string {
  const points: string[] = [];
  for (let x = 0; x <= WIDTH; x += 16) {
    const t = x / WIDTH;
    const y =
      base -
      amplitude *
        (0.55 * Math.sin(t * Math.PI * (2.2 + seed * 0.3) + seed) +
          0.3 * Math.sin(t * Math.PI * (5.1 + seed) + seed * 2.1) +
          0.15 * Math.sin(t * Math.PI * (11.3 + seed * 2) + seed * 3.7));
    points.push(`${x} ${y.toFixed(1)}`);
  }
  return `M0 ${HEIGHT}L${points.join('L')}L${WIDTH} ${HEIGHT}Z`;
}

const LAYERS = [ridge(1.3, 110, 70), ridge(2.1, 150, 55), ridge(3.4, 190, 38)];

/**
 * Three ridgelines, far to near. Colours come from `tones` (far → near).
 * Decorative only.
 */
export function Ridges({
  tones,
  className,
}: {
  tones: [string, string, string];
  className?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn('block w-full', className)}
    >
      {LAYERS.map((d, i) => (
        <path key={i} d={d} fill={tones[i]} />
      ))}
    </svg>
  );
}
