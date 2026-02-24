'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { getLocalizedValue, formatNumber } from '@/lib/utils';

const categoryKeys = ['all', 'residential', 'commercial', 'mixed'] as const;

export function InsightsSection() {
  const t = useTranslations('home');
  const tp = useTranslations('projects');
  const locale = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.type === activeCategory);

  const categoryLabels: Record<string, string> = {
    all: tp('filterAll'),
    residential: tp('filterResidential'),
    commercial: tp('filterCommercial'),
    mixed: tp('filterMixed'),
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 400;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section ref={ref} className="py-24 md:py-32 bg-neutral-50/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8"
        >
          <div>
            <p className="section-label">{tp('title')}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900">
              {t('showcaseTitle')}
            </h2>
          </div>
          <Link
            href={`/${locale}/projects`}
            className="hidden sm:inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white text-sm font-semibold rounded-full hover:bg-neutral-800 transition-colors duration-300 group"
          >
            {tp('title')}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-6 mb-10 border-b border-neutral-200 pb-4"
        >
          {categoryKeys.map((key) => {
            const count = key === 'all'
              ? projects.length
              : projects.filter((p) => p.type === key).length;
            const isActive = activeCategory === key;
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`relative pb-3 text-sm font-medium transition-colors duration-300 ${
                  isActive ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                {categoryLabels[key]}
                <span className={`ml-1.5 text-xs ${isActive ? 'text-neutral-500' : 'text-neutral-300'}`}>
                  {count} {locale === 'tr' ? 'proje' : 'projects'}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="insightsTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* Horizontal scroll cards */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide px-6 sm:px-8 lg:px-[calc((100vw-1280px)/2+2rem)] pb-4 snap-x snap-mandatory"
        >
          {filtered.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{
                duration: 0.5,
                delay: 0.15 + index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex-shrink-0 w-[280px] sm:w-[320px] snap-start"
            >
              <Link
                href={`/${locale}/projects/${project.slug}`}
                className="group block"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={project.image}
                    alt={getLocalizedValue(project.title, locale)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="320px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                  {/* Arrow button */}
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-sm">
                      <ArrowUpRight className="w-5 h-5 text-neutral-900" />
                    </div>
                  </div>

                  {/* Status badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm text-neutral-700 text-xs font-medium rounded-full">
                      {project.status === 'completed'
                        ? (locale === 'tr' ? 'Tamamlandi' : 'Completed')
                        : (locale === 'tr' ? 'Devam Ediyor' : 'Ongoing')}
                    </span>
                  </div>
                </div>

                <div className="px-1">
                  <p className="text-xs text-neutral-400 mb-1">
                    {getLocalizedValue(project.location, locale)} · {project.year}
                  </p>
                  <h3 className="font-heading text-base sm:text-lg font-semibold text-neutral-900 group-hover:text-brand transition-colors duration-300 mb-1">
                    {getLocalizedValue(project.title, locale)}
                  </h3>
                  <p className="text-sm text-neutral-400">
                    {formatNumber(project.area)} m² · {project.units} {locale === 'tr' ? 'unite' : 'units'}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => scroll('left')}
            className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:border-neutral-400 transition-all duration-300"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:border-neutral-400 transition-all duration-300"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
