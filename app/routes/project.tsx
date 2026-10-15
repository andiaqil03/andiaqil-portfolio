import { ContactLine } from '~/components/contact/contact-line';
import { NotFoundContent } from '~/components/layout/not-found-content';
import { CaseStudyBody, CaseStudyHero, NextProject } from '~/components/projects/case-study';
import { getProject, nextProject } from '~/lib/content';
import { pageMeta } from '~/lib/seo';
import type { Route } from './+types/project';

// No loader: project pages read straight from the content data, and every
// slug is prerendered (see react-router.config.ts).
export const meta: Route.MetaFunction = ({ params }) => {
  const project = getProject(params.slug);
  if (!project) return pageMeta({ title: 'Project not found', path: '/projects' });
  return pageMeta({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    type: 'article',
  });
};

export default function ProjectPage({ params }: Route.ComponentProps) {
  const project = getProject(params.slug);
  if (!project) return <NotFoundContent />;
  const next = nextProject(project);

  return (
    <>
      <CaseStudyHero project={project} />
      <CaseStudyBody project={project} />
      {next ? <NextProject project={next} /> : null}
      <ContactLine />
    </>
  );
}
