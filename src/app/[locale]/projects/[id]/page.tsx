'use client';

import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { motion, useInView } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Building2,
  MapPin,
  Calendar,
  Ruler,
  Users,
  CheckCircle,
  ArrowLeft,
  Map,
  Eye,
} from 'lucide-react';
import { projects, type ProjectStatus, type ProjectType } from '@/data/projects';
import { getLocalizedValue, formatNumber } from '@/lib/utils';

function AnimatedSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const statusColors: Record<ProjectStatus, string> = {
  completed: 'text-green-600',
  ongoing: 'text-yellow-600',
  upcoming: 'text-blue-600',
};

const statusBgColors: Record<ProjectStatus, string> = {
  completed: 'bg-green-500',
  ongoing: 'bg-yellow-500',
  upcoming: 'bg-blue-500',
};

const statusBadgeBg: Record<ProjectStatus, string> = {
  completed: 'bg-green-50',
  ongoing: 'bg-yellow-50',
  upcoming: 'bg-blue-50',
};

export default function ProjectDetailPage() {
  const t = useTranslations('projects');
  const tc = useTranslations('common');
  const locale = useLocale();
  const params = useParams();
  const slug = params.id as string;

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <section className="pt-40 pb-20 text-center bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-heading font-bold mb-4 text-neutral-900">
            {tc('notFound')}
          </h1>
          <p className="text-neutral-500 mb-8">{tc('notFoundDesc')}</p>
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-light transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {tc('projects')}
          </Link>
        </div>
      </section>
    );
  }

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

  const features = getLocalizedValue(project.features, locale);
  const relatedProjects = projects
    .filter((p) => p.type === project.type && p.id !== project.id)
    .slice(0, 3);

  return (
    <>
      {/* Hero Image Banner */}
      <section className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] min-h-[400px]">
        <Image
          src={project.image}
          alt={getLocalizedValue(project.title, locale)}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-28 left-4 sm:left-6 lg:left-8 z-10">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-xl text-neutral-600 hover:text-brand hover:border-brand/30 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            {tc('projects')}
          </Link>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full ${statusBadgeBg[project.status]} ${statusColors[project.status]}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${statusBgColors[project.status]}`}
                  />
                  {getStatusLabel(project.status)}
                </span>
                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-brand-50 text-brand">
                  {getTypeLabel(project.type)}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-2 text-neutral-900">
                {getLocalizedValue(project.title, locale)}
              </h1>
              <div className="flex items-center gap-2 text-neutral-600">
                <MapPin className="w-4 h-4 text-brand" />
                <span>{getLocalizedValue(project.location, locale)}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info Bar */}
      <section className="py-8 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-center">
                <Building2 className="w-5 h-5 text-brand mx-auto mb-2" />
                <p className="text-xs text-neutral-500 mb-1">{t('type')}</p>
                <p className="text-sm font-semibold text-neutral-900">{getTypeLabel(project.type)}</p>
              </div>
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <span
                    className={`w-2 h-2 rounded-full ${statusBgColors[project.status]}`}
                  />
                </div>
                <p className="text-xs text-neutral-500 mb-1">{t('status')}</p>
                <p className={`text-sm font-semibold ${statusColors[project.status]}`}>
                  {getStatusLabel(project.status)}
                </p>
              </div>
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-center">
                <Calendar className="w-5 h-5 text-brand mx-auto mb-2" />
                <p className="text-xs text-neutral-500 mb-1">{t('year')}</p>
                <p className="text-sm font-semibold text-neutral-900">{project.year}</p>
              </div>
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-center">
                <Ruler className="w-5 h-5 text-brand mx-auto mb-2" />
                <p className="text-xs text-neutral-500 mb-1">{t('area')}</p>
                <p className="text-sm font-semibold text-neutral-900">
                  {formatNumber(project.area)} {t('sqm')}
                </p>
              </div>
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-center">
                <Users className="w-5 h-5 text-brand mx-auto mb-2" />
                <p className="text-xs text-neutral-500 mb-1">{t('units')}</p>
                <p className="text-sm font-semibold text-neutral-900">{project.units}</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-heading font-bold mb-6 text-neutral-900">
              {t('description')}
            </h2>
            <p className="text-neutral-600 leading-relaxed max-w-3xl text-lg">
              {getLocalizedValue(project.description, locale)}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-heading font-bold mb-8 text-neutral-900">
              {t('features')}
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <AnimatedSection key={index} delay={index * 0.05}>
                <div className="flex items-center gap-3 p-4 bg-neutral-50 border border-neutral-200 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-brand flex-shrink-0" />
                  <span className="text-neutral-700">{feature}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Section (Ongoing Only) */}
      {project.status === 'ongoing' && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-2xl font-heading font-bold mb-8 text-neutral-900">
                {t('progress')}
              </h2>
              <div className="max-w-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-neutral-500">
                    {getLocalizedValue(project.title, locale)}
                  </span>
                  <span className="text-brand font-bold text-lg">
                    {project.progress}%
                  </span>
                </div>
                <div className="w-full h-4 bg-neutral-100 rounded-full overflow-hidden">
                  <ProgressBarFill value={project.progress} />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.gallery.length > 0 && (
        <section className="py-16 sm:py-20 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-2xl font-heading font-bold mb-8 text-neutral-900">
                {t('gallery')}
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {project.gallery.map((image, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                    <Image
                      src={image}
                      alt={`${getLocalizedValue(project.title, locale)} - ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Action Buttons */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href={`/${locale}/map`}
                className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold rounded-xl bg-brand text-white hover:bg-brand-light transition-colors"
              >
                <Map className="w-5 h-5" />
                {t('onMap')}
              </Link>
              {project.hasTour && (
                <Link
                  href={`/${locale}/virtual-tour`}
                  className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold rounded-xl border-2 border-brand text-brand hover:bg-brand-50 transition-colors duration-300"
                >
                  <Eye className="w-5 h-5" />
                  {t('virtualTour')}
                </Link>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 sm:py-20 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-10">
              <h2 className="text-2xl font-heading font-bold text-neutral-900">
                {t('relatedProjects')}
              </h2>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((related, index) => (
                <AnimatedSection key={related.id} delay={index * 0.1}>
                  <Link
                    href={`/${locale}/projects/${related.slug}`}
                    className="group block"
                  >
                    <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={related.image}
                          alt={getLocalizedValue(related.title, locale)}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-heading font-bold mb-1 text-neutral-900 group-hover:text-brand transition-colors duration-300">
                          {getLocalizedValue(related.title, locale)}
                        </h3>
                        <p className="text-neutral-500 text-sm">
                          {getLocalizedValue(related.location, locale)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

/** Animated progress bar fill */
function ProgressBarFill({ value }: { value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div ref={ref} className="h-full">
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: `${clamped}%` } : { width: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="h-full rounded-full bg-gradient-to-r from-brand to-brand-light"
      />
    </div>
  );
}
