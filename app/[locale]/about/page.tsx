import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/sections/PageHero';
import { Leadership } from '@/components/sections/Leadership';
import { Container } from '@/components/ui/Container';
import { Rule } from '@/components/ui/Rule';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about.hero' });
  return { title: t('title') };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('about');
  const items = (await getTranslations('about.positioning')).raw('items') as string[];

  return (
    <>
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        image="/images/mining_steel_structures.webp"
      />

      {/* Intro */}
      <section className="py-32 md:py-40">
        <Container size="narrow">
          <Rule className="mb-16" />
          <Reveal>
            <p className="text-lg leading-relaxed text-bone/80 md:text-xl md:leading-relaxed">
              {t('intro.body')}
            </p>
          </Reveal>
          <Rule className="mt-16" />
        </Container>
      </section>

      {/* Positioning */}
      <section className="bg-ink-soft py-28 md:py-36">
        <Container>
          <Reveal>
            <h2 className="mb-16 font-display text-2xl text-paper md:text-3xl">
              {t('positioning.title')}
            </h2>
          </Reveal>
          <Stagger className="flex flex-col gap-0 divide-y divide-rule/40">
            {items.map((item, i) => (
              <StaggerItem
                key={i}
                className="flex gap-6 py-8 text-base leading-relaxed text-bone/75 md:py-10 md:text-lg"
              >
                <span className="tnum mt-1 shrink-0 font-display text-sm text-champagne/60">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p>{item}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <Leadership />
    </>
  );
}
