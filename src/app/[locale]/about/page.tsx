'use client';

import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { Shield, Lightbulb, Handshake, Leaf, Award, Building2, Users, MapPin, TrendingUp } from 'lucide-react';
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

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <span ref={ref}>
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <CountUp target={value} />
          {suffix}
        </motion.span>
      ) : (
        <span>0{suffix}</span>
      )}
    </span>
  );
}

function CountUp({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    >
      {isInView && (
        <motion.span
          initial="hidden"
          animate="visible"
        >
          {target}
        </motion.span>
      )}
    </motion.span>
  );
}

const values = [
  { key: 'valueQuality', descKey: 'valueQualityDesc', icon: Shield },
  { key: 'valueInnovation', descKey: 'valueInnovationDesc', icon: Lightbulb },
  { key: 'valueTrust', descKey: 'valueTrustDesc', icon: Handshake },
  { key: 'valueSustainability', descKey: 'valueSustainabilityDesc', icon: Leaf },
] as const;

const certKeys = ['certsISO', 'certsGreen', 'certsExcellence'] as const;

const milestones = [
  { year: '2005', titleTr: 'Kuruluş', titleEn: 'Founded', descTr: 'Eskişehir\'de faaliyet başladı', descEn: 'Operations started in Eskişehir' },
  { year: '2010', titleTr: 'İlk Büyük Proje', titleEn: 'First Major Project', descTr: '500+ konut teslim edildi', descEn: '500+ residences delivered' },
  { year: '2015', titleTr: 'Bursa Genişlemesi', titleEn: 'Bursa Expansion', descTr: 'Bursa ofisi açıldı', descEn: 'Bursa office opened' },
  { year: '2020', titleTr: 'Karma Projeler', titleEn: 'Mixed-Use Projects', descTr: 'Ticari ve karma projelere giriş', descEn: 'Entry into commercial and mixed-use' },
  { year: '2025', titleTr: 'Dijital Dönüşüm', titleEn: 'Digital Transformation', descTr: 'Sanal tur ve online deneyim', descEn: 'Virtual tours and online experience' },
];

