import { Languages, MapPin, Users } from 'lucide-react';
import { ContactLine } from '~/components/contact/contact-line';
import { EducationList } from '~/components/education/education-list';
import { TiltCard } from '~/components/fx/tilt-card';
import { OffTheTrail } from '~/components/home/off-the-trail';
import { PageHeader } from '~/components/layout/page-header';
import { SkillGroups } from '~/components/skills/skill-groups';
import { ArrowLink } from '~/components/ui/action';
import { List } from '~/components/ui/list';
import { Reveal } from '~/components/ui/reveal';
import { Section } from '~/components/ui/section';
import { story } from '~/content/about';
import { activities, education } from '~/content/education';
import { profile } from '~/content/profile';
import { formatYearMonth } from '~/lib/format';
import { pageMeta } from '~/lib/seo';
import type { Route } from './+types/about';

export const meta: Route.MetaFunction = () =>
  pageMeta({
    title: 'About',
    path: '/about',
    description: `About ${profile.fullName}: Software Engineering graduate from UNITEN and full-stack software engineer based in ${profile.location}.`,
  });

export default function About() {
  return (
    <>
      <PageHeader
        kicker="About"
        title="Software engineer,"
        accent="front to back."
        lead={`${profile.fullName}: a software engineer who enjoys the whole stack and building software that is scalable and reliable.`}
      >
        <ul className="flex flex-wrap gap-2 text-[0.9375rem] text-ink-2">
          <li className="surface-card inline-flex items-center gap-2 rounded-full px-3.5 py-2">
            <MapPin aria-hidden="true" className="size-4 text-accent" strokeWidth={1.75} />
            {profile.location}
          </li>
          <li className="surface-card inline-flex items-center gap-2 rounded-full px-3.5 py-2">
            <Languages aria-hidden="true" className="size-4 text-accent-2" strokeWidth={1.75} />
            {profile.spokenLanguages.join(' and ')}
          </li>
          <li className="surface-card inline-flex items-center gap-2 rounded-full px-3.5 py-2">
            <Users aria-hidden="true" className="size-4 text-accent-3" strokeWidth={1.75} />
            Open to {profile.openTo.join(', ')} roles
          </li>
        </ul>
      </PageHeader>

      <Section
        id="story"
        kicker="The route"
        title={
          <>
            My story <span className="text-accent">so far</span>
          </>
        }
      >
        <div className="max-w-3xl space-y-5 text-lead text-ink-2">
          {story.map((paragraph) => (
            <Reveal as="p" key={paragraph}>
              {paragraph}
            </Reveal>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
          <ArrowLink to="/experience">Full experience</ArrowLink>
          <ArrowLink to="/projects/focuspro">FocusPro case study</ArrowLink>
        </div>
      </Section>

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

      <Section id="education" kicker="Basecamp" title="Software engineering, with honours">
        <EducationList items={education} showCoursework />
      </Section>

      <OffTheTrail id="outdoors" />

      <Section id="beyond" kicker="Campus" title="Committee work">
        <ul className="grid gap-5 sm:gap-6 lg:grid-cols-2">
          {activities.map((activity) => (
            <Reveal as="li" key={activity.id}>
              <TiltCard as="article" max={4} className="h-full rounded-xl">
                <div className="surface-card h-full rounded-xl p-6 sm:p-7">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <h3 className="font-display text-subheading font-semibold">{activity.title}</h3>
                    <time
                      dateTime={activity.date}
                      className="order-first font-mono text-meta text-accent sm:order-none sm:mt-1.5 sm:shrink-0"
                    >
                      {formatYearMonth(activity.date)}
                    </time>
                  </div>
                  <p className="mt-0.5 font-medium text-ink-2">{activity.role}</p>
                  <List items={activity.points} marker="check" className="mt-4 text-[0.9375rem]" />
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </ul>
      </Section>

      <ContactLine />
    </>
  );
}
