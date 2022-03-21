// Globals
import { AnimatePresence, motion } from 'framer-motion';
import { useRef } from 'react';

// Miscellaneous
import { createVariants, getAutoHeightDuration } from './utils';
import { animation } from './animation';
import { useDomRect } from '../../hooks/useDomRect';

// Types
import type { AnimateHeightTransition, AnimateHeightAnimation } from './types';
import type { HTMLAttributes } from 'react';

export type AnimateHeightProps = {
  animation?: AnimateHeightAnimation['content'];
  transition?: AnimateHeightTransition;
  expanded?: boolean;
  padding?: string | number;
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

/**
 * ### [@woba/ui] AnimateHeight
 *
 * Simple wrapper to enable animated collapsed/expanded height
 *
 */
export const AnimateHeight = ({
  animation: _animation = animation.content,
  children,
  expanded = false,
  padding = 0,
  transition: _transition = { duration: 0.4 },
  ...rest
}: AnimateHeightProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { height } = useDomRect<HTMLDivElement>({ ref, props: ['height'] });

  const variants = createVariants(_animation);

  return (
    <div {...rest}>
      <AnimatePresence>
        {expanded && (
          <motion.div
            animate="expanded"
            inherit={false}
            initial="collapsed"
            style={{ overflow: 'hidden' }}
            exit="collapsed"
            variants={variants}
            transition={{
              ..._transition,
              duration:
                _transition.duration || getAutoHeightDuration(height) / 1000,
            }}
          >
            <div style={{ margin: padding }} ref={ref}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

AnimateHeight.displayName = 'AnimateHeight';
