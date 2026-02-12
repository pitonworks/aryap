'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
  { key: 'contact', href: '/contact' },
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
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
            ? 'bg-white/90 backdrop-blur-md border-b border-neutral-100 shadow-sm'
            : 'bg-transparent'
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="relative group flex items-center"
            >
              <span className="text-2xl sm:text-3xl font-heading text-brand font-bold tracking-[0.2em]">
                ARYAP
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand group-hover:w-full transition-all duration-500" />
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
                        ? 'text-brand font-semibold'
                        : 'text-neutral-600 hover:text-brand'
                    )}
                  >
                    {t(link.key)}
                    {active && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right section: Language switcher + Mobile menu button */}
            <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <button
                onClick={switchLocale}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-neutral-600 hover:text-brand border border-neutral-200 hover:border-brand/30 rounded-lg transition-all duration-300 hover:bg-brand-50"
                aria-label={t('language')}
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase tracking-wider text-xs font-semibold">
                  {locale === 'tr' ? 'EN' : 'TR'}
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 text-neutral-700 hover:text-brand border border-neutral-200 hover:border-brand/30 rounded-lg transition-all duration-300 hover:bg-brand-50"
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/95 backdrop-blur-xl"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.nav
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
              className="relative pt-24 px-6 pb-8 flex flex-col items-center gap-2"
            >
              {navLinks.map((link, index) => {
                const active = isActiveLink(link.href);
                return (
                  <motion.div
                    key={link.key}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index + 0.15, duration: 0.3 }}
                    className="w-full max-w-sm"
                  >
                    <Link
                      href={`/${locale}${link.href === '/' ? '' : link.href}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'block w-full text-center py-3.5 px-6 text-lg font-medium tracking-wide rounded-xl transition-all duration-300',
                        active
                          ? 'text-brand bg-brand-50 border border-brand/20 font-semibold'
                          : 'text-neutral-600 hover:text-brand hover:bg-brand-50 border border-transparent'
                      )}
                    >
                      {t(link.key)}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Decorative separator */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="w-24 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent mt-4"
              />

              {/* Site name in mobile menu */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="mt-4 text-xs tracking-[0.3em] uppercase text-neutral-400 font-medium"
              >
                {t('siteName')}
              </motion.p>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
