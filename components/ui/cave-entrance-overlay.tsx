'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface CaveEntranceOverlayProps {
  activeSection: string;
}

export function CaveEntranceOverlay({ activeSection }: CaveEntranceOverlayProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    // Zoom in when leaving hero section
    if (activeSection !== 'hero') {
      setIsZoomed(true);
    } else {
      setIsZoomed(false);
    }
  }, [activeSection]);

  // Calculate scale needed to make cave hole fill viewport
  // Assuming the cave hole is roughly 30% of the image height and centered
  // We need to scale by about 3.5x to make the hole fill the screen
  const scale = isZoomed ? 4 : 1;
  const opacity = isZoomed ? 0 : 1; // Fade out as we zoom past it

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
        transformOrigin: 'center center',
      }}
    >
      <div className="relative w-full h-full">
        <Image
          src="/images/cave-entrance.png"
          alt="Cave entrance in mountain with grass"
          fill
          className="object-cover"
          priority
        />
      </div>
    </motion.div>
  );
}
