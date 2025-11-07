'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faRocket } from '@fortawesome/free-solid-svg-icons';
import type { Locale } from '@/lib/i18n/config';

export function CTA() {
  const t = useTranslations('cta');
  const params = useParams();
  const locale = (params?.locale as Locale) || 'nl';

  const handleContactClick = () => {
    window.location.href = `/${locale}/contact`;
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-16 relative overflow-hidden w-full">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[rgb(var(--color-primary))] opacity-10 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[rgb(var(--color-accent))] opacity-10 blur-3xl rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Icon */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <div className="inline-block p-6 rounded-full bg-gradient-to-br from-[rgb(var(--color-primary))] to-[rgb(var(--color-accent))] shadow-2xl">
            <FontAwesomeIcon icon={faRocket} className="text-6xl text-white" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-[rgb(var(--color-primary))] via-[rgb(var(--color-accent))] to-[rgb(var(--color-secondary))] bg-clip-text text-transparent">
            {t('title')}
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-xl sm:text-2xl text-[rgb(var(--text-light))] mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {t('subtitle')}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={handleContactClick}
          className="group relative px-12 py-6 rounded-full bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-accent))] text-white text-xl font-bold overflow-hidden shadow-2xl shadow-[rgba(var(--color-primary)/0.4)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.05, boxShadow: '0 25px 50px -12px rgba(var(--color-primary), 0.5)' }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 flex items-center gap-3">
            <FontAwesomeIcon icon={faEnvelope} />
            {t('button')}
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--color-accent))] to-[rgb(var(--color-primary))]"
            initial={{ x: '100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        {/* Additional info */}
        <motion.p
          className="mt-8 text-sm text-[rgb(var(--text-muted))]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {t('info')}
        </motion.p>
      </div>
    </section>
  );
}
