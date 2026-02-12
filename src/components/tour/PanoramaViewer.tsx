'use client';

import { useEffect, useRef, useState } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

interface PanoramaViewerProps {
  imageUrl: string;
  title: string;
}

export default function PanoramaViewer({ imageUrl, title }: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    let viewer: any = null;

    const initViewer = async () => {
      try {
        const { Viewer } = await import('@photo-sphere-viewer/core');

        viewer = new Viewer({
          container: containerRef.current!,
          panorama: imageUrl,
          defaultYaw: 0,
          defaultPitch: 0,
          navbar: false,
          loadingTxt: '',
          touchmoveTwoFingers: false,
          mousewheelCtrlKey: false,
        });

        viewer.addEventListener('ready', () => {
          setLoaded(true);
        });

        viewerRef.current = viewer;
      } catch (err) {
        console.error('Failed to initialize panorama viewer:', err);
        setError(true);
      }
    };

    initViewer();

    return () => {
      if (viewer) {
        try {
          viewer.destroy();
        } catch {}
      }
    };
  }, [imageUrl]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  if (error) {
    return (
      <div className="relative w-full h-[500px] bg-neutral-100 border border-neutral-200 rounded-2xl overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
          <div className="text-center px-4">
            <p className="text-lg font-heading font-bold text-neutral-900 mb-2">{title}</p>
            <p className="text-sm text-neutral-500">360° viewer - drag to look around</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] bg-neutral-100 border border-neutral-200 rounded-2xl overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-neutral-100">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-neutral-200 border-t-brand rounded-full animate-spin" />
            <p className="text-sm text-neutral-400">Loading panorama...</p>
          </div>
        </div>
      )}

      <div ref={containerRef} className="w-full h-full" />

      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm">
        <p className="text-sm font-semibold text-neutral-900">{title}</p>
      </div>

      <button
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm hover:bg-white transition-colors"
      >
        {isFullscreen ? <Minimize2 className="w-5 h-5 text-neutral-700" /> : <Maximize2 className="w-5 h-5 text-neutral-700" />}
      </button>
    </div>
  );
}
