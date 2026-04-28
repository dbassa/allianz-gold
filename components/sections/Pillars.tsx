import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import {
  Building2,
  Scale,
  Globe,
  ShieldCheck,
  BarChart3,
  Gavel,
  Landmark,
  FileCheck,
} from 'lucide-react';

const FINANCIAL_ICONS = [Globe, Building2, Landmark, BarChart3, ShieldCheck];
const LEGAL_ICONS = [Scale, Gavel, ShieldCheck, FileCheck];

export function Pillars() {
  const t = useTranslations('home.pillars');
  const financialItems = t.raw('financial.items') as Array<{ title: string; body: string }>;
  const legalItems = t.raw('legal.items') as Array<{ title: string; body: string }>;

  return (
    <section className="bg-ink-soft py-32 md:py-40">
      <Container>
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          className="mb-20"
        />

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Financial infrastructure */}
          <PillarColumn
            title={t('financial.title')}
            items={financialItems}
            icons={FINANCIAL_ICONS}
          />

          {/* Legal infrastructure */}
          <PillarColumn
            title={t('legal.title')}
            items={legalItems}
            icons={LEGAL_ICONS}
          />
        </div>
      </Container>
    </section>
  );
}

function PillarColumn({
  title,
  items,
  icons,
}: {
  title: string;
  items: Array<{ title: string; body: string }>;
  icons: typeof FINANCIAL_ICONS;
}) {
  return (
    <Reveal>
      <h3 className="mb-10 font-display text-xl text-champagne md:text-2xl">{title}</h3>
      <Stagger className="flex flex-col gap-8">
        {items.map((item, i) => {
          const Icon = icons[i] ?? ShieldCheck;
          return (
            <StaggerItem key={i} className="flex gap-5">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-none border border-rule/50 text-champagne/80">
                <Icon strokeWidth={1} className="h-4 w-4" />
              </div>
              <div>
                <p className="mb-1 font-display text-sm text-paper">{item.title}</p>
                <p className="text-sm leading-relaxed text-bone/65">{item.body}</p>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Reveal>
  );
}
