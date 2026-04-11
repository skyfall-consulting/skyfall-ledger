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
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Switch — Binary toggle for on/off states such as enabling two-factor authentication, toggling notifications, or activating feature flags in financial platforms.\n\n' +
          'Accessibility:\n' +
          '- Uses a visually-hidden `<input type="checkbox">` with `role="switch"` and `aria-checked` for screen-reader semantics\n' +
          '- Tracks `:focus-visible` to show a focus ring only on keyboard navigation\n' +
          '- Wraps the input and track in a `<label>` element for click-to-toggle on the label text\n' +
          '- Supports controlled and uncontrolled modes with optional FormField context integration\n' +
          '- Disabled state reduces opacity and sets `cursor: not-allowed` via primitives.css',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Controls the track and thumb dimensions.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the switch and prevents toggling.',
    },
    label: {
      control: 'text',
      description: 'Text or element rendered beside the switch track.',
    },
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
