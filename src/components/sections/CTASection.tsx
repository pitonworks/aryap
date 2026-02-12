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
      {/* Brand background */}
      <div className="absolute inset-0 bg-brand" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-xl bg-white text-brand hover:bg-neutral-50 shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
          >
            {t('ctaCta')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
