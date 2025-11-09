'use client';

import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faRobot, faCode, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import type { Locale } from '@/lib/i18n/config';

export function About() {
  const t = useTranslations('about');
  const params = useParams();
  const locale = (params?.locale as Locale) || 'nl';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const highlights = [
    {
      key: 'entrepreneurship',
      icon: faRocket,
      gradient: 'from-[rgb(var(--color-primary))] to-[rgb(var(--color-accent))]',
    },
    {
      key: 'llm',
      icon: faRobot,
      gradient: 'from-[rgb(var(--color-accent))] to-[rgb(var(--color-tertiary))]',
    },
    {
      key: 'youth',
      icon: faCode,
      gradient: 'from-[rgb(var(--color-secondary))] to-[rgb(var(--color-primary))]',
    },
  ];

  return (
    <section ref={ref} className="h-screen max-h-screen py-8 relative overflow-hidden bg-gradient-to-b from-transparent via-[rgba(var(--color-primary)/0.02)] to-transparent w-full flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-accent))] bg-clip-text text-transparent">
              {t('title')}
            </span>
          </h2>
          <p className="text-lg text-[rgb(var(--text-light))] max-w-3xl mx-auto leading-relaxed mb-4">
            {t('intro')}
          </p>
          <motion.a
            href={`/${locale}/story`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-accent))] text-white font-semibold hover:scale-105 transition-transform shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('storyLink')}
            <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
          </motion.a>
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.key}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="glass-strong rounded-3xl p-6 h-full hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl border border-[rgba(var(--color-primary)/0.1)] text-center flex flex-col items-center">
                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${highlight.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <FontAwesomeIcon icon={highlight.icon} className="text-3xl text-white" />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-[rgb(var(--foreground))]">
                  {t(`${highlight.key}.title`)}
                </h3>

                {/* Description */}
                <p className="text-[rgb(var(--text-light))] leading-relaxed text-base">
                  {t(`${highlight.key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom accent */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="h-1 w-48 bg-gradient-to-r from-transparent via-[rgb(var(--color-primary))] to-transparent rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
