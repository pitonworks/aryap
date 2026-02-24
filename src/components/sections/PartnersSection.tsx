'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useTranslations } from 'next-intl';

const partners = [
  'Viko',
  'Eczacıbaşı (VitrA)',
  'Kaleseramik',
  'Marshall Boya',
  'İzocam',
  'DYO Boya',
  'Bosch Termoteknik',
  'Schneider Electric',
  'Betek Boya',
  'Knauf',
] as const;

function PartnerLogo({ name }: { name: string }) {
  return (
    <div className="flex-shrink-0 mx-6 sm:mx-10">
      <div className="flex items-center justify-center h-12 px-8 rounded-full bg-white shadow-card border border-neutral-100/50 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-500 cursor-default">
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
    <section ref={ref} className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="text-sm font-medium text-neutral-300 uppercase tracking-widest">
            {t('partnersTitle')}
          </p>
        </motion.div>
      </div>

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
