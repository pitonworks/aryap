import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  Linkedin,
  Youtube,
  Twitter,
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
    <footer className="bg-brand-dark border-t border-white/10">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href={`/${locale}`} className="inline-block group">
              <span className="text-3xl font-heading font-bold tracking-[0.2em] text-white">
                ARYAP
              </span>
            </Link>
            <p className="mt-2 text-sm font-medium text-accent tracking-wide">
              Insaatta Kalite, Yasamda Konfor
            </p>
            <p className="mt-4 text-white/70 text-sm leading-relaxed max-w-xs">
              {t('siteDescription')}
            </p>
            {/* Decorative accent line */}
            <div className="mt-6 w-16 h-0.5 bg-accent/40 rounded-full" />
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/90 mb-6">
              {t('home')}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={`/${locale}${link.href === '/' ? '' : link.href}`}
                    className="group flex items-center gap-2 text-sm text-white/50 hover:text-accent transition-colors duration-300"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent/40 group-hover:bg-accent transition-colors duration-300" />
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/90 mb-6">
              {t('contact')}
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+905451442626"
                  className="group flex items-start gap-3 text-sm text-white/50 hover:text-accent transition-colors duration-300"
                >
                  <Phone className="w-4 h-4 mt-0.5 text-accent/60 group-hover:text-accent transition-colors duration-300 shrink-0" />
                  <span>+90 545 144 26 26</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@aryap.net"
                  className="group flex items-start gap-3 text-sm text-white/50 hover:text-accent transition-colors duration-300"
                >
                  <Mail className="w-4 h-4 mt-0.5 text-accent/60 group-hover:text-accent transition-colors duration-300 shrink-0" />
                  <span>info@aryap.net</span>
                </a>
              </li>
              <li>
                <div className="group flex items-start gap-3 text-sm text-white/50">
                  <MapPin className="w-4 h-4 mt-0.5 text-accent/60 shrink-0" />
                  <span>Eskisehir / Bursa</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/90 mb-6">
              {t('followUs')}
            </h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 hover:border-accent/30 bg-white/5 hover:bg-accent/10 transition-all duration-300"
                    aria-label={social.name}
                  >
                    {IconComponent ? (
                      <IconComponent className="w-4 h-4 text-white/50 group-hover:text-accent transition-colors duration-300" />
                    ) : (
                      <span className="text-xs font-semibold text-white/50 group-hover:text-accent transition-colors duration-300">
                        {social.name.slice(0, 2).toUpperCase()}
                      </span>

                    )}
                  </a>
                );
              })}
            </div>
            {/* External link to projects */}
            <Link
              href={`/${locale}/projects`}
              className="group inline-flex items-center gap-2 mt-8 text-sm text-accent/70 hover:text-accent transition-colors duration-300"
            >
              <span>{t('viewAll')}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30 tracking-wide">
              &copy; 2025 Aryap. {t('allRightsReserved')}
            </p>
            <div className="flex items-center gap-1">
              <span className="text-xs text-white/20 tracking-wide">
                Insaatta Kalite, Yasamda Konfor
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
