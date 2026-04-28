import { cn } from '@/lib/cn';
import type { HTMLAttributes } from 'react';

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: 'default' | 'narrow' | 'wide';
};

export function Container({ className, size = 'default', ...props }: ContainerProps) {
  const sizes = {
    narrow: 'max-w-3xl',
    default: 'max-w-6xl',
    wide: 'max-w-7xl',
  };
  return (
    <div className={cn('mx-auto w-full px-6 md:px-10', sizes[size], className)} {...props} />
  );
}
