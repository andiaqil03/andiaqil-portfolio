import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import type { OutdoorPhoto } from '~/content/outdoors';
import { cn } from '~/lib/cn';

/**
 * Story-style photo viewer: tap the right side for the next photo, the left
 * side for the previous one (or swipe, or use the arrow keys). Photos slide
 * and fade between each other; the bars on top show where you are.
 */
/** True when a photo is close enough to the 3:4 frame to fill it with only a slight crop. */
function fitsFrame(photo: OutdoorPhoto): boolean {
  return Math.abs(photo.width / photo.height - 3 / 4) < 0.06;
}

export function QuickSnap({ photos, label }: { photos: OutdoorPhoto[]; label: string }) {
  // `reached`: photos are only mounted once they're current or next, so the rest load on demand.
  const [{ index, reached }, setView] = useState({ index: 0, reached: 1 });
  const swipe = useRef<number | null>(null);
  // A swipe that ends over a tap zone must not also count as a tap.
  const swiped = useRef(false);
  const count = photos.length;

  // Functional updates, so quick repeated taps each count.
  const step = (delta: number) => {
    setView((view) => {
      const target = (view.index + delta + count) % count;
      return { index: target, reached: Math.max(view.reached, target + 1) };
    });
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') step(1);
    else if (event.key === 'ArrowLeft') step(-1);
    else return;
    event.preventDefault();
  };

  const onPointerDown = (event: PointerEvent) => {
    swipe.current = event.clientX;
  };
  const onPointerUp = (event: PointerEvent) => {
    const start = swipe.current;
    swipe.current = null;
    if (start === null) return;
    const delta = event.clientX - start;
    if (Math.abs(delta) > 40) {
      swiped.current = true;
      step(delta < 0 ? 1 : -1);
    }
  };
  const tap = (delta: number) => {
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    step(delta);
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className="group/snap relative aspect-[3/4] touch-pan-y overflow-hidden rounded-lg bg-summit select-none"
    >
      {photos.map((photo, i) => {
        if (i > reached) return null;
        const fits = fitsFrame(photo);
        return (
          <div
            key={photo.src}
            aria-hidden={i !== index}
            className={cn(
              'absolute inset-0 transition-[opacity,translate,scale] duration-500 ease-out-expo motion-reduce:transition-none',
              i === index && 'translate-x-0 scale-100 opacity-100',
              i < index && '-translate-x-[12%] scale-[0.96] opacity-0',
              i > index && 'translate-x-[12%] scale-[0.96] opacity-0',
            )}
          >
            {/* Photos that aren't 3:4 are shown whole, over a blurred copy of themselves. */}
            {fits ? null : (
              <img
                src={photo.src}
                alt=""
                aria-hidden="true"
                decoding="async"
                draggable={false}
                className="absolute inset-0 size-full scale-110 object-cover opacity-70 blur-xl"
              />
            )}
            <img
              src={photo.src}
              alt={i === index ? photo.alt : ''}
              width={photo.width}
              height={photo.height}
              loading={i === 0 ? 'lazy' : 'eager'}
              decoding="async"
              draggable={false}
              className={cn('relative size-full', fits ? 'object-cover' : 'object-contain')}
            />
          </div>
        );
      })}

      {/* Progress bars, like stories. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 flex gap-1 px-3 pt-3"
      >
        {photos.map((photo, i) => (
          <span
            key={photo.src}
            className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/40 shadow-[0_0_3px_rgb(0_0_0/0.45)]"
          >
            <span
              className={cn(
                'block h-full origin-left rounded-full bg-white transition-transform duration-500 ease-out-expo motion-reduce:transition-none',
                i <= index ? 'scale-x-100' : 'scale-x-0',
              )}
            />
          </span>
        ))}
      </div>

      {/* Tap zones: left third goes back, the rest goes forward. */}
      <button
        type="button"
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onClick={() => tap(-1)}
        aria-label="Previous photo"
        className="group/prev absolute inset-y-0 left-0 flex w-1/3 items-center justify-start pl-2 focus-visible:outline-offset-[-4px]"
      >
        <span className="inline-flex size-9 items-center justify-center rounded-full bg-black/30 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover/snap:opacity-100 group-focus-visible/prev:opacity-100">
          <ChevronLeft aria-hidden="true" className="size-5" strokeWidth={2} />
        </span>
      </button>
      <button
        type="button"
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onClick={() => tap(1)}
        aria-label="Next photo"
        className="group/next absolute inset-y-0 right-0 flex w-2/3 items-center justify-end pr-2 focus-visible:outline-offset-[-4px]"
      >
        <span className="inline-flex size-9 items-center justify-center rounded-full bg-black/30 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover/snap:opacity-100 group-focus-visible/next:opacity-100">
          <ChevronRight aria-hidden="true" className="size-5" strokeWidth={2} />
        </span>
      </button>

      <p
        aria-live="polite"
        className="pointer-events-none absolute right-3 bottom-3 rounded-full bg-black/40 px-2.5 py-1 font-mono text-meta text-white tabular backdrop-blur-sm"
      >
        {index + 1} / {count}
      </p>
    </div>
  );
}
