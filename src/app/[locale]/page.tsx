import { unstable_setRequestLocale } from 'next-intl/server';
import { useLocale } from 'next-intl';
import { projects } from '@/data/projects';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { StatsSection } from '@/components/sections/StatsSection';
import { WhyUsSection } from '@/components/sections/WhyUsSection';
import { CTASection } from '@/components/sections/CTASection';

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
      <StatsSection />
      <WhyUsSection />
      <CTASection />
    </>
  );
}
