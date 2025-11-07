'use client';

import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faLaptopCode, faBrain, faChartBar, faCar, faBriefcaseMedical } from '@fortawesome/free-solid-svg-icons';

export function Skills() {
  const t = useTranslations('skills');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skillCategories = [
    {
      category: 'technical',
      skills: [
        { key: 'siteManagement', icon: faWrench, color: 'var(--color-primary)' },
        { key: 'fullStack', icon: faLaptopCode, color: 'var(--color-accent)' },
        { key: 'llmIntegration', icon: faBrain, color: 'var(--color-tertiary)' },
        { key: 'dataManagement', icon: faChartBar, color: 'var(--color-secondary)' },
      ],
    },
    {
      category: 'certifications',
      skills: [
        { key: 'driverLicense', icon: faCar, color: 'var(--color-accent)' },
        { key: 'firstAid', icon: faBriefcaseMedical, color: 'var(--color-primary)' },
      ],
    },
  ];

  return (
    <section ref={ref} className="h-screen max-h-screen py-8 bg-gradient-to-b from-transparent via-[rgba(var(--color-primary)/0.03)] to-transparent w-full flex items-center overflow-hidden">
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
        </motion.div>

        {/* Skills */}
        {skillCategories.map((category, catIndex) => (
          <div key={category.category} className="mb-16 last:mb-0">
            {/* Category Title */}
            <motion.h3
              className="text-3xl font-bold mb-8 text-[rgb(var(--color-primary))]"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: catIndex * 0.2 }}
            >
              {t(`categories.${category.category}`)}
            </motion.h3>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.key}
                  className="group relative glass-strong rounded-3xl p-8 hover:scale-105 transition-all cursor-default shadow-lg hover:shadow-2xl border border-[rgba(var(--color-primary)/0.1)] text-center flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: catIndex * 0.2 + skillIndex * 0.05,
                  }}
                  whileHover={{ y: -8 }}
                >
                  {/* Background gradient on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity"
                    style={{
                      background: `linear-gradient(135deg, rgb(${skill.color}), transparent)`,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center">
                    <FontAwesomeIcon icon={skill.icon} className="text-4xl mb-6" style={{ color: `rgb(${skill.color})` }} />
                    <h4 className="text-lg font-semibold text-[rgb(var(--foreground))] leading-relaxed">
                      {t(`items.${skill.key}`)}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
