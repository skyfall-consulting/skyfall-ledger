import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Switch } from './Switch';
import { space } from '../../tokens/spacing';

/**
 * Components / Switch
 *
 * A toggle switch for binary on/off states. Supports two sizes and
 * optional labels. Track and thumb animations use CSS custom properties.
 */
const meta: Meta<typeof Switch> = {
  title: 'Components/Inputs/Switch',
  component: Switch,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Toggle switch with sm/md sizes. Cursor and user-select from primitives.css; colors and transforms are inline to support size variants.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
    },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    size: 'md',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

// ---------- Basic ----------

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Feature unavailable' },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const WithLabel: Story = {
  args: { label: 'Enable two-factor authentication' },
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true, label: 'Required setting' },
};

// ---------- Showcase ----------

export const AllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Both sizes with and without labels, in both states.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: space[5] }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: space[6] }}>
        <Switch size="sm" label="Small off" />
        <Switch size="sm" defaultChecked label="Small on" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: space[6] }}>
        <Switch size="md" label="Medium off" />
        <Switch size="md" defaultChecked label="Medium on" />
      </div>
    </div>
  ),
};
