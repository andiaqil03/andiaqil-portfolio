import { ContactPanel } from '~/components/contact/contact-panel';
import { ExperienceSummary } from '~/components/experience/experience-list';
import { ScrubText } from '~/components/fx/scrub-text';
import { Hero } from '~/components/home/hero';
import { OffTheTrail } from '~/components/home/off-the-trail';
import { ProjectShowcase } from '~/components/projects/project-showcase';
import { SkillGroups } from '~/components/skills/skill-groups';
import { ArrowLink } from '~/components/ui/action';
import { Container } from '~/components/ui/container';
import { Section } from '~/components/ui/section';
import { experience } from '~/content/experience';
import { featuredProject, selectedProjects } from '~/lib/content';
import { pageMeta, personJsonLd } from '~/lib/seo';
import type { Route } from './+types/home';

export const meta: Route.MetaFunction = () => [
  ...pageMeta({ path: '/', type: 'profile' }),
  personJsonLd(),
];

export default function Home() {
  return (
    <>
      <Hero />

      <OffTheTrail />

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
            text="I’m a software engineer, passionate about modern technology. Outside of work, I’m into sports. Jack of all trades, master of none."
            highlight={['technology.', 'sports.', 'jack']}
          />
          <ArrowLink to="/about" className="mt-10">
            More about me
          </ArrowLink>
        </Container>
      </section>

      <ProjectShowcase featured={featuredProject} projects={selectedProjects} />

      <Section
        id="skills"
        kicker="Gear"
        title={
          <>
            The stack I <span className="text-accent">build with</span>
          </>
        }
        description="Front end to back end."
      >
        <SkillGroups />
      </Section>

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

      <ContactPanel />
    </>
  );
}
