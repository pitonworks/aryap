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
    <section ref={ref} className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center"
            >
              <div className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-2">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  isInView={isInView}
                />
              </div>
              <p className="text-neutral-400 text-sm sm:text-base">
                {t(stat.labelKey)}
              </p>
              {index < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-px bg-neutral-100" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
