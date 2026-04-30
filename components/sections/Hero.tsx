"use client";

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export function Hero() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative flex min-h-screen flex-col justify-end overflow-hidden pb-24 pt-40 md:pb-32">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/macro_minerals.webp"
          alt=""
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlay — navy at bottom, slight transparency at top */}
        {/* Radial overlay: transparent at centre to reveal the golden vein, near-opaque at edges for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(12,12,14,0.18) 0%, rgba(22,29,38,0.58) 40%, rgba(12,12,14,0.90) 75%, rgba(12,12,14,1.00) 100%)',
          }}
        />
      </div>

      <Container className="relative z-10">
        {/* Thin champagne accent line */}
        <motion.div
          className="mb-10 h-px w-16 bg-champagne"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.h1
          className="mb-8 max-w-4xl font-display text-5xl leading-[1.05] tracking-tight text-paper md:text-7xl md:leading-[1.02]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {t('headline')}
        </motion.h1>

        <motion.p
          className="mb-14 max-w-2xl text-base leading-relaxed text-bone/80 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {t('lede')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button href="/capitalization">{t('cta')}</Button>
        </motion.div>
      </Container>

    </section>
  );
}
