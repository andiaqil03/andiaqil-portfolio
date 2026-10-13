import { ArrowRight, ArrowUpRight, Zap } from 'lucide-react';
import { Link } from 'react-router';
import type { Project } from '~/content/types';
import { stackNames } from '~/lib/content';
import { cn } from '~/lib/cn';
import { formatYearMonth } from '~/lib/format';
import { TiltCard } from '../fx/tilt-card';
import { List } from '../ui/list';
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

function ViewProject({ label = 'View project' }: { label?: string }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex items-center gap-2 text-sm font-semibold text-accent"
    >
      {label}
      <span className="inline-flex size-7 items-center justify-center rounded-full bg-accent-soft transition-[background-color,color,translate] duration-300 ease-out-expo group-hover/tilt:translate-x-1 group-hover/tilt:bg-accent group-hover/tilt:text-white">
        <ArrowRight className="size-3.5" strokeWidth={2.25} />
      </span>
    </span>
  );
}

const cardSurface =
  'glass relative flex h-full flex-col overflow-hidden transition-shadow duration-500 group-hover/tilt:shadow-lg';

/**
 * Product-style project card: name, visual, one-line description, technology,
 * key capability, "View project". Tilts toward the pointer.
 */
export function ProjectCard({
  project,
  index,
  headingLevel: Heading = 'h3',
  className,
}: {
  project: Project;
  index?: number;
  headingLevel?: 'h2' | 'h3';
  className?: string;
}) {
  return (
    <TiltCard as="article" className={cn('h-full rounded-xl', className)}>
      <div className={cn(cardSurface, 'rounded-xl')}>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <Heading className="font-display text-subheading font-semibold">
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
            <div className="mt-5 flex items-center justify-between gap-3">
              <ViewProject />
              {project.kind ? <Tag>{project.kind}</Tag> : null}
            </div>
          </div>
        </div>
        <div className="relative order-first m-2 mb-0 overflow-hidden rounded-[calc(var(--radius-xl)-8px)]">
          <ProjectVisual project={project} zoomOnHover className="aspect-[16/10]" />
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

/** The large FocusPro card: visual and story side by side from 1024px. */
export function FeaturedProjectCard({
  project,
  headingLevel: Heading = 'h3',
  className,
}: {
  project: Project;
  headingLevel?: 'h2' | 'h3';
  className?: string;
}) {
  return (
    <TiltCard as="article" max={3} className={cn('rounded-xl', className)}>
      <div className={cn(cardSurface, 'ring-gradient rounded-xl lg:grid lg:grid-cols-12')}>
        <div className="flex flex-col p-6 sm:p-8 lg:col-span-5 lg:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <Tag tone="accent">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full"
                style={{ background: 'var(--gradient-aurora)' }}
              />
              Featured project
            </Tag>
            {project.kind ? <Tag>{project.kind}</Tag> : null}
          </div>
          <Heading className="mt-5 font-display text-title font-semibold">
            <CardLink project={project} />
          </Heading>
          <p className="mt-3 text-lead text-ink-2">{project.tagline}</p>
          <TechChips items={stackNames(project.stack)} className="mt-5" />
          {project.keyPoints ? (
            <List items={project.keyPoints} marker="check" className="mt-6 text-[0.9375rem]" />
          ) : null}
          <div className="mt-auto flex items-center justify-between gap-4 pt-8">
            <ViewProject label="Read the case study" />
            <time dateTime={project.date} className="font-mono text-meta text-ink-3">
              {formatYearMonth(project.date)}
            </time>
          </div>
        </div>
        <div className="order-first m-2 overflow-hidden rounded-[calc(var(--radius-xl)-8px)] lg:col-span-7 lg:mr-0">
          <ProjectVisual
            project={project}
            zoomOnHover
            priority
            className="aspect-[16/10] h-full lg:aspect-auto lg:min-h-[24rem]"
          />
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
        'group relative flex flex-col justify-between overflow-hidden rounded-xl p-8 text-white shadow-lg',
        className,
      )}
    >
      <span aria-hidden="true" className="bg-brand is-animated absolute inset-0 -z-10" />
      <span aria-hidden="true" className="dot-grid absolute inset-0 -z-10 opacity-40" />
      <span className="font-mono text-meta tracking-[0.12em] text-white/70 uppercase">Archive</span>
      <span>
        <span className="block font-display text-4xl font-semibold tracking-[-0.04em]">
          See all {count} projects
        </span>
        <span className="mt-6 inline-flex size-14 items-center justify-center rounded-full bg-white text-[#0a0f1f] transition-transform duration-500 ease-out-expo group-hover:rotate-45">
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
