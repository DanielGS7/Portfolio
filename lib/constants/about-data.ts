import { faRocket, faRobot, faCampground } from '@fortawesome/free-solid-svg-icons';

export const ABOUT_HIGHLIGHTS = [
  {
    key: 'entrepreneurship',
    icon: faRocket,
    gradient: 'from-[rgb(var(--color-primary))] to-[rgb(var(--color-accent))]',
  },
  {
    key: 'llm',
    icon: faRobot,
    gradient: 'from-[rgb(var(--color-accent))] to-[rgb(var(--color-tertiary))]',
  },
  {
    key: 'youth',
    icon: faCampground,
    gradient: 'from-[rgb(var(--color-secondary))] to-[rgb(var(--color-primary))]',
  },
] as const;

export type AboutHighlightKey = typeof ABOUT_HIGHLIGHTS[number]['key'];
