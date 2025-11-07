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

  // Zoom origin: 4/9 from bottom center (55.56% from top)
  // Scale dramatically (10x) so cave entrance fills and goes beyond viewport
  const scale = isZoomed ? 10 : 1;

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
