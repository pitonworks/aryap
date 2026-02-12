'use client';

import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView } from 'motion/react';
import Image from 'next/image';
import { Shield, Lightbulb, Handshake, Leaf, Award } from 'lucide-react';
import { team } from '@/data/team';
import { getLocalizedValue } from '@/lib/utils';

function AnimatedSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const values = [
  { key: 'valueQuality', descKey: 'valueQualityDesc', icon: Shield },
  { key: 'valueInnovation', descKey: 'valueInnovationDesc', icon: Lightbulb },
  { key: 'valueTrust', descKey: 'valueTrustDesc', icon: Handshake },
  { key: 'valueSustainability', descKey: 'valueSustainabilityDesc', icon: Leaf },
] as const;

const certKeys = ['certsISO', 'certsGreen', 'certsExcellence'] as const;

export default function AboutPage() {
  const t = useTranslations('about');
  const locale = useLocale();

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-40 pb-20 bg-gradient-to-b from-neutral-50 to-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 text-neutral-900"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg text-neutral-500 max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimatedSection>
              <div className="glass-card p-8 sm:p-10">
                <h2 className="text-3xl font-heading font-bold mb-6 text-brand">
                  {t('storyTitle')}
                </h2>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  {t('storyText')}
                </p>
                <p className="text-neutral-600 leading-relaxed">
                  {t('storyText2')}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop"
                  alt={t('storyTitle')}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-neutral-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-neutral-900">
              {t('valuesTitle')}
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <AnimatedSection key={value.key} delay={index * 0.1}>
                  <div className="glass-card-hover p-6 text-center h-full">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand/10 backdrop-blur-sm mb-5">
                      <Icon className="w-7 h-7 text-brand" />
                    </div>
                    <h3 className="text-lg font-heading font-bold mb-2 text-neutral-900">
                      {t(value.key)}
                    </h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">
                      {t(value.descKey)}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-neutral-900">
              {t('teamTitle')}
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              {t('teamSubtitle')}
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <AnimatedSection key={member.id} delay={index * 0.1}>
                <div className="text-center group">
                  <div className="relative w-32 h-32 mx-auto mb-5 rounded-full overflow-hidden ring-2 ring-white/50 shadow-glass group-hover:ring-brand/40 group-hover:shadow-glass-lg transition-all duration-300">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>
                  <h3 className="text-lg font-heading font-bold mb-1 text-neutral-900">
                    {member.name}
                  </h3>
                  <p className="text-brand text-sm">
                    {getLocalizedValue(member.role, locale)}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-neutral-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-neutral-900">
              {t('certsTitle')}
            </h2>
          </AnimatedSection>

          <div className="max-w-2xl mx-auto space-y-4">
            {certKeys.map((key, index) => (
              <AnimatedSection key={key} delay={index * 0.1}>
                <div className="glass-card-hover flex items-center gap-4 p-5">
                  <Award className="w-6 h-6 text-brand flex-shrink-0" />
                  <span className="text-neutral-700">{t(key)}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
