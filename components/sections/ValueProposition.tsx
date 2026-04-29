import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Rule } from '@/components/ui/Rule';
import { Reveal } from '@/components/motion/Reveal';

export function ValueProposition() {
  const t = useTranslations('home.value');

  return (
    <section className="py-32 md:pt-30 md:pb-40">
      <Container size="narrow">
        <Rule className="mb-16" />
        <Reveal>
          <span className="eyebrow mb-8 block">{t('eyebrow')}</span>
          <h2 className="mb-10 font-display text-3xl leading-[1.15] text-paper md:text-5xl md:leading-[1.1]">
            {t('title')}
          </h2>
          <p className="text-lg leading-relaxed text-bone/75 md:text-xl">{t('body')}</p>
        </Reveal>
        <Rule className="mt-16" />
      </Container>
    </section>
  );
}
