'use client';

import { motion, useScroll, useTransform, useMotionValue, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface TimelineSection {
  id: string;
  year: string;
  label: string;
}

interface TimelineNavProps {
  sections: TimelineSection[];
}

export function TimelineNav({ sections }: TimelineNavProps) {
  const [activeSection, setActiveSection] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const dragY = useMotionValue(0);
  const { scrollY } = useScroll();

  // Calculate visible date range (2-3 before and after current)
  const visibleRange = 3;
  const visibleSections = sections.slice(
    Math.max(0, activeSection - visibleRange),
    Math.min(sections.length, activeSection + visibleRange + 1)
  );

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Detect active section based on scroll position
  useEffect(() => {
    if (isDragging) return; // Don't update during drag

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      let newActiveSection = 0;
      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            newActiveSection = index;
          }
        }
      });

      setActiveSection(newActiveSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, isDragging]);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className="relative h-[60vh] w-1">
        {/* Gradient timeline bar */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgb(var(--color-primary))] to-transparent opacity-30">
          {/* Cylindrical shadow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-white/10" />
        </div>

        {/* Active section indicator */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[rgb(var(--color-primary))] shadow-lg shadow-[rgb(var(--color-primary))]"
          animate={{
            top: `${(activeSection / (sections.length - 1)) * 100}%`,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />

        {/* Timeline dates */}
        <div
          ref={timelineRef}
          className="absolute -right-12 top-0 h-full flex flex-col justify-between"
        >
          {visibleSections.map((section, index) => {
            const globalIndex = sections.findIndex(s => s.id === section.id);
            const isActive = globalIndex === activeSection;

            return (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`text-right transition-all ${
                  isActive
                    ? 'text-[rgb(var(--color-primary))] font-bold text-lg'
                    : 'text-[rgb(var(--text-muted))] text-sm hover:text-[rgb(var(--text-light))]'
                }`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                whileHover={{ x: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="font-mono">{section.year}</div>
                {isActive && (
                  <motion.div
                    className="text-xs font-normal text-[rgb(var(--text-light))] mt-1"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    {section.label}
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Drag indicator (optional) */}
        <motion.div
          className="absolute -left-8 top-1/2 -translate-y-1/2 text-[rgb(var(--text-muted))] text-xs opacity-0 hover:opacity-100 transition-opacity"
          whileHover={{ x: -5 }}
        >
          <div className="rotate-90 whitespace-nowrap">scroll timeline</div>
        </motion.div>
      </div>
    </div>
  );
}
