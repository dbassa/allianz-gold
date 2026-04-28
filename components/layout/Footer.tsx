import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Container } from '@/components/ui/Container';
import { Rule } from '@/components/ui/Rule';
import { Logo } from '@/components/layout/Logo';

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  const legal = [
    { href: '/legal/notice', key: 'notice' },
    { href: '/legal/privacy', key: 'privacy' },
    { href: '/legal/cookies', key: 'cookies' },
    { href: '/legal/disclaimer', key: 'disclaimer' },
  ] as const;

  return (
    <footer className="bg-ink-soft pt-20 pb-10">
      <Container>
        {/* Top row */}
        <div className="mb-16 flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Logo />
            <p className="max-w-xs font-display text-base leading-relaxed text-bone/70 md:text-lg">
              {t('tagline')}
            </p>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-10 text-sm sm:grid-cols-3">
            {/* Navigation */}
            <div className="flex flex-col gap-4">
              <span className="eyebrow">{t('contact')}</span>
              <a
                href="mailto:info@allianzgold.com"
                className="link-underline text-bone/70 transition-colors hover:text-paper"
              >
                info@allianzgold.com
              </a>
              <a
                href="https://www.allianzgold.com"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-bone/70 transition-colors hover:text-paper"
              >
                www.allianzgold.com
              </a>
            </div>

            {/* Headquarters */}
            <div className="flex flex-col gap-4">
              <span className="eyebrow">{t('headquarters')}</span>
              <address className="not-italic leading-relaxed text-bone/70">
                {t('address').split('·').map((part, i) => (
                  <span key={i} className="block">
                    {i === 0 ? part : `· ${part}`}
                  </span>
                ))}
              </address>
              <p className="text-bone/50">{t('license')}</p>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-4">
              <span className="eyebrow">{t('legal')}</span>
              <nav aria-label="Legal links" className="flex flex-col gap-3">
                {legal.map(({ href, key }) => (
                  <Link
                    key={key}
                    href={href}
                    className="link-underline w-fit text-bone/70 transition-colors hover:text-paper"
                  >
                    {t(key)}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <Rule />

        {/* Bottom row */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 text-xs text-bone/40 sm:flex-row sm:items-center">
          <p>{t('rights', { year })}</p>
          <p className="font-display tracking-wider text-champagne/40">
            NI 43-101 · JORC · SBLC · SPV
          </p>
        </div>
      </Container>
    </footer>
  );
}
