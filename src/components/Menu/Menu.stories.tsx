import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Menu, MenuItem, MenuDivider, MenuGroup } from './Menu';

/**
 * Navigation / Menu
 *
 * `<Menu />` is a dropdown action-menu surface composed of
 * `MenuItem`, `MenuDivider`, and `MenuGroup`. Opens on trigger
 * click, closes on item click, Escape, or click outside.
 */
const meta: Meta<typeof Menu> = {
  title: 'Components/Navigation/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A compound dropdown menu for contextual actions. Supports icons, danger items, disabled state, dividers, and grouped sections.',
      },
    },
  },
  argTypes: {
    align: {
      control: { type: 'select' },
      options: ['start', 'end'],
    },
    width: { control: { type: 'number' } },
  },
  args: {
    align: 'start',
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

// ---------------------------------------------------------------------------
// Shared trigger style (simulates a Ledger ghost button)
// ---------------------------------------------------------------------------
const triggerBtnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  height: 36,
  padding: '0 var(--ledger-space-4)',
  background: 'transparent',
  color: 'var(--ledger-color-text-primary)',
  border: '1px solid var(--ledger-color-border-default)',
  borderRadius: 'var(--ledger-radius-sm)',
  fontFamily: 'var(--ledger-font-sans)',
  fontSize: 'var(--ledger-font-size-body-sm)',
  fontWeight: 500,
  cursor: 'pointer',
};

// ---------------------------------------------------------------------------
// Minimal 16x16 inline SVG icons for stories (no Lucide dependency)
// ---------------------------------------------------------------------------
const IconDots = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
    <circle cx={8} cy={3} r={0.75} fill="currentColor" />
    <circle cx={8} cy={8} r={0.75} fill="currentColor" />
    <circle cx={8} cy={13} r={0.75} fill="currentColor" />
  </svg>
);

const IconEye = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M1.5 8s2.5-4.5 6.5-4.5S14.5 8 14.5 8s-2.5 4.5-6.5 4.5S1.5 8 1.5 8z" />
    <circle cx={8} cy={8} r={2} />
  </svg>
);

const IconEdit = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M11.5 2.5l2 2L5 13H3v-2l8.5-8.5z" />
  </svg>
);

const IconDownload = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2v9M4.5 7.5 8 11l3.5-3.5M3 13h10" />
  </svg>
);

const IconTrash = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 4h10M6 4V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1M5 4v8.5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V4" />
  </svg>
);

const IconReceipt = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 1.5h8a1 1 0 0 1 1 1v12l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5V2.5a1 1 0 0 1 1-1z" />
    <path d="M6 5h4M6 8h4" />
  </svg>
);

const IconFlag = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 2v12M3 2h8l-2 3 2 3H3" />
  </svg>
);

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: (args) => (
    <Menu
      {...args}
      trigger={<button type="button" style={triggerBtnStyle}>Actions <IconDots /></button>}
    >
      <MenuItem icon={<IconEye />} onClick={() => console.log('View')}>
        View details
      </MenuItem>
      <MenuItem icon={<IconEdit />} onClick={() => console.log('Edit')}>
        Edit
      </MenuItem>
      <MenuDivider />
      <MenuItem icon={<IconTrash />} danger onClick={() => console.log('Delete')}>
        Delete
      </MenuItem>
    </Menu>
  ),
};

// ---------------------------------------------------------------------------
// AccountActions -- typical account-row context menu
// ---------------------------------------------------------------------------

export const AccountActions: Story = {
  name: 'Account Actions',
  render: () => (
    <Menu
      trigger={<button type="button" style={triggerBtnStyle}>Account <IconDots /></button>}
    >
      <MenuItem icon={<IconEye />} onClick={() => console.log('View account')}>
        View account
      </MenuItem>
      <MenuItem icon={<IconEdit />} onClick={() => console.log('Edit account')}>
        Edit account
      </MenuItem>
      <MenuItem icon={<IconDownload />} onClick={() => console.log('Export CSV')}>
        Export CSV
      </MenuItem>
      <MenuDivider />
      <MenuItem
        icon={<IconTrash />}
        danger
        onClick={() => console.log('Delete account')}
      >
        Delete account
      </MenuItem>
    </Menu>
  ),
};

