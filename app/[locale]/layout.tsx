import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale, getTranslations, getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Playfair_Display, Inter, Noto_Naskh_Arabic, Noto_Sans_Arabic } from 'next/font/google';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { routing, getDirection } from '@/i18n/routing';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-display',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-sans',
});

const notoNaskh = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-arabic-display',
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-arabic-sans',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.hero' });

  const descriptions: Record<string, string> = {
    en: 'Transforming certified mineral resources into institutional liquidity through strategic asset structuring.',
    es: 'Transformamos inventarios certificados en liquidez institucional mediante estrategias de estructuración de activos.',
    ar: 'تحويل الموارد المعدنية المعتمدة إلى سيولة مؤسسية من خلال هيكلة الأصول الاستراتيجية.',
  };

  return {
    title: {
      template: '%s | Allianz Gold',
      default: 'Allianz Gold | Institutional Mining Capital',
    },
    description: descriptions[locale] ?? descriptions.en,
    openGraph: {
      type: 'website',
      siteName: 'Allianz Gold',
      locale,
      images: [
        {
          url: '/images/og-institutional.jpg',
          width: 1200,
          height: 630,
          alt: t('headline'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['/images/og-institutional.jpg'],
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    alternates: {
      canonical: `/${locale}`,
      languages: { en: '/en', es: '/es', ar: '/ar' },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);

  // Load messages server-side and pass them to the provider so that
  // client components (Nav, Hero, ContactForm…) can call useTranslations().
  const messages = await getMessages();

  const dir = getDirection(locale);
  const fontVariables = `${playfair.variable} ${inter.variable} ${notoNaskh.variable} ${notoSansArabic.variable}`;

  return (
    <html lang={locale} dir={dir} className={fontVariables} suppressHydrationWarning>
      <body className="min-h-screen bg-ink text-paper antialiased">
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded focus:bg-paper focus:px-4 focus:py-2 focus:text-ink focus:outline-none"
          >
            {locale === 'ar' ? 'تخطَّ إلى المحتوى' : locale === 'es' ? 'Saltar al contenido' : 'Skip to content'}
          </a>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
