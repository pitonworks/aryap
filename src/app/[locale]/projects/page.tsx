'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
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
  completed: 'bg-green-50/80',
  ongoing: 'bg-yellow-50/80',
  upcoming: 'bg-blue-50/80',
};

export default function ProjectsPage() {
  const t = useTranslations('projects');
  const tc = useTranslations('common');
  const locale = useLocale();
  const [activeType, setActiveType] = useState<ProjectType | 'all'>('all');
  const [activeStatus, setActiveStatus] = useState<ProjectStatus | 'all'>('all');

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
      <section className="relative pt-40 pb-20 bg-gradient-to-b from-neutral-50 to-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 text-neutral-900"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg text-neutral-500 max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            {/* Type Filter */}
            <div className="flex flex-wrap gap-2">
              {typeFilters.map((filter) => (
                <button
                  key={`type-${filter.value}`}
                  onClick={() => setActiveType(filter.value)}
                  className={
                    activeType === filter.value
                      ? 'filter-pill-active'
                      : 'filter-pill-inactive'
                  }
                >
                  {t(filter.key)}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex flex-wrap gap-2">
              {statusFilters.map((filter) => (
                <button
                  key={`status-${filter.value}`}
                  onClick={() => setActiveStatus(filter.value)}
                  className={
                    activeStatus === filter.value
                      ? 'filter-pill-active'
                      : 'filter-pill-inactive'
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
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={`/${locale}/projects/${project.slug}`}
                    className="group block h-full"
                  >
                    <div className="glass-card-hover overflow-hidden h-full">
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden rounded-t-3xl">
                        <Image
                          src={project.image}
                          alt={getLocalizedValue(project.title, locale)}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />

                        {/* Status Badge */}
                        <div className="absolute top-4 right-4">
                          <span
                            className={`status-badge backdrop-blur-sm ${statusBadgeBg[project.status]} ${statusTextColors[project.status]}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${statusColors[project.status]}`}
                            />
                            {getStatusLabel(project.status)}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-brand/10 text-brand">
                            {getTypeLabel(project.type)}
                          </span>
                        </div>

                        <h3 className="text-xl font-heading font-bold mb-1 text-neutral-900 group-hover:text-brand transition-colors duration-300">
                          {getLocalizedValue(project.title, locale)}
                        </h3>
                        <p className="text-neutral-500 text-sm mb-4">
                          {getLocalizedValue(project.location, locale)}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-sm text-neutral-500">
                          <span>
                            {formatNumber(project.area)} {t('sqm')}
                          </span>
                          <span className="w-px h-3 bg-neutral-200/60" />
                          <span>
                            {project.units} {t('units')}
                          </span>
                          <span className="w-px h-3 bg-neutral-200/60" />
                          <span>{project.year}</span>
                        </div>

                        {/* Progress Bar for Ongoing */}
                        {project.status === 'ongoing' && (
                          <div className="mt-4">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-xs text-neutral-500">
                                {t('progress')}
                              </span>
                              <span className="text-xs font-semibold text-brand">
                                {project.progress}%
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-neutral-100/60 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${project.progress}%` }}
                                transition={{
                                  duration: 1,
                                  delay: 0.3,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                                className="h-full rounded-full bg-brand"
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
              <div className="glass-card inline-block px-8 py-6">
                <p className="text-neutral-500 text-lg">
                  {locale === 'tr'
                    ? 'Bu filtrelere uygun proje bulunamadi.'
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
