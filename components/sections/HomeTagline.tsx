import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Rule } from '@/components/ui/Rule';
import { Reveal } from '@/components/motion/Reveal';

export function HomeTagline() {
  const tHome = useTranslations('home');
  const tCap = useTranslations('capitalization.hero');

  return (
    <section className="py-32 md:py-40">
      <Container size="narrow">
        <Rule className="mb-16" />
        <Reveal className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-3xl leading-[1.15] text-bone/80 md:text-5xl md:leading-[1.1]">
            {tHome('tagline')}
          </h2>
          <div className="shrink-0">
            <Button href="/capitalization">{tCap('eyebrow')}</Button>
          </div>
        </Reveal>
        <Rule className="mt-16" />
      </Container>
    </section>
  );
}
