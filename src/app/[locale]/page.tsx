import { unstable_setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';
import { projects } from '@/data/projects';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';

// Lazy load below-the-fold sections for faster initial page load
const StatsSection = dynamic(() => import('@/components/sections/StatsSection').then(m => ({ default: m.StatsSection })), { ssr: true });
const WhyUsSection = dynamic(() => import('@/components/sections/WhyUsSection').then(m => ({ default: m.WhyUsSection })), { ssr: true });
const InsightsSection = dynamic(() => import('@/components/sections/InsightsSection').then(m => ({ default: m.InsightsSection })), { ssr: true });
const ProcessSection = dynamic(() => import('@/components/sections/ProcessSection').then(m => ({ default: m.ProcessSection })), { ssr: true });
const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })), { ssr: true });
const PartnersSection = dynamic(() => import('@/components/sections/PartnersSection').then(m => ({ default: m.PartnersSection })), { ssr: true });
const CTASection = dynamic(() => import('@/components/sections/CTASection').then(m => ({ default: m.CTASection })), { ssr: true });

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <FeaturedProjects projects={projects} locale={locale} />
      <StatsSection />
      <WhyUsSection />
      <InsightsSection />
      <ProcessSection />
      <TestimonialsSection />
      <PartnersSection />
      <CTASection />
    </>
  );
}
