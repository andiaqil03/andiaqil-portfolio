import { Mail, MapPin, Phone } from 'lucide-react';
import type { ComponentType, ReactNode, SVGProps } from 'react';
import { PageHeader } from '~/components/layout/page-header';
import { Action, buttonStyles } from '~/components/ui/action';
import { GitHubIcon, LinkedInIcon } from '~/components/ui/brand-icons';
import { Container } from '~/components/ui/container';
import { CopyButton } from '~/components/ui/copy-button';
import { Reveal } from '~/components/ui/reveal';
import { resolved } from '~/content/placeholder';
import { profile } from '~/content/profile';
import { formatList } from '~/lib/format';
import { pageMeta } from '~/lib/seo';
import type { Route } from './+types/contact';

export const meta: Route.MetaFunction = () =>
  pageMeta({
    title: 'Contact',
    path: '/contact',
    description: `Get in touch with ${profile.name} about Software Engineer, Backend Developer and Full-Stack Developer roles, or a freelance project.`,
  });

interface Channel {
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  value: ReactNode;
  note?: string;
}

function ChannelCard({ label, Icon, value, note }: Channel) {
  return (
    <div className="flex h-full items-start gap-4 rounded-lg border border-line bg-surface p-5 shadow-xs">
      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-surface-2 text-ink-2">
        <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="font-mono text-meta text-ink-3 uppercase">{label}</p>
        <div className="mt-1 font-medium break-words">{value}</div>
        {note ? <p className="mt-1 text-sm text-ink-3">{note}</p> : null}
      </div>
    </div>
  );
}

export default function Contact() {
  const linkedin = resolved(profile.links.linkedin);
  const github = resolved(profile.links.github);
  const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

  // The only page that shows the phone number.
  const channels: Channel[] = [
    ...(linkedin
      ? [
          {
            label: 'LinkedIn',
            Icon: LinkedInIcon,
            value: (
              <a href={linkedin} {...external} className="link -my-3 inline-block py-3">
                {profile.formalName}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ),
            note: 'Profile and messages',
          },
        ]
      : []),
    ...(github
      ? [
          {
            label: 'GitHub',
            Icon: GitHubIcon,
            value: (
              <a href={github} {...external} className="link -my-3 inline-block py-3">
                {new URL(github).pathname.slice(1)}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ),
            note: 'Code and projects',
          },
        ]
      : []),
    {
      label: 'Phone',
      Icon: Phone,
      value: (
        <a href={profile.phone.href} className="link tabular -my-3 inline-block py-3">
          {profile.phone.display}
        </a>
      ),
    },
    { label: 'Location', Icon: MapPin, value: profile.location, note: 'Malaysia time (UTC+8)' },
  ];

  return (
    <>
      <PageHeader
        title="Let’s connect"
        lead={`I’m open to ${formatList(profile.openTo)} roles, and to new freelance projects. Email is the quickest way to reach me.`}
      />

      <div className="border-t border-line">
        <Container className="grid gap-4 py-12 sm:gap-6 sm:py-16 lg:grid-cols-12 lg:py-20">
          <Reveal className="lg:col-span-7">
            <div className="h-full rounded-xl border border-line bg-surface p-6 shadow-sm sm:p-8">
              <span className="inline-flex size-11 items-center justify-center rounded-md bg-accent-soft text-accent">
                <Mail aria-hidden="true" className="size-5" strokeWidth={1.75} />
              </span>
              <h2 className="mt-5 text-subheading font-semibold">Email</h2>
              <p className="mt-1 text-ink-2">
                Best for first contact, roles and project enquiries.
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="link mt-5 block text-lg font-semibold break-all sm:text-xl"
              >
                {profile.email}
              </a>
              <div className="mt-6 flex flex-col gap-3 min-[400px]:flex-row">
                <Action href={`mailto:${profile.email}`}>
                  <Mail aria-hidden="true" className="size-4" strokeWidth={1.75} />
                  Email me
                </Action>
                <CopyButton
                  value={profile.email}
                  label="Copy email"
                  subject="Email address"
                  className={buttonStyles('secondary', 'md', 'min-w-[9rem]')}
                />
              </div>
            </div>
          </Reveal>

          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:col-span-5 lg:grid-cols-1 lg:gap-4">
            {channels.map((channel, index) => (
              <Reveal as="li" key={channel.label} delay={index * 60}>
                <ChannelCard {...channel} />
              </Reveal>
            ))}
          </ul>
        </Container>
      </div>
    </>
  );
}
