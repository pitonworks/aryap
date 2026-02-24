'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Quote } from 'lucide-react';

const testimonialKeys = [
  'testimonial1',
  'testimonial2',
  'testimonial3',
  'testimonial4',
  'testimonial5',
  'testimonial6',
] as const;

function TestimonialCard({
  nameKey,
  t,
}: {
  nameKey: string;
  t: (key: string) => string;
}) {
  return (
    <div className="flex-shrink-0 w-[320px] sm:w-[380px] mx-3">
      <div className="bg-white rounded-2xl border border-neutral-100/80 p-6 sm:p-8 h-full shadow-[0_6px_25px_rgba(0,0,0,0.08)] hover:shadow-[0_18px_50px_rgba(0,0,0,0.14)] hover:-translate-y-2 transition-all duration-500">
        <Quote className="w-8 h-8 text-neutral-200 mb-4" />
        <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6">
          &ldquo;{t(`${nameKey}Quote`)}&rdquo;
        </p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-950 flex items-center justify-center text-white text-sm font-semibold">
            {t(`${nameKey}Name`).charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900">
              {t(`${nameKey}Name`)}
            </p>
            <p className="text-xs text-neutral-400">
              {t(`${nameKey}Project`)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const t = useTranslations('home');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-label">{t('testimonialsTitle')}</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900">
            {t('testimonialsSubtitle')}
          </h2>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {[...testimonialKeys, ...testimonialKeys].map((key, i) => (
            <TestimonialCard key={`${key}-${i}`} nameKey={key} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
