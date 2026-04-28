import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Rule } from '@/components/ui/Rule';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';

export function Leadership() {
  const t = useTranslations('about');
  const areas = t.raw('leadership.areas') as Array<{ title: string; body: string }>;
  const members = t.raw('governance.members') as Array<{ name: string; role: string }>;

  return (
    <>
      {/* Multidisciplinary leadership */}
      <section className="py-32 md:py-40">
        <Container>
          <SectionHeader
            eyebrow={t('leadership.title')}
            title={t('leadership.body')}
            className="mb-20 max-w-2xl"
          />
          <Stagger className="grid gap-px border border-rule/30 md:grid-cols-3">
            {areas.map((area, i) => (
              <StaggerItem
                key={i}
                className="flex flex-col gap-4 border border-rule/20 p-10 transition-colors hover:bg-ink-soft/40"
              >
                <span className="font-display text-sm text-champagne">{`0${i + 1}`}</span>
                <h3 className="font-display text-xl text-paper">{area.title}</h3>
                <p className="text-sm leading-relaxed text-bone/65">{area.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Governance */}
      <section className="bg-ink-soft py-24 md:py-32">
        <Container>
          <Rule className="mb-16" />
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-20">
            <h2 className="shrink-0 font-display text-2xl text-paper md:text-3xl">
              {t('governance.title')}
            </h2>
            <Stagger className="flex flex-col gap-8 md:flex-row md:gap-16">
              {members.map((member) => (
                <StaggerItem key={member.name} className="flex flex-col gap-2">
                  <p className="font-display text-xl text-paper md:text-2xl">{member.name}</p>
                  <p className="text-sm text-champagne/80">{member.role}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <Rule className="mt-16" />
        </Container>
      </section>
    </>
  );
}
