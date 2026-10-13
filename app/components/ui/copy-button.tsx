import { Check, Copy } from 'lucide-react';
import { useCopy } from '~/hooks/use-copy';
import { cn } from '~/lib/cn';

interface CopyButtonProps {
  value: string;
  /** Visible label, e.g. "Copy email". */
  label: string;
  /** What was copied, for the screen-reader announcement. */
  subject: string;
  className?: string;
  /** Colour for the confirmed state; the default suits light surfaces. */
  copiedClassName?: string;
}

export function CopyButton({
  value,
  label,
  subject,
  className,
  copiedClassName = 'text-accent',
}: CopyButtonProps) {
  const { status, copy } = useCopy();
  const copied = status === 'copied';

  return (
    <>
      <button type="button" onClick={() => copy(value)} className={className}>
        {copied ? (
          <Check aria-hidden="true" className={cn('size-4', copiedClassName)} strokeWidth={2} />
        ) : (
          <Copy aria-hidden="true" className="size-4" strokeWidth={1.75} />
        )}
        <span className={cn(copied && copiedClassName)}>
          {copied ? 'Copied' : status === 'failed' ? 'Copy failed' : label}
        </span>
      </button>
      <span role="status" className="sr-only">
        {copied
          ? `${subject} copied to clipboard`
          : status === 'failed'
            ? `Couldn’t copy the ${subject.toLowerCase()}`
            : ''}
      </span>
    </>
  );
}
