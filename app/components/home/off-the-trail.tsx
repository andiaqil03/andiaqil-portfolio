import { Dumbbell, Mountain, Plane } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';
import { outdoors, type OutdoorKind, type OutdoorPhoto } from '~/content/outdoors';
import { isPlaceholder, resolved } from '~/content/placeholder';
import { cn } from '~/lib/cn';
import { PlaceholderNote } from '../ui/placeholder-note';
import { Reveal } from '../ui/reveal';
import { Section } from '../ui/section';

const kinds: Record<OutdoorKind, { Icon: ComponentType<SVGProps<SVGSVGElement>>; tint: string }> = {
  Hiking: { Icon: Mountain, tint: 'var(--pine)' },
  Travel: { Icon: Plane, tint: 'var(--lake)' },
  Sport: { Icon: Dumbbell, tint: 'var(--trail)' },
};

// A gentle scrapbook tilt that straightens on hover.
const tilts = [
  '-rotate-[1.5deg]',
  'rotate-[1deg]',
  '-rotate-[0.75deg]',
  'rotate-[1.5deg]',
  '-rotate-[1deg]',
  'rotate-[0.5deg]',
];

function PhotoFrame({ photo, index }: { photo: OutdoorPhoto; index: number }) {
  const image = resolved(photo.image);
  const caption = resolved(photo.caption);
  const { Icon, tint } = kinds[photo.kind];

  return (
    <figure
      className={cn(
        'surface-card rounded-lg p-2 pb-3 transition-transform duration-500 ease-out-expo hover:rotate-0 hover:scale-[1.02] motion-reduce:rotate-0',
        tilts[index % tilts.length],
      )}
    >
      {image ? (
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full rounded-md object-cover"
        />
      ) : (
        <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 rounded-md border border-dashed border-line-strong bg-surface-2 p-3 text-center">
          <Icon aria-hidden="true" className="size-6" style={{ color: tint }} strokeWidth={1.5} />
          {isPlaceholder(photo.image) ? <PlaceholderNote note={photo.image.todo} /> : null}
        </div>
      )}
      <figcaption className="mt-2.5 flex items-center gap-2 px-1 font-mono text-meta text-ink-2">
        <Icon
          aria-hidden="true"
          className="size-3.5 shrink-0"
          style={{ color: tint }}
          strokeWidth={2}
        />
        <span className="font-semibold text-ink">{photo.kind}</span>
        {caption ? <span className="truncate">· {caption}</span> : null}
        {isPlaceholder(photo.caption) ? <PlaceholderNote note={photo.caption.todo} /> : null}
      </figcaption>
    </figure>
  );
}

/**
 * Hiking, travel and sport. In production the photo grid appears only once
 * real photos are added (app/content/outdoors.ts); the interests always show.
 */
export function OffTheTrail({ id = 'off-the-trail' }: { id?: string }) {
  const photos = outdoors.photos.filter(
    (photo) => import.meta.env.DEV || resolved(photo.image) !== undefined,
  );

  return (
    <Section
      id={id}
      kicker="Off the trail"
      title={
        <>
          Outside of <span className="text-accent">code</span>
        </>
      }
      description={outdoors.intro}
    >
      <ul className="flex flex-wrap gap-3">
        {outdoors.interests.map((kind, index) => {
          const { Icon, tint } = kinds[kind];
          return (
            <Reveal as="li" key={kind} delay={index * 80}>
              <span className="surface-card inline-flex items-center gap-3 rounded-full py-2 pr-5 pl-2">
                <span
                  className="inline-flex size-10 items-center justify-center rounded-full"
                  style={{
                    background: `color-mix(in srgb, ${tint} 16%, var(--surface))`,
                    color: tint,
                  }}
                >
                  <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                </span>
                <span className="font-display text-xl tracking-[0.01em] uppercase">{kind}</span>
              </span>
            </Reveal>
          );
        })}
      </ul>

      {photos.length > 0 ? (
        <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {photos.map((photo, index) => (
            <Reveal as="li" key={photo.id} delay={(index % 3) * 80}>
              <PhotoFrame photo={photo} index={index} />
            </Reveal>
          ))}
        </ul>
      ) : null}
    </Section>
  );
}
