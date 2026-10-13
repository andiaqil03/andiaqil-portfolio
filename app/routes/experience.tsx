import { ContactPanel } from '~/components/contact/contact-panel';
import { ExperienceTimeline } from '~/components/experience/experience-list';
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
    description: `${profile.name}'s experience: freelance software development, a backend internship at TM R&D building NestJS REST APIs, and a project-management role at PNB.`,
  });

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        title="Experience"
        lead="Freelance work delivering web applications for clients, a project-management role at PNB, and a backend internship building NestJS REST APIs at TM R&D."
      />
      <div className="border-t border-line">
        <Container className="max-w-[60rem] py-12 sm:py-16 lg:py-20">
          <ExperienceTimeline items={experience} />
        </Container>
      </div>
      <ContactPanel />
    </>
  );
}
