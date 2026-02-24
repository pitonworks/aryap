'use client';

import { useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
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
  ArrowUpRight,
  ChevronRight,
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
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <section className="pt-40 pb-20 text-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="card inline-block px-12 py-10">
            <h1 className="text-3xl font-heading font-bold mb-4 text-neutral-900">
              {tc('notFound')}
            </h1>
            <p className="text-neutral-400 mb-8">{tc('notFoundDesc')}</p>
            <Link
              href={`/${locale}/projects`}
              className="btn-primary"
            >
              <ArrowLeft className="w-4 h-4" />
              {tc('projects')}
            </Link>
          </div>
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
  const allImages = [project.image, ...project.gallery];
  const relatedProjects = projects
    .filter((p) => p.type === project.type && p.id !== project.id)
    .slice(0, 3);

  return (
    <>
      {/* Hero Image Banner with Parallax */}
      <section ref={heroRef} className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] min-h-[400px] overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <Image
            src={project.image}
            alt={getLocalizedValue(project.title, locale)}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </motion.div>

        {/* Back Button */}
        <div className="absolute top-28 left-4 sm:left-6 lg:left-8 z-10">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white/80 hover:text-white hover:bg-white/30 shadow-card transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            {tc('projects')}
          </Link>
        </div>

        {/* Title Overlay */}
        <motion.div style={{ opacity: heroOpacity }} className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-neutral-400 mb-3">
                <Link href={`/${locale}/projects`} className="hover:text-neutral-900 transition-colors">{locale === 'tr' ? 'Projeler' : 'Projects'}</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span>{getTypeLabel(project.type)}</span>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-white font-medium">{getLocalizedValue(project.title, locale)}</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className={`status-badge ${statusBadgeBg[project.status]} ${statusColors[project.status]}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusBgColors[project.status]}`} />
                  {getStatusLabel(project.status)}
                </span>
                <span className="status-badge bg-neutral-100 text-neutral-600">
                  {getTypeLabel(project.type)}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-2 text-white">
                {getLocalizedValue(project.title, locale)}
              </h1>
              <div className="flex items-center gap-2 text-white/70">
                <MapPin className="w-4 h-4" />
                <span>{getLocalizedValue(project.location, locale)}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Info Bar */}
      <section className="py-8 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <AnimatedSection>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { icon: Building2, label: t('type'), value: getTypeLabel(project.type) },
                { icon: null, label: t('status'), value: getStatusLabel(project.status), statusDot: true },
                { icon: Calendar, label: t('year'), value: String(project.year) },
                { icon: Ruler, label: t('area'), value: `${formatNumber(project.area)} m²` },
                { icon: Users, label: t('units'), value: String(project.units) },
              ].map((item, index) => (
                <div key={index} className="bg-neutral-50 rounded-xl p-4 text-center hover:shadow-card transition-all duration-300">
                  {item.statusDot ? (
                    <div className="flex items-center justify-center gap-1.5 mb-2">
                      <span className={`w-2 h-2 rounded-full ${statusBgColors[project.status]}`} />
                    </div>
                  ) : item.icon ? (
                    <item.icon className="w-5 h-5 text-neutral-400 mx-auto mb-2" />
                  ) : null}
                  <p className="text-xs text-neutral-400 mb-1">{item.label}</p>
                  <p className={`text-sm font-semibold ${item.statusDot ? statusColors[project.status] : 'text-neutral-900'}`}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Description + Sidebar */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Description */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <p className="section-label">{locale === 'tr' ? 'Proje Hakkında' : 'About Project'}</p>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-neutral-900">
                  {t('description')}
                </h2>
                <p className="text-neutral-500 leading-relaxed text-lg">
                  {getLocalizedValue(project.description, locale)}
                </p>
              </AnimatedSection>

              {/* Features */}
              <AnimatedSection delay={0.2} className="mt-12">
                <h3 className="text-xl font-heading font-bold mb-6 text-neutral-900">
                  {t('features')}
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                      className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors duration-300"
                    >
                      <CheckCircle className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                      <span className="text-neutral-700 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                {/* Progress (if ongoing) */}
                {project.status === 'ongoing' && (
                  <AnimatedSection>
                    <div className="card p-6">
                      <h3 className="text-sm font-semibold text-neutral-900 mb-4">{t('progress')}</h3>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-neutral-400 text-sm">
                          {getLocalizedValue(project.title, locale)}
                        </span>
                        <span className="text-neutral-900 font-bold text-lg">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <ProgressBarFill value={project.progress} />
                      </div>
                    </div>
                  </AnimatedSection>
                )}

                {/* Quick Actions */}
                <AnimatedSection delay={0.1}>
                  <div className="space-y-3">
                    <Link
                      href={`/${locale}/map`}
                      className="flex items-center justify-between w-full px-6 py-4 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-colors duration-300 shadow-card hover:shadow-elevated group"
                    >
                      <span className="flex items-center gap-3 text-sm font-semibold">
                        <Map className="w-5 h-5" />
                        {t('onMap')}
                      </span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </Link>
                    {project.hasTour && (
                      <Link
                        href={`/${locale}/virtual-tour`}
                        className="flex items-center justify-between w-full px-6 py-4 bg-white border border-neutral-200 rounded-xl text-neutral-700 hover:border-neutral-400 hover:shadow-card transition-all duration-300 group"
                      >
                        <span className="flex items-center gap-3 text-sm font-semibold">
                          <Eye className="w-5 h-5" />
                          {t('virtualTour')}
                        </span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                      </Link>
                    )}
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {project.gallery.length > 0 && (
        <section className="py-20 sm:py-28 bg-neutral-900">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <AnimatedSection className="mb-10">
              <p className="section-label text-white/60">{locale === 'tr' ? 'Galeri' : 'Gallery'}</p>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">
                {t('gallery')}
              </h2>
            </AnimatedSection>

            {/* Featured image */}
            <AnimatedSection delay={0.1}>
              <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-4 shadow-[0_25px_80px_rgba(0,0,0,0.3)]">
                <Image
                  src={allImages[activeGalleryIndex]}
                  alt={`${getLocalizedValue(project.title, locale)} - ${activeGalleryIndex + 1}`}
                  fill
                  className="object-cover transition-all duration-500"
                  sizes="100vw"
                />
              </div>
            </AnimatedSection>

            {/* Thumbnail strip */}
            <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveGalleryIndex(index)}
                  className={`flex-shrink-0 relative w-24 h-16 sm:w-32 sm:h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                    index === activeGalleryIndex
                      ? 'ring-2 ring-white opacity-100 shadow-card'
                      : 'opacity-60 hover:opacity-80'
                  }`}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <AnimatedSection className="mb-10">
              <p className="section-label">{locale === 'tr' ? 'Benzer Projeler' : 'Related Projects'}</p>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-neutral-900">
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
                    <div className="card-hover overflow-hidden">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={related.image}
                          alt={getLocalizedValue(related.title, locale)}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                        <div className="absolute top-4 right-4">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-card">
                            <ArrowUpRight className="w-5 h-5 text-neutral-900" />
                          </div>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-heading font-semibold mb-1 text-neutral-900 group-hover:text-neutral-600 transition-colors duration-300">
                          {getLocalizedValue(related.title, locale)}
                        </h3>
                        <p className="text-neutral-400 text-sm">
                          {getLocalizedValue(related.location, locale)} · {formatNumber(related.area)} m²
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
        className="h-full rounded-full bg-neutral-900"
      />
    </div>
  );
}
