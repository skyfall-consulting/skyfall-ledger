import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { TreeView, type TreeNode } from './TreeView';

/**
 * Data Display / Tree View
 *
 * `<TreeView />` renders hierarchical data with expand/collapse controls,
 * keyboard navigation, selection highlighting, and optional guide lines.
 *
 * Designed for fintech use-cases such as chart-of-accounts navigation,
 * organizational hierarchies, and account grouping structures.
 */
const meta: Meta<typeof TreeView> = {
  title: 'Components/Data Display/Tree View',
  component: TreeView,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'TreeView -- hierarchical data display with expand/collapse, selection, and keyboard navigation.\n\n' +
          'Supports controlled and uncontrolled expanded state, two size variants (`sm` and `md`), and optional guide lines between nesting levels.\n\n' +
          'Accessibility:\n' +
          '- `role="tree"` on the root list, `role="treeitem"` on each node, `role="group"` on child lists\n' +
          '- `aria-expanded` on branch nodes reflects open/close state\n' +
          '- `aria-selected` indicates the currently selected node\n' +
          '- `aria-disabled` marks non-interactive nodes\n' +
          '- **ArrowRight** expands a collapsed branch, **ArrowLeft** collapses an expanded branch\n' +
          '- **Enter / Space** selects the focused node\n' +
          '- Focus ring via `:focus-visible` ensures keyboard discoverability',
      },
    },
  },
  decorators: [(Story) => <div style={{ maxWidth: 380 }}><Story /></div>],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Size variant controlling row height and indentation.',
    },
    showLines: {
      control: { type: 'boolean' },
      description: 'Show vertical guide lines at each nesting level.',
    },
    selected: {
      description: 'ID of the currently selected node.',
    },
    defaultExpanded: {
      description: 'IDs of initially expanded nodes (uncontrolled).',
    },
    expanded: {
      description: 'IDs of expanded nodes (controlled).',
    },
    onExpandChange: {
      description: 'Callback fired when the set of expanded nodes changes.',
    },
    onSelect: {
      description: 'Callback fired when a node is selected.',
    },
  },
  args: {
    size: 'md',
    showLines: false,
  },
};

export default meta;
type Story = StoryObj<typeof TreeView>;

// ---------------------------------------------------------------------------
// Data: Chart of Accounts
// ---------------------------------------------------------------------------

const chartOfAccounts: TreeNode[] = [
  {
    id: 'assets',
    label: 'Assets',
    children: [
      {
        id: 'current-assets',
        label: 'Current Assets',
        children: [
          { id: 'cash', label: 'Cash & Cash Equivalents' },
          { id: 'receivables', label: 'Accounts Receivable' },
          { id: 'inventory', label: 'Inventory' },
          { id: 'prepaid', label: 'Prepaid Expenses' },
        ],
      },
      {
        id: 'fixed-assets',
        label: 'Fixed Assets',
        children: [
          { id: 'property', label: 'Property & Equipment' },
          { id: 'depreciation', label: 'Accumulated Depreciation', disabled: true },
        ],
      },
    ],
  },
  {
    id: 'liabilities',
    label: 'Liabilities',
    children: [
      {
        id: 'current-liabilities',
        label: 'Current Liabilities',
        children: [
          { id: 'payables', label: 'Accounts Payable' },
          { id: 'accrued', label: 'Accrued Expenses' },
          { id: 'short-term-debt', label: 'Short-term Debt' },
        ],
      },
      {
        id: 'long-term-liabilities',
        label: 'Long-term Liabilities',
        children: [
          { id: 'bonds', label: 'Bonds Payable' },
          { id: 'mortgage', label: 'Mortgage Payable' },
        ],
      },
    ],
  },
  {
    id: 'equity',
    label: 'Equity',
    children: [
      { id: 'common-stock', label: 'Common Stock' },
      { id: 'retained-earnings', label: 'Retained Earnings' },
      { id: 'treasury', label: 'Treasury Stock' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Data: Account Hierarchy
// ---------------------------------------------------------------------------

const accountHierarchy: TreeNode[] = [
  {
    id: 'corporate',
    label: 'Acme Corp (Parent)',
    children: [
      {
        id: 'north-america',
        label: 'North America Division',
        children: [
          {
            id: 'na-operating',
            label: 'Operating Account -- 4821',
          },
          {
            id: 'na-payroll',
            label: 'Payroll Account -- 4822',
          },
          {
            id: 'na-reserve',
            label: 'Reserve Account -- 4823',
            disabled: true,
          },
        ],
      },
      {
        id: 'emea',
        label: 'EMEA Division',
        children: [
          { id: 'emea-ops', label: 'Operations -- GBP 7701' },
          { id: 'emea-treasury', label: 'Treasury -- EUR 7702' },
        ],
      },
      {
        id: 'apac',
        label: 'APAC Division',
        children: [
          { id: 'apac-ops', label: 'Operations -- SGD 9901' },
          { id: 'apac-fx', label: 'FX Settlements -- JPY 9902' },
        ],
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {
    data: chartOfAccounts,
    defaultExpanded: ['assets'],
  },
};

// ---------------------------------------------------------------------------
// Interactive (with selection callback)
// ---------------------------------------------------------------------------

function InteractiveDemo() {
  const [selected, setSelected] = React.useState<string | null>(null);
  const [lastAction, setLastAction] = React.useState<string>('None');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ledger-space-5)' }}>
      <div
        style={{
          fontFamily: 'var(--ledger-font-mono)',
          fontSize: '12px',
          color: 'var(--ledger-color-text-muted)',
          padding: 'var(--ledger-space-3)',
          background: 'var(--ledger-color-surface-sunken)',
          borderRadius: 'var(--ledger-radius-sm)',
        }}
      >
        Selected: {selected ?? 'none'} | Last action: {lastAction}
      </div>
      <TreeView
        data={chartOfAccounts}
        defaultExpanded={['assets', 'current-assets']}
        selected={selected}
        onSelect={(id, node) => {
          setSelected(id);
          setLastAction(`Selected "${node.label}"`);
        }}
        onExpandChange={(ids) => {
          setLastAction(`Expanded: [${ids.join(', ')}]`);
        }}
      />
    </div>
  );
}

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Click or use keyboard to select nodes. Expand/collapse state changes and selections are logged above the tree.',
      },
    },
  },
  render: () => <InteractiveDemo />,
};

// ---------------------------------------------------------------------------
// WithLines
// ---------------------------------------------------------------------------

export const WithLines: Story = {
  name: 'Guide Lines',
  parameters: {
    docs: {
      description: {
        story:
          'Guide lines provide a subtle visual connector between parent and child nodes, useful for deep hierarchies.',
      },
    },
  },
  args: {
    data: chartOfAccounts,
    defaultExpanded: ['assets', 'current-assets', 'liabilities', 'current-liabilities'],
    showLines: true,
  },
};

// ---------------------------------------------------------------------------
// Small
// ---------------------------------------------------------------------------

export const Small: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Compact `sm` variant with tighter row height and reduced indentation, suitable for dense sidebars.',
      },
    },
  },
  args: {
    data: chartOfAccounts,
    defaultExpanded: ['assets', 'current-assets'],
    size: 'sm',
  },
};

// ---------------------------------------------------------------------------
// Account Hierarchy
// ---------------------------------------------------------------------------

export const AccountHierarchy: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Corporate account hierarchy showing parent company, regional divisions, and individual bank accounts. Demonstrates a typical treasury management tree.',
      },
    },
  },
  args: {
    data: accountHierarchy,
    defaultExpanded: ['corporate', 'north-america'],
    showLines: true,
  },
};
