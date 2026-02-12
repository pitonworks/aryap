export type ProjectStatus = 'completed' | 'ongoing' | 'upcoming';
export type ProjectType = 'residential' | 'commercial' | 'mixed';

export interface Project {
  id: string;
  slug: string;
  title: { tr: string; en: string };
  description: { tr: string; en: string };
  type: ProjectType;
  status: ProjectStatus;
  location: { tr: string; en: string };
  coordinates: { lat: number; lng: number };
  area: number;
  units: number;
  year: number;
  progress: number;
  image: string;
  gallery: string[];
  features: { tr: string[]; en: string[] };
  hasTour: boolean;
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'aryap-lotus',
    title: { tr: 'Aryap Lotus', en: 'Aryap Lotus' },
    description: {
      tr: 'Eskisehir\'in kalbinde AVM ve rezidanslari bir araya getiren luks yasam projesi. Alisveris ve konforun bulusma noktasi.',
      en: 'A luxury living project combining a shopping mall and residences in the heart of Eskisehir. The meeting point of shopping and comfort.',
    },
    type: 'mixed',
    status: 'ongoing',
    location: { tr: 'Eskisehir', en: 'Eskisehir' },
    coordinates: { lat: 39.7767, lng: 30.5206 },
    area: 42000,
    units: 200,
    year: 2025,
    progress: 70,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop',
    ],
    features: {
      tr: ['AVM entegrasyonu', 'Akilli ev sistemleri', 'Kapali otopark', 'Havuz & SPA', '7/24 guvenlik', 'Fitness merkezi'],
      en: ['Mall integration', 'Smart home systems', 'Indoor parking', 'Pool & SPA', '24/7 Security', 'Fitness center'],
    },
    hasTour: true,
  },
  {
    id: '2',
    slug: 'aryap-mest',
    title: { tr: 'Aryap Mest', en: 'Aryap Mest' },
    description: {
      tr: 'Sehir merkezinde 80 uniteli, ailelere ozel tasarlanmis modern konut projesi. Huzurlu ve konforlu bir yasam alani.',
      en: 'An 80-unit modern residential project designed for families in the city center. A peaceful and comfortable living space.',
    },
    type: 'residential',
    status: 'completed',
    location: { tr: 'Eskisehir', en: 'Eskisehir' },
    coordinates: { lat: 39.7700, lng: 30.5156 },
    area: 18000,
    units: 80,
    year: 2023,
    progress: 100,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
    ],
    features: {
      tr: ['Aile odakli tasarim', 'Cocuk oyun alanlari', 'Yesil alanlar', 'Kapali otopark', 'Guvenlik kameralari', 'Jenerator'],
      en: ['Family-oriented design', 'Children playgrounds', 'Green areas', 'Indoor parking', 'Security cameras', 'Generator'],
    },
    hasTour: true,
  },
  {
    id: '3',
    slug: 'ozone-aryap',
    title: { tr: 'Ozone Aryap', en: 'Ozone Aryap' },
    description: {
      tr: '7 isyeri ve 10 ofisten olusan ticari proje. Modern is dunyasinin ihtiyaclarina yonelik tasarlanmis prestijli bir is merkezi.',
      en: 'A commercial project consisting of 7 businesses and 10 offices. A prestigious business center designed for the needs of the modern business world.',
    },
    type: 'commercial',
    status: 'completed',
    location: { tr: 'Eskisehir', en: 'Eskisehir' },
    coordinates: { lat: 39.7800, lng: 30.5100 },
    area: 8500,
    units: 17,
    year: 2022,
    progress: 100,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop',
    ],
    features: {
      tr: ['Merkezi konum', 'Modern ofis tasarimi', 'Fiber internet altyapisi', 'Otopark', 'Asansor', 'Guvenlik'],
      en: ['Central location', 'Modern office design', 'Fiber internet', 'Parking', 'Elevator', 'Security'],
    },
    hasTour: false,
  },
  {
    id: '4',
    slug: 'zeydanlar-location',
    title: { tr: 'Zeydanlar Location', en: 'Zeydanlar Location' },
    description: {
      tr: 'Tepebasi ilcesinde karma kullanim olarak gelistirilen prestijli proje. Konut ve ticari alanlari bir arada sunuyor.',
      en: 'A prestigious mixed-use project developed in the Tepebasi district. Offering residential and commercial spaces together.',
    },
    type: 'mixed',
    status: 'completed',
    location: { tr: 'Tepebasi, Eskisehir', en: 'Tepebasi, Eskisehir' },
    coordinates: { lat: 39.7850, lng: 30.5050 },
    area: 25000,
    units: 120,
    year: 2023,
    progress: 100,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop',
    ],
    features: {
      tr: ['Karma kullanim', 'Merkezi konum', 'Otopark', 'Peyzaj alanlari', 'Ticari uniteler', 'Sosyal tesisler'],
      en: ['Mixed-use', 'Central location', 'Parking', 'Landscaped areas', 'Commercial units', 'Social facilities'],
    },
    hasTour: false,
  },
  {
    id: '5',
    slug: 'aryap-nefes',
    title: { tr: 'Aryap Nefes', en: 'Aryap Nefes' },
    description: {
      tr: '84 daire (3+1, 4+1) ve 14 ticari uniteden olusan modern yasam projesi. Ferah ve genis yasam alanlari.',
      en: 'A modern living project consisting of 84 apartments (3+1, 4+1) and 14 commercial units. Spacious and airy living areas.',
    },
    type: 'mixed',
    status: 'ongoing',
    location: { tr: 'Eskisehir', en: 'Eskisehir' },
    coordinates: { lat: 39.7750, lng: 30.5300 },
    area: 22000,
    units: 98,
    year: 2025,
    progress: 55,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop',
    ],
    features: {
      tr: ['3+1 ve 4+1 secenekleri', 'Ticari uniteler', 'Acik otopark', 'Cocuk oyun alani', 'Yesil alanlar', 'Guvenlik'],
      en: ['3+1 and 4+1 options', 'Commercial units', 'Open parking', 'Playground', 'Green areas', 'Security'],
    },
    hasTour: false,
  },
  {
    id: '6',
    slug: 'aryap-vitrin',
    title: { tr: 'Aryap Vitrin', en: 'Aryap Vitrin' },
    description: {
      tr: 'Bursa\'da 150 uniteli, akilli ev sistemleriyle donatilmis modern konut projesi. Teknoloji ve konforu bir arada sunar.',
      en: 'A modern residential project in Bursa with 150 units equipped with smart home systems. Combines technology and comfort.',
    },
    type: 'residential',
    status: 'ongoing',
    location: { tr: 'Bursa', en: 'Bursa' },
    coordinates: { lat: 40.1885, lng: 29.0610 },
    area: 35000,
    units: 150,
    year: 2026,
    progress: 40,
    image: 'https://images.unsplash.com/photo-1622015663319-e97e697503ee?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1622015663319-e97e697503ee?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop',
    ],
    features: {
      tr: ['Akilli ev sistemleri', 'Kapali otopark', 'Yuzme havuzu', 'Fitness', 'Cocuk oyun alani', 'Peyzaj'],
      en: ['Smart home systems', 'Indoor parking', 'Swimming pool', 'Fitness', 'Playground', 'Landscaping'],
    },
    hasTour: true,
  },
  {
    id: '7',
    slug: 'aryap-camlica-144',
    title: { tr: 'Aryap Camlica 144', en: 'Aryap Camlica 144' },
    description: {
      tr: 'Modern mimarisi ve zengin sosyal olanaklariyla one cikan konut projesi. Huzurlu bir yasam icin ideal.',
      en: 'A residential project that stands out with its modern architecture and rich social amenities. Ideal for a peaceful life.',
    },
    type: 'residential',
    status: 'completed',
    location: { tr: 'Eskisehir', en: 'Eskisehir' },
    coordinates: { lat: 39.7680, lng: 30.5250 },
    area: 20000,
    units: 144,
    year: 2021,
    progress: 100,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
    ],
    features: {
      tr: ['144 unite', 'Sosyal tesisler', 'Otopark', 'Guvenlik', 'Peyzaj', 'Cocuk oyun alani'],
      en: ['144 units', 'Social facilities', 'Parking', 'Security', 'Landscaping', 'Playground'],
    },
    hasTour: true,
  },
  {
    id: '8',
    slug: 'aryap-konfor',
    title: { tr: 'Aryap Konfor', en: 'Aryap Konfor' },
    description: {
      tr: 'Gokmeydan\'da yerden isitmali akilli konut projesi. Modern teknoloji ve konforun bulusma noktasi.',
      en: 'A smart residential project with underfloor heating in Gokmeydan. The meeting point of modern technology and comfort.',
    },
    type: 'residential',
    status: 'completed',
    location: { tr: 'Gokmeydan, Eskisehir', en: 'Gokmeydan, Eskisehir' },
    coordinates: { lat: 39.7720, lng: 30.5350 },
    area: 15000,
    units: 60,
    year: 2020,
    progress: 100,
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200&h=800&fit=crop',
    ],
    features: {
      tr: ['Yerden isitma', 'Akilli ev', 'Otopark', 'Guvenlik', 'Jenerator', 'Asansor'],
      en: ['Underfloor heating', 'Smart home', 'Parking', 'Security', 'Generator', 'Elevator'],
    },
    hasTour: false,
  },
];