export default function AboutPage() {
  const t = useTranslations('about');
  const locale = useLocale();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* Hero Banner with Parallax */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&h=900&fit=crop"
            alt={t('title')}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 lg:p-16"
        >
          <div className="max-w-7xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="section-label"
            >
              {locale === 'tr' ? 'Hakkımızda' : 'About Us'}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-neutral-900 leading-tight"
            >
              {t('title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg text-neutral-500 max-w-2xl mt-4"
            >
              {t('subtitle')}
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Milestone Counters */}
      <section className="py-16 sm:py-20 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { value: 20, suffix: '+', labelTr: 'Yıllık Deneyim', labelEn: 'Years Experience' },
              { value: 8, suffix: '+', labelTr: 'Tamamlanan Proje', labelEn: 'Completed Projects' },
              { value: 2500, suffix: '+', labelTr: 'Mutlu Aile', labelEn: 'Happy Families' },
              { value: 2, suffix: '', labelTr: 'Şehir', labelEn: 'Cities' },
            ].map((stat, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="text-center">
                  <p className="text-4xl sm:text-5xl font-heading font-bold text-neutral-900 mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm text-neutral-400 uppercase tracking-wider">
                    {locale === 'tr' ? stat.labelTr : stat.labelEn}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 sm:py-28 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection>
              <p className="section-label">{locale === 'tr' ? 'Hikayemiz' : 'Our Story'}</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-neutral-900 leading-tight">
                {t('storyTitle')}
              </h2>
              <p className="text-neutral-500 leading-relaxed mb-4 text-lg">
                {t('storyText')}
              </p>
              <p className="text-neutral-500 leading-relaxed text-lg">
                {t('storyText2')}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-elevated">
                  <Image
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=1000&fit=crop"
                    alt={t('storyTitle')}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* Floating card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 bg-neutral-900 text-white rounded-2xl p-6 shadow-elevated"
                >
                  <p className="text-3xl font-bold">2005</p>
                  <p className="text-sm text-neutral-400">{locale === 'tr' ? 'Kuruluş Yılı' : 'Founded'}</p>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 sm:py-28 lg:py-32 bg-neutral-50/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <AnimatedSection className="text-center mb-16">
            <p className="section-label">{locale === 'tr' ? 'Değerlerimiz' : 'Our Values'}</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900">
              {t('valuesTitle')}
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <AnimatedSection key={value.key} delay={index * 0.1}>
                  <div className="card-hover p-8 text-center h-full group">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-neutral-100 mb-6 group-hover:bg-neutral-900 transition-all duration-500">
                      <Icon className="w-6 h-6 text-neutral-500 group-hover:text-white transition-colors duration-500" />
                    </div>
                    <h3 className="text-lg font-heading font-semibold mb-3 text-neutral-900">
                      {t(value.key)}
                    </h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {t(value.descKey)}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 sm:py-28 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <AnimatedSection className="text-center mb-16">
            <p className="section-label">{locale === 'tr' ? 'Yolculuğumuz' : 'Our Journey'}</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900">
              {locale === 'tr' ? 'Kilometre Taşlarımız' : 'Our Milestones'}
            </h2>
          </AnimatedSection>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-neutral-200 lg:-translate-x-px" />

            <div className="space-y-12 lg:space-y-16">
              {milestones.map((milestone, index) => (
                <AnimatedSection key={milestone.year} delay={index * 0.1}>
                  <div className={`relative flex items-start gap-8 lg:gap-16 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    {/* Dot */}
                    <div className="absolute left-6 lg:left-1/2 w-3 h-3 bg-neutral-900 rounded-full -translate-x-1.5 lg:-translate-x-1.5 mt-2 z-10 ring-4 ring-white" />

                    {/* Content */}
                    <div className={`ml-16 lg:ml-0 lg:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'lg:text-right lg:pr-8' : 'lg:text-left lg:pl-8'}`}>
                      <span className="text-sm font-mono text-neutral-300 mb-1 block">{milestone.year}</span>
                      <h3 className="text-xl font-heading font-bold text-neutral-900 mb-2">
                        {locale === 'tr' ? milestone.titleTr : milestone.titleEn}
                      </h3>
                      <p className="text-neutral-400 text-sm">
                        {locale === 'tr' ? milestone.descTr : milestone.descEn}
                      </p>
                    </div>

                    {/* Spacer for opposite side */}
                    <div className="hidden lg:block lg:w-[calc(50%-2rem)]" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 sm:py-28 lg:py-32 bg-neutral-50/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <AnimatedSection className="text-center mb-16">
            <p className="section-label">{locale === 'tr' ? 'Ekibimiz' : 'Our Team'}</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-neutral-900">
              {t('teamTitle')}
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              {t('teamSubtitle')}
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <AnimatedSection key={member.id} delay={index * 0.1}>
                <div className="text-center group">
                  <div className="relative w-32 h-32 mx-auto mb-5 rounded-full overflow-hidden ring-2 ring-neutral-100 shadow-card group-hover:ring-neutral-300 group-hover:shadow-card-hover transition-all duration-500">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="128px"
                    />
                  </div>
                  <h3 className="text-lg font-heading font-semibold mb-1 text-neutral-900">
                    {member.name}
                  </h3>
                  <p className="text-neutral-400 text-sm">
                    {getLocalizedValue(member.role, locale)}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 sm:py-28 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <AnimatedSection className="text-center mb-12">
            <p className="section-label">{locale === 'tr' ? 'Sertifikalarımız' : 'Our Certifications'}</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900">
              {t('certsTitle')}
            </h2>
          </AnimatedSection>

          <div className="max-w-2xl mx-auto space-y-4">
            {certKeys.map((key, index) => (
              <AnimatedSection key={key} delay={index * 0.1}>
                <div className="card-hover flex items-center gap-4 p-6 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-900 transition-all duration-500">
                    <Award className="w-5 h-5 text-neutral-500 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <span className="text-neutral-700 font-medium">{t(key)}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
