import { workProcess } from '~/content/about';
import { TiltCard } from '../fx/tilt-card';
import { Reveal } from '../ui/reveal';
import { Section } from '../ui/section';

/** How a client project moves from first conversation to production. */
export function WorkProcess() {
  return (
    <Section
      id="process"
      kicker="Process"
      title="How I work with clients"
      description="At MTechnix and in freelance projects, from first conversation to production."
    >
      <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <span
          aria-hidden="true"
          className="absolute top-[2.4rem] right-[10%] left-[10%] hidden h-[3px] bg-[repeating-linear-gradient(to_right,var(--trail)_0_10px,transparent_10px_18px)] lg:block"
        />
        {workProcess.map((step, index) => (
          <Reveal as="li" key={step.title} delay={index * 90} className="relative">
            <TiltCard max={5} className="h-full rounded-xl">
              <div className="surface-card h-full rounded-xl p-5">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-accent font-mono text-sm font-semibold text-on-accent shadow-sm">
                  {index + 1}
                </span>
                <p className="mt-4 font-display text-lg font-semibold tracking-[-0.02em]">
                  {step.title}
                </p>
                <p className="mt-1.5 text-[0.9375rem] text-ink-2">{step.detail}</p>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
