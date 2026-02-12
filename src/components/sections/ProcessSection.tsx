'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useTranslations } from 'next-intl';
import { MessageSquare, Ruler, HardHat, Key } from 'lucide-react';

const steps = [
  { key: 'step1', icon: MessageSquare },
  { key: 'step2', icon: Ruler },
  { key: 'step3', icon: HardHat },
  { key: 'step4', icon: Key },
] as const;

export function ProcessSection() {
  const t = useTranslations('home');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 bg-gradient-to-b from-neutral-50/50 to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-neutral-800 mb-4">
            {t('processTitle')}
          </h2>
          <p className="text-neutral-500 text-lg max-w-2xl mx-auto font-body">
            {t('processSubtitle')}
          </p>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block relative">
          {/* Connecting line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-brand/20 via-brand/40 to-brand/20 origin-left"
          />

          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + index * 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-center"
                >
                  {/* Step number + icon */}
                  <div className="relative mx-auto w-32 h-32 mb-6">
                    <div className="absolute inset-0 rounded-full bg-brand/5" />
                    <div className="absolute inset-3 rounded-full bg-white shadow-soft flex items-center justify-center">
                      <Icon className="w-8 h-8 text-brand" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-brand text-white text-sm font-bold flex items-center justify-center shadow-brand-glow">
                      {index + 1}
                    </div>
                  </div>

                  <h3 className="font-heading text-lg text-neutral-800 mb-2">
                    {t(`${step.key}Title`)}
                  </h3>
                  <p className="text-neutral-500 text-sm font-body leading-relaxed max-w-[220px] mx-auto">
                    {t(`${step.key}Desc`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden relative">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-brand/20 via-brand/40 to-brand/20 origin-top"
          />

          <div className="space-y-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + index * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-start gap-6 pl-4"
                >
                  {/* Icon node */}
                  <div className="relative flex-shrink-0">
                    <div className="w-9 h-9 rounded-full bg-white shadow-soft border border-brand/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-brand" />
                    </div>
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-1">
                    <h3 className="font-heading text-base text-neutral-800 mb-1">
                      {t(`${step.key}Title`)}
                    </h3>
                    <p className="text-neutral-500 text-sm font-body leading-relaxed">
                      {t(`${step.key}Desc`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
