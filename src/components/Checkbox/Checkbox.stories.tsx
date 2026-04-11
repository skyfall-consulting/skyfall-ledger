import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Checkbox } from './Checkbox';
import { space } from '../../tokens/spacing';

/**
 * Components / Checkbox
 *
 * A toggle for boolean values with optional indeterminate state.
 * Supports controlled and uncontrolled modes, FormField integration,
 * and full keyboard accessibility.
 */
const meta: Meta<typeof Checkbox> = {
  title: 'Components/Inputs/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Checkbox -- a toggle for boolean values with an optional indeterminate state. Supports controlled and uncontrolled modes plus FormField context integration for automatic id, disabled, and required wiring.\n\nAccessibility:\n- Uses a native `<input type="checkbox">` (visually hidden via `.ledger-sr-input`) so keyboard and screen-reader support is built-in.\n- The indeterminate property is synced to the DOM element via a `ref` effect, correctly communicating mixed state to assistive technology.\n- Focus-visible tracking applies the focus ring only on keyboard navigation, not on pointer clicks.\n- Check and indeterminate icons are decorative and marked `aria-hidden`.\n- Wraps the input in a `<label>` element for an enlarged click target.',
      },
    },
  },
  argTypes: {
    checked: { control: 'boolean', description: 'Controlled checked state.' },
    indeterminate: { control: 'boolean', description: 'Shows a minus icon instead of a checkmark.' },
    disabled: { control: 'boolean', description: 'Prevents interaction.' },
    label: { control: 'text', description: 'Text rendered beside the checkbox.' },
  },
  args: {
    disabled: false,
    indeterminate: false,
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// ---------- Basic ----------

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const WithLabel: Story = {
  args: { label: 'Accept terms and conditions' },
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Unavailable option' },
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true, label: 'Locked selection' },
};

// ---------- Group ----------

export const Group: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Multiple checkboxes in a vertical list, each independently controlled.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: space[4] }}>
      <Checkbox label="Checking accounts" defaultChecked />
      <Checkbox label="Savings accounts" />
      <Checkbox label="Investment portfolios" />
      <Checkbox label="Credit lines" disabled />
    </div>
  ),
};
