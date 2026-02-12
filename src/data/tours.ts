export interface TourRoom {
  id: string;
  name: { tr: string; en: string };
  panoramaUrl: string;
}

export interface VirtualTour {
  projectId: string;
  projectSlug: string;
  rooms: TourRoom[];
}

// Demo panorama URL - a placeholder equirectangular image
const DEMO_PANORAMA = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=4096&h=2048&fit=crop';

export const tours: VirtualTour[] = [
  {
    projectId: '1',
    projectSlug: 'aryap-lotus',
    rooms: [
      { id: 'living', name: { tr: 'Oturma Odasi', en: 'Living Room' }, panoramaUrl: DEMO_PANORAMA },
      { id: 'bedroom', name: { tr: 'Yatak Odasi', en: 'Bedroom' }, panoramaUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=4096&h=2048&fit=crop' },
      { id: 'kitchen', name: { tr: 'Mutfak', en: 'Kitchen' }, panoramaUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=4096&h=2048&fit=crop' },
    ],
  },
  {
    projectId: '2',
    projectSlug: 'aryap-mest',
    rooms: [
      { id: 'living', name: { tr: 'Salon', en: 'Living Room' }, panoramaUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=4096&h=2048&fit=crop' },
      { id: 'bedroom', name: { tr: 'Yatak Odasi', en: 'Bedroom' }, panoramaUrl: DEMO_PANORAMA },
    ],
  },
  {
    projectId: '3',
    projectSlug: 'ozone-aryap',
    rooms: [
      { id: 'office', name: { tr: 'Ofis', en: 'Office' }, panoramaUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=4096&h=2048&fit=crop' },
      { id: 'lobby', name: { tr: 'Lobi', en: 'Lobby' }, panoramaUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=4096&h=2048&fit=crop' },
    ],
  },
  {
    projectId: '5',
    projectSlug: 'aryap-nefes',
    rooms: [
      { id: 'exterior', name: { tr: 'Dis Cephe', en: 'Exterior' }, panoramaUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=4096&h=2048&fit=crop' },
    ],
  },
];
