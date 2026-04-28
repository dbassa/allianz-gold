'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { locales, type Locale } from '@/i18n/routing';
import { useTransition } from 'react';
import { cn } from '@/lib/cn';

const LABELS: Record<Locale, string> = {
  en: 'EN',
  es: 'ES',
  ar: 'AR',
};

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: Locale) {
    if (next === locale) return;
    startTransition(() => {
      // @ts-expect-error - params shape is route-dependent and matches at runtime
      router.replace({ pathname, params }, { locale: next });
    });
  }

  return (
    <div
      className={cn('flex items-center gap-1 text-xs tracking-[0.25em]', className)}
      role="group"
      aria-label="Language"
    >
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 ? <span aria-hidden="true" className="text-rule">·</span> : null}
          <button
            type="button"
            onClick={() => switchTo(l)}
            disabled={isPending}
            aria-current={l === locale ? 'true' : undefined}
            className={cn(
              'px-1 transition-colors duration-300',
              l === locale ? 'text-champagne' : 'text-paper/60 hover:text-paper',
            )}
          >
            {LABELS[l]}
          </button>
        </span>
      ))}
    </div>
  );
}
