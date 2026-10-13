import { Handshake, Layers, Server } from 'lucide-react';
import { ContactPanel } from '~/components/contact/contact-panel';
import { EducationList } from '~/components/education/education-list';
import { ExperienceSummary } from '~/components/experience/experience-list';
import { Hero } from '~/components/home/hero';
import { FeaturedProjectCard, ProjectGrid } from '~/components/projects/project-card';
import { SkillGroups } from '~/components/skills/skill-groups';
import { ArrowLink } from '~/components/ui/action';
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
  },
  {
    icon: Layers,
    title: 'Full-stack web apps',
    text: 'Full-stack projects with Laravel, NestJS with Angular, and .NET, plus React frontends.',
  },
  {
    icon: Handshake,
    title: 'Client delivery',
    text: 'Freelance projects taken from gathering requirements through user testing to production.',
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <Section
        id="about"
        title="Backend-focused, comfortable across the stack"
        description="I studied Software Engineering at UNITEN, built REST APIs for a production-related project as an intern, and now deliver web applications for clients. I’m growing toward professional engineering roles, especially in .NET, Angular and backend development."
        action={<ArrowLink to="/about">More about me</ArrowLink>}
        className="border-t border-line"
      >
        <ul className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, text }, index) => (
            <Reveal as="li" key={title} delay={index * 70}>
              <div className="h-full rounded-lg border border-line bg-surface p-5 shadow-xs sm:p-6">
                <span className="inline-flex size-10 items-center justify-center rounded-md bg-accent-soft text-accent">
                  <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 text-subheading font-semibold">{title}</h3>
                <p className="mt-2 text-[0.9375rem] text-ink-2">{text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section
        id="projects"
        title="Projects"
        description="Things I’ve designed and built, from a researched final-year project to API-driven apps."
        action={<ArrowLink to="/projects">View all projects</ArrowLink>}
        className="border-t border-line bg-surface-2/40"
      >
        <Reveal>
          <FeaturedProjectCard project={featuredProject} />
        </Reveal>
        <ProjectGrid projects={selectedProjects} className="mt-6" />
      </Section>

      <Section
        id="skills"
        title="Skills"
        description="The languages, frameworks and tools I work with."
        className="border-t border-line"
      >
        <SkillGroups />
      </Section>

      <Section
        id="experience"
        title="Experience"
        description="Freelance delivery, a backend internship and a project-management role."
        action={<ArrowLink to="/experience">Full experience</ArrowLink>}
        className="border-t border-line"
      >
        <ExperienceSummary items={experience} />
      </Section>

      <Section id="education" title="Education" className="border-t border-line">
        <EducationList items={education} />
      </Section>

      <ContactPanel />
    </>
  );
}
