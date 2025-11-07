'use client';

import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Skills } from '@/components/sections/skills';
import { Projects } from '@/components/sections/projects';
import { Services } from '@/components/sections/services';
import { Footer } from '@/components/layout/footer';
import { TimelineNav } from '@/components/ui/timeline-nav';
import { CaveBackground } from '@/components/ui/cave-background';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const t = useTranslations('timeline');
  const [activeSection, setActiveSection] = useState('hero');

  // Timeline sections for homepage - using even spacing (no dates/years shown)
  const timelineSections = [
    { id: 'hero', year: '', date: '2024-11-01', label: t('intro'), category: 'story' as const },
    { id: 'about', year: '', date: '2021-09-01', label: t('about'), category: 'story' as const },
    { id: 'skills', year: '', date: '2015-01-01', label: t('skills'), category: 'education' as const },
    { id: 'projects', year: '', date: '2015-09-01', label: t('projects'), category: 'projects' as const },
    { id: 'services', year: '', date: '2014-01-01', label: t('services'), category: 'work' as const },
  ];

  // Calculate depth based on section index (0 at entrance, increases as you go deeper)
  const getCurrentDepth = () => {
    const index = timelineSections.findIndex(s => s.id === activeSection);
    return index >= 0 ? index : 0;
  };

  // Listen for section changes from TimelineNav
  useEffect(() => {
    const handleSectionChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      setActiveSection(customEvent.detail.sectionId);
    };

    window.addEventListener('timelineNavigate', handleSectionChange);
    return () => window.removeEventListener('timelineNavigate', handleSectionChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = timelineSections.findIndex(s => s.id === activeSection);

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentIndex < timelineSections.length - 1) {
          setActiveSection(timelineSections[currentIndex + 1].id);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentIndex > 0) {
          setActiveSection(timelineSections[currentIndex - 1].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, timelineSections]);

  // Mouse wheel navigation
  useEffect(() => {
    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;

      const currentIndex = timelineSections.findIndex(s => s.id === activeSection);

      if (e.deltaY > 0) {
        // Scrolling down - go deeper in the cave
        if (currentIndex < timelineSections.length - 1) {
          isScrolling = true;
          setActiveSection(timelineSections[currentIndex + 1].id);
          setTimeout(() => { isScrolling = false; }, 800);
        }
      } else if (e.deltaY < 0) {
        // Scrolling up - go back up
        if (currentIndex > 0) {
          isScrolling = true;
          setActiveSection(timelineSections[currentIndex - 1].id);
          setTimeout(() => { isScrolling = false; }, 800);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeSection, timelineSections]);

  // Section components mapping
  const sectionComponents = {
    hero: <Hero />,
    about: <About />,
    skills: <Skills />,
    projects: <Projects />,
    services: <Services />,
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Cave background with depth progression */}
      <CaveBackground depth={getCurrentDepth()} maxDepth={timelineSections.length - 1} />

      {/* Timeline navigation */}
      <TimelineNav sections={timelineSections} onNavigate={setActiveSection} activeSection={activeSection} />

      {/* Overlaying sections with fade animations */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {timelineSections.map(section => (
            activeSection === section.id && (
              <motion.div
                key={section.id}
                id={section.id}
                className="fixed inset-0 flex items-center justify-center overflow-y-auto overflow-x-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
              >
                {/* Scrollable container for section content */}
                <div className="w-full max-h-screen overflow-y-auto overflow-x-hidden py-4">
                  {sectionComponents[section.id as keyof typeof sectionComponents]}
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Footer - always visible at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-20 pointer-events-none">
        <div className="pointer-events-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
