'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-3 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top border with gradient */}
        <motion.div
          className="h-px w-full mb-3 bg-gradient-to-r from-transparent via-[rgb(var(--color-primary))] to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />

        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Left - Brand */}
          <motion.div
            className="text-sm text-[rgb(var(--text-muted))]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-bold text-[rgb(var(--color-primary))]">WEBCAVE</span>
            {' '}&copy; {currentYear} Daniel Garriga Segui
          </motion.div>

          {/* Center - Built with */}
          <motion.div
            className="text-xs text-[rgb(var(--text-muted))]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t('built')} <span className="text-[rgb(var(--color-accent))]">Next.js</span>{' '}
            {t('and')} <span className="text-[rgb(var(--color-accent))]">Framer Motion</span>
          </motion.div>

          {/* Right - Links */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <a
              href="https://empoweredbysuperfoods.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[rgb(var(--text-light))] hover:text-[rgb(var(--color-primary))] transition-colors"
            >
              Empowered by YUM
            </a>
            <a
              href="https://pioniers.be"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[rgb(var(--text-light))] hover:text-[rgb(var(--color-primary))] transition-colors"
            >
              De Pioniers
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
