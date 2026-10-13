import { Award, GraduationCap } from 'lucide-react';
import type { Education } from '~/content/types';
import { formatRange } from '~/lib/format';
import { Reveal } from '../ui/reveal';

interface EducationListProps {
  items: Education[];
  /** Show relevant coursework (About page). */
  showCoursework?: boolean;
  headingLevel?: 'h2' | 'h3';
}

/** One card per qualification; the degree card is wider. */
export function EducationList({
  items,
  showCoursework = false,
  headingLevel: Heading = 'h3',
}: EducationListProps) {
  return (
    <ul className="grid gap-4 sm:gap-6 lg:grid-cols-3">
      {items.map((item, index) => (
        <Reveal
          as="li"
          key={item.id}
          delay={index * 70}
          className={index === 0 ? 'lg:col-span-2' : undefined}
        >
          <article className="h-full rounded-lg border border-line bg-surface p-5 shadow-xs sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent">
                <GraduationCap aria-hidden="true" className="size-5" strokeWidth={1.75} />
              </span>
              <p className="font-mono text-meta text-ink-3">{formatRange(item.period)}</p>
            </div>
            <Heading className="mt-4 text-subheading font-semibold">{item.qualification}</Heading>
            {item.field ? <p className="mt-0.5 font-medium text-ink-2">{item.field}</p> : null}
            <p className="mt-0.5 text-[0.9375rem] text-ink-3">{item.institution}</p>

            <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.9375rem]">
              <span className="font-semibold tabular">{item.grade}</span>
              {item.honours ? (
                <span className="inline-flex items-center gap-1.5 text-ink-2">
                  <Award aria-hidden="true" className="size-4 text-accent" strokeWidth={1.75} />
                  {item.honours}
                </span>
              ) : null}
            </p>

            {showCoursework && item.coursework ? (
              <div className="mt-5 border-t border-line pt-5">
                <p className="font-mono text-meta text-ink-3 uppercase">Relevant coursework</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {item.coursework.map((course) => (
                    <li
                      key={course}
                      className="inline-flex min-h-7 items-center rounded-sm bg-surface-2 px-2.5 text-[0.8125rem] text-ink-2"
                    >
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </article>
        </Reveal>
      ))}
    </ul>
  );
}
