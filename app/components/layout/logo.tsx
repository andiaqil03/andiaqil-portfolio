import { useId } from 'react';
import { Link } from 'react-router';
import { profile } from '~/content/profile';

/** The "A" mark: ink tile, canvas strokes, aurora crossbar. Same drawing as the favicon. */
export function LogoMark({ className }: { className?: string }) {
  const gradient = `logo-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={gradient} x1="12" x2="20" y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#818cf8" />
          <stop offset="0.5" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#34d399" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" className="fill-ink" />
      <path
        d="M9.5 23.5 16 8.5l6.5 15"
        fill="none"
        className="stroke-canvas"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.2 18.2h7.6"
        fill="none"
        stroke={`url(#${gradient})`}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      to="/"
      viewTransition
      onClick={onNavigate}
      className="group -m-1 inline-flex min-h-11 items-center gap-2.5 rounded-md p-1"
      aria-label={`${profile.name}, home`}
    >
      <LogoMark className="size-7 transition-transform duration-300 ease-out-soft group-hover:-rotate-6" />
      <span className="text-[0.9375rem] font-semibold tracking-[-0.01em]">{profile.name}</span>
    </Link>
  );
}
