import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { CollapsiblePanel } from './CollapsiblePanel';
import { space } from '../../tokens/spacing';

const meta: Meta<typeof CollapsiblePanel> = {
  title: 'Components/Surfaces/Collapsible Panel',
  component: CollapsiblePanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'CollapsiblePanel — single collapsible section with animated height transitions.\n\nAccessibility:\n- Toggle button with `aria-expanded` state\n- Content region with `role="region"` and `aria-labelledby` linking to the trigger\n- Chevron icon rotates on expand/collapse\n- Supports controlled and uncontrolled modes',
      },
    },
  },
  argTypes: {
    defaultOpen: { control: 'boolean', description: 'Whether the panel starts open (uncontrolled mode).' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 520 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof CollapsiblePanel>;

export const Default: Story = {
  render: () => (
    <CollapsiblePanel title="Account Details" defaultOpen>
      <p style={{ margin: 0 }}>Business Checking — #4821</p>
      <p style={{ margin: `${space[2]} 0 0` }}>Routing: 021000021 • Account: ****4821</p>
    </CollapsiblePanel>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: space[3] }}>
      <CollapsiblePanel title="Wire Transfer Details" defaultOpen>
        <p style={{ margin: 0 }}>$12,500.00 to Acme Corp LLC — Ref: WT-2024-0892</p>
      </CollapsiblePanel>
      <CollapsiblePanel title="Fee Breakdown">
        <p style={{ margin: 0 }}>Wire fee: $25.00 • FX spread: $0.00 • Total: $25.00</p>
      </CollapsiblePanel>
      <CollapsiblePanel title="Compliance Notes">
        <p style={{ margin: 0 }}>Transaction cleared automated AML screening. No holds applied.</p>
      </CollapsiblePanel>
    </div>
  ),
};
