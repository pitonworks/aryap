import { unstable_setRequestLocale } from 'next-intl/server';
import { useLocale } from 'next-intl';
import { projects } from '@/data/projects';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { ProjectShowcase } from '@/components/sections/ProjectShowcase';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { WhyUsSection } from '@/components/sections/WhyUsSection';
import { PartnersSection } from '@/components/sections/PartnersSection';
import { CTASection } from '@/components/sections/CTASection';
import { SectionTransition } from '@/components/ui/SectionTransition';

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const featuredProjects = projects.filter((p) => p.status === 'completed').slice(0, 3);

  return (
    <>
      <HeroSection />
      <FeaturedProjects projects={featuredProjects} locale={locale} />
      <SectionTransition from="white" to="white" />
      <TestimonialsSection />
      <SectionTransition from="white" to="brand" />
      <StatsSection />
      <SectionTransition from="brand" to="white" />
      <ProjectShowcase />
      <SectionTransition from="white" to="neutral" />
      <ProcessSection />
      <SectionTransition from="neutral" to="white" />
      <WhyUsSection />
      <SectionTransition from="white" to="white" />
      <PartnersSection />
      <SectionTransition from="white" to="brand" />
      <CTASection />
      <SectionTransition from="brand" to="white" />
    </>
  );
}
