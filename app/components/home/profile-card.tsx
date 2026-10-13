import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { education } from '~/content/education';
import { experience } from '~/content/experience';
import { profile } from '~/content/profile';
import { techName } from '~/content/tech';
import { cn } from '~/lib/cn';
import { formatRange, formatYearMonth } from '~/lib/format';
import { TechChips } from '../ui/tag';
import { JsonView, type JsonValue } from './json-view';

const current = experience.find((item) => item.period.end === 'present');
const internship = experience.find((item) => item.kind === 'Internship');
const degree = education[0];
const coreStack = profile.coreStack.map(techName);

interface Row {
  label: string;
  value: string;
  detail?: string;
}

const rows: Row[] = [
  ...(current
    ? [
        {
          label: 'Now',
          value: current.role,
          detail: `Since ${formatYearMonth(current.period.start)}`,
        },
      ]
    : []),
  ...(internship
    ? [
        {
          label: 'Previously',
          value: `${internship.role}, ${internship.organizationShort}`,
          detail: formatRange(internship.period),
        },
      ]
    : []),
  ...(degree
    ? [
        {
          label: 'Education',
          value: `B.CS (Hons.) Software Engineering, ${degree.institutionShort}`,
          detail: [degree.grade, degree.honours].filter(Boolean).join(' · '),
        },
      ]
    : []),
];

const json: JsonValue = {
  name: profile.name,
  role: profile.role,
  now: current ? { role: current.role, since: current.period.start } : null,
  experience: experience
    .filter((item) => item !== current)
    .map((item) => ({ role: item.role, at: item.organizationShort, from: item.period.start })),
  education: degree ? { degree: 'B.CS (Hons.) Software Engineering', grade: degree.grade } : null,
  stack: coreStack,
  location: profile.location,
};

type View = 'summary' | 'json';
const views: { id: View; label: string }[] = [
  { id: 'summary', label: 'Summary' },
  { id: 'json', label: 'JSON' },
];

/**
 * Hero card with the facts a recruiter scans for. The same facts can be shown
 * as JSON, a quiet nod to the backend focus.
 */
export function ProfileCard() {
  const [view, setView] = useState<View>('summary');
  const id = useId();
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (step === undefined) return;
    event.preventDefault();
    const next = (index + step + views.length) % views.length;
    const target = views[next];
    if (!target) return;
    setView(target.id);
    tabs.current[next]?.focus();
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-lg">
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3">
        <h2 id={`${id}-label`} className="flex items-center gap-2 text-sm font-medium text-ink-2">
          <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
          Profile
        </h2>
        <div
          role="tablist"
          aria-labelledby={`${id}-label`}
          className="inline-flex rounded-md bg-surface-2 p-0.5"
        >
          {views.map((tab, index) => {
            const selected = view === tab.id;
            return (
              <button
                key={tab.id}
                ref={(node) => {
                  tabs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`${id}-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`${id}-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setView(tab.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={cn(
                  'h-8 rounded-sm px-3 text-[0.8125rem] font-medium transition-[background-color,color,box-shadow] duration-150',
                  tab.id === 'json' && 'font-mono text-meta',
                  selected ? 'bg-surface text-ink shadow-xs' : 'text-ink-3 hover:text-ink',
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel-summary`}
        aria-labelledby={`${id}-tab-summary`}
        hidden={view !== 'summary'}
      >
        <dl className="divide-y divide-line">
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid gap-1 px-5 py-4 sm:grid-cols-[6.5rem_1fr] sm:gap-4"
            >
              <dt className="pt-0.5 font-mono text-meta text-ink-3 uppercase">{row.label}</dt>
              <dd>
                <span className="block leading-snug font-medium">{row.value}</span>
                {row.detail ? (
                  <span className="mt-0.5 block text-sm text-ink-2">{row.detail}</span>
                ) : null}
              </dd>
            </div>
          ))}
          <div className="grid gap-2 px-5 py-4 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
            <dt className="pt-1 font-mono text-meta text-ink-3 uppercase">Stack</dt>
            <dd>
              <TechChips items={coreStack} label="Core stack" />
            </dd>
          </div>
        </dl>
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel-json`}
        aria-labelledby={`${id}-tab-json`}
        hidden={view !== 'json'}
        tabIndex={0}
        className="bg-surface-2/60"
      >
        {view === 'json' ? <JsonView value={json} /> : null}
      </div>
    </div>
  );
}
