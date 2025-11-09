'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTheme } from '@/lib/hooks/use-theme';

interface CaveEntranceOverlayProps {
  activeSection: string;
}

export function CaveEntranceOverlay({ activeSection }: CaveEntranceOverlayProps) {
  const { theme } = useTheme();
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    // Zoom in when leaving hero section
    if (activeSection !== 'hero') {
      setIsZoomed(true);
    } else {
      setIsZoomed(false);
    }
  }, [activeSection]);

  // Zoom origin: 4/9 from bottom center (55.56% from top)
  // Scale dramatically (10x) so cave entrance fills and goes beyond viewport
  const scale = isZoomed ? 10 : 1;

  // Select image based on theme
  const caveEntranceImage = theme === 'light'
    ? '/images/cave-entrance-day.png'
    : '/images/cave-entrance-night.png';

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[5]"
      animate={{
        scale,
      }}
      transition={{
        duration: 1.2,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      style={{
        transformOrigin: 'center 55.56%', // 4/9 from bottom
      }}
    >
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={caveEntranceImage}
              alt={`Cave entrance - ${theme} mode`}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
