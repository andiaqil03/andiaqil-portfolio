import { Mail } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';
import { resolved } from '~/content/placeholder';
import { profile } from '~/content/profile';
import { cn } from '~/lib/cn';
import { GitHubIcon, LinkedInIcon } from './brand-icons';

interface SocialLink {
  label: string;
  href: string;
  external: boolean;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export function socialLinks(): SocialLink[] {
  const github = resolved(profile.links.github);
  const linkedin = resolved(profile.links.linkedin);
  return [
    ...(github ? [{ label: 'GitHub', href: github, external: true, Icon: GitHubIcon }] : []),
    ...(linkedin
      ? [{ label: 'LinkedIn', href: linkedin, external: true, Icon: LinkedInIcon }]
      : []),
    { label: 'Email', href: `mailto:${profile.email}`, external: false, Icon: Mail },
  ];
}

/**
 * GitHub, LinkedIn and Email. `labelled` shows text next to each icon;
 * otherwise they are 44px icon buttons with accessible names.
 */
export function SocialLinks({
  labelled = false,
  className,
}: {
  labelled?: boolean;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        'flex flex-wrap items-center',
        labelled ? 'gap-x-5 gap-y-1' : 'gap-1',
        className,
      )}
    >
      {socialLinks().map(({ label, href, external, Icon }) => (
        <li key={label}>
          <a
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            aria-label={labelled ? undefined : external ? `${label} (opens in a new tab)` : label}
            className={cn(
              'inline-flex items-center text-ink-2 transition-colors duration-150 hover:text-ink',
              labelled
                ? 'min-h-11 gap-2 text-[0.9375rem] font-medium'
                : 'size-11 justify-center rounded-md hover:bg-surface-2',
            )}
          >
            <Icon className="size-[1.125rem] shrink-0" strokeWidth={1.75} />
            {labelled ? (
              <>
                {label}
                {external ? <span className="sr-only">(opens in a new tab)</span> : null}
              </>
            ) : null}
          </a>
        </li>
      ))}
    </ul>
  );
}
