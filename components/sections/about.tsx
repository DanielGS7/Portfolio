'use client';

import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { SwirlSVG } from '../svg/underline';

export function About() {
  const t = useTranslations('about');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const highlights = [
    {
      key: 'entrepreneurship',
      icon: '🚀',
      gradient: 'from-[rgb(var(--color-primary))] to-[rgb(var(--color-accent))]',
    },
    {
      key: 'llm',
      icon: '🤖',
      gradient: 'from-[rgb(var(--color-accent))] to-[rgb(var(--color-tertiary))]',
    },
    {
      key: 'youth',
      icon: '⛺',
      gradient: 'from-[rgb(var(--color-secondary))] to-[rgb(var(--color-primary))]',
    },
  ];

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-10 right-10 w-32 h-32 text-[rgb(var(--color-primary))]"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <SwirlSVG className="w-full h-full opacity-10" />
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-accent))] bg-clip-text text-transparent">
              {t('title')}
            </span>
          </h2>
          <p className="text-lg text-[rgb(var(--text-light))] max-w-2xl mx-auto">
            {t('intro')}
          </p>
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.key}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="glass-strong rounded-3xl p-8 h-full hover:scale-105 transition-transform duration-300">
                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${highlight.gradient} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {highlight.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-3 text-[rgb(var(--foreground))]">
                  {t(`${highlight.key}.title`)}
                </h3>

                {/* Description */}
                <p className="text-[rgb(var(--text-light))] leading-relaxed">
                  {t(`${highlight.key}.description`)}
                </p>

                {/* Decorative corner */}
                <div className="absolute top-4 right-4 w-12 h-12 opacity-20">
                  <SwirlSVG className={`w-full h-full text-[rgb(var(--color-primary))]`} />
                </div>
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
