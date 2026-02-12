'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'motion/react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/data/projects';
import { MapPin, ArrowRight } from 'lucide-react';

function ProjectCard({
  project,
  locale,
}: {
  project: (typeof projects)[0];
  locale: string;
}) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ rotateX: -y * 10, rotateY: x * 10 });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  const title = locale === 'tr' ? project.title.tr : project.title.en;
  const location = locale === 'tr' ? project.location.tr : project.location.en;

  return (
    <div
      className="flex-shrink-0 w-[300px] sm:w-[360px] snap-center"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="group relative rounded-3xl overflow-hidden shadow-glass hover:shadow-glass-lg transition-shadow duration-500 cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Link href={`/${locale}/projects/${project.slug}`}>
          {/* Image with parallax */}
          <div className="relative h-[400px] sm:h-[450px] overflow-hidden">
            <Image
              src={project.image}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="360px"
            />
            {/* Gradient overlay — always visible at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          </div>

          {/* Info overlay — slide up on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500">
            <div className="flex items-center gap-1.5 text-white/70 text-xs mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>{location}</span>
              <span className="mx-1">|</span>
              <span>{project.year}</span>
            </div>
            <h3 className="font-heading text-xl text-white mb-2">{title}</h3>
            <div className="flex items-center gap-2 text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>{locale === 'tr' ? 'Projeyi Incele' : 'View Project'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}

export function ProjectShowcase() {
  const t = useTranslations('home');
  const locale = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Drag-to-scroll for desktop
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-neutral-800 mb-4">
            {t('showcaseTitle')}
          </h2>
          <p className="text-neutral-500 text-lg max-w-2xl mx-auto font-body">
            {t('showcaseSubtitle')}
          </p>
        </motion.div>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className={`flex gap-6 px-4 sm:px-8 lg:px-16 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 ${
          isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
        }`}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ProjectCard project={project} locale={locale} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
