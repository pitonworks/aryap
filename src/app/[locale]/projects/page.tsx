'use client';

import { useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { projects, type ProjectType, type ProjectStatus } from '@/data/projects';
import { getLocalizedValue, formatNumber } from '@/lib/utils';

const typeFilters: Array<{ key: string; value: ProjectType | 'all' }> = [
  { key: 'filterAll', value: 'all' },
  { key: 'filterResidential', value: 'residential' },
  { key: 'filterCommercial', value: 'commercial' },
  { key: 'filterMixed', value: 'mixed' },
];

const statusFilters: Array<{ key: string; value: ProjectStatus | 'all' }> = [
  { key: 'filterAll', value: 'all' },
  { key: 'statusCompleted', value: 'completed' },
  { key: 'statusOngoing', value: 'ongoing' },
  { key: 'statusUpcoming', value: 'upcoming' },
];

const statusColors: Record<ProjectStatus, string> = {
  completed: 'bg-green-500',
  ongoing: 'bg-yellow-500',
  upcoming: 'bg-blue-500',
};

const statusTextColors: Record<ProjectStatus, string> = {
  completed: 'text-green-600',
  ongoing: 'text-yellow-600',
  upcoming: 'text-blue-600',
};

const statusBadgeBg: Record<ProjectStatus, string> = {
  completed: 'bg-green-50',
  ongoing: 'bg-yellow-50',
  upcoming: 'bg-blue-50',
};

export default function ProjectsPage() {
  const t = useTranslations('projects');
  const tc = useTranslations('common');
  const locale = useLocale();
  const [activeType, setActiveType] = useState<ProjectType | 'all'>('all');
  const [activeStatus, setActiveStatus] = useState<ProjectStatus | 'all'>('all');
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const filteredProjects = projects.filter((project) => {
    const typeMatch = activeType === 'all' || project.type === activeType;
    const statusMatch = activeStatus === 'all' || project.status === activeStatus;
    return typeMatch && statusMatch;
  });

  const getTypeLabel = (type: ProjectType): string => {
    const map: Record<ProjectType, string> = {
      residential: t('filterResidential'),
      commercial: t('filterCommercial'),
      mixed: t('filterMixed'),
    };
    return map[type];
  };

  const getStatusLabel = (status: ProjectStatus): string => {
    const map: Record<ProjectStatus, string> = {
      completed: t('statusCompleted'),
      ongoing: t('statusOngoing'),
      upcoming: t('statusUpcoming'),
    };
    return map[status];
  };

  return (
    <>
      {/* Hero Banner */}
      <section ref={heroRef} className="relative pt-32 pb-12 sm:pt-40 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-50/50" />
        <motion.div style={{ opacity: heroOpacity }} className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="section-label"
              >
                {locale === 'tr' ? 'Projelerimiz' : 'Our Projects'}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-neutral-900"
              >
                {t('title')}
              </motion.h1>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-neutral-900 text-white text-sm font-semibold rounded-full">
                {projects.length}+
                <span className="text-neutral-400 font-normal text-xs">
                  {locale === 'tr' ? 'Proje' : 'Projects'}
                </span>
              </span>
            </motion.div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-lg text-neutral-400 max-w-2xl mt-4"
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>
      </section>

      {/* Sticky Filter Bar */}
      <section className="sticky top-[73px] z-30 bg-white/95 backdrop-blur-sm border-b border-neutral-100 py-4">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            {/* Type Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-neutral-300 uppercase tracking-wider mr-2 hidden sm:inline">{locale === 'tr' ? 'Tip' : 'Type'}</span>
              {typeFilters.map((filter) => (
                <button
                  key={`type-${filter.value}`}
                  onClick={() => setActiveType(filter.value)}
                  className={
                    activeType === filter.value
                      ? 'filter-tab-active'
                      : 'filter-tab-inactive'
                  }
                >
                  {t(filter.key)}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-neutral-300 uppercase tracking-wider mr-2 hidden sm:inline">{locale === 'tr' ? 'Durum' : 'Status'}</span>
              {statusFilters.map((filter) => (
                <button
                  key={`status-${filter.value}`}
                  onClick={() => setActiveStatus(filter.value)}
                  className={
                    activeStatus === filter.value
                      ? 'filter-tab-active'
                      : 'filter-tab-inactive'
                  }
                >
                  {t(filter.key)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeType}-${activeStatus}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={`/${locale}/projects/${project.slug}`}
                    className="group block h-full"
                  >
                    <div className="card-hover overflow-hidden h-full">
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={project.image}
                          alt={getLocalizedValue(project.title, locale)}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                        {/* Status Badge */}
                        <div className="absolute top-4 right-4">
                          <span className={`status-badge ${statusBadgeBg[project.status]} ${statusTextColors[project.status]}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${statusColors[project.status]}`} />
                            {getStatusLabel(project.status)}
                          </span>
                        </div>

                        {/* Hover arrow */}
                        <div className="absolute top-4 left-4">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-card">
                            <ArrowUpRight className="w-5 h-5 text-neutral-900" />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-neutral-100 text-neutral-600">
                            {getTypeLabel(project.type)}
                          </span>
                          <span className="text-xs text-neutral-300 font-mono">{project.year}</span>
                        </div>

                        <h3 className="text-lg font-heading font-semibold mb-1 text-neutral-900 group-hover:text-neutral-600 transition-colors duration-300">
                          {getLocalizedValue(project.title, locale)}
                        </h3>
                        <p className="text-neutral-400 text-sm mb-4">
                          {getLocalizedValue(project.location, locale)}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-sm text-neutral-400 pt-4 border-t border-neutral-100">
                          <span>{formatNumber(project.area)} m²</span>
                          <span className="w-px h-3 bg-neutral-200" />
                          <span>{project.units} {locale === 'tr' ? 'ünite' : 'units'}</span>
                          {project.status === 'ongoing' && (
                            <>
                              <span className="w-px h-3 bg-neutral-200" />
                              <span className="text-neutral-900 font-semibold">{project.progress}%</span>
                            </>
                          )}
                        </div>

                        {/* Progress Bar for Ongoing */}
                        {project.status === 'ongoing' && (
                          <div className="mt-4">
                            <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${project.progress}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                className="h-full rounded-full bg-neutral-900"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="card inline-block px-10 py-8">
                <p className="text-neutral-400 text-lg">
                  {locale === 'tr'
                    ? 'Bu filtrelere uygun proje bulunamadı.'
                    : 'No projects found for these filters.'}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
