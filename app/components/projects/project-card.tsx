import { ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router';
import type { Project } from '~/content/types';
import { stackNames } from '~/lib/content';
import { cn } from '~/lib/cn';
import { formatYearMonth } from '~/lib/format';
import { List } from '../ui/list';
import { Tag, TechChips } from '../ui/tag';
import { projectTitleTransition } from './project-title';
import { ProjectVisual } from './project-visual';

const cardBase =
  'group relative flex flex-col overflow-hidden border border-line bg-surface shadow-xs transition-[translate,box-shadow,border-color] duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-line-strong hover:shadow-md focus-within:border-line-strong motion-reduce:hover:translate-y-0';

/** Stretched link: the whole card is clickable, while the title stays the accessible name. */
function CardLink({ project, className }: { project: Project; className?: string }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      viewTransition
      className={cn(
        'outline-none after:absolute after:inset-0 after:z-10 after:rounded-[inherit] after:content-[""] focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent',
        className,
      )}
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
      <Zap aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={1.75} />
      <span>{text}</span>
    </p>
  );
}

function ViewProject({ label = 'View project' }: { label?: string }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-accent"
    >
      {label}
      <ArrowRight
        className="size-4 transition-transform duration-200 ease-out-soft group-hover:translate-x-1"
        strokeWidth={2}
      />
    </span>
  );
}

/**
 * Product-style project card. Order of emphasis: name, visual, one-line
 * description, technology, key capability, "View project".
 */
export function ProjectCard({
  project,
  headingLevel: Heading = 'h3',
}: {
  project: Project;
  headingLevel?: 'h2' | 'h3';
}) {
  return (
    <article className={cn(cardBase, 'h-full rounded-lg')}>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <Heading className="text-subheading font-semibold">
            <CardLink project={project} />
          </Heading>
          <time dateTime={project.date} className="mt-1 shrink-0 font-mono text-meta text-ink-3">
            {formatYearMonth(project.date)}
          </time>
        </div>
        <p className="mt-2 text-[0.9375rem] text-ink-2">{project.tagline}</p>
        <TechChips items={stackNames(project.stack)} className="mt-4" />
        <div className="mt-auto pt-5">
          <KeyCapability text={project.highlight} />
          <div className="mt-4 flex items-center justify-between gap-3">
            <ViewProject />
            {project.kind ? <Tag>{project.kind}</Tag> : null}
          </div>
        </div>
      </div>
      <ProjectVisual
        project={project}
        zoomOnHover
        className="order-first aspect-[16/10] border-b border-line"
      />
    </article>
  );
}

/** The large FocusPro card: visual and story side by side from 1024px. */
export function FeaturedProjectCard({
  project,
  headingLevel: Heading = 'h3',
}: {
  project: Project;
  headingLevel?: 'h2' | 'h3';
}) {
  return (
    <article className={cn(cardBase, 'rounded-xl lg:grid lg:grid-cols-12 hover:shadow-lg')}>
      <div className="flex flex-col p-6 sm:p-8 lg:col-span-5 lg:p-10">
        <div className="flex flex-wrap items-center gap-2">
          <Tag tone="accent">Featured project</Tag>
          {project.kind ? <Tag>{project.kind}</Tag> : null}
        </div>
        <Heading className="mt-5 text-title font-semibold">
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
      <ProjectVisual
        project={project}
        zoomOnHover
        priority
        className="order-first aspect-[16/10] border-b border-line lg:col-span-7 lg:aspect-auto lg:min-h-[26rem] lg:border-r lg:border-b-0"
      />
    </article>
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
    <ul className={cn('grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3', className)}>
      {projects.map((project) => (
        <li key={project.slug}>
          <ProjectCard project={project} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
