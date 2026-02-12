import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aryap Mutahitlik & Emlak',
  description: 'Guvenilir insaat ve emlak cozumleri',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
