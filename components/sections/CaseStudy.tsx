import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';

export function CaseStudy() {
  const t = useTranslations('capitalization.case');
  const steps = t.raw('steps') as string[];

  return (
    <section className="py-32 md:py-40">
      <Container>
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} className="mb-16" />
        <Stagger className="flex flex-col">
          {steps.map((step, i) => (
            <StaggerItem
              key={i}
              className="flex gap-8 border-b border-rule/40 py-10 transition-colors hover:bg-ink-soft/20 md:items-start"
            >
              <span className="tnum mt-1 shrink-0 font-display text-4xl text-rule md:text-5xl">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="max-w-prose text-base leading-relaxed text-bone/75 md:text-lg">{step}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
