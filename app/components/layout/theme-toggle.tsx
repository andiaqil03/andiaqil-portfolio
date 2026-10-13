import { Moon, Sun } from 'lucide-react';
import { useTheme } from '~/hooks/use-theme';

/** Light by default; switching grows the new theme out of the button in a circle. */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setTheme(theme === 'dark' ? 'light' : 'dark', {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }}
      aria-label="Dark theme"
      aria-pressed={theme === null ? undefined : theme === 'dark'}
      className="group inline-flex size-10 items-center justify-center rounded-full text-ink-2 transition-colors duration-150 hover:bg-surface-2 hover:text-ink"
    >
      {/* Icons swap in CSS so the prerendered HTML is right before hydration. */}
      <Moon
        aria-hidden="true"
        className="size-[1.125rem] transition-transform duration-500 ease-out-expo group-hover:-rotate-[20deg] dark:hidden"
        strokeWidth={1.75}
      />
      <Sun
        aria-hidden="true"
        className="hidden size-[1.125rem] transition-transform duration-700 ease-out-expo group-hover:rotate-90 dark:block"
        strokeWidth={1.75}
      />
    </button>
  );
}
