import { ArrowRight, Languages, MapPin, Users } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router';
import { ContactPanel } from '~/components/contact/contact-panel';
import { EducationList } from '~/components/education/education-list';
import { ScrubText } from '~/components/fx/scrub-text';
import { TiltCard } from '~/components/fx/tilt-card';
import { PageHeader } from '~/components/layout/page-header';
import { SkillGroups } from '~/components/skills/skill-groups';
import { Container } from '~/components/ui/container';
import { List } from '~/components/ui/list';
import { Reveal } from '~/components/ui/reveal';
import { Section } from '~/components/ui/section';
import { story, workProcess } from '~/content/about';
import { activities, education } from '~/content/education';
import { profile } from '~/content/profile';
import { cn } from '~/lib/cn';
import { formatYearMonth } from '~/lib/format';
import { gsap, prefersReducedMotion, useGSAP } from '~/lib/gsap';
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
    'group mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover';
  const arrow = (
    <ArrowRight
      aria-hidden="true"
      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
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

/** Story timeline whose gradient rail draws as you read down it. */
function Story() {
  const scope = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const rail = scope.current?.querySelector('[data-rail]');
      if (!rail || prefersReducedMotion()) return;
      gsap.fromTo(
        rail,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: scope.current,
            start: 'top 70%',
            end: 'bottom 65%',
            scrub: 0.6,
          },
        },
      );
    },
    { scope },
  );

  return (
    <ol ref={scope} className="relative max-w-3xl">
      <span aria-hidden="true" className="absolute top-2 bottom-2 left-[11px] w-px bg-line" />
      <span
        aria-hidden="true"
        data-rail
        className="absolute top-2 bottom-2 left-[10px] w-[3px] origin-top rounded-full"
        style={{ background: 'linear-gradient(var(--g-indigo), var(--g-sky), var(--g-emerald))' }}
      />
      {story.map((chapter, index) => (
        <Reveal
          as="li"
          key={chapter.id}
          delay={index * 60}
          className="relative pb-12 pl-12 last:pb-0 sm:pl-16"
        >
          <span
            aria-hidden="true"
            className={cn(
              'absolute top-1 left-0 size-[23px] rounded-full border-[5px] border-canvas shadow-md',
              chapter.state === 'current' && 'pulse-dot',
              chapter.state === 'next' && 'border-dashed border-accent-2 bg-canvas',
            )}
            style={
              chapter.state === 'next'
                ? undefined
                : { background: chapter.state === 'current' ? '#10b981' : 'var(--gradient-aurora)' }
            }
          />
          <p className="font-mono text-meta text-accent uppercase">{chapter.period}</p>
          <h3 className="mt-1.5 font-display text-subheading font-semibold">{chapter.title}</h3>
          <p className="mt-2 max-w-[64ch] text-ink-2">{chapter.text}</p>
          {chapter.link ? <StoryLink {...chapter.link} /> : null}
        </Reveal>
      ))}
    </ol>
  );
}

export default function About() {
  return (
    <>
      <PageHeader
        kicker="About"
        title="Software engineer,"
        accent="backend first."
        lead={`${profile.fullName}: a software engineer focused on the backend, comfortable across the stack, and interested in building software that is scalable and reliable.`}
      >
        <ul className="flex flex-wrap gap-2 text-[0.9375rem] text-ink-2">
          <li className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-2">
            <MapPin aria-hidden="true" className="size-4 text-accent" strokeWidth={1.75} />
            {profile.location}
          </li>
          <li className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-2">
            <Languages aria-hidden="true" className="size-4 text-accent-2" strokeWidth={1.75} />
            {profile.spokenLanguages.join(' and ')}
          </li>
          <li className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-2">
            <Users aria-hidden="true" className="size-4 text-accent-3" strokeWidth={1.75} />
            Open to {profile.openTo.join(', ')} roles
          </li>
        </ul>
      </PageHeader>

      <section aria-label="In short" className="py-16 sm:py-20">
        <Container>
          <ScrubText
            className="max-w-5xl text-[clamp(1.75rem,1.1rem+2.6vw,3.25rem)] leading-[1.15] font-semibold tracking-[-0.035em]"
            text="Software engineering at UNITEN, backend APIs at TM R&D, programme work at PNB, and now freelance delivery for real clients. Each step taught me something different about building software."
            highlight={['backend', 'freelance', 'reliable']}
          />
        </Container>
      </section>

      <Section
        id="story"
        kicker="Journey"
        title={
          <>
            My story <span className="text-gradient is-animated">so far</span>
          </>
        }
        description="From studying software engineering to building for clients."
      >
        <Story />
      </Section>

      <Section
        id="process"
        kicker="Process"
        title="How I work with clients"
        description="The way a freelance project moves from first conversation to production."
      >
        <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          <span
            aria-hidden="true"
            className="absolute top-[2.4rem] right-[10%] left-[10%] hidden h-px lg:block"
            style={{ background: 'var(--gradient-aurora)' }}
          />
          {workProcess.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 90} className="relative">
              <TiltCard max={5} className="h-full rounded-xl">
                <div className="glass h-full rounded-xl p-5">
                  <span className="bg-brand inline-flex size-10 items-center justify-center rounded-full font-mono text-sm font-semibold text-white shadow-md">
                    {index + 1}
                  </span>
                  <p className="mt-4 font-display text-lg font-semibold tracking-[-0.02em]">
                    {step.title}
                  </p>
                  <p className="mt-1.5 text-[0.9375rem] text-ink-2">{step.detail}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section
        id="skills"
        kicker="Toolbox"
        title={
          <>
            The stack I <span className="text-gradient is-animated">build with</span>
          </>
        }
        description="Backend first, comfortable across the stack."
      >
        <SkillGroups />
      </Section>

      <Section id="education" kicker="Education" title="Software engineering, with honours">
        <EducationList items={education} showCoursework />
      </Section>

      <Section id="beyond" kicker="Beyond the code" title="Outside the editor">
        <ul className="grid gap-5 sm:gap-6 lg:grid-cols-2">
          {activities.map((activity) => (
            <Reveal as="li" key={activity.id}>
              <TiltCard as="article" max={4} className="h-full rounded-xl">
                <div className="glass h-full rounded-xl p-6 sm:p-7">
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

      <ContactPanel />
    </>
  );
}
