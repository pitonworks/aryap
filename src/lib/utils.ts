import { type ClassValue, clsx } from 'clsx';

// Simple cn utility without tailwind-merge to keep deps minimal
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('tr-TR').format(num);
}

export function getLocalizedValue<T>(obj: { tr: T; en: T }, locale: string): T {
  return locale === 'en' ? obj.en : obj.tr;
}
