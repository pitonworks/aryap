'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { MapPin, X } from 'lucide-react';
import { type Project } from '@/data/projects';
import { getLocalizedValue, formatNumber } from '@/lib/utils';

interface MapViewProps {
  projects: Project[];
  locale: string;
}

export default function MapView({ projects, locale }: MapViewProps) {
  const t = useTranslations('map');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!mapboxToken) {
    return (
      <div className="relative w-full h-[600px] bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl overflow-hidden shadow-glass">
        {/* Demo Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-100">
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: 'linear-gradient(rgba(27,58,75,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(27,58,75,0.15) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Demo markers */}
        <div className="absolute inset-0">
          {projects.map((project, i) => {
            const positions = [
              { top: '25%', left: '40%' },
              { top: '30%', left: '55%' },
              { top: '50%', left: '45%' },
              { top: '35%', left: '65%' },
              { top: '55%', left: '60%' },
              { top: '45%', left: '35%' },
              { top: '40%', left: '50%' },
              { top: '60%', left: '40%' },
            ];
            const pos = positions[i % positions.length];
            return (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ top: pos.top, left: pos.left }}
              >
                <div className="relative">
                  <MapPin className="w-8 h-8 text-brand drop-shadow-md group-hover:scale-110 transition-transform" />
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-brand rounded-full animate-ping" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Project Popup */}
        {selectedProject && (
          <div className="absolute top-4 right-4 w-72 bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl p-5 shadow-glass-lg z-10">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-3 right-3 p-1 hover:bg-white/50 rounded-xl transition-colors"
            >
              <X className="w-4 h-4 text-neutral-500" />
            </button>
            <h3 className="font-heading font-bold text-neutral-900 mb-1 pr-6">
              {getLocalizedValue(selectedProject.title, locale)}
            </h3>
            <p className="text-sm text-neutral-500 mb-2">
              {getLocalizedValue(selectedProject.location, locale)}
            </p>
            <p className="text-xs text-neutral-400 mb-3">
              {formatNumber(selectedProject.area)} m² | {selectedProject.units} units
            </p>
            <Link
              href={`/${locale}/projects/${selectedProject.slug}`}
              className="text-sm text-brand hover:text-brand-light font-medium transition-colors"
            >
              View Details &rarr;
            </Link>
          </div>
        )}

        {/* Demo Mode Notice */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl px-4 py-3 text-center shadow-glass">
            <p className="text-sm text-brand">{t('noToken')}</p>
          </div>
        </div>
      </div>
    );
  }

  return <MapboxMap projects={projects} locale={locale} token={mapboxToken} />;
}

function MapboxMap({ projects, locale, token }: MapViewProps & { token: string }) {
  return (
    <div className="relative w-full h-[600px] bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl overflow-hidden shadow-glass">
      <div id="mapbox-container" className="w-full h-full" ref={(el) => {
        if (!el || el.children.length > 0) return;
        import('mapbox-gl').then((mapboxgl) => {
          const map = new mapboxgl.default.Map({
            container: el,
            style: 'mapbox://styles/mapbox/light-v11',
            center: [30.5, 39.78],
            zoom: 12,
            accessToken: token,
          });
          map.addControl(new mapboxgl.default.NavigationControl(), 'top-right');
          projects.forEach((project) => {
            new mapboxgl.default.Marker({ color: '#1B3A4B' })
              .setLngLat([project.coordinates.lng, project.coordinates.lat])
              .setPopup(
                new mapboxgl.default.Popup({ offset: 25 }).setHTML(
                  `<div style="padding:4px"><strong>${getLocalizedValue(project.title, locale)}</strong><br/><small>${getLocalizedValue(project.location, locale)}</small><br/><a href="/${locale}/projects/${project.slug}" style="color:#1B3A4B;font-weight:500">View &rarr;</a></div>`
                )
              )
              .addTo(map);
          });
        });
      }} />
    </div>
  );
}
