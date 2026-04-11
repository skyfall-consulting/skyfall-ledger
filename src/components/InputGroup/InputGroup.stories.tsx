import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { InputGroup } from './InputGroup';
import { Input } from '../Input';

const meta: Meta<typeof InputGroup> = {
  title: 'Components/Layout/Input Group',
  component: InputGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'InputGroup — wraps an input with leading and/or trailing addons such as currency symbols, units, or action buttons.\n\nAccessibility:\n- Addons are presentational — do not duplicate input labels\n- Use `aria-describedby` on the input to associate addon context\n- Inner inputs have borders stripped for visual integration',
      },
    },
  },
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'], description: 'Matches Ledger form control sizing.' },
    error: { control: 'boolean', description: 'Applies error border styling.' },
    disabled: { control: 'boolean', description: 'Disables the entire group.' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof InputGroup>;

export const CurrencyInput: Story = {
  render: () => (
    <InputGroup startAddon="$" endAddon="USD">
      <Input placeholder="0.00" style={{ border: 'none', borderRadius: 0, boxShadow: 'none' }} />
    </InputGroup>
  ),
};

export const WithURL: Story = {
  render: () => (
    <InputGroup startAddon="https://">
      <Input placeholder="api.example.com" style={{ border: 'none', borderRadius: 0, boxShadow: 'none' }} />
    </InputGroup>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <InputGroup startAddon="$" error>
      <Input placeholder="0.00" style={{ border: 'none', borderRadius: 0, boxShadow: 'none' }} />
    </InputGroup>
  ),
};
