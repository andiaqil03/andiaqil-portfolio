/**
 * Shared view-transition name so a project's title morphs from its card or
 * row into the case-study heading when navigating.
 */
export function projectTitleTransition(slug: string) {
  return { viewTransitionName: `project-${slug}` };
}
