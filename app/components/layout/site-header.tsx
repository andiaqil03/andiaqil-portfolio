import { FileText, Menu, X } from 'lucide-react';
import { useEffect, useId, useState, useSyncExternalStore } from 'react';
import { NavLink, useLocation } from 'react-router';
import { site } from '~/content/site';
import { cn } from '~/lib/cn';
import { Action } from '../ui/action';
import { Container } from '../ui/container';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';

function subscribeToScroll(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
}

/** Whether the page has scrolled past the top; drives the header's border and shadow. */
function useScrolled() {
  return useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 8,
    () => false,
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
    <header
      className={cn(
        // The blur lives on a pseudo-element: backdrop-filter on the header itself would
        // trap the mobile menu's fixed overlay inside the 64px bar.
        'no-print sticky top-0 z-40 isolate border-b transition-[border-color,box-shadow] duration-300 [view-transition-name:site-header]',
        'before:absolute before:inset-0 before:-z-10 before:bg-canvas/85 before:backdrop-blur-md before:content-[""]',
        scrolled || isOpen ? 'border-line shadow-sm' : 'border-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <Logo onNavigate={close} />

        <div className="flex items-center gap-1">
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-0.5">
              {site.nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    viewTransition
                    className={({ isActive }) =>
                      cn(
                        'inline-flex h-10 items-center rounded-md px-3 text-[0.875rem] font-medium transition-colors duration-150',
                        isActive
                          ? 'bg-surface-2 text-ink'
                          : 'text-ink-2 hover:bg-surface-2/60 hover:text-ink',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <ThemeToggle />

          <div className="ml-1 hidden md:block">
            <Action to={site.navCta.to} variant="secondary" size="sm">
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
            className="inline-flex size-11 items-center justify-center rounded-md text-ink transition-colors hover:bg-surface-2 md:hidden"
          >
            {isOpen ? (
              <X aria-hidden="true" className="size-5" strokeWidth={1.75} />
            ) : (
              <Menu aria-hidden="true" className="size-5" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile menu: a compact sheet under the header. */}
      <div id={menuId} hidden={!isOpen} className="md:hidden">
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={-1}
          onClick={close}
          className="fixed inset-x-0 top-16 bottom-0 bg-ink/20 backdrop-blur-[1px]"
        />
        <nav
          aria-label="Main"
          className="menu-in absolute inset-x-0 top-full border-b border-line bg-surface shadow-md"
        >
          <Container className="py-3">
            <ul>
              {site.nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    viewTransition
                    onClick={close}
                    className={({ isActive }) =>
                      cn(
                        'flex h-12 items-center justify-between rounded-md px-3 text-base font-medium transition-colors',
                        isActive ? 'bg-surface-2 text-ink' : 'text-ink-2 hover:text-ink',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        {isActive ? (
                          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                        ) : null}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-3 border-t border-line pt-4 pb-2">
              <Action to={site.navCta.to} variant="secondary" className="w-full">
                <FileText aria-hidden="true" className="size-4" strokeWidth={1.75} />
                {site.navCta.label}
              </Action>
            </div>
          </Container>
        </nav>
      </div>
    </header>
  );
}
