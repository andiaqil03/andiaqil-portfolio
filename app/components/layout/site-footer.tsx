import { Command } from 'lucide-react';
import { isPlaceholder, resolved } from '~/content/placeholder';
import { profile } from '~/content/profile';
import { site } from '~/content/site';
import { openCommandPalette } from '../fx/command-palette';
import { Ridges } from '../fx/ridges';
import { Container } from '../ui/container';
import { ExternalLink } from '../ui/external-link';
import { PlaceholderNote } from '../ui/placeholder-note';
import { SocialLinks } from '../ui/social-links';

// Baked in at build time (vite.config.ts) so prerendered and hydrated HTML agree.
declare const __BUILD_YEAR__: number;

export function SiteFooter() {
  const source = resolved(site.sourceRepo);

  return (
    <footer className="no-print relative overflow-hidden">
      {/* The horizon: layered ridgelines in lake and pine tints. */}
      <Ridges
        tones={[
          'color-mix(in srgb, var(--lake) 16%, transparent)',
          'color-mix(in srgb, var(--pine) 16%, transparent)',
          'color-mix(in srgb, var(--pine) 18%, var(--canvas))',
        ]}
        className="h-24 sm:h-32 lg:h-40"
      />
      <div className="bg-[color-mix(in_srgb,var(--pine)_18%,var(--canvas))]">
        <Container className="flex flex-col gap-6 pt-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold tracking-[-0.02em]">
              {profile.formalName}
            </p>
            <p className="mt-0.5 text-sm text-ink">{profile.roleLine}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openCommandPalette}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm text-ink-2 transition-colors hover:border-ink-3 hover:text-ink"
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
            className="group mt-10 flex justify-between font-display text-[clamp(4rem,1rem+15vw,15rem)] leading-[0.8] font-bold tracking-[-0.01em] select-none"
          >
            {[...profile.name.replace(' ', '')].map((letter, index) => (
              <span
                key={index}
                className="inline-block text-transparent uppercase [-webkit-text-stroke:1.5px_color-mix(in_srgb,var(--pine)_45%,transparent)] transition-transform duration-500 ease-out-expo group-hover:-translate-y-3"
                style={{ transitionDelay: `${index * 35}ms` }}
              >
                {letter}
              </span>
            ))}
          </p>
        </Container>

        <Container className="flex flex-col gap-2 border-t border-line-strong py-6 text-sm text-ink-2 sm:flex-row sm:justify-between">
          <p>
            © {__BUILD_YEAR__} {profile.formalName}
          </p>
          <p>
            Built with React Router, GSAP, three.js and Tailwind CSS
            {source ? (
              <>
                {' · '}
                <ExternalLink href={source} className="text-ink-2">
                  Source
                </ExternalLink>
              </>
            ) : null}
          </p>
          {isPlaceholder(site.sourceRepo) ? <PlaceholderNote note={site.sourceRepo.todo} /> : null}
        </Container>
      </div>
    </footer>
  );
}
