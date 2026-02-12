export interface TeamMember {
  id: string;
  name: string;
  role: { tr: string; en: string };
  image: string;
}

export const team: TeamMember[] = [
  {
    id: '1',
    name: 'Ahmet Yilmaz',
    role: { tr: 'Genel Mudur', en: 'CEO' },
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
  },
  {
    id: '2',
    name: 'Elif Kaya',
    role: { tr: 'Proje Direktoru', en: 'Project Director' },
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
  },
  {
    id: '3',
    name: 'Mehmet Demir',
    role: { tr: 'Bas Mimar', en: 'Chief Architect' },
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  },
  {
    id: '4',
    name: 'Zeynep Aksoy',
    role: { tr: 'Satis & Pazarlama Muduru', en: 'Sales & Marketing Director' },
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
  },
];
