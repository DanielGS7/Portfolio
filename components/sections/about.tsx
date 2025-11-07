'use client';

import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faRobot, faCode, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { SwirlSVG } from '../svg/underline';
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
    <section ref={ref} className="py-32 relative overflow-hidden bg-gradient-to-b from-transparent via-[rgba(var(--color-primary)/0.02)] to-transparent w-full">
      {/* Background decoration */}
      <motion.div
        className="absolute top-10 right-10 w-32 h-32 text-[rgb(var(--color-primary))]"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <SwirlSVG className="w-full h-full opacity-10" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-accent))] bg-clip-text text-transparent">
              {t('title')}
            </span>
          </h2>
          <p className="text-xl text-[rgb(var(--text-light))] max-w-3xl mx-auto leading-relaxed mb-8">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.key}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="glass-strong rounded-3xl p-10 h-full hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl border border-[rgba(var(--color-primary)/0.1)] text-center flex flex-col items-center">
                {/* Icon */}
                <motion.div
                  className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${highlight.gradient} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <FontAwesomeIcon icon={highlight.icon} className="text-4xl text-white" />
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-6 text-[rgb(var(--foreground))]">
                  {t(`${highlight.key}.title`)}
                </h3>

                {/* Description */}
                <p className="text-[rgb(var(--text-light))] leading-relaxed text-lg">
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
