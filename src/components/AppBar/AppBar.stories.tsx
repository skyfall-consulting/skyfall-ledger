import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { AppBar } from './AppBar';
import { Button } from '../Button';
import { IconButton } from '../IconButton';

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

const meta: Meta<typeof AppBar> = {
  title: 'Components/Surfaces/App Bar',
  component: AppBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'AppBar — horizontal top navigation bar for application headers.\n\nAccessibility:\n- Renders a `<header>` element for landmark semantics\n- Navigation children wrapped in `<nav>` with `aria-label="Main navigation"`\n- Children should be links or buttons with accessible labels',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AppBar>;

export const Default: Story = {
  render: () => (
    <AppBar
      logo={<span style={{ color: 'var(--ledger-color-teal-500)' }}>Ledger</span>}
      actions={
        <>
          <IconButton variant="ghost" aria-label="Notifications"><BellIcon /></IconButton>
          <Button variant="ghost" size="sm">Sign Out</Button>
        </>
      }
    >
      <Button variant="ghost" size="sm">Dashboard</Button>
      <Button variant="ghost" size="sm">Accounts</Button>
      <Button variant="ghost" size="sm">Transactions</Button>
      <Button variant="ghost" size="sm">Reports</Button>
    </AppBar>
  ),
};
