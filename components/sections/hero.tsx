'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { UnderlineSVG, CircleDotsSVG } from '../svg/underline';
import { ArrowSVG } from '../svg/underline';

export function Hero() {
  const t = useTranslations('hero');

  const scrollToWork = () => {
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    window.location.href = '/contact';
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 text-[rgb(var(--color-primary))]"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
            scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <CircleDotsSVG className="w-full h-full opacity-20" />
        </motion.div>

        <motion.div
          className="absolute bottom-20 left-20 w-48 h-48 text-[rgb(var(--color-accent))]"
          animate={{
            rotate: -360,
            y: [0, 20, 0],
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
            y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <CircleDotsSVG className="w-full h-full opacity-10" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Greeting */}
        <motion.p
          className="text-lg sm:text-xl text-[rgb(var(--text-light))] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('greeting')}
        </motion.p>

        {/* Name */}
        <motion.h1
          className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="bg-gradient-to-r from-[rgb(var(--color-primary))] via-[rgb(var(--color-accent))] to-[rgb(var(--color-secondary))] bg-clip-text text-transparent">
            {t('name')}
          </span>
        </motion.h1>

        {/* Underline decoration */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <UnderlineSVG className="w-64 h-8 text-[rgb(var(--color-primary))]" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-xl sm:text-2xl lg:text-3xl text-[rgb(var(--text-light))] mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {t('tagline')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.button
            onClick={scrollToWork}
            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-accent))] text-white font-semibold overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              {t('cta')}
              <ArrowSVG className="w-5 h-5" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--color-accent))] to-[rgb(var(--color-primary))]"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            onClick={scrollToContact}
            className="px-8 py-4 rounded-full glass border-2 border-[rgb(var(--color-primary))] text-[rgb(var(--color-primary))] font-semibold hover:bg-[rgba(var(--color-primary)/0.1)] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('contact')}
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-[rgb(var(--color-primary))] flex items-start justify-center p-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--color-primary))]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
