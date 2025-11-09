'use client';

import { useRef } from 'react';
import { motion, useInView, type InViewOptions } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /**
   * Intersection observer margin
   * @default '-100px'
   */
  margin?: InViewOptions['margin'];
  /**
   * Animation duration in seconds
   * @default 0.6
   */
  duration?: number;
  /**
   * Initial Y offset
   * @default 30
   */
  initialY?: number;
}

/**
 * Reusable animated section component that fades in and slides up when scrolled into view
 * Uses Framer Motion's useInView hook with once: true to animate only on first appearance
 */
export function AnimatedSection({
  children,
  delay = 0,
  className = '',
  margin = '-100px',
  duration = 0.6,
  initialY = 30,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: initialY }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
}
