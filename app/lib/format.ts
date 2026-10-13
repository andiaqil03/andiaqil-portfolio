import type { DateRange, YearMonth } from '~/content/types';

// Spelled out rather than Intl-formatted so the prerendered HTML and the
// client render can never disagree because of ICU differences.
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parts(value: YearMonth): { year: string; month: string } {
  const [year = '', month = '1'] = value.split('-');
  return { year, month: MONTHS[Number(month) - 1] ?? '' };
}

/** `2025-07` → `Jul 2025` */
export function formatYearMonth(value: YearMonth): string {
  const { year, month } = parts(value);
  return `${month} ${year}`;
}

/** `['A', 'B', 'C']` → `A, B and C` */
export function formatList(items: string[]): string {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;
}

/** `{ 2025-07, 2025-09 }` → `Jul – Sep 2025`; open ranges end in `Present`. */
export function formatRange({ start, end }: DateRange): string {
  const from = parts(start);
  if (end === 'present') return `${from.month} ${from.year} – Present`;
  const to = parts(end);
  return from.year === to.year
    ? `${from.month} – ${to.month} ${to.year}`
    : `${from.month} ${from.year} – ${to.month} ${to.year}`;
}
