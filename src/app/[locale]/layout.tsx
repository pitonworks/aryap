import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/i18n';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import '@/app/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Aryap Insaat | Insaatta Kalite, Yasamda Konfor',
    template: '%s | Aryap Insaat',
  },
  description: 'Aryap Insaat - 20 yillik tecrubesiyle konut, ticari ve karma kullanim projeleri. Insaatta kalite, yasamda konfor.',
  keywords: ['insaat', 'emlak', 'konut', 'eskisehir', 'bursa', 'aryap', 'construction'],
  authors: [{ name: 'Aryap Insaat' }],
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    alternateLocale: 'en_US',
    siteName: 'Aryap Insaat',
    title: 'Aryap Insaat | Insaatta Kalite, Yasamda Konfor',
    description: 'Aryap Insaat - Insaatta kalite, yasamda konfor',
  },
  robots: { index: true, follow: true },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={poppins.variable}>
      <body className="bg-white text-neutral-800 font-body antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
