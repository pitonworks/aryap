'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Eye, ChevronRight, RotateCcw } from 'lucide-react';
import { tours } from '@/data/tours';
import { projects } from '@/data/projects';
import { getLocalizedValue } from '@/lib/utils';
import dynamic from 'next/dynamic';

const PanoramaViewer = dynamic(() => import('@/components/tour/PanoramaViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl flex items-center justify-center shadow-glass">
      <div className="w-12 h-12 border-4 border-neutral-200 border-t-brand rounded-full animate-spin" />
    </div>
  ),
});

export default function VirtualTourPage() {
  const t = useTranslations('tour');
  const locale = useLocale();
  const [selectedTourIdx, setSelectedTourIdx] = useState(0);
  const [selectedRoomIdx, setSelectedRoomIdx] = useState(0);

  const selectedTour = tours[selectedTourIdx];
  const selectedRoom = selectedTour?.rooms[selectedRoomIdx];
  const tourProject = projects.find((p) => p.id === selectedTour?.projectId);

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
          {/* Project Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3 mb-6"
          >
            <span className="text-sm text-neutral-500 self-center mr-2">{t('selectProject')}:</span>
            {tours.map((tour, i) => {
              const project = projects.find((p) => p.id === tour.projectId);
              return (
                <button
                  key={tour.projectId}
                  onClick={() => { setSelectedTourIdx(i); setSelectedRoomIdx(0); }}
                  className={
                    selectedTourIdx === i
                      ? 'filter-pill-active'
                      : 'filter-pill-inactive'
                  }
                >
                  {project ? getLocalizedValue(project.title, locale) : tour.projectSlug}
                </button>
              );
            })}
          </motion.div>

          {/* Room Selector */}
          {selectedTour && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              <span className="text-sm text-neutral-500 self-center mr-2">{t('selectRoom')}:</span>
              {selectedTour.rooms.map((room, i) => (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoomIdx(i)}
                  className={`px-3 py-1.5 rounded-xl text-sm transition-all ${
                    selectedRoomIdx === i
                      ? 'bg-brand/10 text-brand border border-brand/30 font-medium'
                      : 'bg-white/60 backdrop-blur-sm text-neutral-600 hover:bg-white/80 border border-white/40'
                  }`}
                >
                  {getLocalizedValue(room.name, locale)}
                </button>
              ))}
            </motion.div>
          )}

          {/* Panorama Viewer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {selectedRoom ? (
              <PanoramaViewer
                key={`${selectedTour.projectId}-${selectedRoom.id}`}
                imageUrl={selectedRoom.panoramaUrl}
                title={getLocalizedValue(selectedRoom.name, locale)}
              />
            ) : (
              <div className="w-full h-[500px] glass-card flex items-center justify-center">
                <p className="text-neutral-500">{t('noTourAvailable')}</p>
              </div>
            )}
          </motion.div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 flex items-center justify-center gap-6 text-sm text-neutral-400"
          >
            <span className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              {t('dragToLook')}
            </span>
          </motion.div>

          {/* Project Link */}
          {tourProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 text-center"
            >
              <Link
                href={`/${locale}/projects/${tourProject.slug}`}
                className="inline-flex items-center gap-2 text-brand hover:text-brand-light font-medium transition-colors"
              >
                <Eye className="w-4 h-4" />
                {getLocalizedValue(tourProject.title, locale)}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
