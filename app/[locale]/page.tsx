'use client';

import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Skills } from '@/components/sections/skills';
import { Projects } from '@/components/sections/projects';
import { Services } from '@/components/sections/services';
import { CTA } from '@/components/sections/cta';
import { Footer } from '@/components/layout/footer';
import { TimelineNav } from '@/components/ui/timeline-nav';
import { CaveBackground } from '@/components/ui/cave-background';
import { CaveEntranceOverlay } from '@/components/ui/cave-entrance-overlay';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/hooks/use-theme';
import Image from 'next/image';

export default function Home() {
  const t = useTranslations('timeline');
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState('hero');
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering theme-dependent content after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Timeline sections for homepage - using even spacing (no dates/years shown)
  const timelineSections = [
    { id: 'hero', year: '', date: '2024-11-01', label: t('intro'), category: 'story' as const },
    { id: 'about', year: '', date: '2021-09-01', label: t('about'), category: 'story' as const },
    { id: 'skills', year: '', date: '2015-01-01', label: t('skills'), category: 'education' as const },
    { id: 'projects', year: '', date: '2015-09-01', label: t('projects'), category: 'projects' as const },
    { id: 'services', year: '', date: '2014-01-01', label: t('services'), category: 'work' as const },
    { id: 'cta', year: '', date: '2013-01-01', label: t('contact'), category: 'story' as const },
  ];

  // Calculate depth based on section index (0 at entrance, increases as you go deeper)
  const getCurrentDepth = () => {
    const index = timelineSections.findIndex(s => s.id === activeSection);
    return index >= 0 ? index : 0;
  };

  // Calculate scale for cave entrance (matching CaveEntranceOverlay logic)
  const getCurrentScale = () => {
    const depth = getCurrentDepth();
    const maxDepth = timelineSections.length - 1;
    const depthProgress = depth / Math.max(maxDepth, 1);

    // At skills section (depth >= 2), zoom 3x faster
    if (depth >= 2) {
      const extraZoom = (depth - 1) * 3;
      return 1.0 + (1 / Math.max(maxDepth, 1)) * 9.0 + extraZoom * 9.0;
    } else {
      return 1.0 + depthProgress * 9.0;
    }
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

  // Mouse wheel navigation - smooth single section scrolling
  useEffect(() => {
    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      // Ignore scroll during cooldown period
      if (isScrolling) {
        return;
      }

      const currentIndex = timelineSections.findIndex(s => s.id === activeSection);
      const scrollingDown = e.deltaY > 0;

      if (scrollingDown && currentIndex < timelineSections.length - 1) {
        // Scrolling down - go to next section
        isScrolling = true;
        setActiveSection(timelineSections[currentIndex + 1].id);
        setTimeout(() => { isScrolling = false; }, 500); // 500ms cooldown
      } else if (!scrollingDown && currentIndex > 0) {
        // Scrolling up - go to previous section
        isScrolling = true;
        setActiveSection(timelineSections[currentIndex - 1].id);
        setTimeout(() => { isScrolling = false; }, 500); // 500ms cooldown
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [activeSection, timelineSections]);

  // Section components mapping
  const sectionComponents = {
    hero: <Hero />,
    about: <About />,
    skills: <Skills />,
    projects: <Projects />,
    services: <Services />,
    cta: <CTA />,
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Cave background with depth progression */}
      <CaveBackground depth={getCurrentDepth()} maxDepth={timelineSections.length - 1} scale={getCurrentScale()} />

      {/* Skybox with stars - only visible on hero section */}
      {activeSection === 'hero' && (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          {/* Sky gradient - blue in light mode, dark in dark mode */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 transition-colors duration-500" />

          {/* Stars for night sky - deterministic positions to avoid hydration errors */}
          <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-500">
            {[...Array(100)].map((_, i) => {
              // Use deterministic values based on index to avoid hydration mismatch
              const top = ((i * 37) % 70);
              const left = ((i * 73) % 100);
              const size = 1 + ((i * 17) % 20) / 10;
              const duration = 2 + ((i * 23) % 20) / 10;
              const delay = ((i * 31) % 30) / 10;

              return (
                <div
                  key={i}
                  className="absolute bg-white rounded-full animate-pulse"
                  style={{
                    top: `${top}%`,
                    left: `${left}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    animationDuration: `${duration}s`,
                    animationDelay: `${delay}s`,
                  }}
                />
              );
            })}
          </div>

          {/* Sun/Moon decorative elements - top right corner (only after hydration) */}
          {mounted && (
            <div className="absolute top-8 right-8 sm:top-12 sm:right-12 w-24 h-24 sm:w-32 sm:h-32">
              <AnimatePresence mode="wait">
                {theme === 'light' ? (
                  <motion.div
                    key="sun"
                    className="absolute inset-0"
                    initial={{ scale: 0, rotate: -180, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0, rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                  >
                    <Image
                      src="/images/sun.png"
                      alt="Sun"
                      fill
                      className="object-contain drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    className="absolute inset-0"
                    initial={{ scale: 0, rotate: 180, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0, rotate: -180, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                  >
                    <Image
                      src="/images/moon.png"
                      alt="Moon"
                      fill
                      className="object-contain drop-shadow-[0_0_20px_rgba(148,163,184,0.6)]"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}

      {/* Overlaying sections with fade animations */}
      <div className="relative">
        <AnimatePresence initial={false}>
          {timelineSections.map(section => (
            activeSection === section.id && (
              <motion.div
                key={section.id}
                id={section.id}
                className="fixed inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                style={{ zIndex: 10 }}
              >
                {sectionComponents[section.id as keyof typeof sectionComponents]}
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Cave entrance overlay with zoom transition */}
      <CaveEntranceOverlay activeSection={activeSection} depth={getCurrentDepth()} maxDepth={timelineSections.length - 1} />

      {/* Timeline navigation */}
      <TimelineNav sections={timelineSections} onNavigate={setActiveSection} activeSection={activeSection} />

      {/* Footer - only visible on last section with animation */}
      <AnimatePresence>
        {activeSection === timelineSections[timelineSections.length - 1].id && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-20 pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="pointer-events-auto">
              <Footer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
