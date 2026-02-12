'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Phone, Mail, MapPin, Linkedin, Youtube, Twitter } from 'lucide-react';

const navLinks = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'projects', href: '/projects' },
  { key: 'map', href: '/map' },
  { key: 'virtualTour', href: '/virtual-tour' },
  { key: 'contact', href: '/contact' },
] as const;

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com/aryap', icon: null },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/aryap', icon: Linkedin },
  { name: 'Twitter', href: 'https://twitter.com/aryap', icon: Twitter },
  { name: 'YouTube', href: 'https://youtube.com/@aryap', icon: Youtube },
] as const;

export function Footer() {
  const t = useTranslations('common');
  const locale = useLocale();

  return (
    <footer className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: Logo + Nav */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-10">
          <Link href={`/${locale}`} className="shrink-0">
            <Image
              src="/images/logo-black.webp"
              alt="Aryap"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={`/${locale}${link.href === '/' ? '' : link.href}`}
                className="text-sm text-neutral-500 hover:text-brand transition-colors duration-200"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>
        </div>

        {/* Middle: Contact row */}
        <div className="border-t border-neutral-100 py-6">
          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <MapPin className="w-4 h-4 text-neutral-400" />
              <span>Eskisehir / Bursa</span>
            </div>
            <a
              href="tel:+905451442626"
              className="flex items-center gap-2 text-sm text-neutral-500 hover:text-brand transition-colors duration-200"
            >
              <Phone className="w-4 h-4 text-neutral-400" />
              <span>+90 545 144 26 26</span>
            </a>
            <a
              href="mailto:info@aryap.net"
              className="flex items-center gap-2 text-sm text-neutral-500 hover:text-brand transition-colors duration-200"
            >
              <Mail className="w-4 h-4 text-neutral-400" />
              <span>info@aryap.net</span>
            </a>
          </div>
        </div>

        {/* Bottom: Social + Copyright */}
        <div className="border-t border-neutral-100 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-100 text-neutral-500 hover:bg-brand hover:text-white transition-all duration-200"
                    aria-label={social.name}
                  >
                    {IconComponent ? (
                      <IconComponent className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-bold">{social.name.slice(0, 2).toUpperCase()}</span>
                    )}
                  </a>
                );
              })}
            </div>
            <p className="text-xs text-neutral-400">
              &copy; {new Date().getFullYear()} Aryap. {t('allRightsReserved')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
