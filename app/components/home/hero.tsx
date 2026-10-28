import { MapPin } from 'lucide-react';
import type { CSSProperties } from 'react';
import { profile } from '~/content/profile';
import { HeroScene } from '../fx/hero-scene';
import { Magnetic } from '../fx/magnetic';
import { ScrambleText } from '../fx/scramble-text';
import { SplitText } from '../fx/split-text';
import { Action } from '../ui/action';
import { Container } from '../ui/container';

const at = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

export function Hero() {
  const [strong, quiet] = profile.heroHeading;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden pt-24 pb-14 sm:pt-28 lg:flex lg:min-h-[min(100svh,62rem)] lg:items-center lg:pt-24 lg:pb-16"
    >
      {/* Contour map texture fading in from the top right. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 [mask-image:radial-gradient(75%_70%_at_80%_20%,#000_10%,transparent_70%)]"
      >
        <div className="topo absolute inset-0" />
      </div>

      {/* Phones: name and role, then the trail, then the rest, so the map is in the first view.
          Desktop: the two text blocks stack on the left, centred beside the map. */}
      <Container className="grid gap-4 lg:grid-cols-12 lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-x-6 lg:gap-y-0">
        <div className="relative z-10 lg:col-span-6 lg:col-start-1 lg:row-start-2">
          <p className="anim-rise" style={at(0)}>
            <span className="surface-card inline-flex items-center gap-2 rounded-full py-1.5 pr-3.5 pl-3 text-sm font-medium text-ink-2">
              <span aria-hidden="true" className="pulse-dot relative size-2 rounded-full bg-pine" />
              <span className="font-semibold text-ink">Now</span>
              {profile.now}
            </span>
          </p>

          <p
            className="anim-rise mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.9375rem] text-ink-2"
            style={at(60)}
          >
            <span className="font-semibold text-ink">{profile.name}</span>
            <span aria-hidden="true" className="h-4 w-px bg-line-strong" />
            <MapPin aria-hidden="true" className="size-4 text-accent-3" strokeWidth={1.75} />
            {profile.location}
            <span aria-hidden="true" className="font-mono text-meta text-ink-3">
              · 3°N 101°E
            </span>
          </p>

          <h1 id="hero-heading" className="mt-4 font-display text-display uppercase">
            <SplitText text={strong} delay={140} className="block" />{' '}
            <span className="anim-rise block pb-[0.06em] text-accent normal-case" style={at(560)}>
              {quiet}
            </span>
          </h1>
        </div>

        {/* The trail: a 3D contour map with Andi's milestones as waypoints. */}
        <div className="relative -mx-4 h-[min(80vw,320px)] sm:mx-0 sm:h-[440px] lg:col-span-6 lg:col-start-7 lg:row-span-4 lg:row-start-1 lg:-mr-16 lg:h-[min(74vh,640px)] lg:self-center">
          <HeroScene className="absolute inset-0" />
        </div>

        <div className="relative z-10 lg:col-span-6 lg:col-start-1 lg:row-start-3">
          <p className="anim-rise mt-6 font-mono text-sm text-ink-2" style={at(760)}>
            <span className="sr-only">Focus areas: {profile.heroFocus.join(', ')}.</span>
            <span
              aria-hidden="true"
              className="inline-flex items-center gap-2 rounded-md border border-line bg-water px-3.5 py-2"
            >
              <span className="text-accent-2">const</span>
              <span>focus</span>
              <span className="text-ink-3">=</span>
              <span className="text-accent">
                &quot;
                <ScrambleText words={profile.heroFocus} startDelay={1600} />
                &quot;
              </span>
              <span className="caret -ml-1 text-accent-3">▍</span>
            </span>
          </p>

          <p className="anim-rise mt-6 max-w-[56ch] text-lead text-ink-2" style={at(860)}>
            {profile.heroIntro}
          </p>

          <div className="anim-rise mt-8 flex flex-col gap-3 min-[420px]:flex-row" style={at(960)}>
            <Magnetic>
              <Action href="#projects" arrow className="w-full min-[420px]:w-auto">
                View projects
              </Action>
            </Magnetic>
            <Magnetic>
              <Action to="/contact" variant="secondary" className="w-full min-[420px]:w-auto">
                Let’s connect
              </Action>
            </Magnetic>
          </div>
        </div>
      </Container>

      <a
        href="#projects"
        aria-label="Scroll to content"
        className="anim-rise absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
        style={at(1400)}
      >
        <span className="flex h-10 w-6 justify-center rounded-full border-2 border-line-strong pt-2">
          <span className="scroll-cue-dot block size-1.5 rounded-full bg-trail" />
        </span>
      </a>
    </section>
  );
}
