'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'motion/react';
import Link from 'next/link';
import { MapPin, Filter, ExternalLink } from 'lucide-react';
import { projects, type ProjectType } from '@/data/projects';
import { getLocalizedValue, formatNumber } from '@/lib/utils';
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('@/components/map/MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl flex items-center justify-center shadow-glass">
      <div className="w-12 h-12 border-4 border-neutral-200 border-t-brand rounded-full animate-spin" />
    </div>
  ),
});

export default function MapPage() {
  const t = useTranslations('map');
  const tp = useTranslations('projects');
  const locale = useLocale();
  const [typeFilter, setTypeFilter] = useState<ProjectType | 'all'>('all');

  const filteredProjects = projects.filter((p) => {
    if (typeFilter !== 'all' && p.type !== typeFilter) return false;
    return true;
  });

  const typeFilters: { key: ProjectType | 'all'; label: string }[] = [
    { key: 'all', label: tp('filterAll') },
    { key: 'residential', label: tp('filterResidential') },
    { key: 'commercial', label: tp('filterCommercial') },
    { key: 'mixed', label: tp('filterMixed') },
  ];

  return (
    <>
      <section className="relative pt-40 pb-12 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-neutral-900 mb-4"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-500 max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-3 mb-8"
          >
            <Filter className="w-5 h-5 text-brand" />
            {typeFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => setTypeFilter(f.key)}
                className={
                  typeFilter === f.key
                    ? 'filter-pill-active'
                    : 'filter-pill-inactive'
                }
              >
                {f.label}
              </button>
            ))}
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <MapView projects={filteredProjects} locale={locale} />
          </motion.div>

          {/* Project List Below Map */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
              >
                <Link
                  href={`/${locale}/projects/${project.slug}`}
                  className="block p-4 glass-card-hover group"
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-neutral-900 group-hover:text-brand transition-colors truncate">
                        {getLocalizedValue(project.title, locale)}
                      </h3>
                      <p className="text-sm text-neutral-500">{getLocalizedValue(project.location, locale)}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-neutral-400">
                        <span>{formatNumber(project.area)} m²</span>
                        <span>{project.units} {tp('units')}</span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-brand transition-colors" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
