import { useSearchParams } from 'react-router';
import { ContactPanel } from '~/components/contact/contact-panel';
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
    setParams(filter === 'all' ? {} : { category: filter }, {
      replace: true,
      preventScrollReset: true,
    });
  }

  return (
    <>
      <PageHeader
        title="Projects"
        lead="A researched final-year project, API-driven full-stack apps, an academic machine-learning study and a few smaller learning projects."
      />

      <Container className="pb-4">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8">
          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex flex-wrap gap-1.5"
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
                    'inline-flex h-10 items-center gap-2 rounded-md border px-3.5 text-sm font-medium transition-[background-color,border-color,color] duration-150',
                    pressed
                      ? 'border-accent bg-accent text-on-accent'
                      : 'border-line bg-surface text-ink-2 shadow-xs hover:border-line-strong hover:text-ink',
                  )}
                >
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
          <p role="status" className="text-sm text-ink-3">
            Showing {visible.length} of {allProjects.length}
          </p>
        </div>

        {featuredVisible ? (
          <Reveal>
            <FeaturedProjectCard project={featuredProject} headingLevel="h2" />
          </Reveal>
        ) : null}
        <ProjectGrid
          projects={others}
          headingLevel="h2"
          className={featuredVisible ? 'mt-6' : undefined}
        />
      </Container>

      <ContactPanel />
    </>
  );
}
