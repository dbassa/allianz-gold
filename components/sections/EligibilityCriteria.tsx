import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';

export function EligibilityCriteria() {
  const t = useTranslations('capitalization.eligibility');
  const rows = t.raw('rows') as Array<{ label: string; value: string }>;

  return (
    <section className="py-32 md:py-40">
      <Container>
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          body={t('body')}
          className="mb-16"
        />
        <Reveal delay={0.1}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-rule/50 transition-colors hover:bg-ink-soft/30"
                  >
                    <td className="py-6 pe-8 align-top font-display text-sm text-champagne/90 md:py-8 md:text-base">
                      {row.label}
                    </td>
                    <td className="py-6 align-top leading-relaxed text-bone/75 md:py-8">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
