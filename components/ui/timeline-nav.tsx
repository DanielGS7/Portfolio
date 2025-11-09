'use client';

import { motion, useScroll, useMotionValue, useSpring, type PanInfo } from 'framer-motion';
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
  const [activeSection, setActiveSection] = useState(0);
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const { scrollY } = useScroll();

  // Smooth spring animation for the indicator
  const indicatorY = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Filter sections based on category
  const filteredSections = filter === 'all'
    ? sections
    : sections.filter(s => s.category === filter);

  // Get section elements and calculate positions
  useEffect(() => {
    sectionsRef.current = sections.map(section =>
      document.getElementById(section.id)
    ).filter(Boolean) as HTMLElement[];
  }, [sections]);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string, index: number) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate the exact position
      const targetY = element.offsetTop;

      // Use smooth scroll with custom easing
      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });

      setActiveSection(index);
    }
  };

  // Detect active section and sync indicator position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(window.scrollY / documentHeight, 1);

      // Find active section
      let newActiveSection = 0;
      let minDistance = Infinity;

      sectionsRef.current.forEach((element, index) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const viewportCenter = window.innerHeight / 2;
          const distance = Math.abs(elementCenter - viewportCenter);

          if (distance < minDistance) {
            minDistance = distance;
            newActiveSection = index;
          }
        }
      });

      setActiveSection(newActiveSection);

      // Calculate indicator position based on actual scroll progress
      if (timelineRef.current) {
        const timelineHeight = timelineRef.current.clientHeight;
        const newY = scrollProgress * timelineHeight;
        indicatorY.set(newY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, indicatorY]);

  // Handle timeline drag
  const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!timelineRef.current) return;

    const timelineHeight = timelineRef.current.clientHeight;
    const dragProgress = Math.max(0, Math.min(1, info.point.y / timelineHeight));
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

    window.scrollTo({
      top: dragProgress * documentHeight,
      behavior: 'auto' // No smooth during drag
    });
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

          {/* Draggable indicator */}
          <motion.div
            drag="y"
            dragConstraints={timelineRef}
            dragElastic={0}
            dragMomentum={false}
            onDrag={handleDrag}
            className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[rgb(var(--color-primary))] shadow-lg shadow-[rgb(var(--color-primary))] cursor-grab active:cursor-grabbing"
            style={{
              top: indicatorY,
            }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 1.1 }}
          />

          {/* Timeline dates - positioned proportionally */}
          <div className="absolute inset-0">
            {filteredSections.map((section, index) => {
              const globalIndex = sections.findIndex(s => s.id === section.id);
              const isActive = globalIndex === activeSection;

              // Calculate position based on section position in document
              const element = sectionsRef.current[globalIndex];
              const position = element
                ? (element.offsetTop / (document.documentElement.scrollHeight - window.innerHeight)) * 100
                : (index / (filteredSections.length - 1)) * 100;

              return (
                <motion.div
                  key={section.id}
                  className="absolute flex items-center gap-3"
                  style={{
                    top: `${Math.min(95, Math.max(5, position))}%`,
                    right: '1.5rem',
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Title (left of dot) */}
                  <motion.button
                    onClick={() => scrollToSection(section.id, globalIndex)}
                    className={`text-left transition-all whitespace-nowrap ${
                      isActive
                        ? 'text-[rgb(var(--color-primary))] font-bold text-base'
                        : 'text-[rgb(var(--text-muted))] text-xs hover:text-[rgb(var(--text-light))]'
                    }`}
                    whileHover={{ x: -5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {section.label}
                  </motion.button>

                  {/* Dot indicator */}
                  <div
                    className={`w-2 h-2 rounded-full transition-all ${
                      isActive
                        ? 'bg-[rgb(var(--color-primary))] shadow-lg shadow-[rgb(var(--color-primary))]'
                        : 'bg-[rgb(var(--text-muted))]'
                    }`}
                  />

                  {/* Year (right of dot) */}
                  <div
                    className={`font-mono text-xs ${
                      isActive
                        ? 'text-[rgb(var(--color-primary))] font-semibold'
                        : 'text-[rgb(var(--text-muted))]'
                    }`}
                  >
                    {section.year}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
