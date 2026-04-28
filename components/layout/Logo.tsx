import { Link } from '@/i18n/routing';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={
        className ??
        'flex items-baseline gap-3 text-paper transition-colors hover:text-champagne'
      }
    >
      <span className="font-display text-xl tracking-wide md:text-2xl">Allianz Gold</span>
      <span aria-hidden="true" className="hidden h-px w-8 bg-champagne md:inline-block" />
    </Link>
  );
}
