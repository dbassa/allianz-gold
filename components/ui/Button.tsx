import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/cn';

type ButtonProps = {
  href: ComponentProps<typeof Link>['href'];
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
  className?: string;
};

export function Button({ href, children, variant = 'primary', className }: ButtonProps) {
  const base =
    'group inline-flex items-center gap-3 text-sm uppercase tracking-[0.25em] transition-colors duration-500';
  const variants = {
    primary:
      'border border-champagne/60 px-7 py-4 text-champagne hover:border-champagne hover:bg-champagne/[0.06]',
    ghost: 'text-paper/80 hover:text-champagne',
  };
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      <span>{children}</span>
      <ArrowRight
        className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
        strokeWidth={1}
      />
    </Link>
  );
}
