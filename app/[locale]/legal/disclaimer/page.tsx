import { setRequestLocale, getTranslations } from 'next-intl/server';
import { LegalPage } from '@/components/sections/LegalPage';

export default async function DisclaimerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('legal.disclaimer');
  return <LegalPage title={t('title')} placeholder={t('placeholder')} />;
}
