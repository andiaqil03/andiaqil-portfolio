import { resolved } from '~/content/placeholder';
import { projects } from '~/content/projects';
import { techName, type TechId } from '~/content/tech';
import type { Project, ProjectCategory } from '~/content/types';

export const categoryLabels: Record<ProjectCategory, string> = {
  'full-stack': 'Full-stack',
  backend: 'Backend',
  frontend: 'Frontend',
  'machine-learning': 'Machine learning',
};

export function isProjectCategory(value: string | null): value is ProjectCategory {
  return value !== null && value in categoryLabels;
}

/** Display order: the order in app/content/projects.ts. */
export const allProjects = projects;

/** Shown on the home page, in display order. */
export const selectedProjects = projects.filter((project) => project.selected);

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** The project after this one in display order, wrapping to the first. */
export function nextProject(project: Project): Project | undefined {
  if (allProjects.length < 2) return undefined;
  const index = allProjects.indexOf(project);
  return allProjects[(index + 1) % allProjects.length];
}

export function projectCategories(project: Project): ProjectCategory[] {
  return resolved(project.categories) ?? [];
}

export function stackNames(ids: TechId[]): string[] {
  return ids.map(techName);
}
