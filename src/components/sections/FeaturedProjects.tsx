'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Project } from '@/data/projects';
import { getLocalizedValue, formatNumber } from '@/lib/utils';
import { ProjectModal } from '@/components/ui/ProjectModal';

interface FeaturedProjectsProps {
  projects: Project[];
  locale: string;
}

const filterKeys = ['all', 'residential', 'commercial', 'mixed'] as const;

export function FeaturedProjects({ projects, locale }: FeaturedProjectsProps) {
  const t = useTranslations('home');
  const tp = useTranslations('projects');
  const tc = useTranslations('common');
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.type === activeFilter);

  const filterLabels: Record<string, string> = {
    all: tp('filterAll'),
    residential: tp('filterResidential'),
    commercial: tp('filterCommercial'),
    mixed: tp('filterMixed'),
  };

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 400;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      <section ref={ref} className="py-24 md:py-32 bg-neutral-100/60 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
          >
            <div className="flex items-end gap-4">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900">
                {t('featuredTitle')}
              </h2>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 bg-neutral-900 text-white text-sm font-semibold rounded-full mb-1 shadow-[0_4px_15px_rgba(0,0,0,0.15)]">
                {projects.length}+
                <span className="text-neutral-400 font-normal text-xs">
                  {locale === 'tr' ? 'Proje' : 'Projects'}
                </span>
              </span>
            </div>
            <Link
              href={`/${locale}/projects`}
              className="hidden sm:inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white text-sm font-semibold rounded-full shadow-card hover:shadow-elevated hover:-translate-y-0.5 hover:bg-neutral-800 transition-all duration-300 group"
            >
              {tc('viewAll')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </Link>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-2 mb-10"
          >
            {filterKeys.map((key) => {
              const count = key === 'all'
                ? projects.length
                : projects.filter((p) => p.type === key).length;
              return (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`flex items-center gap-2 ${activeFilter === key ? 'filter-tab-active shadow-card' : 'filter-tab-inactive'}`}
                >
                  {filterLabels[key]}
                  <span className={`text-xs ${activeFilter === key ? 'text-neutral-400' : 'text-neutral-300'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Horizontal scroll area */}
        <div className="relative">
          {/* Navigation arrows */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-elevated flex items-center justify-center hover:bg-white hover:scale-110 hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] transition-all duration-300 ring-1 ring-black/5"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-elevated flex items-center justify-center hover:bg-white hover:scale-110 hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] transition-all duration-300 ring-1 ring-black/5"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                ref={scrollRef}
                className="flex gap-4 sm:gap-5 lg:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4"
              >
                {filteredProjects.map((project, index) => {
                  const isHero = index === 0;

                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`flex-shrink-0 snap-start ${
                        isHero
                          ? 'w-[320px] sm:w-[400px] lg:w-[500px]'
                          : 'w-[280px] sm:w-[320px] lg:w-[380px]'
                      } h-[350px] sm:h-[400px] lg:h-[450px]`}
                    >
                      <ProjectCard
                        project={project}
                        locale={locale}
                        onSelect={() => setSelectedProject(project)}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile view all */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-8 sm:hidden px-4"
        >
          <Link
            href={`/${locale}/projects`}
            className="btn-primary inline-flex group"
          >
            {tc('viewAll')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
          </Link>
        </motion.div>
      </section>

      <ProjectModal
        project={selectedProject}
        locale={locale}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

function ProjectCard({
  project,
  locale,
  onSelect,
}: {
  project: Project;
  locale: string;
  onSelect: () => void;
}) {
  const typeLabels: Record<string, string> = {
    residential: locale === 'tr' ? 'Konut' : 'Residential',
    commercial: locale === 'tr' ? 'Ticari' : 'Commercial',
    mixed: locale === 'tr' ? 'Karma' : 'Mixed-Use',
  };

  return (
    <button
      onClick={onSelect}
      className="group relative block w-full h-full rounded-2xl overflow-hidden text-left shadow-[0_8px_30px_rgba(0,0,0,0.12)] ring-1 ring-black/5 transition-all duration-500 ease-out hover:shadow-[0_30px_70px_rgba(0,0,0,0.2)] hover:scale-[1.02] hover:ring-brand-200/50"
    >
      <Image
        src={project.image}
        alt={getLocalizedValue(project.title, locale)}
        fill
        loading="lazy"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, 500px"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-500" />
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
        <span className="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm text-neutral-700 text-[11px] sm:text-xs font-medium rounded-full">
          {typeLabels[project.type]}
        </span>
      </div>

      <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-900" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-5">
        <h3 className="font-heading text-sm sm:text-base lg:text-lg font-semibold text-white mb-0.5 sm:mb-1 drop-shadow-lg">
          {getLocalizedValue(project.title, locale)}
        </h3>
        <p className="text-white/80 text-xs sm:text-sm drop-shadow-md">
          {getLocalizedValue(project.location, locale)} · {formatNumber(project.area)} m²
        </p>
      </div>
    </button>
  );
}
