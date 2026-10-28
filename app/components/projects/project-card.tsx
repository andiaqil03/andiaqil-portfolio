import { ArrowRight, ArrowUpRight, Zap } from 'lucide-react';
import { Link } from 'react-router';
import type { Project } from '~/content/types';
import { stackNames } from '~/lib/content';
import { cn } from '~/lib/cn';
import { formatYearMonth } from '~/lib/format';
import { TiltCard } from '../fx/tilt-card';
import { Tag, TechChips } from '../ui/tag';
import { projectTitleTransition } from './project-title';
import { ProjectVisual } from './project-visual';

/** Stretched link: the whole card is clickable, while the title stays the accessible name. */
function CardLink({ project }: { project: Project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      viewTransition
      className='outline-none after:absolute after:inset-0 after:z-20 after:rounded-[inherit] after:content-[""] focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent'
    >
      <span className="inline-block" style={projectTitleTransition(project.slug)}>
        {project.title}
      </span>
    </Link>
  );
}

function KeyCapability({ text }: { text: string }) {
  return (
    <p className="flex items-start gap-2 text-sm font-medium text-ink">
      <span className="mt-px inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
        <Zap aria-hidden="true" className="size-3" strokeWidth={2.25} />
      </span>
      <span>{text}</span>
    </p>
  );
}

function ViewProject() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex items-center gap-2 text-sm font-semibold whitespace-nowrap text-accent"
    >
      View project
      <span className="inline-flex size-7 items-center justify-center rounded-full bg-accent-soft transition-[background-color,color,translate] duration-300 ease-out-expo group-hover/tilt:translate-x-1 group-hover/tilt:bg-accent group-hover/tilt:text-on-accent">
        <ArrowRight className="size-3.5" strokeWidth={2.25} />
      </span>
    </span>
  );
}

const cardSurface =
  'surface-card relative flex h-full flex-col overflow-hidden transition-shadow duration-500 group-hover/tilt:shadow-lg';

/**
 * Product-style project card: name, visual, one-line description, technology,
 * key capability, "View project". Tilts toward the pointer. A `lead` card is
 * marked "Start here" and, when it has room, lays the visual beside the text.
 */
export function ProjectCard({
  project,
  index,
  lead,
  headingLevel: Heading = 'h3',
  className,
}: {
  project: Project;
  index?: number;
  lead?: boolean;
  headingLevel?: 'h2' | 'h3';
  className?: string;
}) {
  return (
    <TiltCard as="article" className={cn('h-full rounded-xl', lead && '@container', className)}>
      <div className={cn(cardSurface, 'rounded-xl', lead && '@3xl:flex-row')}>
        <div className={cn('flex flex-1 flex-col p-5 sm:p-6', lead && '@3xl:p-8')}>
          <div className="flex items-start justify-between gap-3">
            <Heading
              className={cn(
                'font-display text-subheading font-semibold',
                lead && '@3xl:text-4xl @3xl:tracking-[-0.01em]',
              )}
            >
              <CardLink project={project} />
            </Heading>
            <time
              dateTime={project.date}
              className="mt-1.5 shrink-0 font-mono text-meta text-ink-3"
            >
              {formatYearMonth(project.date)}
            </time>
          </div>
          <p className="mt-2 text-[0.9375rem] text-ink-2">{project.tagline}</p>
          <TechChips items={stackNames(project.stack)} className="mt-4" />
          <div className="mt-auto pt-5">
            <KeyCapability text={project.highlight} />
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <ViewProject />
              <span className="flex flex-wrap justify-end gap-2">
                {lead ? <Tag tone="accent">Start here</Tag> : null}
                {project.kind ? <Tag>{project.kind}</Tag> : null}
              </span>
            </div>
          </div>
        </div>
        <div
          className={cn(
            'relative order-first m-2 mb-0 overflow-hidden rounded-[calc(var(--radius-xl)-8px)]',
            lead && '@3xl:mr-0 @3xl:mb-2 @3xl:w-[58%] @3xl:shrink-0',
          )}
        >
          <ProjectVisual
            project={project}
            zoomOnHover
            className={cn('aspect-[16/10]', lead && '@3xl:h-full @3xl:min-h-[22rem]')}
          />
          {index !== undefined ? (
            <span
              aria-hidden="true"
              className="absolute top-3 left-4 font-display text-3xl font-bold text-transparent [-webkit-text-stroke:1px_var(--line-strong)]"
            >
              {String(index).padStart(2, '0')}
            </span>
          ) : null}
        </div>
      </div>
    </TiltCard>
  );
}

/** Closing card of the horizontal gallery. */
export function AllProjectsCard({ count, className }: { count: number; className?: string }) {
  return (
    <Link
      to="/projects"
      viewTransition
      className={cn(
        'group relative isolate flex flex-col justify-between overflow-hidden rounded-xl p-8 text-white shadow-lg',
        className,
      )}
    >
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-summit" />
      <span
        aria-hidden="true"
        className="topo absolute inset-0 -z-10 [--topo:rgb(255_255_255/0.1)]"
      />
      <span className="font-mono text-meta tracking-[0.12em] text-white/70 uppercase">Archive</span>
      <span>
        <span className="block font-display text-4xl font-semibold tracking-[-0.01em]">
          See all {count} projects
        </span>
        <span className="mt-6 inline-flex size-14 items-center justify-center rounded-full bg-white text-summit transition-transform duration-500 ease-out-expo group-hover:rotate-45">
          <ArrowUpRight aria-hidden="true" className="size-6" strokeWidth={2} />
        </span>
      </span>
    </Link>
  );
}

export function ProjectGrid({
  projects,
  headingLevel,
  className,
}: {
  projects: Project[];
  headingLevel?: 'h2' | 'h3';
  className?: string;
}) {
  return (
    <ul className={cn('grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3', className)}>
      {projects.map((project) => (
        <li key={project.slug} style={{ viewTransitionName: `card-${project.slug}` }}>
          <ProjectCard project={project} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
