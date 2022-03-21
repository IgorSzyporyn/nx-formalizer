import { AnimateHeight } from '../AnimateHeight';

import type { Story as StoryType, Meta } from '@storybook/react';
import type { AnimateHeightProps } from '../AnimateHeight';

export default {
  title: 'UI/Components/AnimateHeight',
  component: AnimateHeight,
  options: {
    showPanel: true,
  },
  parameters: {
    layout: 'centered',
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
  },
} as Meta;

const Template: StoryType<AnimateHeightProps> = (args) => (
  <AnimateHeight {...args}>button</AnimateHeight>
);

export const Controllable = Template.bind({});
Controllable.args = {};
