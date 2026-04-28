import { cn } from '@/lib/cn';
import { Reveal } from '@/components/motion/Reveal';

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: 'start' | 'center';
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  body,
  align = 'start',
  className,
}: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-6',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="max-w-3xl text-3xl leading-[1.15] md:text-5xl md:leading-[1.1]">{title}</h2>
      {body ? <p className="max-w-prose text-base text-bone/80 md:text-lg">{body}</p> : null}
    </Reveal>
  );
}
