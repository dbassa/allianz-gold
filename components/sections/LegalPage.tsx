import { Container } from '@/components/ui/Container';
import { Rule } from '@/components/ui/Rule';
import { Reveal } from '@/components/motion/Reveal';

type LegalPageProps = {
  title: string;
  placeholder: string;
};

export function LegalPage({ title, placeholder }: LegalPageProps) {
  return (
    <section className="min-h-screen py-48">
      <Container size="narrow">
        <Reveal className="flex flex-col gap-12">
          <h1 className="font-display text-4xl text-paper md:text-6xl">{title}</h1>
          <Rule />
          <p className="text-sm uppercase tracking-[0.25em] text-champagne/60">{placeholder}</p>
        </Reveal>
      </Container>
    </section>
  );
}
