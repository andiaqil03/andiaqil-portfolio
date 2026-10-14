import { allProjects } from '~/lib/content';
import { experience } from '~/content/experience';
import { Counter } from '../fx/counter';
import { Reveal } from '../ui/reveal';
import { Container } from '../ui/container';

// Real figures only, each traceable to the content data.
const stats = [
  { value: 3.56, decimals: 2, label: 'CGPA, B.CS Software Engineering' },
  { value: 4, suffix: '×', label: 'Dean’s List semesters' },
  { value: 60, suffix: '+', label: 'User survey responses behind FocusPro' },
  { value: allProjects.length, label: 'Projects built and documented' },
  { value: experience.length, label: 'Roles: freelance, internship, PMO' },
];

/** "Trail stats": a pine trail-sign panel whose figures count up into view. */
export function StatsBand() {
  return (
    <section id="stats" aria-label="By the numbers" className="relative py-8 sm:py-12">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-xl bg-summit text-white shadow-md">
            <div
              aria-hidden="true"
              className="topo absolute inset-0 -z-10 [--topo:rgb(255_255_255/0.08)]"
            />
            <p className="flex items-center gap-2 border-b border-white/10 px-5 py-3 font-mono text-meta tracking-[0.14em] text-white/60 uppercase sm:px-6">
              <span aria-hidden="true" className="blaze" />
              Trail stats
            </p>
            <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-1.5 border-white/10 px-5 py-6 last:col-span-2 sm:px-6 sm:last:col-span-1 lg:border-l lg:py-8 lg:first:border-l-0"
                >
                  <dt className="order-2 text-sm text-white/70">{stat.label}</dt>
                  <dd className="order-1 font-display text-5xl leading-none tracking-[-0.01em] text-white sm:text-6xl">
                    <Counter
                      value={stat.value}
                      decimals={stat.decimals ?? 0}
                      suffix={stat.suffix ?? ''}
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
