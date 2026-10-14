import { Link } from 'react-router';
import { profile } from '~/content/profile';

/** The "A" mark: a pine tile whose letter is also a peak, with a trail-orange crossbar. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="9" className="fill-accent" />
      <path
        d="M9.5 23.5 16 8.5l6.5 15"
        fill="none"
        className="stroke-on-accent"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.2 18.2h7.6"
        fill="none"
        className="stroke-trail"
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
      <span className="text-sm font-semibold tracking-[-0.01em] whitespace-nowrap sm:text-[0.9375rem]">
        {profile.name}
      </span>
    </Link>
  );
}
