import { Mail, MapPin, Phone } from 'lucide-react';
import type { ComponentType, ReactNode, SVGProps } from 'react';
import { PageHeader } from '~/components/layout/page-header';
import { Action, buttonStyles } from '~/components/ui/action';
import { GitHubIcon, LinkedInIcon } from '~/components/ui/brand-icons';
import { Container } from '~/components/ui/container';
import { CopyButton } from '~/components/ui/copy-button';
import { Reveal } from '~/components/ui/reveal';
import { Magnetic } from '~/components/fx/magnetic';
import { Ridges } from '~/components/fx/ridges';
import { TiltCard } from '~/components/fx/tilt-card';
import { resolved } from '~/content/placeholder';
import { profile } from '~/content/profile';
import { formatList } from '~/lib/format';
import { pageMeta } from '~/lib/seo';
import type { Route } from './+types/contact';

export const meta: Route.MetaFunction = () =>
  pageMeta({
    title: 'Contact',
    path: '/contact',
    description: `Get in touch with ${profile.name} about software engineering roles or a freelance project.`,
  });

interface Channel {
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  value: ReactNode;
  note?: string;
}

function ChannelCard({ label, Icon, value, note }: Channel) {
  return (
    <div className="surface-card flex h-full items-start gap-4 rounded-xl p-5">
      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
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
        kicker="Contact"
        title="Let’s"
        accent="connect."
        lead={`I’m open to ${formatList(profile.openTo)} roles, and to new freelance projects. Email is the quickest way to reach me.`}
      />

      <div>
        <Container className="grid gap-5 pt-4 pb-16 sm:gap-6 sm:pb-20 lg:grid-cols-12 lg:pb-28">
          <Reveal className="lg:col-span-7">
            <TiltCard max={3} className="h-full rounded-xl">
              <div className="surface-card relative h-full overflow-hidden rounded-xl p-6 pb-20 sm:p-10 sm:pb-24">
                {/* Contour corner and a low horizon, in place of a glow. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 [mask-image:radial-gradient(60%_70%_at_100%_0%,#000_20%,transparent_75%)]"
                >
                  <div className="topo absolute inset-0" />
                </div>
                <Ridges
                  tones={[
                    'color-mix(in srgb, var(--lake) 10%, transparent)',
                    'color-mix(in srgb, var(--pine) 9%, transparent)',
                    'color-mix(in srgb, var(--pine) 13%, transparent)',
                  ]}
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
                />
                <span className="bg-accent relative inline-flex size-12 items-center justify-center rounded-full text-on-accent shadow-md">
                  <Mail aria-hidden="true" className="size-5" strokeWidth={1.75} />
                </span>
                <h2 className="relative mt-6 font-display text-subheading font-semibold">Email</h2>
                <p className="mt-1 text-ink-2">
                  Best for first contact, roles and project enquiries.
                </p>
                <a
                  href={`mailto:${profile.email}`}
                  className="link relative mt-5 block font-display text-xl font-semibold tracking-[-0.02em] break-all sm:text-3xl"
                >
                  {profile.email}
                </a>
                <div className="relative mt-8 flex flex-col gap-3 min-[420px]:flex-row">
                  <Magnetic>
                    <Action href={`mailto:${profile.email}`} className="w-full min-[420px]:w-auto">
                      <Mail aria-hidden="true" className="size-4" strokeWidth={1.75} />
                      Email me
                    </Action>
                  </Magnetic>
                  <CopyButton
                    value={profile.email}
                    label="Copy email"
                    subject="Email address"
                    className={buttonStyles('secondary', 'md', 'min-w-[9rem]')}
                  />
                </div>
              </div>
            </TiltCard>
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
