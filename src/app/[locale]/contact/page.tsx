'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageCircle } from 'lucide-react';
import { contactInfo } from '@/data/contact';

export default function ContactPage() {
  const t = useTranslations('contact');
  const tc = useTranslations('common');
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

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
      <section className="relative pt-40 pb-20 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
            className="text-lg text-neutral-500 max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-heading font-bold mb-8 text-neutral-900">{t('formTitle')}</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-neutral-50 border border-brand/30 rounded-2xl p-8 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-brand mx-auto mb-4" />
                  <h3 className="text-xl font-heading font-bold mb-2 text-neutral-900">{t('successTitle')}</h3>
                  <p className="text-neutral-500">{t('successMessage')}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        {t('nameLabel')}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={t('namePlaceholder')}
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-brand transition-colors"
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
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-brand transition-colors"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        {t('phoneLabel')}
                      </label>
                      <input
                        type="tel"
                        placeholder={t('phonePlaceholder')}
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-brand transition-colors"
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
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-brand transition-colors"
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
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-brand transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full sm:w-auto px-8 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-light transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {sending ? t('sending') : t('send')}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-heading font-bold mb-8 text-neutral-900">{t('officeTitle')}</h2>

              <div className="space-y-6">
                {/* Eskisehir Office */}
                <div className="flex items-start gap-4 p-6 bg-neutral-50 border border-neutral-200 rounded-2xl">
                  <MapPin className="w-6 h-6 text-brand flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1 text-neutral-900">
                      {locale === 'tr' ? 'Eskisehir Ofis' : 'Eskisehir Office'}
                    </h3>
                    <p className="text-neutral-500 whitespace-pre-line">
                      {contactInfo.offices.eskisehir.address[locale as 'tr' | 'en']}
                    </p>
                    <a href={`tel:${contactInfo.offices.eskisehir.phone}`} className="text-neutral-500 hover:text-brand transition-colors text-sm mt-1 inline-block">
                      {contactInfo.phones.eskisehir}
                    </a>
                  </div>
                </div>

                {/* Bursa Office */}
                <div className="flex items-start gap-4 p-6 bg-neutral-50 border border-neutral-200 rounded-2xl">
                  <MapPin className="w-6 h-6 text-brand flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1 text-neutral-900">
                      {locale === 'tr' ? 'Bursa Ofis' : 'Bursa Office'}
                    </h3>
                    <p className="text-neutral-500 whitespace-pre-line">
                      {contactInfo.offices.bursa.address[locale as 'tr' | 'en']}
                    </p>
                    <a href={`tel:${contactInfo.offices.bursa.phone}`} className="text-neutral-500 hover:text-brand transition-colors text-sm mt-1 inline-block">
                      {contactInfo.phones.bursa}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4 p-6 bg-neutral-50 border border-neutral-200 rounded-2xl">
                  <MessageCircle className="w-6 h-6 text-brand flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1 text-neutral-900">WhatsApp</h3>
                    <a href={`https://wa.me/${contactInfo.phones.whatsapp.replace(/\s+/g, '').replace('+', '')}`} className="text-neutral-500 hover:text-brand transition-colors">
                      {contactInfo.phones.whatsapp}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-6 bg-neutral-50 border border-neutral-200 rounded-2xl">
                  <Mail className="w-6 h-6 text-brand flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1 text-neutral-900">{tc('email')}</h3>
                    <a href={`mailto:${contactInfo.email}`} className="text-neutral-500 hover:text-brand transition-colors">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4 p-6 bg-neutral-50 border border-neutral-200 rounded-2xl">
                  <Clock className="w-6 h-6 text-brand flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1 text-neutral-900">{t('workingHoursTitle')}</h3>
                    <div className="text-neutral-500 space-y-1">
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
    </>
  );
}
