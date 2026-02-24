'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { useTranslations } from 'next-intl';

function CountUp({ end, duration = 2000, inView }: { end: number; duration?: number; inView: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, inView]);
  return <>{count}</>;
}

const stats = [
  { value: 20, suffix: '+', labelKey: 'statsYears' },
  { value: 8, suffix: '+', labelKey: 'statsProjects' },
  { value: 200, suffix: 'K+', labelKey: 'statsArea' },
  { value: 1500, suffix: '+', labelKey: 'statsClients' },
];

export function StatsSection() {
  const t = useTranslations('home');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-neutral-900 text-white relative overflow-hidden">
      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-3xl md:text-4xl font-bold text-white text-center mb-16"
        >
          {t('statsTitle')}
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center group"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white group-hover:text-accent transition-colors duration-300">
                <CountUp end={stat.value} inView={inView} />
                {stat.suffix}
              </div>
              <div className="w-12 h-0.5 bg-white/20 mx-auto my-4 group-hover:w-20 group-hover:bg-accent transition-all duration-500" />
              <p className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300">
                {t(stat.labelKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
