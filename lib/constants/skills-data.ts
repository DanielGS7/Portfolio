import { faWrench, faLaptopCode, faBrain, faChartBar, faCar, faBriefcaseMedical } from '@fortawesome/free-solid-svg-icons';

export const SKILL_CATEGORIES = [
  {
    category: 'technical',
    skills: [
      { key: 'siteManagement', icon: faWrench, color: 'var(--color-primary)' },
      { key: 'fullStack', icon: faLaptopCode, color: 'var(--color-accent)' },
      { key: 'llmIntegration', icon: faBrain, color: 'var(--color-tertiary)' },
      { key: 'dataManagement', icon: faChartBar, color: 'var(--color-secondary)' },
    ],
  },
  {
    category: 'certifications',
    skills: [
      { key: 'driverLicense', icon: faCar, color: 'var(--color-accent)' },
      { key: 'firstAid', icon: faBriefcaseMedical, color: 'var(--color-primary)' },
    ],
  },
] as const;

export type SkillCategory = typeof SKILL_CATEGORIES[number]['category'];
export type SkillKey = typeof SKILL_CATEGORIES[number]['skills'][number]['key'];
