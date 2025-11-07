'use client';

import { motion, useScroll, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface TimelineSection {
  id: string;
  year: string;
  label: string;
  category?: 'story' | 'education' | 'projects' | 'work';
}

interface TimelineNavProps {
  sections: TimelineSection[];
}

type FilterCategory = 'all' | 'story' | 'education' | 'projects' | 'work';

export function TimelineNav({ sections }: TimelineNavProps) {
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Filter sections based on category
  const filteredSections = filter === 'all'
    ? sections
    : sections.filter(s => s.category === filter);

  // Get section elements
  useEffect(() => {
    sectionsRef.current = sections.map(section =>
      document.getElementById(section.id)
    ).filter(Boolean) as HTMLElement[];
  }, [sections]);

  // Smooth scroll to section - center it vertically in viewport
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementCenter = element.offsetTop + element.offsetHeight / 2;
      const viewportCenter = window.innerHeight / 2;
      const targetScroll = elementCenter - viewportCenter;

      window.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: 'smooth'
      });
    }
  };

  // Track scroll and update phase positions
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      setScrollProgress(scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate position for each phase on the timeline
  const getPhasePosition = (sectionIndex: number): { y: number; opacity: number } => {
    if (!timelineRef.current) return { y: 50, opacity: 0 };

    const element = sectionsRef.current[sectionIndex];
    if (!element) return { y: 50, opacity: 0 };

    const timelineHeight = timelineRef.current.clientHeight;
    const viewportHeight = window.innerHeight;
    const viewportCenter = scrollProgress + viewportHeight / 2;

    // Distance from section center to viewport center
    const sectionCenter = element.offsetTop + element.offsetHeight / 2;
    const distanceFromCenter = sectionCenter - viewportCenter;

    // Map distance to timeline position (center of timeline = 50%)
    // Normalize by viewport height to get consistent movement
    const normalizedDistance = distanceFromCenter / viewportHeight;
    const timelinePosition = 50 + (normalizedDistance * 30); // 30% of timeline per viewport height

    // Calculate opacity based on distance from center (fade at edges)
    const opacity = Math.max(0, Math.min(1, 1 - Math.abs(timelinePosition - 50) / 50));

    return {
      y: Math.max(0, Math.min(100, timelinePosition)),
      opacity
    };
  };

  return (
    <>
      {/* Timeline Filter Dropdown */}
      <div className="fixed top-32 right-8 z-50 hidden lg:block">
        <div className="relative">
          <motion.button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="px-4 py-2 rounded-full glass-strong text-sm font-medium text-[rgb(var(--foreground))] border border-[rgba(var(--border)/0.3)] hover:border-[rgb(var(--color-primary))] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {filter === 'all' ? 'Complete Story' : filter.charAt(0).toUpperCase() + filter.slice(1)}
            <motion.span
              className="ml-2 inline-block"
              animate={{ rotate: isDropdownOpen ? 180 : 0 }}
            >
              ▼
            </motion.span>
          </motion.button>

          {isDropdownOpen && (
            <motion.div
              className="absolute top-full mt-2 right-0 w-48 glass-strong rounded-2xl border border-[rgba(var(--border)/0.3)] overflow-hidden shadow-xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {(['all', 'story', 'education', 'projects', 'work'] as FilterCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setFilter(cat);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                    filter === cat
                      ? 'bg-[rgba(var(--color-primary)/0.2)] text-[rgb(var(--color-primary))] font-semibold'
                      : 'text-[rgb(var(--text-light))] hover:bg-[rgba(var(--color-primary)/0.1)]'
                  }`}
                >
                  {cat === 'all' ? 'Complete Story' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Timeline Navigation */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <div
          ref={timelineRef}
          className="relative h-[60vh] w-1"
        >
          {/* Gradient timeline bar */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgb(var(--color-primary))] to-transparent opacity-30">
            {/* Cylindrical shadow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-white/10" />
          </div>

          {/* Center indicator dot */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[rgb(var(--color-primary))] shadow-lg shadow-[rgb(var(--color-primary))]" />

          {/* Timeline phases - moving along the bar */}
          <div className="absolute inset-0">
            {filteredSections.map((section, index) => {
              const globalIndex = sections.findIndex(s => s.id === section.id);
              const position = getPhasePosition(globalIndex);

              return (
                <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="absolute flex items-center gap-3 cursor-pointer -mx-2 -my-1 px-2 py-1 rounded-lg hover:bg-[rgba(var(--color-primary)/0.1)] transition-all -translate-y-1/2"
                  style={{
                    top: `${position.y}%`,
                    right: '1.5rem',
                    opacity: position.opacity,
                  }}
                  whileHover={{ x: -5, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Title (left of dot) */}
                  <span
                    className={`text-left transition-all whitespace-nowrap ${
                      position.y > 45 && position.y < 55
                        ? 'text-[rgb(var(--color-primary))] font-bold text-base'
                        : 'text-[rgb(var(--text-muted))] text-xs'
                    }`}
                  >
                    {section.label}
                  </span>

                  {/* Dot indicator */}
                  <div
                    className={`w-2 h-2 rounded-full transition-all ${
                      position.y > 45 && position.y < 55
                        ? 'bg-[rgb(var(--color-primary))] shadow-lg shadow-[rgb(var(--color-primary))]'
                        : 'bg-[rgb(var(--text-muted))]'
                    }`}
                  />

                  {/* Year (right of dot) */}
                  <span
                    className={`font-mono text-xs ${
                      position.y > 45 && position.y < 55
                        ? 'text-[rgb(var(--color-primary))] font-semibold'
                        : 'text-[rgb(var(--text-muted))]'
                    }`}
                  >
                    {section.year}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
