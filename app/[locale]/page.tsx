import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Skills } from '@/components/sections/skills';
import { Projects } from '@/components/sections/projects';
import { Services } from '@/components/sections/services';
import { TimelineNav } from '@/components/ui/timeline-nav';
import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations('timeline');

  const timelineSections = [
    { id: 'hero', year: '2025', label: t('intro') },
    { id: 'about', year: '2024', label: t('about') },
    { id: 'skills', year: '2023', label: t('skills') },
    { id: 'projects', year: '2022', label: t('projects') },
    { id: 'services', year: '2021', label: t('services') },
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
