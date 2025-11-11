'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTheme } from '@/lib/hooks/use-theme';

interface CaveEntranceOverlayProps {
  activeSection: string;
  depth?: number;
  maxDepth?: number;
  scale?: number; // Scale prop passed from parent for synchronization
}

export function CaveEntranceOverlay({ activeSection, depth = 0, maxDepth = 5, scale: externalScale }: CaveEntranceOverlayProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering theme-dependent image after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use external scale if provided, otherwise calculate internally
  let scale: number;
  if (externalScale !== undefined) {
    scale = externalScale;
  } else {
    // Fallback: calculate scale based on depth (should match page.tsx logic)
    const depthProgress = depth / Math.max(maxDepth, 1);
    scale = 1.0 + depthProgress * 9.0;

    // Add 3x acceleration starting at depth 2
    if (depth >= 2) {
      const extraDepth = depth - 2;
      const extraZoom = extraDepth * 3;
      scale += extraZoom * 9.0;
    }
  }

  // Keep opacity at 1.0 (no transparency)
  const opacity = 1.0;

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
        transformOrigin: 'center 65%', // Scale from entrance hole center
      }}
    >
      <div className="relative w-full h-full">
        {/* Day version - fades in when light mode */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: mounted && theme === 'light' ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/images/cave-entrance-day.svg"
            alt="Cave entrance - light mode"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Night version - fades in when dark mode */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: mounted && theme === 'dark' ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/images/cave-entrance-night.svg"
            alt="Cave entrance - dark mode"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
