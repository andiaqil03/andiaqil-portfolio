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

/** "By the numbers": counts up as it scrolls into view. */
export function StatsBand() {
  return (
    <section id="stats" aria-label="By the numbers" className="relative py-8 sm:py-12">
      <Container>
        <Reveal>
          <dl className="glass ring-gradient grid grid-cols-2 gap-px overflow-hidden rounded-xl sm:grid-cols-3 lg:grid-cols-5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-1.5 px-5 py-6 last:col-span-2 sm:px-6 sm:last:col-span-1 lg:py-8"
              >
                <dt className="order-2 text-sm text-ink-2">{stat.label}</dt>
                <dd className="order-1 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                  <Counter
                    value={stat.value}
                    decimals={stat.decimals ?? 0}
                    suffix={stat.suffix ?? ''}
                    className="text-gradient is-animated"
                  />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
