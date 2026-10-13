import { MapPin } from 'lucide-react';
import { profile } from '~/content/profile';
import { Action } from '../ui/action';
import { Container } from '../ui/container';
import { SocialLinks } from '../ui/social-links';
import { ProfileCard } from './profile-card';

export function Hero() {
  const [strong, quiet] = profile.heroHeading;

  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="dot-grid dot-grid-fade absolute inset-0 -z-10" />

      <Container className="grid items-center gap-12 pt-12 pb-16 sm:pt-16 sm:pb-20 lg:grid-cols-12 lg:gap-10 lg:pt-24 lg:pb-28">
        <div className="lg:col-span-7">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.9375rem]">
            <span className="font-semibold">{profile.name}</span>
            <span aria-hidden="true" className="h-4 w-px bg-line-strong" />
            <span className="inline-flex items-center gap-1.5 text-ink-2">
              <MapPin aria-hidden="true" className="size-4" strokeWidth={1.75} />
              {profile.location}
            </span>
          </p>

          <h1 id="hero-heading" className="mt-6 text-display font-semibold">
            <span className="block">{strong}</span>{' '}
            <span className="block text-ink-2">{quiet}</span>
          </h1>

          <p className="mt-6 max-w-[58ch] text-lead text-ink-2">{profile.heroIntro}</p>

          <div className="mt-8 flex flex-col gap-3 min-[400px]:flex-row">
            <Action href="#projects" arrow>
              View projects
            </Action>
            <Action to="/contact" variant="secondary">
              Let’s connect
            </Action>
          </div>

          <SocialLinks labelled className="mt-6" />
        </div>

        <div className="lg:col-span-5">
          <ProfileCard />
        </div>
      </Container>
    </section>
  );
}
