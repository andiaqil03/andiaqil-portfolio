import { Moon, Sun } from 'lucide-react';
import { useTheme } from '~/hooks/use-theme';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Dark theme"
      aria-pressed={theme === null ? undefined : theme === 'dark'}
      className="inline-flex size-11 items-center justify-center rounded-md text-ink-2 transition-colors duration-150 hover:bg-surface-2 hover:text-ink"
    >
      {/* Icons swap in CSS so the prerendered HTML is right before hydration. */}
      <Moon aria-hidden="true" className="size-[1.125rem] dark:hidden" strokeWidth={1.75} />
      <Sun aria-hidden="true" className="hidden size-[1.125rem] dark:block" strokeWidth={1.75} />
    </button>
  );
}
