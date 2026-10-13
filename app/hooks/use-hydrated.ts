import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/**
 * `false` during prerendering and hydration, `true` afterwards. Use it to defer
 * state that only exists in the browser (URL filters, theme, clipboard) so the
 * first client render matches the prerendered HTML.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
