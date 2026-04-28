import { cn } from '@/lib/cn';

export function Rule({ className, accent = false }: { className?: string; accent?: boolean }) {
  return (
    <hr
      aria-hidden="true"
      className={cn(
        'h-px w-full border-0',
        accent ? 'bg-champagne/60' : 'bg-rule',
        className,
      )}
    />
  );
}
