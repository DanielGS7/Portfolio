import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Skills } from '@/components/sections/skills';
import { Projects } from '@/components/sections/projects';
import { Services } from '@/components/sections/services';

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />
    </div>
  );
}
