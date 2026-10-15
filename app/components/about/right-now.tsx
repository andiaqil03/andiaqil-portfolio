import { BookOpen, BriefcaseBusiness, Laptop, Mountain } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';
import { experience } from '~/content/experience';
import { byRecent, outdoors } from '~/content/outdoors';
import { resolved } from '~/content/placeholder';
import { learning } from '~/content/skills';
import { techName } from '~/content/tech';
import { formatList, formatYearMonth } from '~/lib/format';
import { ArrowLink } from '../ui/action';
import { Reveal } from '../ui/reveal';
import { Section } from '../ui/section';

interface Item {
  label: string;
  value: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  tint: string;
  href?: string;
}

/** Derived from the content modules, so it stays current without editing. */
function items(): Item[] {
  const current = experience.filter((role) => role.period.end === 'present');
  const job = current.find((role) => role.kind !== 'Freelance');
  const freelance = current.find((role) => role.kind === 'Freelance');
  const hike = outdoors.activities
    .filter((activity) => activity.kind === 'Hiking' && resolved(activity.photos))
    .toSorted(byRecent)[0];
  const hikeTitle = hike ? resolved(hike.title) : undefined;

  const list: (Item | false | '' | undefined)[] = [
    job && {
      label: 'Working',
      value: `${job.role} at ${job.organizationShort}`,
      Icon: BriefcaseBusiness,
      tint: 'var(--pine)',
    },
    freelance && {
      label: 'On the side',
      value: 'Freelance web projects',
      Icon: Laptop,
      tint: 'var(--lake)',
    },
    learning.items.length > 0 && {
      label: 'Learning',
      value: formatList(learning.items.map(techName)),
      Icon: BookOpen,
      tint: 'var(--trail)',
    },
    hikeTitle && {
      label: 'Last hike',
      value: hike?.date ? `${hikeTitle}, ${formatYearMonth(hike.date)}` : hikeTitle,
      Icon: Mountain,
      tint: 'var(--pine)',
      href: '#outdoors',
    },
  ];
  return list.filter((item): item is Item => Boolean(item));
}

export function RightNow() {
  return (
    <Section
      id="now"
      kicker="Right now"
      title={
        <>
          What I’m <span className="text-accent">up to</span>
        </>
      }
      action={<ArrowLink to="/experience">Full experience</ArrowLink>}
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items().map(({ label, value, Icon, tint, href }, index) => {
          const body = (
            <>
              <span
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-md"
                style={{
                  background: `color-mix(in srgb, ${tint} 14%, var(--surface))`,
                  color: tint,
                }}
              >
                <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
              </span>
              <span>
                <span className="block font-mono text-meta text-ink-3 uppercase">{label}</span>
                <span className="mt-0.5 block font-medium text-ink">{value}</span>
              </span>
            </>
          );
          const className =
            'surface-card flex h-full items-start gap-4 rounded-xl p-5 transition-[border-color,translate] duration-300';
          return (
            <Reveal as="li" key={label} delay={index * 70}>
              {href ? (
                <a
                  href={href}
                  className={`${className} hover:-translate-y-0.5 hover:border-line-strong`}
                >
                  {body}
                </a>
              ) : (
                <div className={className}>{body}</div>
              )}
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
