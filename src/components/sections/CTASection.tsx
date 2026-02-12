'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export function CTASection() {
  const t = useTranslations('home');
  const locale = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Brand gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand via-brand-light to-brand" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Glass container */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-12 lg:p-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mb-4">
              {t('ctaTitle')}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 font-body">
              {t('ctaSubtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-2xl bg-white/90 text-brand backdrop-blur-sm shadow-glass-lg hover:bg-white hover:shadow-brand-glow transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
            >
              {t('ctaCta')}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
