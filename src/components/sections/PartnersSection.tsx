'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useTranslations } from 'next-intl';

// Construction industry partner brands (placeholder text logos)
const partners = [
  'Viko',
  'Eczacibasi (VitrA)',
  'Kaleseramik',
  'Marshall Boya',
  'Izocam',
  'DYO Boya',
  'Bosch Termoteknik',
  'Schneider Electric',
  'Betek Boya',
  'Knauf',
] as const;

function PartnerLogo({ name }: { name: string }) {
  return (
    <div className="flex-shrink-0 mx-6 sm:mx-10">
      <div className="flex items-center justify-center h-12 px-6 rounded-xl bg-neutral-100/60 border border-neutral-200/40 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default">
        <span className="text-sm font-semibold text-neutral-700 whitespace-nowrap tracking-wide">
          {name}
        </span>
      </div>
    </div>
  );
}

export function PartnersSection() {
  const t = useTranslations('home');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative py-12 md:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <h3 className="font-heading text-lg md:text-xl text-neutral-400 uppercase tracking-widest">
            {t('partnersTitle')}
          </h3>
        </motion.div>
      </div>

      {/* Marquee with edge fade */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee-slow">
          {[...partners, ...partners].map((name, i) => (
            <PartnerLogo key={`${name}-${i}`} name={name} />
          ))}
        </div>
      </div>
    </section>
  );
}
