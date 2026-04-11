/**
 * Skyfall Ledger -- <TreeView />
 *
 * Hierarchical tree display with expand/collapse, keyboard navigation,
 * selection highlighting, and optional guide lines between levels.
 *
 * Accessibility:
 * - Uses tree / treeitem / group ARIA roles
 * - aria-expanded on branch nodes, aria-selected on all, aria-disabled when appropriate
 * - ArrowRight expands a collapsed branch, ArrowLeft collapses an expanded branch
 * - Enter / Space selects the focused node
 * - Disabled nodes are non-interactive (tabIndex -1)
 *
 * ---------------------------------------------------------------------------
 * Companion CSS (add to primitives.css):
 * ---------------------------------------------------------------------------
 * .ledger-tree-node { cursor: pointer; user-select: none; transition: background var(--ledger-duration-short) var(--ledger-easing-settle); }
 * .ledger-tree-node:hover:not([data-disabled]) { background: var(--ledger-color-surface-sunken); }
 * .ledger-tree-node:focus-visible { outline: 2px solid var(--ledger-color-teal-500); outline-offset: -2px; }
 * .ledger-tree-node[data-disabled] { opacity: 0.5; cursor: not-allowed; }
 * .ledger-tree-chevron { transition: transform var(--ledger-duration-short) var(--ledger-easing-settle); }
 * .ledger-tree-chevron-open { transform: rotate(90deg); }
 * ---------------------------------------------------------------------------
 */
import * as React from 'react';
import { fontFamily, fontSize, fontWeight } from '../../tokens/typography';
import { space } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { cn } from '../../utils/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A single node in the tree hierarchy. */
export interface TreeNode {
  /** Unique identifier for this node. */
  id: string;
  /** Display label rendered next to the expand toggle. */
  label: string;
  /** Optional leading icon (ReactNode). */
  icon?: React.ReactNode;
  /** Nested child nodes. */
  children?: TreeNode[];
  /** Whether the node is non-interactive. @default false */
  disabled?: boolean;
}

/**
 * Props for `<TreeView />`.
 *
 * Supports controlled and uncontrolled expanded state, selection tracking,
 * two size variants, and optional guide lines.
 */
export interface TreeViewProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Tree data -- array of root-level nodes. */
  data: TreeNode[];
  /** IDs of initially expanded nodes (uncontrolled). */
  defaultExpanded?: string[];
  /** IDs of expanded nodes (controlled). */
  expanded?: string[];
  /** Called when expanded node set changes. */
  onExpandChange?: (expanded: string[]) => void;
  /** Currently selected node ID. */
  selected?: string | null;
  /** Called when a node is selected. */
  onSelect?: (nodeId: string, node: TreeNode) => void;
  /** Size variant. @default 'md' */
  size?: 'sm' | 'md';
  /** Show guide lines between levels. @default false */
  showLines?: boolean;
}

// ---------------------------------------------------------------------------
// Internal: ChevronIcon
// ---------------------------------------------------------------------------

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('ledger-tree-chevron', expanded && 'ledger-tree-chevron-open')}
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <polyline points="6 4 10 8 6 12" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Internal: TreeNodeItem (recursive)
// ---------------------------------------------------------------------------

interface TreeNodeItemProps {
  node: TreeNode;
  level: number;
  expandedIds: string[];
  selectedId: string | null;
  onToggle: (id: string) => void;
  onSelect: (id: string, node: TreeNode) => void;
  size: 'sm' | 'md';
  showLines: boolean;
}

