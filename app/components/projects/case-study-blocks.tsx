import { ArrowDown, ArrowRight, Info } from 'lucide-react';
import { isPlaceholder } from '~/content/placeholder';
import { techName } from '~/content/tech';
import type { Block } from '~/content/types';
import { cn } from '~/lib/cn';
import { Counter } from '../fx/counter';
import { List } from '../ui/list';
import { PlaceholderNote } from '../ui/placeholder-note';
import { TechChips } from '../ui/tag';

/** Numbers like 27,901, 83.66% or 60+ count up; anything else renders as text. */
function FactValue({ value }: { value: string }) {
  const match = /^([\d,]+(?:\.\d+)?)(%|\+)?$/.exec(value);
  if (!match) return <>{value}</>;
  const [, digits = '0', suffix = ''] = match;
  const decimals = digits.includes('.') ? (digits.split('.')[1]?.length ?? 0) : 0;
  return (
    <Counter
      value={Number(digits.replaceAll(',', ''))}
      decimals={decimals}
      suffix={suffix}
      className="text-gradient is-animated"
    />
  );
}

/** Renders one typed content block of a case-study section. */
export function CaseStudyBlock({ block }: { block: Block }) {
  switch (block.type) {
    case 'text':
      return (
        <div className="grid max-w-[68ch] gap-4 text-[1.0625rem] leading-[1.75] text-ink-2">
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      );

    case 'list':
      return <List items={block.items} marker="check" className="text-[1.0625rem]" />;

    case 'definitions':
      return (
        <dl className="grid gap-4 sm:grid-cols-2">
          {block.items.map((item, index) => (
            <div
              key={item.term}
              className={cn(
                'glass rounded-xl p-5 sm:p-6',
                block.items.length % 2 === 1 && index === block.items.length - 1 && 'sm:col-span-2',
              )}
            >
              <dt className="flex items-center gap-2.5 font-semibold">
                <span
                  aria-hidden="true"
                  className="size-2.5 rounded-full"
                  style={{ background: 'var(--gradient-aurora)' }}
                />
                {item.term}
              </dt>
              <dd className="mt-2 text-[0.9375rem] text-ink-2">{item.detail}</dd>
            </div>
          ))}
        </dl>
      );

    case 'steps':
      return (
        <ol className="grid gap-3 lg:grid-cols-4 lg:gap-0">
          {block.items.map((step, index) => (
            <li key={step.title} className="relative flex flex-col lg:flex-row lg:items-stretch">
              <div className="flex-1 glass rounded-xl p-5 sm:p-6">
                <span className="bg-brand inline-flex size-8 items-center justify-center rounded-full font-mono text-meta font-semibold text-white shadow-md">
                  {index + 1}
                </span>
                <p className="mt-3 font-semibold">{step.title}</p>
                {step.detail ? (
                  <p className="mt-1.5 text-[0.9375rem] text-ink-2">{step.detail}</p>
                ) : null}
              </div>
              {index < block.items.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="flex justify-center py-1 text-ink-3 lg:items-center lg:px-2 lg:py-0"
                >
                  <ArrowDown className="size-4 lg:hidden" strokeWidth={2} />
                  <ArrowRight className="hidden size-4 lg:block" strokeWidth={2} />
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      );

    case 'facts':
      return (
        <dl className="grid gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {block.items.map((fact) => (
            <div key={fact.label} className="glass rounded-xl p-5 sm:p-6">
              <dt className="font-mono text-meta text-ink-3 uppercase">{fact.label}</dt>
              <dd className="mt-2 font-display text-2xl leading-tight font-semibold tracking-[-0.03em] tabular">
                <FactValue value={fact.value} />
              </dd>
            </div>
          ))}
        </dl>
      );

    case 'note':
      return (
        <p className="flex max-w-[68ch] gap-3 rounded-lg border border-line bg-surface-2 p-4 text-[0.9375rem] text-ink-2">
          <Info
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-accent-2"
            strokeWidth={1.75}
          />
          <span>{block.text}</span>
        </p>
      );

    case 'tech': {
      // Until roles are written, production shows a simple chip row, not empty cards.
      const described = block.items.some((item) => typeof item.role === 'string');
      if (!described && !import.meta.env.DEV) {
        return <TechChips items={block.items.map((item) => techName(item.id))} />;
      }
      return (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {block.items.map((item) => (
            <li key={item.id} className="glass rounded-xl p-5 sm:p-6">
              <p className="inline-flex h-7 items-center rounded-sm bg-surface-2 px-2.5 font-mono text-[0.8125rem] font-semibold">
                {techName(item.id)}
              </p>
              {item.role === undefined ? null : isPlaceholder(item.role) ? (
                <div className="mt-3">
                  <PlaceholderNote note={item.role.todo} />
                </div>
              ) : (
                <p className="mt-3 text-[0.9375rem] text-ink-2">{item.role}</p>
              )}
            </li>
          ))}
        </ul>
      );
    }

    case 'gallery':
      return (
        <div className="grid gap-6 sm:grid-cols-2">
          {block.images.map((image) => (
            <figure key={image.src} className="overflow-hidden glass rounded-xl">
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
                className="h-auto w-full"
              />
              {image.caption ? (
                <figcaption className="border-t border-line px-4 py-3 text-sm text-ink-2">
                  {image.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      );
  }
}
