'use client';

import { motion } from 'framer-motion';
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
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering theme-dependent image after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Zoom origin: centered more downward (65% from top - closer to entrance center)
  // Scale based on depth to sync with background (1.0 at entrance, increases as you go deeper)
  const depthProgress = depth / Math.max(maxDepth, 1);

  // At skills section (depth >= 2), zoom 3x faster
  let scale;
  if (depth >= 2) {
    // Skills section onwards: multiply by 3 for extra zoom
    // Shift the calculation so projects zoom happens at skills
    const extraZoom = (depth - 1) * 3; // Start 3x zoom one section earlier
    scale = 1.0 + (1 / Math.max(maxDepth, 1)) * 9.0 + extraZoom * 9.0;
  } else {
    // Before skills section: normal zoom (1.0 to scale based on depth)
    scale = 1.0 + depthProgress * 9.0;
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
            className="object-cover object-bottom"
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
            className="object-cover object-bottom"
            priority
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
