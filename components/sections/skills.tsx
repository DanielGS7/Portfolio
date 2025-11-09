'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatedSection } from '../layout/animated-section';
import { SKILL_CATEGORIES } from '@/lib/constants/skills-data';

export function Skills() {
  const t = useTranslations('skills');

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
        </AnimatedSection>

        {/* Skills */}
        {SKILL_CATEGORIES.map((category, catIndex) => (
          <div key={category.category} className="mb-16 last:mb-0">
            {/* Category Title */}
            <AnimatedSection delay={catIndex * 0.2} duration={0.5} initialY={0}>
              <h3 className="text-3xl font-bold mb-8 text-[rgb(var(--color-primary))]">
                {t(`categories.${category.category}`)}
              </h3>
            </AnimatedSection>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.skills.map((skill, skillIndex) => (
                <AnimatedSection
                  key={skill.key}
                  delay={catIndex * 0.2 + skillIndex * 0.05}
                  duration={0.5}
                  initialY={20}
                >
                  <motion.div
                    className="group relative glass-strong rounded-3xl p-8 hover:scale-105 transition-all cursor-default shadow-lg hover:shadow-2xl border border-[rgba(var(--color-primary)/0.1)] text-center flex flex-col items-center"
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
                </AnimatedSection>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
