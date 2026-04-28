'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useIsClient } from '@/lib/useIsClient';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'header' | 'li';
  y?: number;
};

export function Reveal({ children, delay = 0, className, as = 'div', y = 20 }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const isClient = useIsClient();
  const Component = motion[as];

  // On the server (and on first client paint before hydration), render a plain
  // element so the HTML matches exactly — no opacity-0 mismatch.
  if (!isClient || prefersReducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
