'use client';

import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faGamepad, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { ArrowSVG } from '../svg/underline';

export function Projects() {
  const t = useTranslations('projects');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const projects = [
    {
      key: 'empowered',
      gradient: 'from-amber-500 to-orange-600',
      link: 'https://empoweredbysuperfoods.com',
      type: 'website' as const,
    },
    {
      key: 'pioneers',
      gradient: 'from-green-500 to-emerald-600',
      type: 'website' as const,
    },
    {
      key: 'monogame',
      gradient: 'from-purple-500 to-pink-600',
      type: 'video' as const,
    },
  ];

  return (
    <section
      id="projects"
      ref={ref}
      className="py-16 relative overflow-hidden w-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
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

        {/* Projects Grid - 3 in a row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.key}
              className="group relative glass-strong rounded-3xl overflow-hidden hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl border border-[rgba(var(--color-primary)/0.1)]"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Image/Video Placeholder */}
              <div className="relative aspect-[4/3] bg-gradient-to-br overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-80`} />

                {/* Placeholder Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    {project.type === 'video' ? (
                      <>
                        <FontAwesomeIcon icon={faGamepad} className="text-6xl mb-4" />
                        <p className="text-sm opacity-80">
                          [Video placeholder - Upload .mp4 to /public/videos/monogame-demo.mp4]
                        </p>
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faImage} className="text-6xl mb-4" />
                        <p className="text-sm opacity-80">
                          [Image placeholder - Upload screenshot to /public/images/{project.key}.jpg]
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[rgb(var(--foreground))]">
                  {t(`${project.key}.title`)}
                </h3>

                <p className="text-[rgb(var(--text-light))] mb-6 leading-relaxed">
                  {t(`${project.key}.description`)}
                </p>

                {/* Action */}
                {project.link ? (
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[rgb(var(--color-primary))] font-semibold hover:gap-3 transition-all"
                    whileHover={{ x: 5 }}
                  >
                    {t(`${project.key}.link`)}
                    <ArrowSVG className="w-5 h-5" />
                  </motion.a>
                ) : (
                  <div className="inline-flex items-center gap-2 text-[rgb(var(--color-accent))] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[rgb(var(--color-accent))] animate-pulse" />
                    {t(`${project.key}.status`)}
                  </div>
                )}
              </div>

              {/* Decorative corner gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[rgb(var(--color-primary))] to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl" />
            </motion.div>
          ))}
        </div>

        {/* Note for user */}
        <motion.div
          className="mt-12 p-6 glass rounded-2xl border-2 border-[rgb(var(--color-accent))] border-dashed"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm text-[rgb(var(--text-light))] text-center">
            <FontAwesomeIcon icon={faLightbulb} className="text-[rgb(var(--color-accent))]" /> <strong>Note:</strong> Upload your project images and MonoGame video to the public folder to replace placeholders
          </p>
        </motion.div>
      </div>
    </section>
  );
}
