import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';
import { cn } from '@/lib/cn';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  lede?: string;
  image?: string;
  className?: string;
};

export function PageHero({ eyebrow, title, lede, image, className }: PageHeroProps) {
  return (
    <section
      className={cn(
        'relative flex min-h-[50vh] flex-col justify-end overflow-hidden pb-20 pt-48 md:min-h-[60vh] md:pb-28',
        className,
      )}
    >
      {image ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt=""
            fill
            priority
            quality={80}
            className="object-cover object-center opacity-25 grayscale"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(12,12,14,0.10) 0%, rgba(22,29,38,0.50) 40%, rgba(12,12,14,0.60) 75%, rgba(12,12,14,0.98) 100%)',
            }}
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-ink-soft to-ink" />
      )}

      <Container className="relative z-10">
        <Reveal>
          <span className="eyebrow mb-8 block">{eyebrow}</span>
          <h1 className="mb-6 max-w-3xl font-display text-4xl leading-[1.1] tracking-tight text-paper md:text-6xl md:leading-[1.05]">
            {title}
          </h1>
          {lede ? (
            <p className="max-w-2xl text-base leading-relaxed text-bone/75 md:text-lg">{lede}</p>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
