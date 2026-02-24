'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'projects', href: '/projects' },
  { key: 'map', href: '/map' },
  { key: 'virtualTour', href: '/virtual-tour' },
  { key: 'contact', href: '/contact' },
] as const;

export function Footer() {
  const t = useTranslations('common');
  const locale = useLocale();

  return (
    <footer className="bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main footer content */}
        <div className="py-16 sm:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Image
              src="/images/logo-white.webp"
              alt="Aryap"
              width={120}
              height={40}
              className="h-8 w-auto mb-6"
            />
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
              {t('siteDescription')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-6">
              {t('siteName').split(' ')[0]}
            </h4>
            <nav className="flex flex-col gap-3">
              {navLinks.slice(0, 3).map((link) => (
                <Link
                  key={link.key}
                  href={`/${locale}${link.href === '/' ? '' : link.href}`}
                  className="text-sm text-neutral-300 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                >
                  {t(link.key)}
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200" />
                </Link>
              ))}
            </nav>
          </div>

          {/* More links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-6">
              {t('readMore')}
            </h4>
            <nav className="flex flex-col gap-3">
              {navLinks.slice(3).map((link) => (
                <Link
                  key={link.key}
                  href={`/${locale}${link.href === '/' ? '' : link.href}`}
                  className="text-sm text-neutral-300 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                >
                  {t(link.key)}
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-6">
              {t('contact')}
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3 text-sm text-neutral-300">
                <MapPin className="w-4 h-4 text-neutral-500 mt-0.5 flex-shrink-0" />
                <span>Eskişehir / Bursa</span>
              </div>
              <a
                href="tel:+905451442626"
                className="flex items-center gap-3 text-sm text-neutral-300 hover:text-white transition-colors duration-200"
              >
                <Phone className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                <span>+90 545 144 26 26</span>
              </a>
              <a
                href="mailto:info@aryap.net"
                className="flex items-center gap-3 text-sm text-neutral-300 hover:text-white transition-colors duration-200"
              >
                <Mail className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                <span>info@aryap.net</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} Aryap. {t('allRightsReserved')}
          </p>
          <p className="text-xs text-neutral-600">
            Eskişehir &middot; Bursa
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
