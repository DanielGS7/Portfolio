'use client';

import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

export function Skills() {
  const t = useTranslations('skills');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skillCategories = [
    {
      category: 'technical',
      skills: [
        { key: 'siteManagement', icon: '🔧', color: 'var(--color-primary)' },
        { key: 'fullStack', icon: '💻', color: 'var(--color-accent)' },
        { key: 'llmIntegration', icon: '🧠', color: 'var(--color-tertiary)' },
        { key: 'dataManagement', icon: '📊', color: 'var(--color-secondary)' },
      ],
    },
    {
      category: 'certifications',
      skills: [
        { key: 'driverLicense', icon: '🚗', color: 'var(--color-accent)' },
        { key: 'firstAid', icon: '🏥', color: 'var(--color-primary)' },
      ],
    },
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
        </motion.div>

        {/* Skills */}
        {skillCategories.map((category, catIndex) => (
          <div key={category.category} className="mb-12 last:mb-0">
            {/* Category Title */}
            <motion.h3
              className="text-2xl font-bold mb-6 text-[rgb(var(--color-primary))]"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: catIndex * 0.2 }}
            >
              {t(`categories.${category.category}`)}
            </motion.h3>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.key}
                  className="group relative glass-strong rounded-2xl p-6 hover:scale-105 transition-transform cursor-default"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: catIndex * 0.2 + skillIndex * 0.05,
                  }}
                  whileHover={{ y: -5 }}
                >
                  {/* Background gradient on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity"
                    style={{
                      background: `linear-gradient(135deg, rgb(${skill.color}), transparent)`,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-4xl mb-3">{skill.icon}</div>
                    <h4 className="text-base font-semibold text-[rgb(var(--foreground))]">
                      {t(`items.${skill.key}`)}
                    </h4>
                  </div>

                  {/* Hover effect circle */}
                  <motion.div
                    className="absolute top-2 right-2 w-2 h-2 rounded-full"
                    style={{ backgroundColor: `rgb(${skill.color})` }}
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
