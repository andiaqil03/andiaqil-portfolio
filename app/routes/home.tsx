import { Handshake, Layers, Server } from 'lucide-react';
import { ContactPanel } from '~/components/contact/contact-panel';
import { EducationList } from '~/components/education/education-list';
import { ExperienceSummary } from '~/components/experience/experience-list';
import { ScrubText } from '~/components/fx/scrub-text';
import { TiltCard } from '~/components/fx/tilt-card';
import { Hero } from '~/components/home/hero';
import { OffTheTrail } from '~/components/home/off-the-trail';
import { ProfileCard } from '~/components/home/profile-card';
import { StatsBand } from '~/components/home/stats-band';
import { ProjectShowcase } from '~/components/projects/project-showcase';
import { SkillGroups } from '~/components/skills/skill-groups';
import { ArrowLink } from '~/components/ui/action';
import { Container } from '~/components/ui/container';
import { Reveal } from '~/components/ui/reveal';
import { Section } from '~/components/ui/section';
import { education } from '~/content/education';
import { experience } from '~/content/experience';
import { featuredProject, selectedProjects } from '~/lib/content';
import { pageMeta, personJsonLd } from '~/lib/seo';
import type { Route } from './+types/home';

export const meta: Route.MetaFunction = () => [
  ...pageMeta({ path: '/', type: 'profile' }),
  personJsonLd(),
];

// What I do, each backed by a real role or project.
const pillars = [
  {
    icon: Server,
    title: 'Backend development',
    text: 'REST APIs in NestJS, API performance work and code-quality fixes from my internship at TM R&D.',
    tint: 'var(--pine)',
  },
  {
    icon: Layers,
    title: 'Full-stack web apps',
    text: 'Full-stack projects with Laravel, NestJS with Angular, and .NET, plus React frontends.',
    tint: 'var(--lake)',
  },
  {
    icon: Handshake,
    title: 'Client delivery',
    text: 'Freelance projects taken from gathering requirements through user testing to production.',
    tint: 'var(--trail)',
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBand />

      {/* About: a statement that lights up as you read it, then the evidence. */}
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
            text="I build backend services and full-stack web applications: REST APIs in NestJS, interfaces in Angular and React, and client projects taken from first requirements all the way to production."
            highlight={['backend', 'full-stack', 'production.']}
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <ProfileCard />
            </Reveal>
            <ul className="grid gap-5 lg:col-span-7">
              {pillars.map(({ icon: Icon, title, text, tint }, index) => (
                <Reveal as="li" key={title} delay={index * 90}>
                  <TiltCard max={4} className="rounded-xl">
                    <div className="surface-card flex gap-5 rounded-xl p-5 sm:p-6">
                      <span
                        className="inline-flex size-12 shrink-0 items-center justify-center rounded-md"
                        style={{
                          background: `color-mix(in srgb, ${tint} 14%, var(--surface))`,
                          color: tint,
                        }}
                      >
                        <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                      </span>
                      <div>
                        <h3 className="font-display text-subheading font-semibold">{title}</h3>
                        <p className="mt-1.5 text-[0.9375rem] text-ink-2">{text}</p>
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
              <li>
                <ArrowLink to="/about">More about me</ArrowLink>
              </li>
            </ul>
          </div>
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
        description="Backend first, comfortable across the stack."
      >
        <SkillGroups />
      </Section>

      <Section
        id="experience"
        kicker="The route"
        title={
          <>
            Where I’ve <span className="text-accent">delivered</span>
          </>
        }
        description="Freelance delivery, a backend internship and a project-management role."
        action={<ArrowLink to="/experience">Full experience</ArrowLink>}
      >
        <div className="max-w-4xl">
          <ExperienceSummary items={experience} />
        </div>
      </Section>

      <Section id="education" kicker="Basecamp" title="Software engineering, with honours">
        <EducationList items={education} />
      </Section>

      <OffTheTrail />

      <ContactPanel />
    </>
  );
}
