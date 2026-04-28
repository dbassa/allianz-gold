import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/Accordion';
import { Reveal } from '@/components/motion/Reveal';

export function FAQSection() {
  const t = useTranslations('capitalization.faq');
  const items = t.raw('items') as Array<{ q: string; a: string }>;

  return (
    <section className="bg-ink-soft py-32 md:py-40">
      <Container>
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} className="mb-16" />
        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {items.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  );
}
