'use client';

import { useParams, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { locales, localeNames, localeFlags, type Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils/cn';

export function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const currentLocale = (params?.locale as Locale) || 'nl';

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    // Build new path with new locale
    const segments = pathname.split('/').filter(Boolean);
    const isLocaleInPath = locales.includes(segments[0] as Locale);

    let newPath = '';
    if (isLocaleInPath) {
      segments[0] = newLocale;
      newPath = `/${segments.join('/')}`;
    } else {
      newPath = `/${newLocale}${pathname}`;
    }

    window.location.href = newPath;
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full glass hover:bg-[rgba(var(--color-primary)/0.1)] transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-xl">{localeFlags[currentLocale]}</span>
        <span className="text-sm font-medium hidden sm:inline">
          {localeNames[currentLocale]}
        </span>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              className="absolute right-0 top-full mt-2 py-2 rounded-2xl glass-strong shadow-lg z-50 min-w-[160px]"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {locales.map((locale, index) => (
                <motion.button
                  key={locale}
                  onClick={() => switchLocale(locale)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[rgba(var(--color-primary)/0.1)] transition-colors text-left',
                    currentLocale === locale && 'bg-[rgba(var(--color-primary)/0.15)]'
                  )}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className="text-xl">{localeFlags[locale]}</span>
                  <span className="text-sm font-medium">{localeNames[locale]}</span>
                  {currentLocale === locale && (
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-auto text-[rgb(var(--color-primary))]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </motion.svg>
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
