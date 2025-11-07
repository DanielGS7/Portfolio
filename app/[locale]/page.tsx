import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Skills } from '@/components/sections/skills';
import { Projects } from '@/components/sections/projects';
import { Services } from '@/components/sections/services';
import { TimelineNav } from '@/components/ui/timeline-nav';
import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations('timeline');

  // Timeline sections for homepage - using even spacing (no dates/years shown)
  const timelineSections = [
    { id: 'hero', year: '', date: '2024-11-01', label: t('intro'), category: 'story' as const },
    { id: 'about', year: '', date: '2021-09-01', label: t('about'), category: 'story' as const },
    { id: 'skills', year: '', date: '2015-01-01', label: t('skills'), category: 'education' as const },
    { id: 'projects', year: '', date: '2015-09-01', label: t('projects'), category: 'projects' as const },
    { id: 'services', year: '', date: '2014-01-01', label: t('services'), category: 'work' as const },
  ];

  return (
    <div className="relative">
      <TimelineNav sections={timelineSections} />
      <div id="hero">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="services">
        <Services />
      </div>
    </div>
  );
}
