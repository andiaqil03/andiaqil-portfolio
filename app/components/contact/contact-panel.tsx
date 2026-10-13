import { ArrowUpRight, FileText, Mail } from 'lucide-react';
import { Link } from 'react-router';
import { profile } from '~/content/profile';
import { cn } from '~/lib/cn';
import { formatList } from '~/lib/format';
import { Magnetic } from '../fx/magnetic';
import { Container } from '../ui/container';
import { CopyButton } from '../ui/copy-button';
import { Reveal } from '../ui/reveal';
import { socialLinks } from '../ui/social-links';

/**
 * Closing call to action: a deep night panel (in both themes) with drifting
 * aurora light, a huge gradient headline and email as the primary action.
 * Never shows the phone number.
 */
export function ContactPanel({ headingLevel: Heading = 'h2' }: { headingLevel?: 'h2' | 'h3' }) {
  const links = socialLinks().filter((link) => link.external);
  const quietBase =
    'inline-flex items-center gap-2 rounded-full text-[0.9375rem] font-medium text-white/75 transition-colors duration-200 hover:text-white';
  const quietLink = cn(quietBase, 'min-h-11 px-4 hover:bg-white/10');

  return (
    <section aria-labelledby="contact-cta-heading" className="no-print py-16 sm:py-20 lg:py-28">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-xl bg-[#0a0f1f] px-6 py-16 text-white shadow-lg sm:px-12 sm:py-20 lg:px-16 lg:py-24 [&_:focus-visible]:outline-white">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <div
                className="aurora-blob a -top-1/2 -left-1/4 size-[60rem] opacity-40"
                style={{
                  background: 'radial-gradient(closest-side, var(--g-indigo), transparent)',
                }}
              />
              <div
                className="aurora-blob b -right-1/4 -bottom-1/2 size-[55rem] opacity-30"
                style={{
                  background: 'radial-gradient(closest-side, var(--g-emerald), transparent)',
                }}
              />
              <div className="dot-grid absolute inset-0 opacity-30 [--dot:rgb(255_255_255/0.12)]" />
            </div>

            <p className="font-mono text-meta tracking-[0.14em] text-white/60 uppercase">
              Available for work
            </p>
            <Heading
              id="contact-cta-heading"
              className="mt-5 max-w-[14ch] font-display text-[clamp(2.75rem,1.6rem+5.5vw,6.5rem)] leading-[0.95] font-semibold tracking-[-0.05em]"
            >
              Let’s build something <span className="cta-gradient">reliable.</span>
            </Heading>
            <p className="mt-6 max-w-[52ch] text-lead text-white/75">
              I’m open to {formatList(profile.openTo)} roles, and to new freelance projects. Email
              is the quickest way to reach me.
            </p>

            <div className="mt-10 flex flex-col gap-3 min-[460px]:flex-row min-[460px]:items-center">
              <Magnetic>
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-white px-7 text-base font-semibold text-[#0a0f1f] shadow-[0_10px_40px_-10px_rgb(165_180_252/0.6)] transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_50px_-10px_rgb(103_232_249/0.7)] min-[460px]:w-auto"
                >
                  <Mail aria-hidden="true" className="size-5" strokeWidth={1.75} />
                  Email me
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:rotate-45"
                    strokeWidth={2}
                  />
                </a>
              </Magnetic>
              <CopyButton
                value={profile.email}
                label="Copy email"
                subject="Email address"
                className={cn(
                  quietBase,
                  'h-14 justify-center border border-white/20 px-6 hover:border-white/45 hover:bg-white/10',
                )}
                copiedClassName="text-[#6ee7b7]"
              />
            </div>

            <ul className="mt-8 -ml-4 flex flex-wrap gap-1">
              {links.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className={quietLink}>
                    <Icon className="size-[1.125rem]" strokeWidth={1.75} />
                    {label}
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
              <li>
                <Link to="/resume" viewTransition className={quietLink}>
                  <FileText aria-hidden="true" className="size-[1.125rem]" strokeWidth={1.75} />
                  Resume
                </Link>
              </li>
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
