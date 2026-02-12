'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'motion/react';
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  Linkedin,
  Youtube,
  Twitter,
  Building2,
} from 'lucide-react';

const navLinks = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'projects', href: '/projects' },
  { key: 'map', href: '/map' },
  { key: 'virtualTour', href: '/virtual-tour' },
  { key: 'contact', href: '/contact' },
] as const;

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/aryap',
    icon: null,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/aryap',
    icon: Linkedin,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/aryap',
    icon: Twitter,
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@aryap',
    icon: Youtube,
  },
] as const;

export function Footer() {
  const t = useTranslations('common');
  const locale = useLocale();

  return (
    <footer className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-900 to-black" />

      {/* Decorative gradient orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Top divider */}
      <div className="relative section-divider-light" />

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-10">
        {/* Top Row: Logo + CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-14">
          <div>
            <Link href={`/${locale}`} className="inline-block group">
              <motion.span
                whileHover={{ letterSpacing: '0.3em' }}
                transition={{ duration: 0.3 }}
                className="text-3xl sm:text-4xl font-heading font-bold tracking-[0.2em] text-white inline-block"
              >
                ARYAP
              </motion.span>
            </Link>
            <p className="mt-2 text-sm font-medium text-accent/80 tracking-wide">
              Insaatta Kalite, Yasamda Konfor
            </p>
          </div>
          <Link
            href={`/${locale}/projects`}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl text-white text-sm font-semibold hover:bg-white/20 hover:border-accent/30 hover:shadow-accent-glow transition-all duration-500"
          >
            <Building2 className="w-4 h-4" />
            <span>{t('viewAll')}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
        </div>

        {/* Glass Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-14" />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              {t('siteDescription')}
            </p>
            {/* Decorative accent line with animation */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 h-0.5 bg-gradient-to-r from-accent to-accent/0 rounded-full"
            />
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40 mb-5">
              {locale === 'tr' ? 'Hizli Erisim' : 'Quick Links'}
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={`/${locale}${link.href === '/' ? '' : link.href}`}
                    className="group flex items-center gap-2.5 text-sm text-white/50 hover:text-white transition-all duration-300"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-accent group-hover:shadow-[0_0_8px_rgba(232,168,56,0.4)] transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {t(link.key)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact — glass cards */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40 mb-5">
              {t('contact')}
            </h3>
            <div className="space-y-3">
              <a
                href="tel:+905451442626"
                className="group flex items-center gap-3 px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/15 transition-all duration-500"
              >
                <Phone className="w-4 h-4 text-accent/60 group-hover:text-accent transition-colors duration-300 shrink-0" />
                <span className="text-sm text-white/50 group-hover:text-white/80 transition-colors duration-300">
                  +90 545 144 26 26
                </span>
              </a>
              <a
                href="mailto:info@aryap.net"
                className="group flex items-center gap-3 px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/15 transition-all duration-500"
              >
                <Mail className="w-4 h-4 text-accent/60 group-hover:text-accent transition-colors duration-300 shrink-0" />
                <span className="text-sm text-white/50 group-hover:text-white/80 transition-colors duration-300">
                  info@aryap.net
                </span>
              </a>
              <div className="flex items-center gap-3 px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl">
                <MapPin className="w-4 h-4 text-accent/60 shrink-0" />
                <span className="text-sm text-white/50">Eskisehir / Bursa</span>
              </div>
            </div>
          </div>

          {/* Column 4: Social Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40 mb-5">
              {t('followUs')}
            </h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    className="group flex items-center justify-center w-11 h-11 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-accent/30 hover:bg-accent/10 hover:shadow-[0_0_20px_rgba(232,168,56,0.15)] transition-all duration-500"
                    aria-label={social.name}
                  >
                    {IconComponent ? (
                      <IconComponent className="w-4 h-4 text-white/40 group-hover:text-accent transition-colors duration-300" />
                    ) : (
                      <span className="text-xs font-bold text-white/40 group-hover:text-accent transition-colors duration-300">
                        {social.name.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10">
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="bg-black/20 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-white/25 tracking-wide">
                &copy; {new Date().getFullYear()} Aryap. {t('allRightsReserved')}
              </p>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent/30" />
                <span className="text-xs text-white/20 tracking-wider font-medium">
                  Insaatta Kalite, Yasamda Konfor
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
