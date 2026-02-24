'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'projects', href: '/projects' },
  { key: 'map', href: '/map' },
  { key: 'virtualTour', href: '/virtual-tour' },
] as const;

export function Header() {
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const switchLocale = () => {
    const targetLocale = locale === 'tr' ? 'en' : 'tr';
    const pathWithoutLocale = pathname.replace(/^\/(tr|en)/, '') || '/';
    router.push(`/${targetLocale}${pathWithoutLocale}`);
  };

  const isActiveLink = (href: string) => {
    const localePath = `/${locale}`;
    if (href === '/') {
      return pathname === localePath || pathname === `${localePath}/`;
    }
    return pathname.startsWith(`${localePath}${href}`);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white border-b border-neutral-100 shadow-sm'
            : 'bg-transparent'
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center">
              <Image
                src="/images/logo-black.webp"
                alt="Aryap"
                width={120}
                height={32}
                className="h-7 sm:h-8 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActiveLink(link.href);
                return (
                  <Link
                    key={link.key}
                    href={`/${locale}${link.href === '/' ? '' : link.href}`}
                    className={cn(
                      'relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 rounded-lg',
                      active
                        ? 'text-neutral-900 font-semibold'
                        : 'text-neutral-500 hover:text-neutral-900'
                    )}
                  >
                    {t(link.key)}
                    {active && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-neutral-900 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right section */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <button
                onClick={switchLocale}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 rounded-lg transition-colors duration-300"
                aria-label={t('language')}
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase tracking-wider text-xs font-semibold">
                  {locale === 'tr' ? 'EN' : 'TR'}
                </span>
              </button>

              {/* Desktop CTA */}
              <Link
                href={`/${locale}/contact`}
                className="hidden lg:inline-flex items-center px-5 py-2.5 bg-neutral-900 text-white text-sm font-semibold rounded-full hover:bg-neutral-800 transition-colors duration-300"
              >
                {t('contact')}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 text-neutral-700 hover:text-neutral-900 rounded-lg transition-colors duration-300"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/20"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-xl pt-24 px-8 pb-8 flex flex-col"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link, index) => {
                  const active = isActiveLink(link.href);
                  return (
                    <motion.div
                      key={link.key}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index + 0.1, duration: 0.3 }}
                    >
                      <Link
                        href={`/${locale}${link.href === '/' ? '' : link.href}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          'block py-3 px-4 text-lg font-medium rounded-xl transition-colors duration-200',
                          active
                            ? 'text-neutral-900 bg-neutral-50 font-semibold'
                            : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                        )}
                      >
                        {t(link.key)}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="mt-8"
              >
                <Link
                  href={`/${locale}/contact`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center py-3.5 bg-neutral-900 text-white font-semibold rounded-full hover:bg-neutral-800 transition-colors duration-300"
                >
                  {t('contact')}
                </Link>
              </motion.div>

              {/* Footer info */}
              <div className="mt-auto pt-8 border-t border-neutral-100">
                <p className="text-xs text-neutral-400 tracking-wider uppercase">
                  {t('siteName')}
                </p>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
