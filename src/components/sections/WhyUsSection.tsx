'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Shield, Clock, Handshake } from 'lucide-react';

const cards = [
  { icon: Shield, titleKey: 'whyUsQuality', descKey: 'whyUsQualityDesc', num: '01' },
  { icon: Clock, titleKey: 'whyUsTime', descKey: 'whyUsTimeDesc', num: '02' },
  { icon: Handshake, titleKey: 'whyUsTrust', descKey: 'whyUsTrustDesc', num: '03' },
];

export function WhyUsSection() {
  const t = useTranslations('home');
  const locale = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                alt="Aryap Quality"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating stat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-6 -right-6 sm:bottom-8 sm:-right-8 bg-neutral-900 text-white rounded-2xl p-6 shadow-elevated"
            >
              <p className="text-3xl font-bold">20+</p>
              <p className="text-sm text-neutral-400">{t('statsYears')}</p>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10"
            >
              <p className="section-label">{t('whyUsTitle')}</p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
                {t('whyUsTitle')}
              </h2>
            </motion.div>

            <div className="space-y-6">
              {cards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.titleKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + index * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex gap-5 p-5 rounded-2xl hover:bg-neutral-50 transition-colors duration-300 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-900 transition-all duration-500">
                      <Icon className="w-5 h-5 text-neutral-500 group-hover:text-white transition-colors duration-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-heading text-lg font-semibold text-neutral-900">
                          {t(card.titleKey)}
                        </h3>
                        <span className="text-xs text-neutral-300 font-mono">{card.num}</span>
                      </div>
                      <p className="text-neutral-400 text-sm leading-relaxed">
                        {t(card.descKey)}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
