'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { Logo } from '@/components/layout/Logo';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { href: '/about', key: 'about' },
  { href: '/capitalization', key: 'capitalization' },
  { href: '/contact', key: 'contact' },
] as const;

export function Nav() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-all duration-700',
          scrolled
            ? 'bg-ink/95 shadow-[0_1px_0_0_theme(colors.rule)] backdrop-blur-sm'
            : 'bg-transparent',
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10 md:py-6">
          {/* Logo */}
          <Logo />

          {/* Desktop nav */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-10 md:flex"
          >
            {NAV_LINKS.map(({ href, key }) => (
              <NavLink key={key} href={href} label={t(key)} pathname={pathname} />
            ))}
          </nav>

          {/* Right side: language + mobile toggle */}
          <div className="flex items-center gap-6">
            <LanguageSwitcher className="hidden md:flex" />

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center text-paper/80 transition-colors hover:text-champagne md:hidden"
            >
              {open ? <X strokeWidth={1} className="h-5 w-5" /> : <Menu strokeWidth={1} className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-0 z-30 flex min-h-screen flex-col bg-ink px-6 pb-12 pt-24 md:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {NAV_LINKS.map(({ href, key }) => (
                <Link
                  key={key}
                  href={href}
                  className="border-b border-rule py-6 font-display text-2xl text-paper/80 transition-colors hover:text-champagne"
                >
                  {t(key)}
                </Link>
              ))}
            </nav>
            <div className="mt-auto pt-12">
              <LanguageSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({
  href,
  label,
  pathname,
}: {
  href: string;
  label: string;
  pathname: string;
}) {
  // pathname includes the locale prefix, e.g. /en/about
  const isActive = pathname.includes(href);

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'link-underline font-display text-xs uppercase tracking-[0.2em] transition-colors duration-300',
        isActive ? 'text-champagne after:scale-x-100' : 'text-paper/70 hover:text-paper',
      )}
    >
      {label}
    </Link>
  );
}
