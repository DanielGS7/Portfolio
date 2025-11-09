'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatedSection } from '../layout/animated-section';
import { SERVICES } from '@/lib/constants/services-data';

export function Services() {
  const t = useTranslations('services');

  return (
    <section className="py-32 bg-gradient-to-b from-transparent via-[rgba(var(--color-primary)/0.03)] to-transparent w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <AnimatedSection className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-accent))] bg-clip-text text-transparent">
              {t('title')}
            </span>
          </h2>
          <p className="text-xl text-[rgb(var(--text-light))] max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </AnimatedSection>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {SERVICES.map((service, index) => (
            <AnimatedSection
              key={service.key}
              delay={index * 0.1}
            >
              <div className="group relative glass-strong rounded-3xl p-10 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl border border-[rgba(var(--color-primary)/0.1)] text-center flex flex-col items-center">
              {/* Background glow on hover */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity"
                style={{ backgroundColor: `rgb(${service.color})` }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Icon */}
                <motion.div
                  className="w-20 h-20 rounded-3xl flex items-center justify-center mb-8 shadow-lg"
                  style={{
                    backgroundColor: `rgba(${service.color}/0.1)`,
                  }}
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <FontAwesomeIcon icon={service.icon} className="text-4xl" style={{ color: `rgb(${service.color})` }} />
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-6 text-[rgb(var(--foreground))]">
                  {t(`items.${service.key}.title`)}
                </h3>

                {/* Description */}
                <p className="text-[rgb(var(--text-light))] leading-relaxed text-lg">
                  {t(`items.${service.key}.description`)}
                </p>
              </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
