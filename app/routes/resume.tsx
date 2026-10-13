import { Download, Printer } from 'lucide-react';
import type { ReactNode } from 'react';
import { Action, buttonStyles } from '~/components/ui/action';
import { Container } from '~/components/ui/container';
import { PlaceholderNote } from '~/components/ui/placeholder-note';
import { activities, education } from '~/content/education';
import { experience } from '~/content/experience';
import { isPlaceholder, resolved } from '~/content/placeholder';
import { profile } from '~/content/profile';
import { learning, skillGroups } from '~/content/skills';
import { techName } from '~/content/tech';
import { allProjects, stackNames } from '~/lib/content';
import { formatRange, formatYearMonth } from '~/lib/format';
import { pageMeta } from '~/lib/seo';
import type { Route } from './+types/resume';

export const meta: Route.MetaFunction = () =>
  pageMeta({
    title: 'Resume',
    path: '/resume',
    description: `Resume of ${profile.fullName}: Software Engineering graduate, backend and full-stack developer.`,
  });

function ResumeSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-9 break-inside-avoid-page first-of-type:mt-8">
      <h2 className="border-b border-line pb-2 font-mono text-meta font-semibold tracking-[0.06em] text-accent uppercase print:text-ink-2">
        {title}
      </h2>
      <div className="mt-4 grid gap-5">{children}</div>
    </section>
  );
}

function Entry({
  title,
  meta,
  sub,
  children,
}: {
  title: string;
  meta: string;
  sub?: string;
  children?: ReactNode;
}) {
  return (
    <div className="break-inside-avoid">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h3 className="font-semibold">{title}</h3>
        <p className="font-mono text-meta text-ink-3">{meta}</p>
      </div>
      {sub ? <p className="text-[0.9375rem] text-ink-2">{sub}</p> : null}
      {children}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 grid gap-1 text-[0.9375rem] text-ink-2">
      {items.map((item) => (
        <li
          key={item}
          className="relative pl-4 before:absolute before:top-[0.68em] before:left-0 before:size-1 before:rounded-full before:bg-ink-3"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function Resume() {
  const pdf = resolved(profile.resumePdf);
  const github = resolved(profile.links.github);
  const linkedin = resolved(profile.links.linkedin);

  return (
    <Container className="py-12 sm:py-16 print:max-w-none print:p-0">
      <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-title font-semibold">Resume</h1>
        <div className="flex flex-wrap gap-2.5">
          {pdf ? (
            <Action href={pdf}>
              <Download aria-hidden="true" className="size-4" strokeWidth={1.75} />
              Download PDF
            </Action>
          ) : null}
          <button
            type="button"
            onClick={() => window.print()}
            className={buttonStyles(pdf ? 'secondary' : 'primary')}
          >
            <Printer aria-hidden="true" className="size-4" strokeWidth={1.75} />
            Print or save as PDF
          </button>
        </div>
      </div>
      {isPlaceholder(profile.resumePdf) ? (
        <PlaceholderNote note={profile.resumePdf.todo} className="no-print mb-6" />
      ) : null}

      <article
        aria-label={`Resume of ${profile.fullName}`}
        className="mx-auto max-w-[52rem] rounded-xl border border-line bg-surface px-5 py-8 shadow-md sm:px-12 sm:py-14 print:max-w-none print:rounded-none print:border-0 print:bg-transparent print:p-0 print:shadow-none"
      >
        <header>
          <p className="text-[1.75rem] leading-tight font-semibold tracking-[-0.02em]">
            {profile.fullName}
          </p>
          <p className="mt-1 text-ink-2">{profile.headline}</p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[0.9375rem]">
            <li>
              <a href={`mailto:${profile.email}`} className="link -my-3 inline-block py-3">
                {profile.email}
              </a>
            </li>
            {linkedin ? (
              <li>
                <a href={linkedin} className="link -my-3 inline-block py-3">
                  {linkedin.replace(/^https:\/\/(www\.)?/, '')}
                </a>
              </li>
            ) : null}
            {github ? (
              <li>
                <a href={github} className="link -my-3 inline-block py-3">
                  {github.replace(/^https:\/\//, '')}
                </a>
              </li>
            ) : null}
            <li className="text-ink-2">{profile.location}</li>
          </ul>
        </header>

        <ResumeSection title="Summary">
          <div className="grid gap-2 text-[0.9375rem] text-ink-2">
            {profile.summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection title="Experience">
          {experience.map((item) => (
            <Entry
              key={item.id}
              title={`${item.role}, ${item.organization}`}
              meta={formatRange(item.period)}
              sub={item.context}
            >
              <Bullets items={[...item.highlights, ...item.details]} />
            </Entry>
          ))}
        </ResumeSection>

        <ResumeSection title="Projects">
          {allProjects.map((project) => (
            <Entry
              key={project.slug}
              title={project.title}
              meta={formatYearMonth(project.date)}
              sub={[project.kind, stackNames(project.stack).join(', ')].filter(Boolean).join(' · ')}
            >
              <p className="mt-1.5 text-[0.9375rem] text-ink-2">{project.summary}</p>
            </Entry>
          ))}
        </ResumeSection>

        <ResumeSection title="Education">
          {education.map((item) => (
            <Entry
              key={item.id}
              title={`${item.qualification}${item.field ? `, ${item.field}` : ''}`}
              meta={formatRange(item.period)}
              sub={[item.institution, item.grade, item.honours].filter(Boolean).join(' · ')}
            />
          ))}
        </ResumeSection>

        <ResumeSection title="Skills">
          <dl className="grid gap-2 text-[0.9375rem]">
            {[...skillGroups, learning].map((group) => (
              <div key={group.id} className="grid gap-x-4 sm:grid-cols-[11rem_1fr]">
                <dt className="font-medium">{group.title}</dt>
                <dd className="text-ink-2">{group.items.map(techName).join(', ')}</dd>
              </div>
            ))}
            <div className="grid gap-x-4 sm:grid-cols-[11rem_1fr]">
              <dt className="font-medium">Spoken languages</dt>
              <dd className="text-ink-2">{profile.spokenLanguages.join(', ')}</dd>
            </div>
          </dl>
        </ResumeSection>

        <ResumeSection title="Activities">
          {activities.map((activity) => (
            <Entry
              key={activity.id}
              title={activity.title}
              meta={formatYearMonth(activity.date)}
              sub={activity.role}
            >
              <Bullets items={activity.points} />
            </Entry>
          ))}
        </ResumeSection>
      </article>
    </Container>
  );
}
