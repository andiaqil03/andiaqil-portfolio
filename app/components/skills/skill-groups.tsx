import { Code2, Database, LayoutTemplate, Server, Sprout } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';
import { learning, skillGroups } from '~/content/skills';
import { techName } from '~/content/tech';
import { Reveal } from '../ui/reveal';

const icons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  backend: Server,
  frontend: LayoutTemplate,
  languages: Code2,
  'data-tools': Database,
};

/** Compact skill categories: one small card each, names separated by dots. */
export function SkillGroups() {
  return (
    <div>
      <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {skillGroups.map((group, index) => {
          const Icon = icons[group.id] ?? Code2;
          return (
            <Reveal as="li" key={group.id} delay={index * 70} className="h-full">
              <div className="h-full rounded-lg border border-line bg-surface p-5 shadow-xs sm:p-6">
                <h3 className="flex items-center gap-2.5 font-semibold">
                  <span className="inline-flex size-8 items-center justify-center rounded-md bg-accent-soft text-accent">
                    <Icon aria-hidden="true" className="size-4" strokeWidth={1.75} />
                  </span>
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-y-1 text-[0.9375rem] text-ink-2">
                  {group.items.map((id, i) => (
                    <li key={id} className="whitespace-nowrap">
                      {techName(id)}
                      {i < group.items.length - 1 ? (
                        <span aria-hidden="true" className="mx-2 text-line-strong">
                          ·
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </ul>
      <p className="mt-6 flex flex-wrap items-center gap-2 text-[0.9375rem] text-ink-2">
        <Sprout aria-hidden="true" className="size-4 text-accent-2" strokeWidth={1.75} />
        <span className="font-medium text-ink">{learning.title}:</span>
        {learning.items.map(techName).join(', ')}
      </p>
    </div>
  );
}
