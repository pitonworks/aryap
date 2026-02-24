'use client';

import { useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { Mail, MapPin, Clock, Send, CheckCircle, MessageCircle, Phone, ArrowUpRight } from 'lucide-react';
import { contactInfo } from '@/data/contact';

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

export default function ContactPage() {
  const t = useTranslations('contact');
  const tc = useTranslations('common');
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <>
      {/* Hero Banner */}
      <section ref={heroRef} className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-50/50" />
        <motion.div style={{ opacity: heroOpacity }} className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-label"
          >
            {locale === 'tr' ? 'İletişim' : 'Contact'}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 text-neutral-900"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-400 max-w-2xl"
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>
      </section>

      {/* Quick Contact Bar */}
      <section className="py-8 border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            <AnimatedSection delay={0}>
              <a href={`tel:${contactInfo.offices.eskisehir.phone}`} className="flex items-center gap-3 text-neutral-500 hover:text-neutral-900 transition-colors duration-300 group">
                <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-900 transition-all duration-300">
                  <Phone className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-sm font-medium">{contactInfo.phones.eskisehir}</span>
              </a>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 text-neutral-500 hover:text-neutral-900 transition-colors duration-300 group">
                <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-900 transition-all duration-300">
                  <Mail className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-sm font-medium">{contactInfo.email}</span>
              </a>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <a href={`https://wa.me/${contactInfo.phones.whatsapp.replace(/\s+/g, '').replace('+', '')}`} className="flex items-center gap-3 text-neutral-500 hover:text-neutral-900 transition-colors duration-300 group">
                <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-900 transition-all duration-300">
                  <MessageCircle className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-sm font-medium">WhatsApp</span>
              </a>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 sm:py-28 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Form — 3 cols */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              <h2 className="text-2xl font-heading font-bold mb-2 text-neutral-900">{t('formTitle')}</h2>
              <p className="text-neutral-400 text-sm mb-8">{locale === 'tr' ? 'Formu doldurun, size en kısa sürede dönüş yapalım.' : 'Fill the form and we\'ll get back to you soon.'}</p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card p-10 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-2 text-neutral-900">{t('successTitle')}</h3>
                  <p className="text-neutral-400">{t('successMessage')}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        {t('nameLabel')}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={t('namePlaceholder')}
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        {t('emailLabel')}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder={t('emailPlaceholder')}
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        {t('phoneLabel')}
                      </label>
                      <input
                        type="tel"
                        placeholder={t('phonePlaceholder')}
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        {t('subjectLabel')}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={t('subjectPlaceholder')}
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      {t('messageLabel')}
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder={t('messagePlaceholder')}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 transition-all duration-200 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-neutral-900 text-white font-semibold rounded-full hover:bg-neutral-800 transition-all duration-300 disabled:opacity-50 shadow-card hover:shadow-elevated"
                  >
                    <Send className="w-4 h-4" />
                    {sending ? t('sending') : t('send')}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info — 2 cols */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 space-y-6"
            >
              <h2 className="text-2xl font-heading font-bold mb-6 text-neutral-900">{t('officeTitle')}</h2>

              {/* Eskişehir Office */}
              <div className="card p-6 group hover:shadow-card-hover transition-all duration-500">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-900 transition-all duration-500">
                    <MapPin className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 text-neutral-900">
                      {locale === 'tr' ? 'Eskişehir Ofis' : 'Eskişehir Office'}
                    </h3>
                    <p className="text-neutral-400 text-sm whitespace-pre-line mb-2">
                      {contactInfo.offices.eskisehir.address[locale as 'tr' | 'en']}
                    </p>
                    <a href={`tel:${contactInfo.offices.eskisehir.phone}`} className="text-neutral-500 hover:text-neutral-900 transition-colors text-sm inline-flex items-center gap-1">
                      {contactInfo.phones.eskisehir}
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Bursa Office */}
              <div className="card p-6 group hover:shadow-card-hover transition-all duration-500">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-900 transition-all duration-500">
                    <MapPin className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 text-neutral-900">
                      {locale === 'tr' ? 'Bursa Ofis' : 'Bursa Office'}
                    </h3>
                    <p className="text-neutral-400 text-sm whitespace-pre-line mb-2">
                      {contactInfo.offices.bursa.address[locale as 'tr' | 'en']}
                    </p>
                    <a href={`tel:${contactInfo.offices.bursa.phone}`} className="text-neutral-500 hover:text-neutral-900 transition-colors text-sm inline-flex items-center gap-1">
                      {contactInfo.phones.bursa}
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="card p-6 group hover:shadow-card-hover transition-all duration-500">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-900 transition-all duration-500">
                    <Clock className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-neutral-900">{t('workingHoursTitle')}</h3>
                    <div className="text-neutral-400 text-sm space-y-1">
                      <p>{t('workingHoursWeekday')}</p>
                      <p>{t('workingHoursSaturday')}</p>
                      <p>{t('workingHoursSunday')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Embed Section */}
      <section className="py-20 sm:py-28 bg-neutral-50/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <AnimatedSection className="text-center mb-12">
            <p className="section-label">{locale === 'tr' ? 'Konum' : 'Location'}</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900">
              {locale === 'tr' ? 'Bizi Ziyaret Edin' : 'Visit Us'}
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="card overflow-hidden shadow-elevated">
                <div className="p-4 border-b border-neutral-100">
                  <p className="text-sm font-semibold text-neutral-900">{locale === 'tr' ? 'Eskişehir Ofis' : 'Eskişehir Office'}</p>
                </div>
                <div className="aspect-[16/10] bg-neutral-100 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3069.0!2d30.5!3d39.77!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDQ2JzEyLjAiTiAzMMKwMzAnMDAuMCJF!5e0!3m2!1str!2str!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  />
                </div>
              </div>
              <div className="card overflow-hidden shadow-elevated">
                <div className="p-4 border-b border-neutral-100">
                  <p className="text-sm font-semibold text-neutral-900">{locale === 'tr' ? 'Bursa Ofis' : 'Bursa Office'}</p>
                </div>
                <div className="aspect-[16/10] bg-neutral-100 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.0!2d29.0!3d40.19!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDExJzI0LjAiTiAyOcKwMDAnMDAuMCJF!5e0!3m2!1str!2str!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
