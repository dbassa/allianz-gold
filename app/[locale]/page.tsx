import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { ValueProposition } from '@/components/sections/ValueProposition';
import { Pillars } from '@/components/sections/Pillars';
import { GlobalPresence } from '@/components/sections/GlobalPresence';
import { HomeTagline } from '@/components/sections/HomeTagline';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ValueProposition />
      <Pillars />
      <GlobalPresence />
      <HomeTagline />
    </>
  );
}
