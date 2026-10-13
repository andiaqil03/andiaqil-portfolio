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
    tint: 'var(--g-indigo)',
  },
  frontend: {
    Icon: LayoutTemplate,
    blurb: 'Responsive, component-based interfaces.',
    span: '',
    tint: 'var(--g-sky)',
  },
  languages: {
    Icon: Code2,
    blurb: 'What I write it all in.',
    span: '',
    tint: 'var(--g-fuchsia)',
  },
  'data-tools': {
    Icon: Database,
    blurb: 'Databases, tooling, quality and reporting.',
    span: 'lg:col-span-2',
    tint: 'var(--g-emerald)',
  },
};

/** Skills as a bento grid of tilting glass cards, then the whole stack in motion. */
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
            tint: 'var(--g-indigo)',
          };
          return (
            <Reveal as="li" key={group.id} delay={index * 80} className={cn('h-full', span)}>
              <TiltCard className="h-full rounded-xl">
                <div className="glass relative h-full overflow-hidden rounded-xl p-6">
                  <div
                    aria-hidden="true"
                    className="absolute -top-16 -right-16 size-48 rounded-full opacity-25 blur-2xl transition-opacity duration-500 group-hover/tilt:opacity-50"
                    style={{ background: tint }}
                  />
                  <span
                    className="relative inline-flex size-11 items-center justify-center rounded-md text-white shadow-md"
                    style={{
                      background: `linear-gradient(135deg, ${tint}, color-mix(in srgb, ${tint} 55%, #0a0f1f))`,
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
                      className="pulse-dot relative size-1.5 rounded-full bg-[#10b981]"
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
              className="flex items-center gap-8 pr-8 font-display text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-6xl"
            >
              {name}
              <span
                className="size-3 rounded-full"
                style={{ background: 'var(--gradient-aurora)' }}
              />
            </span>
          ))}
        </Marquee>
        <Marquee duration={54} reverse>
          {everything.slice(half).map((name) => (
            <span
              key={name}
              className="flex items-center gap-8 pr-8 font-display text-4xl font-semibold tracking-[-0.03em] text-transparent [-webkit-text-stroke:1.5px_var(--ink-3)] sm:text-6xl"
            >
              {name}
              <span className="size-3 rotate-45 rounded-[3px] border-2 border-ink-3" />
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
