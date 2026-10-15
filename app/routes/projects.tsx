import { useSearchParams } from 'react-router';
import { ContactLine } from '~/components/contact/contact-line';
import { PageHeader } from '~/components/layout/page-header';
import { FeaturedProjectCard, ProjectGrid } from '~/components/projects/project-card';
import { Reveal } from '~/components/ui/reveal';
import { Container } from '~/components/ui/container';
import type { ProjectCategory } from '~/content/types';
import { useHydrated } from '~/hooks/use-hydrated';
import {
  allProjects,
  categoryLabels,
  featuredProject,
  isProjectCategory,
  projectCategories,
} from '~/lib/content';
import { cn } from '~/lib/cn';
import { pageMeta } from '~/lib/seo';
import type { Route } from './+types/projects';

export const meta: Route.MetaFunction = () =>
  pageMeta({
    title: 'Projects',
    path: '/projects',
    description:
      'Full-stack, backend, frontend and machine-learning projects: FocusPro, What’s Cooking, AquaBoost and more, each with a write-up.',
  });

type Filter = ProjectCategory | 'all';

interface FilterOption {
  id: Filter;
  label: string;
  count: number;
}

const options: FilterOption[] = [
  { id: 'all', label: 'All', count: allProjects.length },
  ...(Object.keys(categoryLabels) as ProjectCategory[]).map((id) => ({
    id,
    label: categoryLabels[id],
    count: allProjects.filter((project) => projectCategories(project).includes(id)).length,
  })),
];

// Hide categories with no projects yet.
const filters = options.filter((option) => option.count > 0);

export default function Projects() {
  const [params, setParams] = useSearchParams();
  // The prerendered page shows every project; the URL filter applies once hydrated.
  const hydrated = useHydrated();
  const requested = params.get('category');
  const active: Filter = hydrated && isProjectCategory(requested) ? requested : 'all';

  const visible =
    active === 'all'
      ? allProjects
      : allProjects.filter((project) => projectCategories(project).includes(active));

  const featuredVisible = visible.includes(featuredProject);
  const others = visible.filter((project) => project !== featuredProject);

  function select(filter: Filter) {
    // Cards glide to their new places; the page itself doesn't wipe.
    const root = document.documentElement;
    root.classList.add('vt-filter');
    window.setTimeout(() => root.classList.remove('vt-filter'), 900);
    setParams(filter === 'all' ? {} : { category: filter }, {
      replace: true,
      preventScrollReset: true,
      viewTransition: true,
    });
  }

  return (
    <>
      <PageHeader
        kicker="Work"
        title="Projects"
        accent="I’ve built"
        lead="A researched final-year project, API-driven full-stack apps, an academic machine-learning study and a few smaller learning projects."
      />

      <Container className="pb-4">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-10">
          <div
            role="group"
            aria-label="Filter projects by category"
            className="surface-card inline-flex max-w-full flex-wrap gap-1 rounded-[1.75rem] p-1.5"
          >
            {filters.map((filter) => {
              const pressed = active === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => select(filter.id)}
                  className={cn(
                    'relative isolate inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors duration-200',
                    pressed ? 'text-on-accent' : 'text-ink-2 hover:text-ink',
                  )}
                >
                  {pressed ? (
                    <span
                      aria-hidden="true"
                      className="bg-accent absolute inset-0 -z-10 rounded-full shadow-md"
                      style={{ viewTransitionName: 'filter-pill' }}
                    />
                  ) : null}
                  {filter.label}
                  <span
                    className={cn(
                      'font-mono text-meta tabular',
                      pressed ? 'text-on-accent/80' : 'text-ink-3',
                    )}
                  >
                    {filter.count}
                  </span>
                </button>
              );
            })}
          </div>
          <p role="status" className="font-mono text-meta text-ink-3">
            Showing {visible.length} of {allProjects.length}
          </p>
        </div>

        {featuredVisible ? (
          <div style={{ viewTransitionName: `card-${featuredProject.slug}` }}>
            <Reveal>
              <FeaturedProjectCard project={featuredProject} headingLevel="h2" />
            </Reveal>
          </div>
        ) : null}
        <ProjectGrid
          projects={others}
          headingLevel="h2"
          className={featuredVisible ? 'mt-6' : undefined}
        />
      </Container>

      <ContactLine />
    </>
  );
}
