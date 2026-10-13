import { FileText, Mail } from 'lucide-react';
import { Link } from 'react-router';
import { profile } from '~/content/profile';
import { cn } from '~/lib/cn';
import { formatList } from '~/lib/format';
import { Container } from '../ui/container';
import { CopyButton } from '../ui/copy-button';
import { Reveal } from '../ui/reveal';
import { socialLinks } from '../ui/social-links';

/**
 * Closing call to action: a dark band (in both themes) with email as the
 * primary action. Never shows the phone number.
 */
export function ContactPanel({ headingLevel: Heading = 'h2' }: { headingLevel?: 'h2' | 'h3' }) {
  const links = socialLinks().filter((link) => link.external);
  // Light-on-dark controls; the band stays dark in both themes.
  const quietBase =
    'inline-flex items-center gap-2 rounded-md text-[0.9375rem] font-medium text-white/75 transition-colors duration-150 hover:text-white';
  const quietLink = cn(quietBase, 'min-h-11 px-3 hover:bg-white/10');

  return (
    <section aria-labelledby="contact-cta-heading" className="no-print py-16 sm:py-20 lg:py-24">
      <Container>
        <Reveal>
          <div className="overflow-hidden rounded-xl bg-cta px-6 py-12 text-white shadow-lg sm:px-10 sm:py-14 lg:px-14 lg:py-16 [&_:focus-visible]:outline-white">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <Heading id="contact-cta-heading" className="text-section font-semibold text-white">
                  Let’s connect
                </Heading>
                <p className="mt-4 max-w-[52ch] text-lead text-white/75">
                  I’m open to {formatList(profile.openTo)} roles, and to new freelance projects.
                  Email is the quickest way to reach me.
                </p>
              </div>
              <div className="flex flex-col gap-4 lg:col-span-5 lg:items-end">
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-white px-5 text-[0.9375rem] font-medium text-[#0e1411] shadow-xs transition-[background-color,translate] duration-200 hover:bg-white/90 active:translate-y-px"
                  >
                    <Mail aria-hidden="true" className="size-4" strokeWidth={1.75} />
                    Email me
                  </a>
                  <CopyButton
                    value={profile.email}
                    label="Copy email"
                    subject="Email address"
                    className={cn(
                      quietBase,
                      'h-11 justify-center border border-white/20 px-5 hover:border-white/40 hover:bg-white/10',
                    )}
                    copiedClassName="text-white"
                  />
                </div>
                <ul className="-mx-3 flex flex-wrap gap-1">
                  {links.map(({ label, href, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={quietLink}
                      >
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
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
