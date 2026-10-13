import { FileText, Menu, Search, X } from 'lucide-react';
import { useEffect, useId, useState, useSyncExternalStore } from 'react';
import { NavLink, useLocation } from 'react-router';
import { site } from '~/content/site';
import { cn } from '~/lib/cn';
import { openCommandPalette } from '../fx/command-palette';
import { Action } from '../ui/action';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';

function subscribeToScroll(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
}

/** Whether the page has scrolled past the top; tightens the floating nav. */
function useScrolled() {
  return useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 24,
    () => false,
  );
}

function PaletteButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={openCommandPalette}
      aria-label="Open command palette"
      aria-keyshortcuts="Control+K Meta+K"
      className={cn(
        'inline-flex h-10 items-center gap-2 rounded-full border border-line bg-surface/70 pr-1.5 pl-3 text-sm text-ink-3 transition-colors duration-150 hover:border-line-strong hover:text-ink',
        className,
      )}
    >
      <Search aria-hidden="true" className="size-4" strokeWidth={1.75} />
      <span className="hidden lg:inline">Search</span>
      <kbd className="hidden rounded-full bg-surface-2 px-2 py-0.5 font-mono text-meta text-ink-3 sm:inline">
        ⌘K
      </kbd>
    </button>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const { pathname } = useLocation();
  const scrolled = useScrolled();
  const menuId = useId();

  // The menu belongs to the page it was opened on: navigating closes it.
  const isOpen = menuOpen && openedAt === pathname;
  const close = () => setMenuOpen(false);

  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  return (
    <header className="no-print pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 [view-transition-name:site-header] sm:px-5 sm:pt-4">
      <div
        className={cn(
          'glass pointer-events-auto mx-auto flex h-14 max-w-[72rem] items-center justify-between gap-3 rounded-full pr-2 pl-3 transition-[max-width,box-shadow,background-color] duration-500 ease-out-expo sm:pl-4',
          scrolled && 'max-w-[64rem] shadow-md',
        )}
      >
        <Logo onNavigate={close} />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {site.nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  viewTransition
                  className={({ isActive }) =>
                    cn(
                      'relative inline-flex h-10 items-center rounded-full px-3.5 text-[0.875rem] font-medium transition-colors duration-200',
                      isActive ? 'text-ink' : 'text-ink-2 hover:text-ink',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive ? (
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 -z-10 rounded-full bg-surface shadow-xs ring-1 ring-line"
                        />
                      ) : null}
                      {item.label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <PaletteButton />
          <ThemeToggle />
          <div className="hidden lg:block">
            <Action to={site.navCta.to} size="sm">
              <FileText aria-hidden="true" className="size-4" strokeWidth={1.75} />
              {site.navCta.label}
            </Action>
          </div>
          <button
            type="button"
            onClick={() => {
              if (isOpen) return close();
              setOpenedAt(pathname);
              setMenuOpen(true);
            }}
            aria-expanded={isOpen}
            aria-controls={menuId}
            aria-label="Menu"
            className="inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-2 lg:hidden"
          >
            {isOpen ? (
              <X aria-hidden="true" className="size-5" strokeWidth={1.75} />
            ) : (
              <Menu aria-hidden="true" className="size-5" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu: a glass sheet under the pill with staggered links. */}
      <div id={menuId} hidden={!isOpen} className="lg:hidden">
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={-1}
          onClick={close}
          className="pointer-events-auto fixed inset-0 -z-10 bg-[rgb(10_15_31/0.25)] backdrop-blur-[2px]"
        />
        <nav aria-label="Main" className="menu-in glass pointer-events-auto mt-2 rounded-xl p-3">
          <ul>
            {site.nav.map((item, index) => (
              <li
                key={item.to}
                className="menu-in"
                style={{ animationDelay: `${60 + index * 45}ms` }}
              >
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  viewTransition
                  onClick={close}
                  className={({ isActive }) =>
                    cn(
                      'flex h-12 items-center justify-between rounded-md px-3 font-display text-lg font-semibold tracking-[-0.02em] transition-colors',
                      isActive ? 'bg-surface text-ink shadow-xs' : 'text-ink-2 hover:text-ink',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive ? (
                        <span
                          aria-hidden="true"
                          className="size-2 rounded-full"
                          style={{ background: 'var(--gradient-aurora)' }}
                        />
                      ) : null}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-line pt-3">
            <Action to={site.navCta.to} className="w-full">
              <FileText aria-hidden="true" className="size-4" strokeWidth={1.75} />
              {site.navCta.label}
            </Action>
          </div>
        </nav>
      </div>
    </header>
  );
}
