import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/sections/PageHero';
import { ContactForm } from '@/components/sections/ContactForm';
import { Container } from '@/components/ui/Container';
import { Rule } from '@/components/ui/Rule';
import { Reveal } from '@/components/motion/Reveal';
import { Mail, MapPin } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact.hero' });
  return { title: t('title') };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('contact');
  const lines = t.raw('intro.lines') as Array<{ label: string; email: string }>;

  return (
    <>
      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} />

      <section className="py-32 md:py-40">
        <Container>
          <div className="grid gap-20 md:grid-cols-2 md:gap-24">
            {/* Left — direct emails */}
            <Reveal className="flex flex-col gap-12">
              {lines.map((line) => (
                <div key={line.email} className="flex flex-col gap-3">
                  <span className="eyebrow">{line.label}</span>
                  <a
                    href={`mailto:${line.email}`}
                    className="link-underline font-display text-xl text-paper transition-colors hover:text-champagne md:text-2xl"
                  >
                    {line.email}
                  </a>
                </div>
              ))}

              <Rule />

              {/* Office info */}
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <MapPin strokeWidth={1} className="mt-1 h-4 w-4 shrink-0 text-champagne/60" />
                  <div className="flex flex-col gap-1 text-sm text-bone/65">
                    <p className="font-display text-base text-paper">{t('office.title')}</p>
                    <p className="leading-relaxed">{t('office.address')}</p>
                    <p className="mt-1 text-champagne/60">{t('office.license')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail strokeWidth={1} className="h-4 w-4 shrink-0 text-champagne/60" />
                  <a
                    href="mailto:info@allianzgold.com"
                    className="link-underline text-sm text-bone/65 hover:text-paper"
                  >
                    info@allianzgold.com
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Right — form */}
            <Reveal delay={0.15} className="flex flex-col gap-8">
              <p className="text-sm text-bone/60">{t('intro.or')}</p>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
