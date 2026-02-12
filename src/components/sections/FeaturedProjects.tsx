'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import type { Project } from '@/data/projects';
import { getLocalizedValue } from '@/lib/utils';

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
    <section ref={ref} className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <div className="w-12 h-1 bg-brand mx-auto mb-6 rounded-full" />
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-4">
            {t('featuredTitle')}
          </h2>
          <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
            {t('featuredSubtitle')}
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
              }
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={`/${locale}/projects/${project.slug}`}
                className="group block bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-brand/30 hover:scale-[1.02] transition-all duration-300"
              >
                {/* Image */}
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image
                    src={project.image}
                    alt={getLocalizedValue(project.title, locale)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Type badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand">
                      {typeLabels[project.type]}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-heading text-xl text-neutral-900 mb-2 group-hover:text-brand transition-colors duration-300">
                    {getLocalizedValue(project.title, locale)}
                  </h3>
                  <div className="flex items-center gap-1.5 text-neutral-500 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{getLocalizedValue(project.location, locale)}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-12"
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
