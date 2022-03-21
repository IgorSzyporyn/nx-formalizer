import type { Variants } from 'framer-motion';

export type AnimateHeightAnimation = {
  content: { expanded: Variants; collapsed: Variants };
};

export type AnimateHeightTransition = {
  duration?: number;
  [key: string]: unknown;
};
