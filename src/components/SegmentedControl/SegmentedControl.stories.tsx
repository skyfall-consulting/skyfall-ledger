import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedControl } from './index';

/**
 * **DEPRECATED** — Use `ToggleButton` instead.
 *
 * This component has been renamed to align with the approved Skyfall
 * 75-core taxonomy. See Inputs / Toggle Button for the canonical stories.
 *
 * This entry will be removed in a future major version.
 */
const meta: Meta<typeof SegmentedControl> = {
  title: 'Deprecated/Segmented Control',
  component: SegmentedControl,
  parameters: {
    docs: {
      description: {
        component:
          '⚠️ **Deprecated.** This component has been renamed to **ToggleButton**. See Inputs / Toggle Button.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const DeprecatedNotice: Story = {
  args: {
    items: [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
      { value: 'c', label: 'Option C' },
    ],
    defaultValue: 'a',
  },
};
