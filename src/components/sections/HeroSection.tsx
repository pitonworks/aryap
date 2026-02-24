'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  const t = useTranslations('home');
  const tc = useTranslations('common');
  const locale = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section ref={ref} className="bg-white pt-24 sm:pt-28">
      {/* Full-width hero image */}
      <div ref={heroRef} className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full aspect-[21/9] sm:aspect-[2.4/1] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.12)]"
        >
          <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
              alt="Aryap Construction"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </motion.div>
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

          {/* Title on image */}
          <div className="absolute inset-0 flex items-end p-6 sm:p-10 lg:p-14">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight max-w-4xl drop-shadow-lg"
            >
              {t('heroTitle').split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index === 0 && <br />}
                </span>
              ))}
            </motion.h1>
          </div>
        </motion.div>
      </div>

      {/* Below image: description + stats + CTA */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <p className="text-neutral-500 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/${locale}/projects`}
                className="btn-primary group"
              >
                {t('heroCta')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="btn-secondary"
              >
                {tc('contact')}
              </Link>
            </div>
          </motion.div>

          {/* Right: Small thumbnail + stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            {/* Small thumbnail image */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8 shadow-[0_15px_50px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_70px_rgba(0,0,0,0.2)] hover:scale-[1.02] transition-all duration-500 group ring-1 ring-black/5">
              <Image
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=75"
                alt="Aryap Projects"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>

            {/* Stats row */}
            <div className="flex items-center justify-between">
              {[
                { value: '20+', label: t('statsYears') },
                { value: '200K+', label: t('statsArea') },
                { value: '1500+', label: t('statsClients') },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                  className="group cursor-default"
                >
                  <p className="text-2xl sm:text-3xl font-bold text-neutral-900 group-hover:scale-110 transition-transform duration-300 origin-bottom">
                    {stat.value}
                  </p>
                  <p className="text-xs text-neutral-400 mt-0.5">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
