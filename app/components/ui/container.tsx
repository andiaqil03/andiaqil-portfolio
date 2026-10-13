import type { ReactNode } from 'react';
import { cn } from '~/lib/cn';

/** Max 76rem; 16px gutters on phones, 24px from 640px, 32px from 1024px. */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn('mx-auto w-full max-w-[76rem] px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
}
