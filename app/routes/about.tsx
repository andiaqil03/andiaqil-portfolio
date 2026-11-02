import { Languages, MapPin, Users } from 'lucide-react';
import { RightNow } from '~/components/about/right-now';
import { ContactLine } from '~/components/contact/contact-line';
import { EducationList } from '~/components/education/education-list';
import { OffTheTrail } from '~/components/home/off-the-trail';
import { PageHeader } from '~/components/layout/page-header';
import { SkillGroups } from '~/components/skills/skill-groups';
import { Section } from '~/components/ui/section';
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

      <RightNow />

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
        {activities.length > 0 ? (
          <ul className="mt-8 space-y-3 border-t border-line pt-6">
            {activities.map((activity) => (
              <li key={activity.id} className="text-[0.9375rem] text-ink-2">
                <span className="font-semibold text-ink">{activity.role}</span>, {activity.title}{' '}
                <time dateTime={activity.date} className="font-mono text-meta text-ink-3">
                  · {formatYearMonth(activity.date)}
                </time>
                <span className="mt-0.5 block">{activity.points[0]}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </Section>

      <OffTheTrail id="outdoors" />

      <ContactLine />
    </>
  );
}
