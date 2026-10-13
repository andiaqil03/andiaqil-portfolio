import { useEffect } from 'react';
import { profile } from '~/content/profile';

/**
 * Branded intro: the mark draws itself, a counter runs to 100 and the panel
 * lifts away. Entirely CSS-driven so it never waits for JavaScript; the head
 * script in use-theme.ts skips it after the first visit of a session and for
 * reduced motion.
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
      className="no-print pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0f1f] text-white"
    >
      <div className="intro-content flex flex-col items-center gap-6">
        <svg viewBox="0 0 32 32" className="size-16" fill="none">
          <path
            className="intro-stroke"
            d="M9.5 23.5 16 8.5l6.5 15"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="intro-stroke"
            d="M12.2 18.2h7.6"
            stroke="url(#intro-gradient)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id="intro-gradient"
              x1="12"
              x2="20"
              y1="0"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#6366f1" />
              <stop offset="0.5" stopColor="#0ea5e9" />
              <stop offset="1" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>
        <p className="font-display text-2xl font-semibold tracking-[-0.03em]">{profile.name}</p>
        <div className="flex w-44 items-center gap-3">
          <div className="h-px flex-1 overflow-hidden bg-white/15">
            <div className="intro-bar h-full" style={{ background: 'var(--gradient-aurora)' }} />
          </div>
          <span className="intro-count w-8 text-right font-mono text-xs text-white/60 tabular-nums" />
        </div>
      </div>
    </div>
  );
}
