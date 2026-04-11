import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Toolbar, ToolbarGroup, ToolbarDivider } from './Toolbar';
import { IconButton } from '../IconButton';
import { Button } from '../Button';

const FilterIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>;
const DownloadIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>;
const RefreshIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>;

const meta: Meta<typeof Toolbar> = {
  title: 'Components/Layout/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Toolbar — horizontal action bar with grouped controls and dividers.\n\nAccessibility:\n- Uses `role="toolbar"` on the container\n- `ToolbarGroup` uses `role="group"` for related actions\n- `ToolbarDivider` uses `role="separator"` with `aria-orientation="vertical"`\n- Children should be buttons or controls with accessible labels',
      },
    },
  },
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm', 'md'], description: 'Padding and sizing preset.' },
    variant: { control: { type: 'select' }, options: ['default', 'outlined'], description: 'Visual variant with optional border.' },
  },
};

export default meta;
type Story = StoryObj<typeof Toolbar>;

export const Default: Story = {
  render: () => (
    <Toolbar>
      <ToolbarGroup>
        <IconButton variant="ghost" size="sm" aria-label="Filter"><FilterIcon /></IconButton>
        <IconButton variant="ghost" size="sm" aria-label="Refresh"><RefreshIcon /></IconButton>
      </ToolbarGroup>
      <ToolbarDivider />
      <ToolbarGroup>
        <IconButton variant="ghost" size="sm" aria-label="Export"><DownloadIcon /></IconButton>
      </ToolbarGroup>
      <div style={{ marginLeft: 'auto' }}>
        <Button variant="primary" size="sm">New Transaction</Button>
      </div>
    </Toolbar>
  ),
};

export const Outlined: Story = {
  render: () => (
    <Toolbar variant="outlined">
      <Button variant="ghost" size="sm">All</Button>
      <Button variant="ghost" size="sm">Pending</Button>
      <Button variant="ghost" size="sm">Completed</Button>
      <ToolbarDivider />
      <IconButton variant="ghost" size="sm" aria-label="Export"><DownloadIcon /></IconButton>
    </Toolbar>
  ),
};
