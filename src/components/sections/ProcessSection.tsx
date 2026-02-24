'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useTranslations } from 'next-intl';
import { MessageSquare, Compass, HardHat, KeyRound } from 'lucide-react';

const steps = [
  { icon: MessageSquare, titleKey: 'step1Title', descKey: 'step1Desc' },
  { icon: Compass, titleKey: 'step2Title', descKey: 'step2Desc' },
  { icon: HardHat, titleKey: 'step3Title', descKey: 'step3Desc' },
  { icon: KeyRound, titleKey: 'step4Title', descKey: 'step4Desc' },
];

export function ProcessSection() {
  const t = useTranslations('home');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-neutral-50/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="section-label">{t('processTitle')}</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            {t('processSubtitle')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.titleKey}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-neutral-100 hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500 group"
              >
                {/* Dotted connector line between cards (lg only, hidden on first) */}
                {index > 0 && (
                  <div className="hidden lg:block absolute top-7 -left-4 w-8 h-px border-t-2 border-dashed border-neutral-200" />
                )}

                {/* Numbered circle */}
                <div className="w-14 h-14 rounded-2xl bg-neutral-900 text-white flex items-center justify-center text-lg font-bold shadow-[0_8px_30px_rgba(0,0,0,0.15)]">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="inline-flex mt-4 mb-3">
                  <Icon className="w-6 h-6 text-neutral-400" />
                </div>

                {/* Title */}
                <h3 className="font-heading text-lg font-semibold text-neutral-900 mb-2">
                  {t(step.titleKey)}
                </h3>

                {/* Description */}
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {t(step.descKey)}
                </p>

                {/* Dotted connector line to next card (lg only, hidden on last) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 -right-4 w-8 h-px border-t-2 border-dashed border-neutral-200" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
