import { ChevronDown } from 'lucide-react';
import { useRef } from 'react';
import { isPlaceholder } from '~/content/placeholder';
import { techName } from '~/content/tech';
import type { Experience } from '~/content/types';
import { cn } from '~/lib/cn';
import { formatRange } from '~/lib/format';
import { gsap, prefersReducedMotion, useGSAP } from '~/lib/gsap';
import { TiltCard } from '../fx/tilt-card';
import { List } from '../ui/list';
import { PlaceholderNote } from '../ui/placeholder-note';
import { Reveal } from '../ui/reveal';
import { Tag, TechChips } from '../ui/tag';

/** A dashed trail that draws itself as you scroll through the timeline. */
function useDrawnRail() {
  const scope = useRef<HTMLOListElement>(null);
  useGSAP(
    () => {
      const rail = scope.current?.querySelector('[data-rail]');
      if (!rail || prefersReducedMotion()) return;
      gsap.fromTo(
        rail,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: scope.current,
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 0.6,
          },
        },
      );
      scope.current?.querySelectorAll('[data-node]').forEach((node) => {
        gsap.fromTo(
          node,
          { scale: 0.4, opacity: 0.3 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'back.out(3)',
            scrollTrigger: {
              trigger: node,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });
    },
    { scope },
  );
  return scope;
}

function Rail() {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[7px] w-px bg-line sm:left-[11px]"
      />
      <span
        aria-hidden="true"
        data-rail
        className="trail-line absolute top-2 bottom-2 left-[6px] w-[3px] origin-top rounded-full sm:left-[10px]"
      />
    </>
  );
}

function Node({ current }: { current: boolean }) {
  return (
    <span
      aria-hidden="true"
      data-node
      className={cn(
        'absolute top-7 left-0 size-[15px] rounded-full border-[3px] shadow-sm sm:size-[23px] sm:border-[5px]',
        current ? 'pulse-dot border-canvas bg-trail' : 'border-pine bg-surface',
      )}
    />
  );
}

function Header({ item, level: Heading }: { item: Experience; level: 'h2' | 'h3' }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div>
        <Heading id={`${item.id}-role`} className="font-display text-subheading font-semibold">
          {item.role}
        </Heading>
        <p className="mt-0.5 font-medium text-ink-2">{item.organization}</p>
        {item.context ? <p className="mt-0.5 text-sm text-ink-3">{item.context}</p> : null}
      </div>
      <p className="order-first font-mono text-meta text-accent sm:order-none sm:mt-1.5 sm:shrink-0">
        {formatRange(item.period)}
      </p>
    </div>
  );
}

function Labels({ item }: { item: Experience }) {
  const current = item.period.end === 'present';
  return (
    <div className="flex flex-wrap gap-1.5">
      {current ? <Tag tone="accent">Current</Tag> : null}
      <Tag>{item.kind}</Tag>
      {item.note ? <Tag tone="outline">{item.note}</Tag> : null}
    </div>
  );
}

/** Home page: a compact timeline whose rail draws itself as you scroll. */
export function ExperienceSummary({ items }: { items: Experience[] }) {
  const scope = useDrawnRail();
  return (
    <ol ref={scope} className="relative">
      <Rail />
      {items.map((item, index) => (
        <Reveal
          as="li"
          key={item.id}
          delay={index * 80}
          className="relative pb-6 pl-9 last:pb-0 sm:pl-14"
        >
          <Node current={item.period.end === 'present'} />
          <TiltCard as="article" max={3} className="rounded-xl" aria-labelledby={`${item.id}-role`}>
            <div className="surface-card rounded-xl p-5 sm:p-7">
              <Header item={item} level="h3" />
              <p className="mt-3 max-w-[68ch] text-[0.9375rem] text-ink-2">{item.summary}</p>
              <div className="mt-4">
                <Labels item={item} />
              </div>
            </div>
          </TiltCard>
        </Reveal>
      ))}
    </ol>
  );
}

/** Experience page: the same timeline with full detail. */
export function ExperienceTimeline({ items }: { items: Experience[] }) {
  const scope = useDrawnRail();
  return (
    <ol ref={scope} className="relative">
      <Rail />
      {items.map((item, index) => (
        <Reveal
          as="li"
          key={item.id}
          delay={index * 80}
          className="relative pb-10 pl-9 last:pb-0 sm:pl-14"
        >
          <Node current={item.period.end === 'present'} />
          <article
            id={item.id}
            aria-labelledby={`${item.id}-role`}
            className="surface-card scroll-mt-28 rounded-xl p-5 sm:p-8"
          >
            <Header item={item} level="h2" />
            <div className="mt-4">
              <Labels item={item} />
            </div>
            <p className="mt-5 max-w-[68ch] text-lead text-ink">{item.summary}</p>
            <List items={item.highlights} marker="check" className="mt-5" />

            {item.details.length > 0 ? (
              <details className="group/details mt-5">
                <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-1.5 rounded-full text-[0.9375rem] font-semibold text-accent transition-colors hover:text-accent-hover [&::-webkit-details-marker]:hidden">
                  <span className="group-open/details:hidden">Show {item.details.length} more</span>
                  <span className="hidden group-open/details:inline">Show less</span>
                  <ChevronDown
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-open/details:rotate-180"
                    strokeWidth={2}
                  />
                </summary>
                <List items={item.details} className="mt-2" />
              </details>
            ) : null}

            <div className="mt-6 border-t border-line pt-5">
              {isPlaceholder(item.tech) ? (
                <PlaceholderNote note={item.tech.todo} />
              ) : (
                <TechChips items={item.tech.map(techName)} label="Technologies used" />
              )}
            </div>
          </article>
        </Reveal>
      ))}
    </ol>
  );
}
