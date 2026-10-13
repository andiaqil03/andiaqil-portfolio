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

/**
 * The active colour theme. `null` until hydrated, because the prerendered HTML
 * can't know which theme the visitor's browser resolved.
 */
export function useTheme() {
  const theme = useSyncExternalStore<Theme | null>(subscribe, getTheme, () => null);

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the choice still applies to this page view.
    }
  }, []);

  return { theme, setTheme };
}

/**
 * Inlined in <head> so the right theme is applied before first paint.
 * Follows the system setting until the visitor picks a theme explicitly.
 */
export const themeInitScript = `(function(){var d=document.documentElement,m=window.matchMedia('(prefers-color-scheme: dark)');function s(){try{return localStorage.getItem('${STORAGE_KEY}')}catch(e){return null}}function a(){var t=s();d.dataset.theme=t==='dark'||t==='light'?t:(m.matches?'dark':'light')}a();m.addEventListener('change',function(){if(!s())a()})})();`;
