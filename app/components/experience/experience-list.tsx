import { ChevronDown } from 'lucide-react';
import { isPlaceholder } from '~/content/placeholder';
import { techName } from '~/content/tech';
import type { Experience } from '~/content/types';
import { cn } from '~/lib/cn';
import { formatRange } from '~/lib/format';
import { List } from '../ui/list';
import { PlaceholderNote } from '../ui/placeholder-note';
import { Reveal } from '../ui/reveal';
import { Tag, TechChips } from '../ui/tag';

/** The rail and node shared by both timelines. */
function Node({ current }: { current: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'absolute top-7 -left-[calc(1rem+5px)] size-2.5 rounded-full ring-4 ring-canvas sm:-left-[calc(2rem+5px)]',
        current ? 'bg-accent' : 'bg-line-strong',
      )}
    />
  );
}

function Header({ item, level: Heading }: { item: Experience; level: 'h2' | 'h3' }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div>
        <Heading id={`${item.id}-role`} className="text-subheading font-semibold">
          {item.role}
        </Heading>
        <p className="mt-0.5 font-medium text-ink-2">{item.organization}</p>
        {item.context ? <p className="mt-0.5 text-sm text-ink-3">{item.context}</p> : null}
      </div>
      <p className="order-first font-mono text-meta text-ink-3 sm:order-none sm:mt-1.5 sm:shrink-0">
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

/** Home page: a compact vertical timeline. */
export function ExperienceSummary({ items }: { items: Experience[] }) {
  return (
    <ol className="relative ml-1 border-l border-line pl-4 sm:pl-8">
      {items.map((item, index) => (
        <Reveal as="li" key={item.id} delay={index * 70} className="relative pb-6 last:pb-0">
          <Node current={item.period.end === 'present'} />
          <article
            aria-labelledby={`${item.id}-role`}
            className="rounded-lg border border-line bg-surface p-5 shadow-xs sm:p-6"
          >
            <Header item={item} level="h3" />
            <p className="mt-3 max-w-[68ch] text-[0.9375rem] text-ink-2">{item.summary}</p>
            <div className="mt-4">
              <Labels item={item} />
            </div>
          </article>
        </Reveal>
      ))}
    </ol>
  );
}

/** Experience page: the same timeline with full detail. */
export function ExperienceTimeline({ items }: { items: Experience[] }) {
  return (
    <ol className="relative ml-1 border-l border-line pl-4 sm:pl-8">
      {items.map((item, index) => (
        <Reveal as="li" key={item.id} delay={index * 70} className="relative pb-8 last:pb-0">
          <Node current={item.period.end === 'present'} />
          <article
            id={item.id}
            aria-labelledby={`${item.id}-role`}
            className="scroll-mt-24 rounded-xl border border-line bg-surface p-5 shadow-xs sm:p-8"
          >
            <Header item={item} level="h2" />
            <div className="mt-4">
              <Labels item={item} />
            </div>
            <p className="mt-5 max-w-[68ch] text-lead text-ink">{item.summary}</p>
            <List items={item.highlights} marker="check" className="mt-5" />

            {item.details.length > 0 ? (
              <details className="group/details mt-5">
                <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-1.5 rounded-md text-[0.9375rem] font-medium text-accent transition-colors hover:text-accent-hover [&::-webkit-details-marker]:hidden">
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
