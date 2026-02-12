'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'motion/react';
import { useTranslations } from 'next-intl';

interface StatItem {
  value: number;
  suffix: string;
  labelKey: string;
}

const stats: StatItem[] = [
  { value: 20, suffix: '+', labelKey: 'statsYears' },
  { value: 8, suffix: '', labelKey: 'statsProjects' },
  { value: 200000, suffix: '+', labelKey: 'statsArea' },
  { value: 1500, suffix: '+', labelKey: 'statsClients' },
];

function formatStatNumber(num: number): string {
  if (num >= 1000) {
    return new Intl.NumberFormat('tr-TR').format(num);
  }
  return num.toString();
}

function AnimatedCounter({
  value,
  suffix,
  isInView,
}: {
  value: number;
  suffix: string;
  isInView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span>
      {formatStatNumber(displayValue)}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const t = useTranslations('home');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark to-brand-900" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 30 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 lg:p-8 text-center"
            >
              <div className="font-heading text-3xl sm:text-4xl md:text-5xl text-accent mb-2">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  isInView={isInView}
                />
              </div>
              <p className="text-white/70 text-sm sm:text-base font-body">
                {t(stat.labelKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