function TreeNodeItem({
  node,
  level,
  expandedIds,
  selectedId,
  onToggle,
  onSelect,
  size,
  showLines,
}: TreeNodeItemProps) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedIds.includes(node.id);
  const isSelected = selectedId === node.id;
  const disabled = node.disabled ?? false;

  const indent = size === 'sm' ? 16 : 20;
  const nodeHeight = size === 'sm' ? space[7] : space[8]; // 24px / 32px
  const labelSize = size === 'sm' ? fontSize['body-sm'] : fontSize['body-md'];

  const handleClick = () => {
    if (disabled) return;
    if (hasChildren) onToggle(node.id);
    onSelect(node.id, node);
  };

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect(node.id, node);
      } else if (e.key === 'ArrowRight' && hasChildren && !isExpanded) {
        e.preventDefault();
        onToggle(node.id);
      } else if (e.key === 'ArrowLeft' && hasChildren && isExpanded) {
        e.preventDefault();
        onToggle(node.id);
      }
    },
    [node, hasChildren, isExpanded, disabled, onToggle, onSelect],
  );

  return (
    <li
      role="treeitem"
      aria-expanded={hasChildren ? isExpanded : undefined}
      aria-selected={isSelected}
      aria-disabled={disabled || undefined}
      style={{ listStyle: 'none' }}
    >
      <div
        className={cn('ledger-tree-node', disabled && 'ledger-tree-node--disabled')}
        data-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: space[2],
          paddingLeft: `${level * indent}px`,
          paddingRight: space[3],
          minHeight: nodeHeight,
          fontFamily: fontFamily.sans,
          fontSize: labelSize,
          fontWeight: fontWeight.regular,
          lineHeight: 1.5,
          color: 'var(--ledger-color-text-primary)',
          borderRadius: radius.xs,
          borderLeft: isSelected
            ? '2px solid var(--ledger-color-teal-500)'
            : showLines && level > 0
              ? '1px solid var(--ledger-color-border-subtle)'
              : '2px solid transparent',
          background: isSelected
            ? 'var(--ledger-color-surface-sunken)'
            : 'transparent',
        }}
      >
        {/* Toggle / Leaf spacer */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '16px',
            height: '16px',
            flexShrink: 0,
          }}
        >
          {hasChildren ? <ChevronIcon expanded={isExpanded} /> : null}
        </span>

        {/* Optional icon */}
        {node.icon && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              flexShrink: 0,
              color: 'var(--ledger-color-text-secondary)',
            }}
          >
            {node.icon}
          </span>
        )}

        {/* Label */}
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {node.label}
        </span>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <ul role="group" style={{ margin: 0, padding: 0 }}>
          {node.children!.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              level={level + 1}
              expandedIds={expandedIds}
              selectedId={selectedId}
              onToggle={onToggle}
              onSelect={onSelect}
              size={size}
              showLines={showLines}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * TreeView -- hierarchical data display with expand/collapse.
 *
 * Renders nested tree data with keyboard navigation, selection,
 * and optional connecting guide lines. Supports both controlled
 * and uncontrolled expanded state.
 */
export const TreeView = React.forwardRef<HTMLDivElement, TreeViewProps>(
  (
    {
      data,
      defaultExpanded = [],
      expanded: controlledExpanded,
      onExpandChange,
      selected = null,
      onSelect,
      size = 'md',
      showLines = false,
      className,
      ...props
    },
    ref,
  ) => {
    const isControlled = controlledExpanded !== undefined;

    const [uncontrolledExpanded, setUncontrolledExpanded] =
      React.useState<string[]>(defaultExpanded);

    const expandedIds = isControlled ? controlledExpanded : uncontrolledExpanded;

    const handleToggle = React.useCallback(
      (id: string) => {
        const next = expandedIds.includes(id)
          ? expandedIds.filter((eid) => eid !== id)
          : [...expandedIds, id];

        if (!isControlled) {
          setUncontrolledExpanded(next);
        }
        onExpandChange?.(next);
      },
      [expandedIds, isControlled, onExpandChange],
    );

    const handleSelect = React.useCallback(
      (id: string, node: TreeNode) => {
        onSelect?.(id, node);
      },
      [onSelect],
    );

    return (
      <div ref={ref} className={cn('ledger-tree', className)} {...props}>
        <ul role="tree" style={{ margin: 0, padding: 0 }}>
          {data.map((node) => (
            <TreeNodeItem
              key={node.id}
              node={node}
              level={0}
              expandedIds={expandedIds}
              selectedId={selected}
              onToggle={handleToggle}
              onSelect={handleSelect}
              size={size}
              showLines={showLines}
            />
          ))}
        </ul>
      </div>
    );
  },
);

TreeView.displayName = 'TreeView';
