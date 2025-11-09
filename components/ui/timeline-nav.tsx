"use client";

import {
  motion,
  useScroll,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface TimelineSection {
  id: string;
  year: string; // Display year
  date: string; // ISO date string for positioning
  label: string;
  category?: "story" | "education" | "projects" | "work";
}

interface TimelineNavProps {
  sections: TimelineSection[];
  mode?: 'time-based' | 'even-spacing'; // Mode for spacing calculation
  onNavigate?: (sectionId: string) => void; // Callback for navigation (cave mode)
  activeSection?: string; // Active section from parent (cave mode)
}

export function TimelineNav({ sections, mode = 'even-spacing', onNavigate, activeSection: activeSectionProp }: TimelineNavProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(sections[0]?.id || 'hero');

  // Use prop if provided (cave mode), otherwise use state (scroll mode)
  const currentActiveSection = activeSectionProp || activeSection;

  // No filtering in cave mode
  const filteredSections = sections;

  // Determine if we're in cave mode (overlay) or scroll mode
  const isCaveMode = !!onNavigate;

  // Get section elements
  useEffect(() => {
    if (!isCaveMode) {
      sectionsRef.current = sections
        .map((section) => document.getElementById(section.id))
        .filter(Boolean) as HTMLElement[];
    }
  }, [sections, isCaveMode]);

  // Navigate to section - either scroll or call onNavigate callback
  const navigateToSection = (sectionId: string) => {
    if (isCaveMode) {
      // Cave mode: use callback
      setActiveSection(sectionId);
      onNavigate(sectionId);

      // Emit custom event for page component to listen to
      window.dispatchEvent(new CustomEvent('timelineNavigate', {
        detail: { sectionId }
      }));
    } else {
      // Scroll mode: traditional scrolling
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = -50;
        const targetScroll = element.offsetTop - headerOffset;

        window.scrollTo({
          top: Math.max(0, targetScroll),
          behavior: "smooth",
        });
      }
    }
  };

  // Track scroll and update phase positions (only in scroll mode)
  useEffect(() => {
    if (isCaveMode) return; // Skip scroll tracking in cave mode

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollProgress(scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isCaveMode]);

  // Calculate time-based position for each phase
  const getTimeBasedPosition = (date: Date, minDate: Date, maxDate: Date): number => {
    const totalTimeSpan = maxDate.getTime() - minDate.getTime();
    if (totalTimeSpan === 0) return 50; // If all dates are the same, center everything

    // Reverse: newer dates at top (lower %), older dates at bottom (higher %)
    const datePosition = maxDate.getTime() - date.getTime();
    // Map to timeline range (10% to 90% to keep phases visible)
    return 10 + (datePosition / totalTimeSpan) * 80;
  };

  // Calculate position for each phase on the timeline
  const getPhasePosition = (
    sectionIndex: number
  ): { y: number; opacity: number } => {
    if (!timelineRef.current) return { y: 50, opacity: 0 };

    let activeIndex = 0;

    if (isCaveMode) {
      // In cave mode, use currentActiveSection
      activeIndex = sections.findIndex(s => s.id === currentActiveSection);
      if (activeIndex === -1) activeIndex = 0;
    } else {
      // In scroll mode, calculate from scroll position
      const element = sectionsRef.current[sectionIndex];
      if (!element) return { y: 50, opacity: 0 };

      const headerOffset = -50;
      const viewingPosition = scrollProgress + headerOffset;
      let minDistance = Infinity;

      sectionsRef.current.forEach((el, idx) => {
        if (el) {
          const distance = Math.abs(el.offsetTop - viewingPosition);
          if (distance < minDistance) {
            minDistance = distance;
            activeIndex = idx;
          }
        }
      });
    }

    let timelinePosition: number;

    if (mode === 'time-based') {
      // Time-based positioning
      const dates = sections.map(s => new Date(s.date));
      const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
      const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));

      const sectionDate = new Date(sections[sectionIndex].date);
      const timePosition = getTimeBasedPosition(sectionDate, minDate, maxDate);

      const activeSectionDate = new Date(sections[activeIndex].date);
      const activeTimePosition = getTimeBasedPosition(activeSectionDate, minDate, maxDate);
      const scrollOffset = 50 - activeTimePosition;

      timelinePosition = timePosition + scrollOffset;
    } else {
      // Even spacing mode - position based on array index
      const totalSections = filteredSections.length;
      const filteredIndex = filteredSections.findIndex(s => s.id === sections[sectionIndex].id);

      // Calculate even position (10% to 90% range)
      const evenPosition = totalSections > 1
        ? 10 + (filteredIndex / (totalSections - 1)) * 80
        : 50;

      // Calculate active position
      const activeFilteredIndex = filteredSections.findIndex(s => s.id === sections[activeIndex].id);
      const activeEvenPosition = totalSections > 1
        ? 10 + (activeFilteredIndex / (totalSections - 1)) * 80
        : 50;

      const scrollOffset = 50 - activeEvenPosition;
      timelinePosition = evenPosition + scrollOffset;
    }

    // Calculate opacity based on distance from center (fade at edges)
    const opacity = Math.max(
      0,
      Math.min(1, 1 - Math.abs(timelinePosition - 50) / 50)
    );

    return {
      y: Math.max(0, Math.min(100, timelinePosition)),
      opacity,
    };
  };

  return (
    <>
      {/* Timeline Navigation */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <div ref={timelineRef} className="relative h-[60vh] w-1">
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
              const globalIndex = sections.findIndex(
                (s) => s.id === section.id
              );
              const position = getPhasePosition(globalIndex);

              return (
                <motion.button
                  key={section.id}
                  onClick={() => navigateToSection(section.id)}
                  className="absolute flex items-center gap-3 cursor-pointer px-2 py-1 rounded-lg hover:bg-[rgba(var(--color-primary)/0.1)] transition-all -translate-y-1/2"
                  style={{
                    top: `${position.y}%`,
                    right: "1.5rem",
                    opacity: position.opacity,
                  }}
                  whileHover={{ x: -5, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Title (left of dot) */}
                  <span
                    className={`text-left transition-all whitespace-nowrap ${
                      position.y > 45 && position.y < 55
                        ? "text-[rgb(var(--color-primary))] font-bold text-base"
                        : "text-[rgb(var(--text-muted))] text-xs"
                    }`}
                  >
                    {section.label}
                  </span>

                  {/* Dot indicator */}
                  <div
                    className={`w-2 h-2 rounded-full transition-all ${
                      position.y > 45 && position.y < 55
                        ? "bg-[rgb(var(--color-primary))] shadow-lg shadow-[rgb(var(--color-primary))]"
                        : "bg-[rgb(var(--text-muted))]"
                    }`}
                  />

                  {/* Year (right of dot) - only in time-based mode */}
                  {mode === 'time-based' && section.year && (
                    <span
                      className={`font-mono text-xs ${
                        position.y > 45 && position.y < 55
                          ? "text-[rgb(var(--color-primary))] font-semibold"
                          : "text-[rgb(var(--text-muted))]"
                      }`}
                    >
                      {section.year}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
