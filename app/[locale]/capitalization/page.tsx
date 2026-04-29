import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/sections/PageHero';
import { PhaseTimeline } from '@/components/sections/PhaseTimeline';
import { FAQSection } from '@/components/sections/FAQSection';
import { CaseStudy } from '@/components/sections/CaseStudy';
import { EligibilityCriteria } from '@/components/sections/EligibilityCriteria';
import { Container } from '@/components/ui/Container';
import { Rule } from '@/components/ui/Rule';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'capitalization.hero' });
  return { title: t('title') };
}

export default async function CapitalizationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('capitalization');
  const acqPhases = t.raw('acquisition.phases') as Array<{
    label: string;
    title: string;
    body: string;
  }>;
  const monPhases = t.raw('monetization.phases') as Array<{
    label: string;
    title: string;
    body: string;
  }>;

  return (
    <>
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        lede={t('hero.lede')}
        image="/images/swiss_bank.webp"
      />

      {/* Acquisition path */}
      <section className="py-32 md:py-15">
        <Container>
          <PhaseTimeline
            number={t('acquisition.number')}
            title={t('acquisition.title')}
            subtitle={t('acquisition.subtitle')}
            phases={acqPhases}
          />
        </Container>
      </section>

      <Rule className="mx-auto max-w-6xl px-6 md:px-10" />

      {/* Monetization path */}
      <section className="py-32 md:py-15">
        <Container>
          <PhaseTimeline
            number={t('monetization.number')}
            title={t('monetization.title')}
            subtitle={t('monetization.subtitle')}
            phases={monPhases}
            badge={t('monetization.cycle')}
          />
        </Container>
      </section>

      {/* FAQ — placed immediately after Monetization as requested */}
      <FAQSection />

      {/* Case study */}
      <CaseStudy />

      {/* Eligibility */}
      <EligibilityCriteria />
    </>
  );
}
