'use client';

import { useTranslations } from 'next-intl';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('common');

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="text-center">
        <h1 className="text-6xl font-heading font-bold text-brand mb-4">
          Oops!
        </h1>
        <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-4">
          {t('errorTitle')}
        </h2>
        <p className="text-neutral-500 mb-8 max-w-md mx-auto">
          {t('errorDesc')}
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-light transition-colors"
        >
          {t('tryAgain')}
        </button>
      </div>
    </div>
  );
}
