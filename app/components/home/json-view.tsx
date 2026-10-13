import type { CSSProperties, ReactNode } from 'react';

export type JsonValue =
  string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

type Token = { kind: 'key' | 'string' | 'number' | 'literal' | 'punct' | 'space'; text: string };
type Line = Token[];

const punct = (text: string): Token => ({ kind: 'punct', text });

function primitive(value: Primitive): Token {
  if (typeof value === 'string') return { kind: 'string', text: JSON.stringify(value) };
  if (typeof value === 'number') return { kind: 'number', text: String(value) };
  return { kind: 'literal', text: String(value) };
}

type Primitive = string | number | boolean | null;

function isPrimitive(value: JsonValue): value is Primitive {
  return value === null || typeof value !== 'object';
}

/** Single-line rendering for short arrays and objects of primitives. */
function inline(value: JsonValue): Token[] | null {
  if (isPrimitive(value)) return [primitive(value)];
  if (Array.isArray(value)) {
    const items = value.filter(isPrimitive);
    if (items.length !== value.length) return null;
    return [
      punct('['),
      ...items.flatMap((item, i) => [...(i ? [punct(', ')] : []), primitive(item)]),
      punct(']'),
    ];
  }
  const all = Object.entries(value);
  const entries = all.filter((entry): entry is [string, Primitive] => isPrimitive(entry[1]));
  if (entries.length !== all.length) return null;
  return [
    punct('{ '),
    ...entries.flatMap(([key, item], i) => [
      ...(i ? [punct(', ')] : []),
      { kind: 'key', text: JSON.stringify(key) } as Token,
      punct(': '),
      primitive(item),
    ]),
    punct(' }'),
  ];
}

/** Breaks a value into highlighted lines, keeping short structures on one line. */
function toLines(value: JsonValue, depth = 0, prefix: Token[] = [], suffix = ''): Line[] {
  const indent: Token = { kind: 'space', text: '  '.repeat(depth) };
  const end = suffix ? [punct(suffix)] : [];
  const flat = depth > 0 ? inline(value) : null;
  if (flat) return [[indent, ...prefix, ...flat, ...end]];
  if (isPrimitive(value)) return [[indent, ...prefix, primitive(value), ...end]];

  const close: Token = { kind: 'space', text: '  '.repeat(depth) };
  if (Array.isArray(value)) {
    return [
      [indent, ...prefix, punct('[')],
      ...value.flatMap((item, i) => toLines(item, depth + 1, [], i < value.length - 1 ? ',' : '')),
      [close, punct(']'), ...end],
    ];
  }

  const entries = Object.entries(value);
  return [
    [indent, ...prefix, punct('{')],
    ...entries.flatMap(([key, item], i) =>
      toLines(
        item,
        depth + 1,
        [{ kind: 'key', text: JSON.stringify(key) }, punct(': ')],
        i < entries.length - 1 ? ',' : '',
      ),
    ),
    [close, punct('}'), ...end],
  ];
}

const tokenClass: Record<Token['kind'], string> = {
  key: 'text-ink',
  string: 'text-accent',
  number: 'text-ink',
  literal: 'text-ink-3',
  punct: 'text-ink-3',
  space: '',
};

/** Syntax-highlighted JSON whose lines stream in when shown. */
export function JsonView({ value }: { value: JsonValue }): ReactNode {
  const lines = toLines(value);

  return (
    <pre className="overflow-x-auto px-5 py-5 font-mono text-[0.8125rem] leading-[1.75]">
      <code>
        {lines.map((line, index) => (
          <span
            key={index}
            className="stream-line block"
            style={{ '--line': index } as CSSProperties}
          >
            {line.map((token, t) => (
              <span key={t} className={tokenClass[token.kind]}>
                {token.text}
              </span>
            ))}
          </span>
        ))}
      </code>
    </pre>
  );
}
