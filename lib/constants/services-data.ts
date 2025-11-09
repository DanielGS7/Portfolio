import { faArrowsRotate, faBolt, faRobot, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';

export const SERVICES = [
  { key: 'migration', icon: faArrowsRotate, color: 'var(--color-primary)' },
  { key: 'fullstack', icon: faBolt, color: 'var(--color-accent)' },
  { key: 'llm', icon: faRobot, color: 'var(--color-tertiary)' },
  { key: 'maintenance', icon: faScrewdriverWrench, color: 'var(--color-secondary)' },
] as const;

export type ServiceKey = typeof SERVICES[number]['key'];
