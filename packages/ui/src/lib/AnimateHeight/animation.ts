import type { Variants } from 'framer-motion';
import type { AnimateHeightAnimation } from './types';

export const animationContentBase: Variants = {
  expanded: { opacity: 1, height: 'auto' },
  collapsed: { opacity: 0, height: 0 },
};

export const animation: AnimateHeightAnimation = {
  content: { expanded: {}, collapsed: {} },
};
