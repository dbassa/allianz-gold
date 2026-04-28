import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { MapPin } from 'lucide-react';

export function GlobalPresence() {
  const t = useTranslations('home.presence');
  const cities = t.raw('cities') as string[];

  return (
    <section className="relative overflow-hidden py-32 md:py-40">
      {/* Subtle background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/swiss_bank.webp"
          alt=""
          fill
          quality={70}
          className="object-cover object-center opacity-30 grayscale"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink/65" />
      </div>

      <Container className="relative z-10">
        <div className="grid gap-16 md:grid-cols-2 md:items-end">
          <Reveal>
            <span className="eyebrow mb-8 block">{t('eyebrow')}</span>
            <h2 className="mb-8 font-display text-3xl leading-[1.15] md:text-5xl md:leading-[1.1]">
              {t('title')}
            </h2>
            <p className="max-w-prose text-base text-bone/70 md:text-lg">{t('body')}</p>
          </Reveal>

          <Stagger className="grid grid-cols-2 gap-px border border-rule/40">
            {cities.map((city) => (
              <StaggerItem
                key={city}
                className="flex items-center gap-3 border border-rule/20 px-6 py-8 transition-colors hover:bg-ink-soft/60"
              >
                <MapPin strokeWidth={1} className="h-4 w-4 shrink-0 text-champagne/70" />
                <span className="font-display text-lg text-paper">{city}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
