import { Code2, Database, LayoutTemplate, Server, Sprout } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';
import { learning, skillGroups } from '~/content/skills';
import { techName } from '~/content/tech';
import { cn } from '~/lib/cn';
import { Marquee } from '../fx/marquee';
import { TiltCard } from '../fx/tilt-card';
import { Reveal } from '../ui/reveal';

const meta: Record<
  string,
  { Icon: ComponentType<SVGProps<SVGSVGElement>>; blurb: string; span: string; tint: string }
> = {
  backend: {
    Icon: Server,
    blurb: 'Server-side applications and REST APIs.',
    span: 'lg:col-span-2',
    tint: 'var(--pine)',
  },
  frontend: {
    Icon: LayoutTemplate,
    blurb: 'Responsive, component-based interfaces.',
    span: '',
    tint: 'var(--lake)',
  },
  languages: {
    Icon: Code2,
    blurb: 'What I write it all in.',
    span: '',
    tint: 'var(--trail)',
  },
  'data-tools': {
    Icon: Database,
    blurb: 'Databases, tooling, quality and reporting.',
    span: 'lg:col-span-2',
    tint: 'var(--pine)',
  },
};

/** Small mountain peak used as the marquee separator. */
function Peak({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 12" aria-hidden="true" className={className} fill="currentColor">
      <path d="M0 12 6 2l3 4 2-3 5 9z" />
    </svg>
  );
}

/** Skills as a bento grid of tilting cards, then the whole stack in motion. */
export function SkillGroups() {
  const everything = skillGroups.flatMap((group) => group.items.map(techName));
  const half = Math.ceil(everything.length / 2);

  return (
    <div>
      <ul className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {skillGroups.map((group, index) => {
          const { Icon, blurb, span, tint } = meta[group.id] ?? {
            Icon: Code2,
            blurb: '',
            span: '',
            tint: 'var(--pine)',
          };
          return (
            <Reveal as="li" key={group.id} delay={index * 80} className={cn('h-full', span)}>
              <TiltCard className="h-full rounded-xl">
                <div className="surface-card relative h-full overflow-hidden rounded-xl p-6">
                  {/* A strip of contour lines along the top edge, tinted per category. */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-28 opacity-70 transition-opacity duration-500 [mask-image:linear-gradient(#000_30%,transparent)] group-hover/tilt:opacity-100"
                  >
                    {/* Native-scale contours: `cover` would shrink the lines to hairlines here. */}
                    <div
                      className="topo absolute inset-0"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${tint} 55%, transparent)`,
                        WebkitMaskSize: '1600px 1000px',
                        maskSize: '1600px 1000px',
                        WebkitMaskPosition: `${-index * 280}px -360px`,
                        maskPosition: `${-index * 280}px -360px`,
                      }}
                    />
                  </div>
                  <span
                    className="relative inline-flex size-11 items-center justify-center rounded-md"
                    style={{
                      background: `color-mix(in srgb, ${tint} 14%, var(--surface))`,
                      color: tint,
                    }}
                  >
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="relative mt-5 font-display text-subheading font-semibold">
                    {group.title}
                  </h3>
                  <p className="relative mt-1 text-sm text-ink-2">{blurb}</p>
                  <ul
                    className="relative mt-5 flex flex-wrap gap-2"
                    aria-label={`${group.title} skills`}
                  >
                    {group.items.map((id) => (
                      <li
                        key={id}
                        className="inline-flex h-8 items-center rounded-full border border-line bg-surface/70 px-3 font-mono text-meta font-medium text-ink-2 transition-colors duration-200 hover:border-line-strong hover:text-ink"
                      >
                        {techName(id)}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </Reveal>
          );
        })}

        {/* Fills the bento's last row: what's in progress, kept apart from proven skills. */}
        <Reveal as="li" delay={skillGroups.length * 80} className="h-full sm:col-span-2">
          <TiltCard className="h-full rounded-xl">
            <div className="relative h-full overflow-hidden rounded-xl border border-dashed border-line-strong p-6">
              <div
                aria-hidden="true"
                className="dot-grid absolute inset-0 opacity-60 [mask-image:linear-gradient(120deg,#000,transparent_70%)]"
              />
              <span className="relative inline-flex size-11 items-center justify-center rounded-md bg-accent-3-soft text-accent-3">
                <Sprout aria-hidden="true" className="size-5" strokeWidth={1.75} />
              </span>
              <h3 className="relative mt-5 font-display text-subheading font-semibold">
                {learning.title}
              </h3>
              <p className="relative mt-1 text-sm text-ink-2">
                Expanding into mobile, and exploring data engineering next.
              </p>
              <ul className="relative mt-5 flex flex-wrap gap-2" aria-label={learning.title}>
                {learning.items.map((id) => (
                  <li
                    key={id}
                    className="inline-flex h-8 items-center gap-2 rounded-full bg-accent-3-soft px-3 font-mono text-meta font-medium text-accent-3"
                  >
                    <span
                      aria-hidden="true"
                      className="pulse-dot relative size-1.5 rounded-full bg-trail"
                    />
                    {techName(id)}
                  </li>
                ))}
                <li className="inline-flex h-8 items-center rounded-full border border-line px-3 font-mono text-meta font-medium text-ink-2">
                  Data engineering
                </li>
              </ul>
            </div>
          </TiltCard>
        </Reveal>
      </ul>

      {/* The whole stack in motion (decorative; the cards above carry the content). */}
      <div aria-hidden="true" className="mt-16 -mx-4 space-y-4 sm:-mx-6 lg:-mx-8">
        <Marquee duration={48}>
          {everything.slice(0, half).map((name) => (
            <span
              key={name}
              className="flex items-center gap-8 pr-8 font-display text-4xl tracking-[-0.01em] text-ink uppercase sm:text-6xl"
            >
              {name}
              <Peak className="h-3 w-4 text-trail" />
            </span>
          ))}
        </Marquee>
        <Marquee duration={54} reverse>
          {everything.slice(half).map((name) => (
            <span
              key={name}
              className="flex items-center gap-8 pr-8 font-display text-4xl tracking-[-0.01em] text-transparent uppercase [-webkit-text-stroke:1.5px_var(--ink-3)] sm:text-6xl"
            >
              {name}
              <Peak className="h-3 w-4 text-pine" />
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
