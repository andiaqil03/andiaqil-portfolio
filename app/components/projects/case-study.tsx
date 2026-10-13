import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { isPlaceholder, resolved, type Placeholder } from '~/content/placeholder';
import type { Block, CaseStudySection, Project } from '~/content/types';
import { stackNames } from '~/lib/content';
import { formatYearMonth } from '~/lib/format';
import { Action } from '../ui/action';
import { Container } from '../ui/container';
import { PlaceholderNote } from '../ui/placeholder-note';
import { Reveal } from '../ui/reveal';
import { Tag, TechChips } from '../ui/tag';
import { CaseStudyBlock } from './case-study-blocks';
import { projectTitleTransition } from './project-title';
import { ProjectVisual } from './project-visual';

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export function CaseStudyHero({ project }: { project: Project }) {
  const repo = resolved(project.links.repo);
  const live = resolved(project.links.live);
  const hasLinks = Boolean(repo || live);

  return (
    <header>
      <Container className="pt-8 sm:pt-10 lg:pt-12">
        <Link
          to="/projects"
          viewTransition
          className="group -ml-1 inline-flex min-h-11 items-center gap-2 rounded-md px-1 text-[0.9375rem] font-medium text-ink-2 transition-colors hover:text-ink"
        >
          <ArrowLeft
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover:-translate-x-1"
            strokeWidth={2}
          />
          All projects
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              {project.featured ? <Tag tone="accent">Featured project</Tag> : null}
              {project.kind ? <Tag>{project.kind}</Tag> : null}
              <Tag tone="outline">
                <time dateTime={project.date}>{formatYearMonth(project.date)}</time>
              </Tag>
            </div>
            <h1
              className="mt-5 text-title font-semibold"
              style={projectTitleTransition(project.slug)}
            >
              {project.title}
            </h1>
            <p className="mt-4 max-w-[56ch] text-lead text-ink-2">{project.tagline}</p>
          </div>

          <div className="lg:col-span-5">
            <dl className="grid gap-4 rounded-lg border border-line bg-surface p-5 shadow-xs">
              {project.stack.length > 0 ? (
                <div>
                  <dt className="font-mono text-meta text-ink-3 uppercase">Built with</dt>
                  <dd className="mt-2">
                    <TechChips items={stackNames(project.stack)} />
                  </dd>
                </div>
              ) : null}
              <div>
                <dt className="font-mono text-meta text-ink-3 uppercase">Key capability</dt>
                <dd className="mt-1.5 font-medium">{project.highlight}</dd>
              </div>
              {hasLinks ? (
                <div className="flex flex-wrap gap-2 border-t border-line pt-4">
                  {repo ? (
                    <Action href={repo} external variant="secondary" size="sm">
                      Source code
                    </Action>
                  ) : null}
                  {live ? (
                    <Action href={live} external size="sm">
                      Live demo
                    </Action>
                  ) : null}
                </div>
              ) : import.meta.env.DEV ? (
                <PlaceholderNote note="Repository and/or live demo URL" />
              ) : null}
            </dl>
          </div>
        </div>

        <ProjectVisual
          project={project}
          priority
          className="mt-10 aspect-[16/10] rounded-xl border border-line shadow-md sm:aspect-[16/8] lg:mt-14"
        />
      </Container>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Body                                                                */
/* ------------------------------------------------------------------ */

type Item = Block | Placeholder;

interface VisibleSection {
  section: CaseStudySection;
  items: Item[];
}

/**
 * In production, anything still waiting for content is left out: whole
 * placeholder sections, placeholder blocks, and sections left empty by that.
 */
function visibleSections(project: Project): VisibleSection[] {
  const dev = import.meta.env.DEV;
  return project.sections.flatMap<VisibleSection>((section) => {
    if (isPlaceholder(section.content)) {
      return dev ? [{ section, items: [section.content] }] : [];
    }
    const items = dev ? section.content : section.content.filter((item) => !isPlaceholder(item));
    return items.length > 0 ? [{ section, items }] : [];
  });
}

export function CaseStudyBody({ project }: { project: Project }) {
  const sections = visibleSections(project);

  return (
    <Container className="grid gap-y-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-x-10 lg:py-24">
      <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
        <div className="sticky top-24">
          <p className="font-mono text-meta text-ink-3 uppercase">On this page</p>
          <ol className="mt-4 grid gap-0.5 border-l border-line">
            {sections.map(({ section }) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-ink-2 transition-colors hover:border-accent hover:text-ink"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      <div className="min-w-0 lg:col-span-9">
        {sections.map(({ section, items }) => (
          <Reveal
            as="section"
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-heading`}
            className="scroll-mt-24 border-t border-line py-12 first:border-t-0 first:pt-0 last:pb-0 sm:py-14"
          >
            <h2 id={`${section.id}-heading`} className="text-section font-semibold">
              {section.title}
            </h2>
            {section.intro ? <p className="mt-3 text-lead text-ink-2">{section.intro}</p> : null}
            <div className="mt-6 grid gap-6">
              {items.map((item, index) =>
                isPlaceholder(item) ? (
                  <PlaceholderNote key={index} note={item.todo} className="w-fit" />
                ) : (
                  <CaseStudyBlock key={index} block={item} />
                ),
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}

/* ------------------------------------------------------------------ */
/* Next project                                                        */
/* ------------------------------------------------------------------ */

export function NextProject({ project }: { project: Project }) {
  return (
    <section aria-labelledby="next-project-heading" className="border-t border-line">
      <Container className="py-16 sm:py-20">
        <Reveal>
          <p id="next-project-heading" className="font-mono text-meta text-ink-3 uppercase">
            Next project
          </p>
          <Link
            to={`/projects/${project.slug}`}
            viewTransition
            className="group mt-4 grid overflow-hidden rounded-xl border border-line bg-surface shadow-xs transition-[translate,box-shadow,border-color] duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-line-strong hover:shadow-md sm:grid-cols-12 motion-reduce:hover:translate-y-0"
          >
            <div className="flex flex-col justify-center p-6 sm:col-span-7 sm:p-8">
              <span
                className="text-section font-semibold"
                style={projectTitleTransition(project.slug)}
              >
                {project.title}
              </span>
              <span className="mt-2 text-ink-2">{project.tagline}</span>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                View project
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </span>
            </div>
            <ProjectVisual
              project={project}
              zoomOnHover
              className="order-first aspect-[16/9] border-b border-line sm:order-none sm:col-span-5 sm:aspect-auto sm:min-h-56 sm:border-b-0 sm:border-l"
            />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
