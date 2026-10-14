import { Award } from 'lucide-react';
import { useRef } from 'react';
import type { Education } from '~/content/types';
import { formatRange } from '~/lib/format';
import { gsap, prefersReducedMotion, useGSAP } from '~/lib/gsap';
import { TiltCard } from '../fx/tilt-card';
import { Reveal } from '../ui/reveal';

const CIRCUMFERENCE = 2 * Math.PI * 42;

/** CGPA as a ring filling toward 4.00 when it scrolls into view. */
function GradeRing({ grade }: { grade: string }) {
  const value = Number.parseFloat(grade.replace(/[^\d.]/g, '')) || 0;
  const ring = useRef<SVGSVGElement>(null);
  const offset = CIRCUMFERENCE * (1 - Math.min(1, value / 4));

  useGSAP(
    () => {
      const arc = ring.current?.querySelector('[data-arc]');
      if (!arc || prefersReducedMotion()) return;
      if (ring.current!.getBoundingClientRect().top < window.innerHeight * 0.9) return;
      gsap.fromTo(
        arc,
        { strokeDashoffset: CIRCUMFERENCE },
        {
          strokeDashoffset: offset,
          duration: 1.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: ring.current, start: 'top 85%', once: true },
        },
      );
    },
    { scope: ring },
  );

  return (
    <div className="relative size-28 shrink-0">
      <svg ref={ring} viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden="true">
        <circle cx="50" cy="50" r="42" fill="none" stroke="var(--line)" strokeWidth="8" />
        <circle
          data-arc
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="var(--pine)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-2xl font-semibold tracking-[-0.01em]">
          {value.toFixed(2)}
        </span>
        <span className="font-mono text-[0.6875rem] text-ink-3 uppercase">CGPA</span>
      </div>
    </div>
  );
}

interface EducationListProps {
  items: Education[];
  /** Show relevant coursework (About page). */
  showCoursework?: boolean;
  headingLevel?: 'h2' | 'h3';
}

export function EducationList({
  items,
  showCoursework = false,
  headingLevel: Heading = 'h3',
}: EducationListProps) {
  return (
    <ul className="grid gap-5 sm:gap-6 lg:grid-cols-5">
      {items.map((item, index) => (
        <Reveal
          as="li"
          key={item.id}
          delay={index * 80}
          className={index === 0 ? 'lg:col-span-3' : 'lg:col-span-2'}
        >
          <TiltCard as="article" max={4} className="h-full rounded-xl">
            <div className="surface-card h-full rounded-xl p-6 sm:p-7">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-mono text-meta text-accent">{formatRange(item.period)}</p>
                  <Heading className="mt-2 font-display text-subheading font-semibold">
                    {item.qualification}
                  </Heading>
                  {item.field ? (
                    <p className="mt-0.5 font-medium text-ink-2">{item.field}</p>
                  ) : null}
                  <p className="mt-0.5 text-[0.9375rem] text-ink-3">{item.institution}</p>
                  {item.honours ? (
                    <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent">
                      <Award aria-hidden="true" className="size-4" strokeWidth={1.75} />
                      {item.honours}
                    </p>
                  ) : null}
                </div>
                <div className="flex items-center gap-3 sm:block">
                  <GradeRing grade={item.grade} />
                  <span className="sr-only">{item.grade}</span>
                </div>
              </div>

              {showCoursework && item.coursework ? (
                <div className="mt-6 border-t border-line pt-5">
                  <p className="font-mono text-meta text-ink-3 uppercase">Relevant coursework</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {item.coursework.map((course) => (
                      <li
                        key={course}
                        className="inline-flex min-h-8 items-center rounded-full border border-line bg-surface/70 px-3 text-[0.8125rem] text-ink-2"
                      >
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </TiltCard>
        </Reveal>
      ))}
    </ul>
  );
}