// ---------------------------------------------------------------------------
// TransactionActions -- transaction-row context menu
// ---------------------------------------------------------------------------

export const TransactionActions: Story = {
  name: 'Transaction Actions',
  render: () => (
    <Menu
      trigger={<button type="button" style={triggerBtnStyle}>Transaction <IconDots /></button>}
    >
      <MenuItem icon={<IconEye />} onClick={() => console.log('View details')}>
        View details
      </MenuItem>
      <MenuItem icon={<IconReceipt />} onClick={() => console.log('Download receipt')}>
        Download receipt
      </MenuItem>
      <MenuDivider />
      <MenuItem icon={<IconFlag />} onClick={() => console.log('Report issue')}>
        Report issue
      </MenuItem>
    </Menu>
  ),
};

// ---------------------------------------------------------------------------
// WithGroups -- grouped items
// ---------------------------------------------------------------------------

export const WithGroups: Story = {
  name: 'Grouped Items',
  render: () => (
    <Menu
      trigger={<button type="button" style={triggerBtnStyle}>Settings <IconDots /></button>}
      width={220}
    >
      <MenuGroup label="Account">
        <MenuItem onClick={() => console.log('Profile')}>Profile</MenuItem>
        <MenuItem onClick={() => console.log('Security')}>Security</MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup label="Billing">
        <MenuItem onClick={() => console.log('Plan')}>Current plan</MenuItem>
        <MenuItem onClick={() => console.log('Invoices')}>Invoices</MenuItem>
      </MenuGroup>
    </Menu>
  ),
};

// ---------------------------------------------------------------------------
// WithDisabled -- some items disabled
// ---------------------------------------------------------------------------

export const WithDisabledItems: Story = {
  name: 'Disabled Items',
  render: () => (
    <Menu
      trigger={<button type="button" style={triggerBtnStyle}>Manage <IconDots /></button>}
    >
      <MenuItem icon={<IconEye />} onClick={() => console.log('View')}>
        View
      </MenuItem>
      <MenuItem icon={<IconEdit />} disabled>
        Edit (locked)
      </MenuItem>
      <MenuItem icon={<IconDownload />} disabled>
        Export (unavailable)
      </MenuItem>
      <MenuDivider />
      <MenuItem icon={<IconTrash />} danger onClick={() => console.log('Delete')}>
        Delete
      </MenuItem>
    </Menu>
  ),
};

// ---------------------------------------------------------------------------
// AlignEnd -- dropdown aligned to end
// ---------------------------------------------------------------------------

export const AlignEnd: Story = {
  name: 'Align End',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end', width: 400 }}>
      <Menu
        align="end"
        trigger={<button type="button" style={triggerBtnStyle}>More <IconDots /></button>}
      >
        <MenuItem onClick={() => console.log('Option A')}>Option A</MenuItem>
        <MenuItem onClick={() => console.log('Option B')}>Option B</MenuItem>
        <MenuItem onClick={() => console.log('Option C')}>Option C</MenuItem>
      </Menu>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// WithTrailing -- items with trailing shortcut hints
// ---------------------------------------------------------------------------

export const WithTrailingHints: Story = {
  name: 'Trailing Hints',
  render: () => (
    <Menu
      trigger={<button type="button" style={triggerBtnStyle}>File <IconDots /></button>}
      width={240}
    >
      <MenuItem
        icon={<IconEye />}
        trailing="Ctrl+O"
        onClick={() => console.log('Open')}
      >
        Open
      </MenuItem>
      <MenuItem
        icon={<IconDownload />}
        trailing="Ctrl+S"
        onClick={() => console.log('Save')}
      >
        Save
      </MenuItem>
      <MenuItem
        icon={<IconDownload />}
        trailing="Ctrl+Shift+S"
        onClick={() => console.log('Export')}
      >
        Export
      </MenuItem>
      <MenuDivider />
      <MenuItem
        icon={<IconTrash />}
        danger
        onClick={() => console.log('Delete')}
      >
        Delete
      </MenuItem>
    </Menu>
  ),
};
