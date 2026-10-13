import { flushSync } from 'react-dom';
import { useCallback, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function applyTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Storage can be unavailable (private mode); the choice still applies to this page view.
  }
}

/**
 * The active colour theme. Light is the default; dark applies only when the
 * visitor chooses it. `null` until hydrated, because the prerendered HTML
 * can't know a stored preference.
 */
export function useTheme() {
  const theme = useSyncExternalStore<Theme | null>(subscribe, getTheme, () => null);

  /** Switches theme with a circular reveal that grows from `origin` (e.g. the toggle). */
  const setTheme = useCallback((next: Theme, origin?: { x: number; y: number }) => {
    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!document.startViewTransition || reduced) {
      applyTheme(next);
      return;
    }

    root.style.setProperty('--vt-x', `${origin?.x ?? window.innerWidth / 2}px`);
    root.style.setProperty('--vt-y', `${origin?.y ?? 0}px`);
    root.classList.add('vt-theme');
    const transition = document.startViewTransition(() => flushSync(() => applyTheme(next)));
    transition.finished.finally(() => root.classList.remove('vt-theme'));
  }, []);

  return { theme, setTheme };
}

/**
 * Inlined in <head> so the right theme is applied before first paint.
 * Light unless the visitor previously chose dark. Also decides whether the
 * intro plays (first visit per session, motion allowed).
 */
export const themeInitScript = `(function(){var d=document.documentElement;try{d.dataset.theme=localStorage.getItem('${STORAGE_KEY}')==='dark'?'dark':'light'}catch(e){d.dataset.theme='light'}try{var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(r||sessionStorage.getItem('intro-seen')){d.classList.add('no-intro')}else{sessionStorage.setItem('intro-seen','1')}}catch(e){d.classList.add('no-intro')}})();`;
