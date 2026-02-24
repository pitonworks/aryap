import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aryap Müteahhitlik & Emlak',
  description: 'Güvenilir inşaat ve emlak çözümleri',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
