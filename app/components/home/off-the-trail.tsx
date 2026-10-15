import { Dumbbell, Mountain, Plane } from 'lucide-react';
import type { ComponentType, ReactNode, SVGProps } from 'react';
import { outdoors, type OutdoorActivity, type OutdoorKind } from '~/content/outdoors';
import { isPlaceholder, resolved } from '~/content/placeholder';
import { formatYearMonth } from '~/lib/format';
import { PlaceholderNote } from '../ui/placeholder-note';
import { Reveal } from '../ui/reveal';
import { Section } from '../ui/section';
import { QuickSnap } from './quick-snap';

const kinds: Record<OutdoorKind, { Icon: ComponentType<SVGProps<SVGSVGElement>>; tint: string }> = {
  Hiking: { Icon: Mountain, tint: 'var(--pine)' },
  Travel: { Icon: Plane, tint: 'var(--lake)' },
  Sport: { Icon: Dumbbell, tint: 'var(--trail)' },
};

function ActivityCard({ activity }: { activity: OutdoorActivity }) {
  const photos = resolved(activity.photos);
  const title = resolved(activity.title);
  const detail = resolved(activity.detail);
  const { Icon, tint } = kinds[activity.kind];

  return (
    <article className="surface-card rounded-xl p-2.5 pb-4">
      {photos?.length ? (
        <QuickSnap photos={photos} label={`${title ?? activity.kind} photos`} />
      ) : (
        <div className="flex aspect-[3/4] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-line-strong bg-surface-2 p-4 text-center">
          <Icon aria-hidden="true" className="size-6" style={{ color: tint }} strokeWidth={1.5} />
          {isPlaceholder(activity.photos) ? <PlaceholderNote note={activity.photos.todo} /> : null}
        </div>
      )}
      <div className="mt-4 px-2">
        <p className="flex items-center gap-2 font-mono text-meta text-ink-2 uppercase">
          <Icon aria-hidden="true" className="size-3.5" style={{ color: tint }} strokeWidth={2} />
          {activity.kind}
          {activity.date ? (
            <>
              <span aria-hidden="true">·</span>
              <time dateTime={activity.date}>{formatYearMonth(activity.date)}</time>
            </>
          ) : null}
        </p>
        <h3 className="mt-1.5 font-display text-subheading font-semibold">
          {title}
          {isPlaceholder(activity.title) ? <PlaceholderNote note={activity.title.todo} /> : null}
        </h3>
        {detail ? <p className="text-ink-2">{detail}</p> : null}
        {isPlaceholder(activity.detail) ? <PlaceholderNote note={activity.detail.todo} /> : null}
      </div>
    </article>
  );
}

/**
 * Hiking, travel and sport. In production only activities with real photos
 * appear (app/content/outdoors.ts); the interests always show.
 */
export function OffTheTrail({
  id = 'off-the-trail',
  limit,
  action,
}: {
  id?: string;
  /** Show only the N most recent activities (Home shows three). */
  limit?: number;
  action?: ReactNode;
}) {
  // Most recent first; undated activities go last, otherwise content order is kept.
  const activities = outdoors.activities
    .filter((activity) => import.meta.env.DEV || resolved(activity.photos) !== undefined)
    .toSorted((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
    .slice(0, limit);

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
      action={action}
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

      {activities.length > 0 ? (
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity, index) => (
            <Reveal as="li" key={activity.id} delay={(index % 3) * 80}>
              <ActivityCard activity={activity} />
            </Reveal>
          ))}
        </ul>
      ) : null}
    </Section>
  );
}
