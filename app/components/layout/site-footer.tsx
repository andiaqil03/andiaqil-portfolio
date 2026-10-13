import { isPlaceholder, resolved } from '~/content/placeholder';
import { profile } from '~/content/profile';
import { site } from '~/content/site';
import { Container } from '../ui/container';
import { ExternalLink } from '../ui/external-link';
import { PlaceholderNote } from '../ui/placeholder-note';
import { SocialLinks } from '../ui/social-links';

// Baked in at build time (vite.config.ts) so prerendered and hydrated HTML agree.
declare const __BUILD_YEAR__: number;

export function SiteFooter() {
  const source = resolved(site.sourceRepo);

  return (
    <footer className="no-print border-t border-line">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold">{profile.formalName}</p>
          <p className="mt-0.5 text-sm text-ink-2">{profile.roleLine}</p>
        </div>
        <SocialLinks className="-ml-3 sm:ml-0" />
      </Container>
      <Container className="flex flex-col gap-2 border-t border-line py-6 text-sm text-ink-3 sm:flex-row sm:justify-between">
        <p>
          © {__BUILD_YEAR__} {profile.formalName}
        </p>
        <p>
          Built with React Router and Tailwind CSS
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
