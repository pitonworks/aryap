import { unstable_setRequestLocale } from 'next-intl/server';
import { projects } from '@/data/projects';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { InsightsSection } from '@/components/sections/InsightsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { WhyUsSection } from '@/components/sections/WhyUsSection';
import { PartnersSection } from '@/components/sections/PartnersSection';
import { CTASection } from '@/components/sections/CTASection';

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
      <InsightsSection />
      <TestimonialsSection />
      <WhyUsSection />
      <PartnersSection />
      <CTASection />
    </>
  );
}
