'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { UnderlineSVG, CircleDotsSVG } from '../svg/underline';
import { ArrowSVG } from '../svg/underline';
import type { Locale } from '@/lib/i18n/config';

export function Hero() {
  const t = useTranslations('hero');
  const params = useParams();
  const locale = (params?.locale as Locale) || 'nl';

  const scrollToWork = () => {
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    window.location.href = `/${locale}/contact`;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[rgb(var(--color-primary))] opacity-10 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[rgb(var(--color-accent))] opacity-10 blur-3xl rounded-full" />

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
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Greeting */}
        <motion.p
          className="text-xl sm:text-2xl md:text-3xl text-[rgb(var(--color-primary))] mb-6 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('greeting')}
        </motion.p>

        {/* Name */}
        <motion.h1
          className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="bg-gradient-to-r from-[rgb(var(--color-primary))] via-[rgb(var(--color-accent))] to-[rgb(var(--color-secondary))] bg-clip-text text-transparent drop-shadow-lg">
            {t('name')}
          </span>
        </motion.h1>

        {/* Underline decoration */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <UnderlineSVG className="w-80 h-10 text-[rgb(var(--color-primary))]" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-2xl sm:text-3xl lg:text-4xl text-[rgb(var(--foreground))] mb-16 max-w-4xl mx-auto leading-relaxed font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {t('tagline')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.button
            onClick={scrollToWork}
            className="group relative px-10 py-5 rounded-full bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-accent))] text-white text-lg font-semibold overflow-hidden shadow-2xl shadow-[rgba(var(--color-primary)/0.4)]"
            whileHover={{ scale: 1.05, boxShadow: '0 25px 50px -12px rgba(var(--color-primary), 0.5)' }}
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
            className="px-10 py-5 rounded-full glass-strong border-2 border-[rgb(var(--color-primary))] text-[rgb(var(--color-primary))] text-lg font-semibold hover:bg-[rgba(var(--color-primary)/0.15)] transition-all shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('contact')}
          </motion.button>
        </motion.div>

      </div>

      {/* Scroll indicator - bottom right, appears after 5s, animates every 5s */}
      <motion.div
        className="fixed bottom-8 right-8 z-10"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ delay: 5, duration: 0.5 }}
      >
        <motion.div
          className="w-10 h-14 rounded-full border-2 border-[rgb(var(--color-primary))] flex items-start justify-center p-2 bg-[rgba(var(--background)/0.5)] backdrop-blur-sm shadow-lg"
          animate={{ y: [0, 0, 0, 6, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 5,
            times: [0, 0.3, 0.5, 0.7, 1]
          }}
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-[rgb(var(--color-primary))]"
            animate={{ opacity: [0, 0, 1, 0.3, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 5,
              times: [0, 0.3, 0.5, 0.7, 1]
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
