import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Kbd } from './Kbd';
import { space } from '../../tokens/spacing';

const meta: Meta<typeof Kbd> = {
  title: 'Components/Data Display/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Kbd — inline keyboard shortcut indicator styled to look like a physical key.\n\nAccessibility:\n- Uses semantic `<kbd>` element announced as keyboard input by screen readers\n- Purely presentational — pair with explanatory text for context',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Size variant affecting height and font size.',
    },
  },
  args: { size: 'md', children: '⌘' },
};

export default meta;
type Story = StoryObj<typeof Kbd>;

export const Default: Story = { args: { children: '⌘' } };

export const ShortcutCombo: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: space[2], fontFamily: 'var(--ledger-font-sans)', color: 'var(--ledger-color-text-secondary)', fontSize: 14 }}>
      <Kbd>⌘</Kbd> <Kbd>K</Kbd> <span style={{ marginLeft: space[3] }}>Open command palette</span>
    </div>
  ),
};

export const Small: Story = { args: { size: 'sm', children: 'Esc' } };

export const AllKeys: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: space[3], flexWrap: 'wrap', alignItems: 'center' }}>
      <Kbd>⌘</Kbd><Kbd>⇧</Kbd><Kbd>⌥</Kbd><Kbd>⌃</Kbd><Kbd>↩</Kbd><Kbd>⌫</Kbd><Kbd>Tab</Kbd><Kbd>Esc</Kbd><Kbd>Space</Kbd>
    </div>
  ),
};
