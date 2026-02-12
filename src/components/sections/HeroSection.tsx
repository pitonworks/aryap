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
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80)',
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-brand-dark/40 to-white" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Glass container */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-glass-lg">
          <motion.h1
            variants={childVariants}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6"
          >
            {titleLines.map((line, index) => (
              <span key={index}>
                {index === 0 ? (
                  <span className="text-white">{line}</span>
                ) : (
                  <span className="text-accent-light">{line}</span>
                )}
                {index < titleLines.length - 1 && <br />}
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={childVariants}
            className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 font-body"
          >
            {t('heroSubtitle')}
          </motion.p>

          <motion.div variants={childVariants}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Link
                href={`/${locale}/projects`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-2xl bg-white/90 text-brand backdrop-blur-sm shadow-glass-lg hover:bg-white hover:shadow-brand-glow transition-all duration-500"
              >
                {t('heroCta')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
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
          <ChevronDown className="w-6 h-6 text-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
