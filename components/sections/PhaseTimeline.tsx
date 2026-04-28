import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { Rule } from '@/components/ui/Rule';

type Phase = { label: string; title: string; body: string };

type PhaseTimelineProps = {
  number: string;
  title: string;
  subtitle: string;
  phases: Phase[];
  badge?: string;
};

export function PhaseTimeline({ number, title, subtitle, phases, badge }: PhaseTimelineProps) {
  return (
    <div className="flex flex-col gap-12">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-baseline gap-4">
          <span className="font-display text-5xl text-rule md:text-7xl">{number}</span>
          <div>
            <h2 className="font-display text-2xl text-paper md:text-3xl">{title}</h2>
            <p className="mt-1 text-sm text-bone/65">{subtitle}</p>
          </div>
        </div>
        {badge ? (
          <span className="inline-flex w-fit border border-champagne/40 px-4 py-1.5 font-display text-xs text-champagne">
            {badge}
          </span>
        ) : null}
      </div>

      <Rule />

      {/* Phases */}
      <Stagger className="grid gap-px border border-rule/30 sm:grid-cols-2 lg:grid-cols-4">
        {phases.map((phase, i) => (
          <StaggerItem
            key={i}
            className="flex flex-col gap-4 border border-rule/20 p-8 transition-colors hover:bg-ink-soft/40"
          >
            <div className="flex items-center gap-3">
              <span className="font-display text-xs text-champagne/70">{phase.label}</span>
              <div className="h-px flex-1 bg-rule/50" />
            </div>
            <h3 className="font-display text-xl text-paper">{phase.title}</h3>
            <p className="text-sm leading-relaxed text-bone/65">{phase.body}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
