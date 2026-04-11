import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Timeline } from './Timeline';

const meta: Meta<typeof Timeline> = {
  title: 'Components/Data Display/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Timeline — vertical chronological event list for audit trails, transaction history, and activity logs.\n\nAccessibility:\n- Uses semantic `<ol>` for ordered event sequences\n- Each event is an `<li>` for proper list semantics\n- Uses `<time>` element for timestamps\n- Icons and dots are decorative (`aria-hidden`)',
      },
    },
  },
  decorators: [(Story) => <div style={{ maxWidth: 520 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Timeline>;

export const TransactionHistory: Story = {
  args: {
    items: [
      { id: '1', title: 'Payment received', description: '$12,500.00 from Acme Corp via wire transfer', timestamp: 'Today, 2:34 PM', variant: 'success' },
      { id: '2', title: 'Invoice sent', description: 'Invoice #INV-2024-0892 — $12,500.00', timestamp: 'Yesterday, 10:15 AM', variant: 'info' },
      { id: '3', title: 'Payment failed', description: 'ACH debit declined — insufficient funds', timestamp: 'Mar 8, 4:22 PM', variant: 'error' },
      { id: '4', title: 'Account opened', description: 'Business checking account #4821 created', timestamp: 'Mar 1, 9:00 AM', variant: 'default' },
    ],
  },
};

export const AuditTrail: Story = {
  args: {
    items: [
      { id: '1', title: 'KYC verification approved', timestamp: 'Apr 10, 11:30 AM', variant: 'success' },
      { id: '2', title: 'Document uploaded', description: 'passport_scan.pdf (2.4 MB)', timestamp: 'Apr 9, 3:15 PM', variant: 'info' },
      { id: '3', title: 'Identity check initiated', description: 'Automated identity verification started', timestamp: 'Apr 9, 3:10 PM', variant: 'warning' },
      { id: '4', title: 'Application submitted', description: 'Business account application received', timestamp: 'Apr 9, 2:45 PM', variant: 'default' },
    ],
  },
};
