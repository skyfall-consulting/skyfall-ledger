import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Pagination } from './Pagination';
import { space } from '../../tokens/spacing';
import { fontFamily, fontSize, fontWeight, tracking } from '../../tokens/typography';
import { radius } from '../../tokens/radius';

/**
 * Navigation / Pagination
 *
 * Compact page navigation for paginated fintech data sets:
 * transaction lists, audit logs, statement history, and invoice tables.
 */
const meta: Meta<typeof Pagination> = {
  title: 'Components/Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Pagination -- compact page navigation for paginated fintech data sets such as transaction lists, audit logs, and statement history.\n\n' +
          'Renders a smart page range with ellipsis collapsing, Previous/Next arrow buttons, and a teal highlight on the active page. ' +
          'The `siblings` prop controls how many page numbers appear on each side of the current page. ' +
          'Returns `null` when `totalPages` is 1 or less.\n\n' +
          'Accessibility:\n' +
          '- Wrapped in `<nav>` with `aria-label="Pagination"` for landmark navigation\n' +
          '- Current page indicated with `aria-current="page"` on the active button\n' +
          '- Previous/Next buttons are disabled at boundaries (first/last page)\n' +
          '- Each page button has `aria-label="Page N"` for screen readers\n' +
          '- Ellipsis elements are `aria-hidden` to avoid confusing screen reader output',
      },
    },
  },
  argTypes: {
    page: {
      control: { type: 'number', min: 1 },
      description: 'Current active page (1-based).',
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: 'Total number of pages.',
    },
    siblings: {
      control: { type: 'number', min: 0, max: 4, step: 1 },
      description: 'Number of sibling pages shown on each side of the current page.',
    },
    onChange: {
      description: 'Callback fired when the user selects a different page.',
    },
  },
  args: {
    page: 1,
    totalPages: 10,
    siblings: 1,
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// ---------- Basic ----------

export const Default: Story = {
  args: {
    page: 1,
    totalPages: 10,
  },
};

export const MiddlePage: Story = {
  name: 'Middle Page Active',
  args: {
    page: 5,
    totalPages: 10,
  },
};

export const LastPage: Story = {
  name: 'Last Page',
  args: {
    page: 10,
    totalPages: 10,
  },
};

// ---------- FinTech Scenarios ----------

export const TransactionList: Story = {
  name: 'Transaction List (20 pages)',
  args: {
    page: 7,
    totalPages: 20,
  },
};

export const AuditLog: Story = {
  name: 'Audit Log (50 pages)',
  args: {
    page: 25,
    totalPages: 50,
  },
};

export const FewPages: Story = {
  name: 'Short List (3 pages)',
  args: {
    page: 2,
    totalPages: 3,
  },
};

export const SinglePage: Story = {
  name: 'Single Page (hidden)',
  args: {
    page: 1,
    totalPages: 1,
  },
};

// ---------- Siblings ----------

export const ZeroSiblings: Story = {
  name: 'Siblings = 0',
  args: {
    page: 10,
    totalPages: 20,
    siblings: 0,
  },
};

export const TwoSiblings: Story = {
  name: 'Siblings = 2',
  args: {
    page: 10,
    totalPages: 20,
    siblings: 2,
  },
};

// ---------- Interactive ----------

const InteractiveTemplate: React.FC = () => {
  const [page, setPage] = React.useState(1);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: space[4] }}>
      <div
        style={{
          fontFamily: fontFamily.sans,
          fontSize: fontSize['body-md'],
          color: 'var(--ledger-color-text-secondary)',
        }}
      >
        Showing transactions {(page - 1) * 25 + 1}&ndash;{Math.min(page * 25, 500)} of 500
      </div>
      <Pagination page={page} totalPages={20} onChange={setPage} />
    </div>
  );
};

export const Interactive: Story = {
  name: 'Interactive (Controlled)',
  render: () => <InteractiveTemplate />,
};

// ---------- Showcase ----------

const ShowcaseCard: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div
    style={{
      padding: space[5],
      borderRadius: radius.md,
      border: '1px solid var(--ledger-color-border-subtle)',
      background: 'var(--ledger-color-surface-raised)',
      display: 'flex',
      flexDirection: 'column',
      gap: space[4],
    }}
  >
    <div
      style={{
        fontFamily: fontFamily.sans,
        fontSize: fontSize.label,
        textTransform: 'uppercase',
        letterSpacing: tracking.label,
        fontWeight: fontWeight.semibold,
        color: 'var(--ledger-color-text-muted)',
      }}
    >
      {label}
    </div>
    {children}
  </div>
);

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Pagination at various states and page counts for fintech data sets.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: space[5] }}>
      <ShowcaseCard label="First Page">
        <Pagination page={1} totalPages={20} onChange={() => {}} />
      </ShowcaseCard>

      <ShowcaseCard label="Middle Page">
        <Pagination page={10} totalPages={20} onChange={() => {}} />
      </ShowcaseCard>

      <ShowcaseCard label="Last Page">
        <Pagination page={20} totalPages={20} onChange={() => {}} />
      </ShowcaseCard>

      <ShowcaseCard label="Few Pages (no ellipsis)">
        <Pagination page={2} totalPages={5} onChange={() => {}} />
      </ShowcaseCard>

      <ShowcaseCard label="Large Dataset (50 pages, 2 siblings)">
        <Pagination page={25} totalPages={50} siblings={2} onChange={() => {}} />
      </ShowcaseCard>
    </div>
  ),
};
