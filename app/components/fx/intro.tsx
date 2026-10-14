import { useEffect } from 'react';
import { profile } from '~/content/profile';

/**
 * Branded intro: a mountain ridge draws itself, a counter runs to 100 and
 * the panel lifts away. Entirely CSS-driven so it never waits for JavaScript;
 * the head script in use-theme.ts skips it after the first visit of a session
 * and for reduced motion.
 */
export function Intro() {
  // Once it has played, retire it for the rest of the session (also removes the hero delay).
  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains('no-intro')) return;
    const id = window.setTimeout(() => root.classList.add('no-intro'), 2200);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div
      id="intro"
      aria-hidden="true"
      className="no-print pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-[#17352a] text-white"
    >
      <div className="intro-content flex flex-col items-center gap-5">
        <svg viewBox="0 0 96 48" className="w-28" fill="none">
          <path
            className="intro-stroke"
            d="M4 44 30 14l12 13 14-21 36 38"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="intro-stroke"
            d="M56 6V0m0 0h10l-3 3 3 3H56"
            stroke="#f0a35e"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="font-display text-3xl tracking-[0.02em] uppercase">{profile.name}</p>
        <div className="flex w-44 items-center gap-3">
          <div className="h-px flex-1 overflow-hidden bg-white/15">
            <div className="intro-bar h-full bg-[#f0a35e]" />
          </div>
          <span className="intro-count w-8 text-right font-mono text-xs text-white/60 tabular-nums" />
        </div>
      </div>
    </div>
  );
}
