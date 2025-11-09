'use client';

import { useTheme } from '@/lib/hooks/use-theme';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Create ripple effect
    const id = Date.now();
    setRipples(prev => [...prev, { id, x, y }]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 1000);

    toggleTheme();
  };

  if (!mounted) {
    return (
      <div className="w-12 h-12 rounded-full bg-[rgb(var(--color-primary))] opacity-20" />
    );
  }

  return (
    <>
      {/* Ripple effects */}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            className="fixed pointer-events-none z-[9999] rounded-full mix-blend-difference"
            style={{
              left: ripple.x,
              top: ripple.y,
              background: theme === 'dark'
                ? 'radial-gradient(circle, rgba(255,249,246,0.3) 0%, rgba(255,249,246,0) 70%)'
                : 'radial-gradient(circle, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0) 70%)',
            }}
            initial={{ width: 0, height: 0, x: '-50%', y: '-50%' }}
            animate={{
              width: '200vmax',
              height: '200vmax',
              transition: {
                duration: 0.8,
                ease: [0.43, 0.13, 0.23, 0.96]
              }
            }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          />
        ))}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={handleToggle}
        className="relative w-12 h-12 rounded-full glass flex items-center justify-center overflow-hidden group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle theme"
      >
        {/* Background glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-[rgb(var(--color-primary))] to-[rgb(var(--color-accent))] opacity-0 group-hover:opacity-20"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear'
          }}
        />

        {/* Icon container */}
        <div className="relative w-6 h-6">
          <AnimatePresence mode="wait">
            {theme === 'dark' ? (
              <motion.svg
                key="sun"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute inset-0 text-[rgb(var(--color-primary))]"
                initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </motion.svg>
            ) : (
              <motion.svg
                key="moon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute inset-0 text-[rgb(var(--color-primary))]"
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </motion.svg>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </>
  );
}
