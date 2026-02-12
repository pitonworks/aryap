'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Ruler, Building2, Calendar } from 'lucide-react';
import type { Project } from '@/data/projects';
import { getLocalizedValue, formatNumber } from '@/lib/utils';

interface FeaturedProjectsProps {
  projects: Project[];
  locale: string;
}

export function FeaturedProjects({ projects, locale }: FeaturedProjectsProps) {
  const t = useTranslations('home');
  const tc = useTranslations('common');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const typeLabels: Record<string, string> = {
    residential: locale === 'tr' ? 'Konut' : 'Residential',
    commercial: locale === 'tr' ? 'Ticari' : 'Commercial',
    mixed: locale === 'tr' ? 'Karma' : 'Mixed-Use',
  };

  return (
    <section ref={ref} className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <div className="w-12 h-1 bg-brand mb-6 rounded-full" />
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-2">
              {t('featuredTitle')}
            </h2>
            <p className="text-neutral-500 text-lg max-w-2xl">
              {t('featuredSubtitle')}
            </p>
          </div>
          <Link
            href={`/${locale}/projects`}
            className="hidden sm:inline-flex items-center gap-2 text-brand hover:text-brand-light font-semibold transition-colors duration-300 group"
          >
            <span>{tc('viewAll')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>

        {/* Mobile: Horizontal scroll / Desktop: Grid */}
        <div className="lg:hidden -mx-4 px-4">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex-shrink-0 w-[85vw] max-w-sm snap-start"
              >
                <ProjectCard
                  project={project}
                  locale={locale}
                  typeLabels={typeLabels}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ProjectCard
                project={project}
                locale={locale}
                typeLabels={typeLabels}
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile view all link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-8 sm:hidden"
        >
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 text-brand hover:text-brand-light font-semibold transition-colors duration-300 group"
          >
            <span>{tc('viewAll')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  locale,
  typeLabels,
}: {
  project: Project;
  locale: string;
  typeLabels: Record<string, string>;
}) {
  return (
    <Link
      href={`/${locale}/projects/${project.slug}`}
      className="group block glass-card-hover overflow-hidden h-full"
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-3xl">
        <Image
          src={project.image}
          alt={getLocalizedValue(project.title, locale)}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Type badge */}
        <div className="absolute top-4 left-4">
          <span className="status-badge bg-white/80 backdrop-blur-sm text-brand group-hover:bg-white/90 group-hover:shadow-glass transition-all duration-300">
            {typeLabels[project.type]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-heading text-xl text-neutral-900 mb-3 group-hover:text-brand transition-colors duration-300">
          {getLocalizedValue(project.title, locale)}
        </h3>
        <div className="flex flex-wrap items-center gap-3 text-neutral-500 text-sm">
          <span className="inline-flex items-center gap-1 group-hover:text-neutral-700 transition-colors duration-300">
            <MapPin className="w-3.5 h-3.5" />
            {getLocalizedValue(project.location, locale)}
          </span>
          <span className="inline-flex items-center gap-1 group-hover:text-neutral-700 transition-colors duration-300">
            <Ruler className="w-3.5 h-3.5" />
            {formatNumber(project.area)} m²
          </span>
          <span className="inline-flex items-center gap-1 group-hover:text-neutral-700 transition-colors duration-300">
            <Building2 className="w-3.5 h-3.5" />
            {project.units}
          </span>
          <span className="inline-flex items-center gap-1 group-hover:text-neutral-700 transition-colors duration-300">
            <Calendar className="w-3.5 h-3.5" />
            {project.year}
          </span>
        </div>
      </div>
    </Link>
  );
}
