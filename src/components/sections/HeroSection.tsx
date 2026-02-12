'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  const t = useTranslations('home');
  const locale = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const titleLines = t('heroTitle').split('\n');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-white" />

      {/* Subtle animated dot pattern */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, #1B3A4B 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Decorative accent lines */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-8 md:left-16 top-1/4 w-px h-32 bg-gradient-to-b from-transparent via-brand/20 to-transparent origin-top"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1.2, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-8 md:right-16 top-1/3 w-px h-24 bg-gradient-to-b from-transparent via-brand/20 to-transparent origin-top"
      />

      {/* Decorative accent dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute left-8 md:left-16 top-[calc(25%+8.5rem)] w-1.5 h-1.5 rounded-full bg-brand/20"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute right-8 md:right-16 top-[calc(33%+6.5rem)] w-1.5 h-1.5 rounded-full bg-brand/20"
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.h1
          variants={childVariants}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6"
        >
          {titleLines.map((line, index) => (
            <span key={index}>
              {index === 0 ? (
                <span className="text-neutral-900">{line}</span>
              ) : (
                <span className="text-brand">
                  {line}
                </span>
              )}
              {index < titleLines.length - 1 && <br />}
            </span>
          ))}
        </motion.h1>

        <motion.p
          variants={childVariants}
          className="text-neutral-500 text-lg sm:text-xl max-w-2xl mx-auto mb-10 font-body"
        >
          {t('heroSubtitle')}
        </motion.p>

        <motion.div variants={childVariants}>
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-xl bg-brand text-white hover:bg-brand-light shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
          >
            {t('heroCta')}
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll-down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6 text-brand/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
