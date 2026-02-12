'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const targetLocale = locale === 'tr' ? 'en' : 'tr';

    // Replace the current locale prefix in the pathname
    const segments = pathname.split('/');
    if (segments[1] === 'tr' || segments[1] === 'en') {
      segments[1] = targetLocale;
    } else {
      segments.splice(1, 0, targetLocale);
    }

    router.push(segments.join('/'));
  };

  return (
    <button
      onClick={toggleLocale}
      className={cn(
        'inline-flex items-center gap-2 px-3 py-2 rounded-lg',
        'text-neutral-600 hover:text-brand border border-neutral-200 hover:border-brand/30',
        'transition-all duration-300 text-sm font-body',
        className
      )}
      aria-label="Switch language"
    >
      <Globe className="w-4 h-4" />
      <span className="uppercase font-medium">
        {locale === 'tr' ? 'EN' : 'TR'}
      </span>
    </button>
  );
}
