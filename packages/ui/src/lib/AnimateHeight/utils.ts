import { animationContentBase } from './animation';

import type { AnimateHeightAnimation } from './types';

export const getAutoHeightDuration = (height?: number) => {
  if (height === undefined) {
    return 0;
  }
  const constant = height / 36;
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
};

export const createVariants = (options: AnimateHeightAnimation['content']) => {
  return {
    expanded: { ...animationContentBase.expanded, ...options.expanded },
    collapsed: { ...animationContentBase.collapsed, ...options.collapsed },
  };
};
