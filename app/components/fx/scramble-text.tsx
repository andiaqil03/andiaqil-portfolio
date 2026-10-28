import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '~/lib/gsap';

const GLYPHS = '!<>-_\\/[]{}=+*^?#01';

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? '#';
}

/**
 * Cycles through `words`, decoding each one through random glyphs like a
 * terminal. The first word is what prerenders; cycling runs in the browser
 * only, and not on touch screens, where it reads as glyph noise. Decorative:
 * give the surrounding element an accessible label.
 */
export function ScrambleText({
  words,
  interval = 2800,
  startDelay = 0,
  className,
}: {
  words: string[];
  interval?: number;
  startDelay?: number;
  className?: string;
}) {
  const [text, setText] = useState(words[0] ?? '');
  const current = useRef(words[0] ?? '');

  useEffect(() => {
    if (words.length < 2 || prefersReducedMotion()) return;
    if (window.matchMedia('(hover: none)').matches) return;
    let frame = 0;
    let timer = 0;
    let index = 0;

    const scrambleTo = (target: string) => {
      const from = current.current;
      const length = Math.max(from.length, target.length);
      const plan = Array.from({ length }, (_, i) => ({
        from: from[i] ?? '',
        to: target[i] ?? '',
        start: Math.floor(Math.random() * 12),
        end: 12 + Math.floor(Math.random() * 20),
      }));
      let tick = 0;

      const step = () => {
        let settled = 0;
        const output = plan
          .map(({ from: a, to: b, start, end }) => {
            if (tick >= end) {
              settled++;
              return b;
            }
            return tick >= start ? randomGlyph() : a;
          })
          .join('');
        setText(output);
        if (settled < plan.length) {
          tick++;
          frame = requestAnimationFrame(step);
        } else {
          current.current = target;
        }
      };
      step();
    };

    const next = () => {
      index = (index + 1) % words.length;
      scrambleTo(words[index] ?? '');
      timer = window.setTimeout(next, interval);
    };
    timer = window.setTimeout(next, startDelay + interval);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [words, interval, startDelay]);

  return <span className={className}>{text}</span>;
}
