'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTheme } from '@/lib/hooks/use-theme';

interface CaveEntranceOverlayProps {
  activeSection: string;
  depth?: number;
  maxDepth?: number;
}

export function CaveEntranceOverlay({ activeSection, depth = 0, maxDepth = 5 }: CaveEntranceOverlayProps) {
  const { theme } = useTheme();

  // Zoom origin: centered more downward (65% from top - closer to entrance center)
  // Scale based on depth to sync with background (1.0 at entrance, increases as you go deeper)
  // Opacity fades out as we zoom in (fully transparent when deep in cave)
  const depthProgress = depth / Math.max(maxDepth, 1);

  // Scale from 1.0 to 10.0 as you go deeper (matches background but faster for entrance to disappear)
  const scale = 1.0 + depthProgress * 9.0;

  // Fade out completely by 30% depth
  const opacity = Math.max(0, 1 - depthProgress * 3.3);

  // Select SVG based on theme
  const caveEntranceImage = theme === 'light'
    ? '/images/cave-entrance-day.svg'
    : '/images/cave-entrance-night.svg';

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[5]"
      animate={{
        scale,
        opacity,
      }}
      transition={{
        duration: 1.2,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      style={{
        transformOrigin: 'center 65%', // More downward - center of entrance
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
