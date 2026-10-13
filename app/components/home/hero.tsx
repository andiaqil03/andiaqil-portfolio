import { MapPin } from 'lucide-react';
import type { CSSProperties } from 'react';
import { profile } from '~/content/profile';
import { formatList } from '~/lib/format';
import { HeroScene } from '../fx/hero-scene';
import { Magnetic } from '../fx/magnetic';
import { ScrambleText } from '../fx/scramble-text';
import { SplitText } from '../fx/split-text';
import { Action } from '../ui/action';
import { Container } from '../ui/container';
import { SocialLinks } from '../ui/social-links';

const at = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

export function Hero() {
  const [strong, quiet] = profile.heroHeading;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden pt-24 pb-14 sm:pt-28 lg:flex lg:min-h-[min(100svh,62rem)] lg:items-center lg:pt-24 lg:pb-16"
    >
      <div
        aria-hidden="true"
        className="dot-grid absolute inset-0 -z-10 [mask-image:radial-gradient(70%_60%_at_70%_40%,#000_20%,transparent_75%)]"
      />

      <Container className="grid items-center gap-4 lg:grid-cols-12 lg:gap-6">
        {/* The living system: services and the requests flowing between them. */}
        <div className="relative order-2 -mx-4 mt-6 h-[min(92vw,380px)] sm:mx-0 sm:h-[440px] lg:col-span-5 lg:-mr-24 lg:mt-0 lg:h-[min(78vh,700px)]">
          <div
            aria-hidden="true"
            className="absolute inset-[18%] -z-10 rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(circle, color-mix(in srgb, var(--g-indigo) 22%, transparent), transparent 70%)',
            }}
          />
          <HeroScene className="absolute inset-0" />
        </div>

        <div className="relative z-10 order-1 lg:col-span-7">
          <p className="anim-rise flex flex-wrap items-center gap-x-3 gap-y-2" style={at(0)}>
            <span className="glass inline-flex items-center gap-2 rounded-full py-1.5 pr-3.5 pl-3 text-sm font-medium text-ink-2">
              <span
                className="pulse-dot relative size-2 rounded-full bg-[#10b981]"
                aria-hidden="true"
              />
              Open to {formatList(profile.openTo)} roles
            </span>
          </p>

          <p
            className="anim-rise mt-6 flex items-center gap-2 text-[0.9375rem] text-ink-2"
            style={at(60)}
          >
            <span className="font-semibold text-ink">{profile.name}</span>
            <span aria-hidden="true" className="h-4 w-px bg-line-strong" />
            <MapPin aria-hidden="true" className="size-4" strokeWidth={1.75} />
            {profile.location}
          </p>

          <h1 id="hero-heading" className="mt-4 font-display text-display font-semibold">
            <SplitText text={strong} delay={140} className="block" />{' '}
            <span className="anim-rise text-gradient is-animated block pb-[0.08em]" style={at(620)}>
              {quiet}
            </span>
          </h1>

          <p className="anim-rise mt-6 font-mono text-sm text-ink-2" style={at(820)}>
            <span className="sr-only">Focus areas: {profile.heroFocus.join(', ')}.</span>
            <span
              aria-hidden="true"
              className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-2"
            >
              <span className="text-accent">const</span>
              <span>focus</span>
              <span className="text-ink-3">=</span>
              <span className="text-accent-3">
                &quot;
                <ScrambleText words={profile.heroFocus} startDelay={1600} />
                &quot;
              </span>
              <span className="caret -ml-1 text-accent">▍</span>
            </span>
          </p>

          <p className="anim-rise mt-6 max-w-[56ch] text-lead text-ink-2" style={at(900)}>
            {profile.heroIntro}
          </p>

          <div className="anim-rise mt-8 flex flex-col gap-3 min-[420px]:flex-row" style={at(1000)}>
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

          <div className="anim-rise" style={at(1100)}>
            <SocialLinks labelled className="mt-6" />
          </div>
        </div>
      </Container>

      {/* Scroll cue */}
      <a
        href="#stats"
        aria-label="Scroll to content"
        className="anim-rise absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
        style={at(1400)}
      >
        <span className="flex h-10 w-6 justify-center rounded-full border-2 border-line-strong pt-2">
          <span className="scroll-cue-dot block size-1.5 rounded-full bg-accent" />
        </span>
      </a>
    </section>
  );
}
