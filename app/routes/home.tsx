import { ContactPanel } from '~/components/contact/contact-panel';
import { ExperienceSummary } from '~/components/experience/experience-list';
import { ScrubText } from '~/components/fx/scrub-text';
import { Hero } from '~/components/home/hero';
import { OffTheTrail } from '~/components/home/off-the-trail';
import { ProjectShowcase } from '~/components/projects/project-showcase';
import { ArrowLink } from '~/components/ui/action';
import { Container } from '~/components/ui/container';
import { Section } from '~/components/ui/section';
import { experience } from '~/content/experience';
import { selectedProjects } from '~/lib/content';
import { pageMeta, personJsonLd } from '~/lib/seo';
import type { Route } from './+types/home';

export const meta: Route.MetaFunction = () => [
  ...pageMeta({ path: '/', type: 'profile' }),
  personJsonLd(),
];

/**
 * Home is a preview: one short taste of each area, each linking to the page
 * that owns it (Projects, About, Experience). Work first, personality last.
 */
export default function Home() {
  return (
    <>
      <Hero />

      <ProjectShowcase projects={selectedProjects} />

      {/* About: one short statement that lights up as you read it. */}
      <section
        id="about"
        aria-labelledby="about-heading"
        className="relative py-20 sm:py-24 lg:py-32"
      >
        <Container>
          <h2 id="about-heading" className="sr-only">
            About
          </h2>
          <p className="mb-8 inline-flex items-center gap-2 font-mono text-meta tracking-[0.12em] text-ink-3 uppercase">
            <span aria-hidden="true" className="blaze" />
            About
          </p>
          <ScrubText
            className="max-w-5xl text-[clamp(1.75rem,1.1rem+2.6vw,3.5rem)] leading-[1.12] font-semibold tracking-[-0.01em]"
            text="I build full-stack web apps for clients at MTechnix and freelance on the side. Outside of work, I hike, travel and play sport."
            highlight={['full-stack', 'hike,', 'sport.']}
          />
          <ArrowLink to="/about" className="mt-10">
            More about me
          </ArrowLink>
        </Container>
      </section>

      <Section
        id="experience"
        kicker="The route"
        title={
          <>
            Where I’ve <span className="text-accent">worked</span>
          </>
        }
        action={<ArrowLink to="/experience">Full experience</ArrowLink>}
      >
        <div className="max-w-4xl">
          <ExperienceSummary items={experience} />
        </div>
      </Section>

      <OffTheTrail limit={3} action={<ArrowLink to="/about#outdoors">More adventures</ArrowLink>} />

      <ContactPanel />
    </>
  );
}
