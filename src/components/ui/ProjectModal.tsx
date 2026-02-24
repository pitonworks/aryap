'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Ruler, Building2, Calendar, ChevronRight, ExternalLink, Eye } from 'lucide-react';
import type { Project } from '@/data/projects';
import { getLocalizedValue, formatNumber } from '@/lib/utils';

interface ProjectModalProps {
  project: Project | null;
  locale: string;
  onClose: () => void;
}

const tabKeys = ['general', 'about', 'features', 'gallery'] as const;
type TabKey = typeof tabKeys[number];

export function ProjectModal({ project, locale, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('general');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const tabLabels: Record<TabKey, string> = {
    general: locale === 'tr' ? 'Genel Bilgi' : 'General Info',
    about: locale === 'tr' ? 'Hakkında' : 'About',
    features: locale === 'tr' ? 'Özellikler' : 'Features',
    gallery: locale === 'tr' ? 'Galeri' : 'Gallery',
  };

  const typeLabels: Record<string, string> = {
    residential: locale === 'tr' ? 'Konut' : 'Residential',
    commercial: locale === 'tr' ? 'Ticari' : 'Commercial',
    mixed: locale === 'tr' ? 'Karma' : 'Mixed-Use',
  };

  const statusLabels: Record<string, string> = {
    completed: locale === 'tr' ? 'Tamamlandı' : 'Completed',
    ongoing: locale === 'tr' ? 'Devam Ediyor' : 'Ongoing',
    upcoming: locale === 'tr' ? 'Yaklaşan' : 'Upcoming',
  };

  // Reset state when project changes
  useEffect(() => {
    if (project) {
      setActiveTab('general');
      setActiveImageIndex(0);
    }
  }, [project]);

  // Close on Escape
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (project) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, handleKeyDown]);

  if (!project) return null;

  const allImages = [project.image, ...project.gallery];
  const features = getLocalizedValue(project.features, locale);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 lg:p-10"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-white transition-all duration-200 shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col lg:flex-row">
                {/* Left: Image */}
                <div className="lg:w-[45%] flex-shrink-0">
                  <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[500px]">
                    <Image
                      src={allImages[activeImageIndex]}
                      alt={getLocalizedValue(project.title, locale)}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent lg:bg-none" />
                  </div>

                  {/* Thumbnail strip */}
                  {allImages.length > 1 && (
                    <div className="flex gap-2 p-3 bg-neutral-50 overflow-x-auto scrollbar-hide">
                      {allImages.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImageIndex(i)}
                          className={`flex-shrink-0 relative w-16 h-12 rounded-lg overflow-hidden transition-all duration-200 ${
                            i === activeImageIndex
                              ? 'ring-2 ring-neutral-900 opacity-100'
                              : 'opacity-50 hover:opacity-80'
                          }`}
                        >
                          <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Details */}
                <div className="flex-1 p-6 sm:p-8 lg:p-10">
                  {/* Breadcrumb */}
                  <div className="flex items-center gap-2 text-sm text-neutral-400 mb-4">
                    <span className="font-semibold text-neutral-900">{project.id.padStart(2, '0')}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span>{getLocalizedValue(project.location, locale)}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span>{typeLabels[project.type]}</span>
                  </div>

                  {/* Developer */}
                  <p className="text-xs text-neutral-400 uppercase tracking-wider mb-2">
                    Aryap Müteahhitlik
                  </p>

                  {/* Title */}
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-neutral-900 mb-6 leading-tight">
                    {getLocalizedValue(project.title, locale)}
                  </h2>

                  {/* Spec grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 pb-6 border-b border-neutral-100">
                    <div className="bg-neutral-50 rounded-xl p-3 text-center">
                      <Ruler className="w-4 h-4 text-neutral-400 mx-auto mb-1" />
                      <p className="text-sm font-semibold text-neutral-900">{formatNumber(project.area)} m²</p>
                      <p className="text-xs text-neutral-400">{locale === 'tr' ? 'Alan' : 'Area'}</p>
                    </div>
                    <div className="bg-neutral-50 rounded-xl p-3 text-center">
                      <Building2 className="w-4 h-4 text-neutral-400 mx-auto mb-1" />
                      <p className="text-sm font-semibold text-neutral-900">{project.units}</p>
                      <p className="text-xs text-neutral-400">{locale === 'tr' ? 'Ünite' : 'Units'}</p>
                    </div>
                    <div className="bg-neutral-50 rounded-xl p-3 text-center">
                      <div className="w-4 h-4 mx-auto mb-1 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full border-2 border-neutral-400" style={{
                          background: `conic-gradient(#1B3A4B ${project.progress}%, transparent ${project.progress}%)`
                        }} />
                      </div>
                      <p className="text-sm font-semibold text-neutral-900">{project.progress}%</p>
                      <p className="text-xs text-neutral-400">{statusLabels[project.status]}</p>
                    </div>
                    <div className="bg-neutral-50 rounded-xl p-3 text-center">
                      <Calendar className="w-4 h-4 text-neutral-400 mx-auto mb-1" />
                      <p className="text-sm font-semibold text-neutral-900">{project.year}</p>
                      <p className="text-xs text-neutral-400">{locale === 'tr' ? 'Yıl' : 'Year'}</p>
                    </div>
                  </div>

                  {/* Tab content */}
                  {activeTab === 'general' && (
                    <div className="mb-6">
                      <p className="text-neutral-500 text-sm leading-relaxed">
                        {getLocalizedValue(project.description, locale)}
                      </p>
                    </div>
                  )}

                  {activeTab === 'about' && (
                    <div className="mb-6">
                      <p className="text-neutral-500 text-sm leading-relaxed mb-4">
                        {getLocalizedValue(project.description, locale)}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-neutral-500">
                        <MapPin className="w-4 h-4" />
                        <span>{getLocalizedValue(project.location, locale)}</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'features' && (
                    <div className="mb-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 py-2 text-sm text-neutral-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-neutral-900 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'gallery' && (
                    <div className="mb-6">
                      <div className="grid grid-cols-2 gap-3">
                        {allImages.map((img, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveImageIndex(i)}
                            className="relative aspect-[4/3] rounded-xl overflow-hidden group"
                          >
                            <Image src={img} alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="200px" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/${locale}/projects/${project.slug}`}
                      onClick={onClose}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white text-sm font-semibold rounded-full hover:bg-neutral-800 transition-colors duration-300"
                    >
                      <Eye className="w-4 h-4" />
                      {locale === 'tr' ? 'Detaylı İncele' : 'View Details'}
                    </Link>
                    {project.hasTour && (
                      <Link
                        href={`/${locale}/virtual-tour`}
                        onClick={onClose}
                        className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-200 text-neutral-700 text-sm font-semibold rounded-full hover:border-neutral-400 transition-colors duration-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {locale === 'tr' ? 'Sanal Tur' : 'Virtual Tour'}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom tab navigation */}
            <div className="border-t border-neutral-100 bg-neutral-50/50">
              <div className="flex overflow-x-auto scrollbar-hide">
                {tabKeys.map((key, index) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors duration-200 border-b-2 ${
                      activeTab === key
                        ? 'text-neutral-900 border-neutral-900'
                        : 'text-neutral-400 border-transparent hover:text-neutral-600'
                    }`}
                  >
                    <span className="text-xs text-neutral-300">{(index + 1).toString().padStart(2, '0')}.</span>
                    {tabLabels[key]}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
