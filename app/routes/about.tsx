import { ArrowRight, Languages, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router';
import { ContactPanel } from '~/components/contact/contact-panel';
import { EducationList } from '~/components/education/education-list';
import { PageHeader } from '~/components/layout/page-header';
import { SkillGroups } from '~/components/skills/skill-groups';
import { List } from '~/components/ui/list';
import { Reveal } from '~/components/ui/reveal';
import { Section } from '~/components/ui/section';
import { story, workProcess } from '~/content/about';
import { activities, education } from '~/content/education';
import { profile } from '~/content/profile';
import { cn } from '~/lib/cn';
import { formatYearMonth } from '~/lib/format';
import { pageMeta } from '~/lib/seo';
import type { Route } from './+types/about';

export const meta: Route.MetaFunction = () =>
  pageMeta({
    title: 'About',
    path: '/about',
    description: `About ${profile.fullName}: Software Engineering graduate from UNITEN, backend-focused software engineer based in ${profile.location}.`,
  });

function StoryLink({ to, label }: { to: string; label: string }) {
  const className =
    'group mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover';
  const arrow = (
    <ArrowRight
      aria-hidden="true"
      className="size-4 transition-transform duration-200 group-hover:translate-x-1"
      strokeWidth={2}
    />
  );
  return to.startsWith('#') ? (
    <a href={to} className={className}>
      {label}
      {arrow}
    </a>
  ) : (
    <Link to={to} viewTransition className={className}>
      {label}
      {arrow}
    </Link>
  );
}

export default function About() {
  return (
    <>
      <PageHeader
        title="About"
        lead={`I’m ${profile.fullName}, a software engineer focused on the backend, comfortable across the stack, and interested in building software that is scalable and reliable.`}
      >
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem] text-ink-2">
          <li className="inline-flex items-center gap-2">
            <MapPin aria-hidden="true" className="size-4 text-ink-3" strokeWidth={1.75} />
            {profile.location}
          </li>
          <li className="inline-flex items-center gap-2">
            <Languages aria-hidden="true" className="size-4 text-ink-3" strokeWidth={1.75} />
            {profile.spokenLanguages.join(' and ')}
          </li>
          <li className="inline-flex items-center gap-2">
            <Users aria-hidden="true" className="size-4 text-ink-3" strokeWidth={1.75} />
            Open to {profile.openTo.join(', ')} roles
          </li>
        </ul>
      </PageHeader>

      <Section
        id="story"
        title="My story so far"
        description="From studying software engineering to building for clients."
        className="border-t border-line"
      >
        <ol className="relative ml-1 max-w-3xl border-l border-line pl-6 sm:pl-10">
          {story.map((chapter, index) => (
            <Reveal
              as="li"
              key={chapter.id}
              delay={index * 60}
              className="relative pb-10 last:pb-0"
            >
              <span
                aria-hidden="true"
                className={cn(
                  'absolute top-1.5 -left-[calc(1.5rem+6px)] size-3 rounded-full ring-4 ring-canvas sm:-left-[calc(2.5rem+6px)]',
                  chapter.state === 'current' && 'bg-accent',
                  chapter.state === 'next' && 'border-2 border-dashed border-accent-2 bg-canvas',
                  !chapter.state && 'bg-line-strong',
                )}
              />
              <p className="font-mono text-meta text-ink-3 uppercase">{chapter.period}</p>
              <h3 className="mt-1.5 text-subheading font-semibold">{chapter.title}</h3>
              <p className="mt-2 max-w-[64ch] text-ink-2">{chapter.text}</p>
              {chapter.link ? <StoryLink {...chapter.link} /> : null}
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section
        id="process"
        title="How I work with clients"
        description="The way a freelance project moves from first conversation to production."
        className="border-t border-line bg-surface-2/40"
      >
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {workProcess.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 60}>
              <div className="h-full rounded-lg border border-line bg-surface p-5 shadow-xs">
                <span className="inline-flex size-7 items-center justify-center rounded-md bg-accent-soft font-mono text-meta font-semibold text-accent">
                  {index + 1}
                </span>
                <p className="mt-3 font-semibold">{step.title}</p>
                <p className="mt-1.5 text-[0.9375rem] text-ink-2">{step.detail}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section
        id="skills"
        title="Skills"
        description="The languages, frameworks and tools I work with."
        className="border-t border-line"
      >
        <SkillGroups />
      </Section>

      <Section id="education" title="Education" className="border-t border-line">
        <EducationList items={education} showCoursework />
      </Section>

      <Section id="beyond" title="Beyond the code" className="border-t border-line">
        <ul className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          {activities.map((activity) => (
            <Reveal as="li" key={activity.id}>
              <article className="h-full rounded-lg border border-line bg-surface p-5 shadow-xs sm:p-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <h3 className="text-subheading font-semibold">{activity.title}</h3>
                  <time
                    dateTime={activity.date}
                    className="order-first font-mono text-meta text-ink-3 sm:order-none sm:mt-1.5 sm:shrink-0"
                  >
                    {formatYearMonth(activity.date)}
                  </time>
                </div>
                <p className="mt-0.5 font-medium text-ink-2">{activity.role}</p>
                <List items={activity.points} className="mt-4 text-[0.9375rem]" />
              </article>
            </Reveal>
          ))}
        </ul>
      </Section>

      <ContactPanel />
    </>
  );
}
