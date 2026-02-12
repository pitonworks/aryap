'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'motion/react';
import { Home, Building2, Map, Eye, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { key: 'home', href: '/', icon: Home },
  { key: 'projects', href: '/projects', icon: Building2 },
  { key: 'map', href: '/map', icon: Map },
  { key: 'virtualTour', href: '/virtual-tour', icon: Eye },
  { key: 'contact', href: '/contact', icon: Phone },
] as const;

export function BottomNav() {
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();

  const isActive = (href: string) => {
    const localePath = `/${locale}`;
    if (href === '/') {
      return pathname === localePath || pathname === `${localePath}/`;
    }
    return pathname.startsWith(`${localePath}${href}`);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="bg-white/80 backdrop-blur-xl border-t border-white/40 shadow-glass pb-safe">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.key}
                href={`/${locale}${item.href === '/' ? '' : item.href}`}
                className={cn(
                  'relative flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-colors duration-200',
                  active ? 'text-brand' : 'text-neutral-400'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium leading-none">
                  {t(item.key)}
                </span>
                {active && (
                  <motion.span
                    layoutId="bottomNavIndicator"
                    className="absolute -top-0.5 w-8 h-0.5 bg-brand rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default BottomNav;
