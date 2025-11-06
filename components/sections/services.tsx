'use client';

import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

export function Services() {
  const t = useTranslations('services');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    { key: 'migration', icon: '🔄', color: 'var(--color-primary)' },
    { key: 'fullstack', icon: '⚡', color: 'var(--color-accent)' },
    { key: 'llm', icon: '🤖', color: 'var(--color-tertiary)' },
    { key: 'maintenance', icon: '🛠️', color: 'var(--color-secondary)' },
  ];

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-[rgba(var(--color-primary)/0.03)]">
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
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              className="group relative glass-strong rounded-3xl p-8 hover:scale-105 transition-transform duration-300"
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
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-6"
                  style={{
                    backgroundColor: `rgba(${service.color}/0.1)`,
                  }}
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {service.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-3 text-[rgb(var(--foreground))]">
                  {t(`items.${service.key}.title`)}
                </h3>

                {/* Description */}
                <p className="text-[rgb(var(--text-light))] leading-relaxed">
                  {t(`items.${service.key}.description`)}
                </p>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-20 h-20 rounded-full opacity-5"
                style={{ backgroundColor: `rgb(${service.color})` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
