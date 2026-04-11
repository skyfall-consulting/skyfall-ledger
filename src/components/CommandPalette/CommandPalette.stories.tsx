import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { CommandPalette, type CommandItem } from './CommandPalette';
import { Button } from '../Button';
import { space } from '../../tokens/spacing';

/**
 * Navigation / Command Palette
 *
 * A keyboard-driven Cmd+K search dialog for quickly navigating financial
 * workflows: initiate transfers, view account balances, export statements,
 * and more. Supports grouped results, keyboard navigation, shortcut hints,
 * and mouse interaction.
 *
 * Accessibility:
 * - combobox + listbox ARIA pattern for screen readers
 * - Arrow keys cycle through items, Enter selects, Escape closes
 * - `aria-activedescendant` tracks the highlighted item
 * - Backdrop click dismisses the palette
 * - Disabled items are announced but skipped by keyboard navigation
 */
const meta: Meta<typeof CommandPalette> = {
  title: 'Components/Navigation/Command Palette',
  component: CommandPalette,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'CommandPalette -- a keyboard-driven Cmd+K search dialog for rapidly navigating commands, ' +
          'accounts, transfers, and other fintech actions.\n\n' +
          'Renders a modal overlay with a search input, filterable + grouped command list, full keyboard ' +
          'navigation (ArrowDown/Up, Enter, Escape), mouse interaction, and shortcut hint badges.\n\n' +
          'Accessibility:\n' +
          '- Uses combobox + listbox ARIA pattern\n' +
          '- `aria-activedescendant` tracks the highlighted item\n' +
          '- Disabled items are announced via `aria-disabled` but skipped during keyboard navigation\n' +
          '- Focus is directed to the input when the palette opens\n' +
          '- Backdrop click and Escape key both dismiss the palette',
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the palette is visible.',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the search input.',
    },
    emptyMessage: {
      control: 'text',
      description: 'Message shown when no results match the current query.',
    },
  },
  args: {
    open: false,
    placeholder: 'Search commands\u2026',
    emptyMessage: 'No results found.',
  },
};

export default meta;
type Story = StoryObj<typeof CommandPalette>;

// ---------------------------------------------------------------------------
// Inline icons
// ---------------------------------------------------------------------------

const ArrowUpRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const WalletIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="6" width="20" height="14" rx="2" />
    <path d="M2 10h20" />
    <path d="M16 14h2" />
  </svg>
);

const FileTextIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const UserPlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" />
    <line x1="23" y1="11" x2="17" y2="11" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const BarChartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);

// ---------------------------------------------------------------------------
// Sample commands
// ---------------------------------------------------------------------------

const financeCommands: CommandItem[] = [
  {
    id: 'new-transfer',
    label: 'New Transfer',
    description: 'Initiate a wire, ACH, or internal transfer',
    icon: <ArrowUpRightIcon />,
    group: 'Transfers',
    shortcut: '\u2318T',
    keywords: ['send', 'wire', 'ach', 'payment'],
  },
  {
    id: 'schedule-payment',
    label: 'Schedule Payment',
    description: 'Set up a future-dated or recurring payment',
    icon: <CalendarIcon />,
    group: 'Transfers',
    shortcut: '\u2318\u21E7P',
    keywords: ['recurring', 'future', 'autopay'],
  },
  {
    id: 'add-payee',
    label: 'Add Payee',
    description: 'Register a new beneficiary or vendor',
    icon: <UserPlusIcon />,
    group: 'Transfers',
    keywords: ['beneficiary', 'vendor', 'recipient'],
  },
  {
    id: 'view-balances',
    label: 'View Balances',
    description: 'See real-time balances across all accounts',
    icon: <WalletIcon />,
    group: 'Accounts',
    shortcut: '\u2318B',
    keywords: ['balance', 'overview', 'dashboard'],
  },
  {
    id: 'account-details',
    label: 'Account Details',
    description: 'View account number, routing, and settings',
    icon: <WalletIcon />,
    group: 'Accounts',
    keywords: ['routing', 'settings', 'info'],
  },
  {
    id: 'transaction-history',
    label: 'Transaction History',
    description: 'Search and filter past transactions',
    icon: <WalletIcon />,
    group: 'Accounts',
    shortcut: '\u2318H',
    keywords: ['history', 'search', 'filter', 'ledger'],
  },
  {
    id: 'export-statement',
    label: 'Export Statement',
    description: 'Download PDF or CSV statement for any period',
    icon: <FileTextIcon />,
    group: 'Reports',
    shortcut: '\u2318E',
    keywords: ['pdf', 'csv', 'download', 'report'],
  },
  {
    id: 'cash-flow-report',
    label: 'Cash Flow Report',
    description: 'View inflows and outflows over time',
    icon: <BarChartIcon />,
    group: 'Reports',
    keywords: ['cashflow', 'inflow', 'outflow', 'analytics'],
  },
  {
    id: 'tax-documents',
    label: 'Tax Documents',
    description: 'Access 1099s, W-9s, and year-end summaries',
    icon: <FileTextIcon />,
    group: 'Reports',
    keywords: ['1099', 'w9', 'tax', 'year-end'],
    disabled: true,
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Wrapper that adds an "Open" trigger button and manages open state. */
const PaletteDemo: React.FC<{
  items?: CommandItem[];
  placeholder?: string;
  emptyMessage?: string;
  triggerLabel?: string;
}> = ({
  items = financeCommands,
  placeholder,
  emptyMessage,
  triggerLabel = 'Open Command Palette',
}) => {
  const [open, setOpen] = React.useState(false);

  // Listen for Cmd+K / Ctrl+K
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: space[4] }}>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        {triggerLabel}
      </Button>
      <span
        style={{
          fontSize: '12px',
          color: 'var(--ledger-color-text-muted)',
        }}
      >
        or press {'\u2318'}K
      </span>
      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        items={items}
        onSelect={(item) => {
          // eslint-disable-next-line no-console
          console.log('Selected:', item.label);
        }}
        placeholder={placeholder}
        emptyMessage={emptyMessage}
      />
    </div>
  );
};

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Default command palette with grouped FinTech commands. Click the button or press Cmd+K to open. ' +
          'Use arrow keys to navigate, Enter to select, Escape to close.',
      },
    },
  },
  render: () => <PaletteDemo />,
};

export const WithCustomPlaceholder: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Command palette with a custom placeholder and empty message. Demonstrates ' +
          'how to tailor the search experience for a specific context.',
      },
    },
  },
  render: () => (
    <PaletteDemo
      placeholder="Search transfers, accounts, reports\u2026"
      emptyMessage="No matching commands. Try a different search."
      triggerLabel="Open (Custom Placeholder)"
    />
  ),
};
