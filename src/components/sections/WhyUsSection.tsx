'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Shield, Clock, Handshake } from 'lucide-react';

const cards = [
  {
    icon: Shield,
    titleKey: 'whyUsQuality',
    descKey: 'whyUsQualityDesc',
  },
  {
    icon: Clock,
    titleKey: 'whyUsTime',
    descKey: 'whyUsTimeDesc',
  },
  {
    icon: Handshake,
    titleKey: 'whyUsTrust',
    descKey: 'whyUsTrustDesc',
  },
];

export function WhyUsSection() {
  const t = useTranslations('home');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <div className="w-12 h-1 bg-brand mx-auto mb-6 rounded-full" />
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-4">
            {t('whyUsTitle')}
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.titleKey}
                initial={{ opacity: 0, y: 40 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.2 + index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-8 hover:border-brand/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-brand-50 flex items-center justify-center mb-6 group-hover:bg-brand/10 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-brand" />
                </div>
                <h3 className="font-heading text-xl text-neutral-900 mb-3">
                  {t(card.titleKey)}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed font-body">
                  {t(card.descKey)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
