import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('common');
  const locale = useLocale();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="text-center">
        <h1 className="text-8xl font-heading font-bold text-brand mb-4">
          404
        </h1>
        <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-4">{t('notFound')}</h2>
        <p className="text-neutral-500 mb-8 max-w-md mx-auto">{t('notFoundDesc')}</p>
        <Link
          href={`/${locale}`}
          className="inline-flex items-center px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-light transition-colors"
        >
          {t('goHome')}
        </Link>
      </div>
    </div>
  );
}
