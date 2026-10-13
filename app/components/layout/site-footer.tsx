import { Command } from 'lucide-react';
import { isPlaceholder, resolved } from '~/content/placeholder';
import { profile } from '~/content/profile';
import { site } from '~/content/site';
import { openCommandPalette } from '../fx/command-palette';
import { Container } from '../ui/container';
import { ExternalLink } from '../ui/external-link';
import { PlaceholderNote } from '../ui/placeholder-note';
import { SocialLinks } from '../ui/social-links';

// Baked in at build time (vite.config.ts) so prerendered and hydrated HTML agree.
declare const __BUILD_YEAR__: number;

export function SiteFooter() {
  const source = resolved(site.sourceRepo);

  return (
    <footer className="no-print relative overflow-hidden border-t border-line">
      <Container className="flex flex-col gap-6 pt-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg font-semibold tracking-[-0.02em]">
            {profile.formalName}
          </p>
          <p className="mt-0.5 text-sm text-ink-2">{profile.roleLine}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCommandPalette}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-sm text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
          >
            <Command aria-hidden="true" className="size-4" strokeWidth={1.75} />
            Quick navigation
          </button>
          <SocialLinks />
        </div>
      </Container>

      {/* Giant wordmark: letters lift in a wave on hover. */}
      <Container>
        <p
          aria-hidden="true"
          className="group mt-10 flex justify-between font-display text-[clamp(4rem,1rem+15vw,15rem)] leading-[0.8] font-bold tracking-[-0.06em] select-none"
        >
          {[...profile.name.replace(' ', '')].map((letter, index) => (
            <span
              key={index}
              className="inline-block bg-[linear-gradient(180deg,var(--line-strong),transparent_95%)] bg-clip-text text-transparent transition-transform duration-500 ease-out-expo group-hover:-translate-y-3"
              style={{ transitionDelay: `${index * 35}ms` }}
            >
              {letter}
            </span>
          ))}
        </p>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-line py-6 text-sm text-ink-3 sm:flex-row sm:justify-between">
        <p>
          © {__BUILD_YEAR__} {profile.formalName}
        </p>
        <p>
          Built with React Router, GSAP, three.js and Tailwind CSS
          {source ? (
            <>
              {' · '}
              <ExternalLink href={source} className="text-ink-3">
                Source
              </ExternalLink>
            </>
          ) : null}
        </p>
        {isPlaceholder(site.sourceRepo) ? <PlaceholderNote note={site.sourceRepo.todo} /> : null}
      </Container>
    </footer>
  );
}
