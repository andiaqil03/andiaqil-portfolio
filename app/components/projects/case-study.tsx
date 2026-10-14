import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router';
import { isPlaceholder, resolved, type Placeholder } from '~/content/placeholder';
import type { Block, CaseStudySection, Project } from '~/content/types';
import { stackNames } from '~/lib/content';
import { cn } from '~/lib/cn';
import { formatYearMonth } from '~/lib/format';
import { gsap, prefersReducedMotion, useGSAP } from '~/lib/gsap';
import { SplitText } from '../fx/split-text';
import { TiltCard } from '../fx/tilt-card';
import { Action } from '../ui/action';
import { Container } from '../ui/container';
import { PlaceholderNote } from '../ui/placeholder-note';
import { Reveal } from '../ui/reveal';
import { Tag, TechChips } from '../ui/tag';
import { CaseStudyBlock } from './case-study-blocks';
import { projectTitleTransition } from './project-title';
import { ProjectVisual } from './project-visual';

const at = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export function CaseStudyHero({ project }: { project: Project }) {
  const repo = resolved(project.links.repo);
  const live = resolved(project.links.live);
  const hasLinks = Boolean(repo || live);
  const visual = useRef<HTMLDivElement>(null);

  // The visual drifts up and sharpens as you scroll past it.
  useGSAP(
    () => {
      if (!visual.current || prefersReducedMotion()) return;
      gsap.fromTo(
        visual.current,
        { yPercent: 6, scale: 0.94, rotateX: 8 },
        {
          yPercent: -4,
          scale: 1,
          rotateX: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: visual.current,
            start: 'top bottom',
            end: 'bottom 30%',
            scrub: 0.8,
          },
        },
      );
    },
    { scope: visual },
  );

  return (
    <header className="relative isolate">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[70vh] [mask-image:radial-gradient(70%_80%_at_80%_0%,#000_15%,transparent_75%)]"
      >
        <div className="topo absolute inset-0" />
      </div>
      <Container className="pt-28 sm:pt-32 lg:pt-36">
        <Link
          to="/projects"
          viewTransition
          className="anim-rise group -ml-1 inline-flex min-h-11 items-center gap-2 rounded-full px-1 text-[0.9375rem] font-medium text-ink-2 transition-colors hover:text-ink"
          style={at(0)}
        >
          <ArrowLeft
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
            strokeWidth={2}
          />
          All projects
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <div className="anim-rise flex flex-wrap items-center gap-2" style={at(60)}>
              {project.featured ? <Tag tone="accent">Featured project</Tag> : null}
              {project.kind ? <Tag>{project.kind}</Tag> : null}
              <Tag tone="outline">
                <time dateTime={project.date}>{formatYearMonth(project.date)}</time>
              </Tag>
            </div>
            <h1
              className="mt-5 font-display text-[clamp(2.75rem,1.6rem+5vw,6rem)] leading-[0.95] font-semibold tracking-[-0.01em]"
              style={projectTitleTransition(project.slug)}
            >
              <SplitText text={project.title} delay={120} stagger={32} />
            </h1>
            <p className="anim-rise mt-5 max-w-[56ch] text-lead text-ink-2" style={at(420)}>
              {project.tagline}
            </p>
          </div>

          <div className="anim-rise lg:col-span-5" style={at(520)}>
            <dl className="surface-card grid gap-4 rounded-xl p-5 sm:p-6">
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

        <div className="mt-12 [perspective:1400px] lg:mt-16">
          <div ref={visual} className="anim-rise origin-top" style={at(640)}>
            <div className="surface-card overflow-hidden rounded-xl p-2 shadow-lg">
              <ProjectVisual
                project={project}
                priority
                className="aspect-[16/10] rounded-[calc(var(--radius-xl)-8px)] sm:aspect-[16/8]"
              />
            </div>
          </div>
        </div>
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

/** The id of the section currently being read, for the table of contents. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? '');
  // A stable key, so the observer is only rebuilt when the sections change.
  const key = ids.join('|');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    key.split('|').forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [key]);
  return active;
}

export function CaseStudyBody({ project }: { project: Project }) {
  const sections = visibleSections(project);
  const ids = sections.map(({ section }) => section.id);
  const active = useActiveSection(ids);
  const activeIndex = Math.max(0, ids.indexOf(active));

  return (
    <Container className="grid gap-y-10 py-20 sm:py-24 lg:grid-cols-12 lg:gap-x-12 lg:py-32">
      <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
        <div className="surface-card sticky top-28 rounded-xl p-5">
          <p className="font-mono text-meta text-ink-3 uppercase">On this page</p>
          <ol className="relative mt-4 grid gap-0.5">
            <span aria-hidden="true" className="absolute top-0 bottom-0 left-0 w-px bg-line" />
            <span
              aria-hidden="true"
              className="absolute left-0 w-[3px] -translate-x-px rounded-full transition-[top] duration-500 ease-out-expo"
              style={{
                top: `${activeIndex * 2.125}rem`,
                height: '2.125rem',
                background: 'var(--trail)',
              }}
            />
            {sections.map(({ section }) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={section.id === active ? 'true' : undefined}
                  className={cn(
                    'block h-[2.125rem] truncate pl-4 text-sm leading-[2.125rem] transition-colors',
                    section.id === active ? 'font-medium text-ink' : 'text-ink-2 hover:text-ink',
                  )}
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      <div className="min-w-0 lg:col-span-9">
        {sections.map(({ section, items }, index) => (
          <Reveal
            as="section"
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-heading`}
            className="scroll-mt-28 border-t border-line py-14 first:border-t-0 first:pt-0 last:pb-0 sm:py-16"
          >
            <p aria-hidden="true" className="font-mono text-meta text-accent">
              {String(index + 1).padStart(2, '0')}
            </p>
            <h2
              id={`${section.id}-heading`}
              className="mt-2 font-display text-section font-semibold"
            >
              {section.title}
            </h2>
            {section.intro ? <p className="mt-3 text-lead text-ink-2">{section.intro}</p> : null}
            <div className="mt-8 grid gap-6">
              {items.map((item, i) =>
                isPlaceholder(item) ? (
                  <PlaceholderNote key={i} note={item.todo} className="w-fit" />
                ) : (
                  <CaseStudyBlock key={i} block={item} />
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
    <section aria-labelledby="next-project-heading" className="relative">
      <Container className="py-16 sm:py-20">
        <Reveal>
          <p
            id="next-project-heading"
            className="inline-flex items-center gap-2 font-mono text-meta tracking-[0.12em] text-ink-3 uppercase"
          >
            <span aria-hidden="true" className="blaze" />
            Next project
          </p>
          <TiltCard max={3} className="mt-5 rounded-xl">
            <Link
              to={`/projects/${project.slug}`}
              viewTransition
              className="surface-card group grid overflow-hidden rounded-xl transition-shadow duration-500 hover:shadow-lg sm:grid-cols-12"
            >
              <span className="flex flex-col justify-center p-6 sm:col-span-6 sm:p-10">
                <span
                  className="font-display text-[clamp(2.25rem,1.4rem+3.5vw,4.5rem)] leading-[0.95] font-semibold tracking-[-0.01em]"
                  style={projectTitleTransition(project.slug)}
                >
                  {project.title}
                </span>
                <span className="mt-3 text-lead text-ink-2">{project.tagline}</span>
                <span className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-accent">
                  View project
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-accent-soft transition-[background-color,color,rotate] duration-500 ease-out-expo group-hover:rotate-45 group-hover:bg-accent group-hover:text-on-accent">
                    <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={2.25} />
                  </span>
                </span>
              </span>
              <span className="order-first m-2 overflow-hidden rounded-[calc(var(--radius-xl)-8px)] sm:order-none sm:col-span-6 sm:ml-0">
                <ProjectVisual project={project} zoomOnHover className="aspect-[16/10] h-full" />
              </span>
            </Link>
          </TiltCard>
        </Reveal>
      </Container>
    </section>
  );
}
