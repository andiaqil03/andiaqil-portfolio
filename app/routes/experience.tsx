import { ContactLine } from '~/components/contact/contact-line';
import { ExperienceTimeline } from '~/components/experience/experience-list';
import { WorkProcess } from '~/components/experience/work-process';
import { PageHeader } from '~/components/layout/page-header';
import { Container } from '~/components/ui/container';
import { experience } from '~/content/experience';
import { profile } from '~/content/profile';
import { pageMeta } from '~/lib/seo';
import type { Route } from './+types/experience';

export const meta: Route.MetaFunction = () =>
  pageMeta({
    title: 'Experience',
    path: '/experience',
    description: `${profile.name}'s experience: software engineer at MTechnix, freelance web development, a backend internship at TM R&D and a project-management role at PNB.`,
  });

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        kicker="Experience"
        title="Where I’ve"
        accent="delivered."
        lead="Building for clients at MTechnix, freelance on the side, and earlier roles at PNB and TM R&D."
      />
      <div>
        <Container className="max-w-[60rem] pt-4 pb-16 sm:pb-20 lg:pb-24">
          <ExperienceTimeline items={experience} />
        </Container>
      </div>
      <WorkProcess />
      <ContactLine />
    </>
  );
}
