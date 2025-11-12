'use client';

import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faBolt, faRobot, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';

export function Services() {
  const t = useTranslations('services');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    { key: 'migration', icon: faArrowsRotate, color: 'var(--color-primary)' },
    { key: 'fullstack', icon: faBolt, color: 'var(--color-accent)' },
    { key: 'llm', icon: faRobot, color: 'var(--color-tertiary)' },
    { key: 'maintenance', icon: faScrewdriverWrench, color: 'var(--color-secondary)' },
  ];

  return (
    <section ref={ref} className="h-screen max-h-screen py-8 bg-gradient-to-b from-transparent via-[rgba(var(--color-primary)/0.03)] to-transparent w-full flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-[rgb(var(--color-primary))]" style={{ fontFamily: 'var(--font-display)' }}>
            {t('title')}
          </h2>
          <p className="text-lg text-[rgb(var(--text-light))] max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              className="group relative glass-strong rounded-3xl p-6 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl border border-[rgba(var(--color-primary)/0.1)] text-center flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Background glow on hover */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity"
                style={{ backgroundColor: `rgb(${service.color})` }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                  style={{
                    backgroundColor: `rgba(${service.color}/0.1)`,
                  }}
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <FontAwesomeIcon icon={service.icon} className="text-3xl" style={{ color: `rgb(${service.color})` }} />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-[rgb(var(--foreground))]">
                  {t(`items.${service.key}.title`)}
                </h3>

                {/* Description */}
                <p className="text-[rgb(var(--text-light))] leading-relaxed text-base">
                  {t(`items.${service.key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
