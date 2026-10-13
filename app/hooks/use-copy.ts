import { useCallback, useEffect, useState } from 'react';

export type CopyStatus = 'idle' | 'copied' | 'failed';

/** Copies text to the clipboard and reports the outcome for a couple of seconds. */
export function useCopy(resetAfterMs = 2200) {
  const [status, setStatus] = useState<CopyStatus>('idle');

  useEffect(() => {
    if (status === 'idle') return;
    const timer = window.setTimeout(() => setStatus('idle'), resetAfterMs);
    return () => window.clearTimeout(timer);
  }, [status, resetAfterMs]);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus('copied');
    } catch {
      setStatus('failed');
    }
  }, []);

  return { status, copy };
}
