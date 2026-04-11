/**
 * Skyfall Ledger -- <CommandPalette />
 *
 * A keyboard-driven Cmd+K search dialog for rapidly navigating commands,
 * accounts, transfers, and other actions. Renders a modal overlay with a
 * search input, filterable + grouped command list, keyboard navigation,
 * and shortcut hints.
 *
 * Accessibility:
 * - Uses combobox + listbox ARIA pattern
 * - Arrow keys navigate items, Enter selects, Escape closes
 * - Focus is directed to the input on open
 * - aria-activedescendant tracks the currently highlighted item
 * - Backdrop click dismisses the palette
 * - Disabled items are skipped during keyboard navigation
 * - In financial workflows, use clear action labels (e.g. "New Transfer")
 *   and group related commands so users can act with confidence
 */
import * as React from 'react';
import { fontFamily, fontSize, fontWeight } from '../../tokens/typography';
import { space } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { cn } from '../../utils/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A single actionable command entry in the palette. */
export interface CommandItem {
  /** Unique identifier for this command. */
  id: string;
  /** Display label shown in the results list. */
  label: string;
  /** Optional description shown below the label. */
  description?: string;
  /** Leading icon rendered before the label. */
  icon?: React.ReactNode;
  /** Group/category name used to visually section results. */
  group?: string;
  /** Keyboard shortcut hint displayed on the trailing edge. */
  shortcut?: string;
  /** Whether the item is non-interactive. */
  disabled?: boolean;
  /** Additional search keywords beyond label and description. */
  keywords?: string[];
}

/** Props for the CommandPalette component. */
export interface CommandPaletteProps {
  /** Whether the palette is visible. */
  open: boolean;
  /** Called when the palette should close (Escape, backdrop click, or selection). */
  onClose: () => void;
  /** Available commands to search and select from. */
  items: CommandItem[];
  /** Called when a command is selected via Enter or click. */
  onSelect: (item: CommandItem) => void;
  /** Placeholder text for the search input. @default "Search commands\u2026" */
  placeholder?: string;
  /** Message shown when no results match the query. @default "No results found." */
  emptyMessage?: string;
  /** Additional className applied to the overlay element. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Inline search icon (18x18). */
const SearchIcon: React.FC = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

/** Filter items by query against label, description, and keywords. */
function filterItems(items: CommandItem[], query: string): CommandItem[] {
  if (!query) return items;
  const lower = query.toLowerCase();
  return items.filter((item) => {
    if (item.label.toLowerCase().includes(lower)) return true;
    if (item.description?.toLowerCase().includes(lower)) return true;
    if (item.keywords?.some((k) => k.toLowerCase().includes(lower))) return true;
    return false;
  });
}

/** Group items into a Map keyed by the `group` field. */
function groupItems(items: CommandItem[]): Map<string, CommandItem[]> {
  const groups = new Map<string, CommandItem[]>();
  for (const item of items) {
    const key = item.group ?? '';
    const list = groups.get(key) ?? [];
    list.push(item);
    groups.set(key, list);
  }
  return groups;
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'var(--ledger-color-surface-overlay)',
  zIndex: 50,
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  paddingTop: '15vh',
};

const paletteStyle: React.CSSProperties = {
  maxWidth: 560,
  width: '100%',
  background: 'var(--ledger-color-surface-raised)',
  border: '1px solid var(--ledger-color-border-default)',
  borderRadius: radius.lg,
  boxShadow: 'var(--ledger-shadow-3)',
  overflow: 'hidden',
  fontFamily: fontFamily.sans,
  color: 'var(--ledger-color-text-primary)',
};

const inputWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: space[3],
  padding: space[4],
  borderBottom: '1px solid var(--ledger-color-border-subtle)',
  color: 'var(--ledger-color-text-muted)',
};

const inputStyle: React.CSSProperties = {
  flex: 1,
  border: 'none',
  outline: 'none',
  background: 'transparent',
  fontFamily: fontFamily.sans,
  fontSize: fontSize['body-lg'],
  fontWeight: fontWeight.regular,
  color: 'var(--ledger-color-text-primary)',
  caretColor: 'var(--ledger-color-brand-primary)',
};

const listStyle: React.CSSProperties = {
  maxHeight: 320,
  overflowY: 'auto',
  padding: `${space[2]} 0`,
};

const emptyStyle: React.CSSProperties = {
  padding: `${space[8]} ${space[5]}`,
  textAlign: 'center',
  fontSize: fontSize['body-md'],
  color: 'var(--ledger-color-text-muted)',
};

const groupLabelStyle: React.CSSProperties = {
  textTransform: 'uppercase' as const,
  fontSize: fontSize.label,
  fontWeight: fontWeight.semibold,
  letterSpacing: '0.04em',
  color: 'var(--ledger-color-text-muted)',
  padding: `${space[3]} ${space[4]} ${space[2]}`,
};

const itemStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: space[3],
  padding: `${space[3]} ${space[4]}`,
  cursor: 'pointer',
  borderRadius: 0,
  transition: 'background 100ms ease',
};

const itemActiveStyle: React.CSSProperties = {
  background: 'var(--ledger-color-surface-sunken)',
};

const itemDisabledStyle: React.CSSProperties = {
  opacity: 0.5,
  cursor: 'default',
};

const itemIconStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: 20,
  height: 20,
  color: 'var(--ledger-color-text-muted)',
};

const itemContentStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minWidth: 0,
};

const itemLabelStyle: React.CSSProperties = {
  fontSize: fontSize['body-md'],
  fontWeight: fontWeight.medium,
  color: 'var(--ledger-color-text-primary)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const itemDescriptionStyle: React.CSSProperties = {
  fontSize: fontSize['body-sm'],
  color: 'var(--ledger-color-text-muted)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const shortcutStyle: React.CSSProperties = {
  flexShrink: 0,
  background: 'var(--ledger-color-surface-sunken)',
  borderRadius: radius.sm,
  fontSize: '11px',
  fontFamily: fontFamily.sans,
  fontWeight: fontWeight.medium,
  color: 'var(--ledger-color-text-muted)',
  padding: '2px 6px',
  lineHeight: '16px',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * CommandPalette -- keyboard-driven command search dialog (Cmd+K pattern).
 *
 * Renders a modal search overlay with filterable, grouped command list,
 * full keyboard navigation, and shortcut hints.
 */
export const CommandPalette = React.forwardRef<HTMLDivElement, CommandPaletteProps>(
  (
    {
      open,
      onClose,
      items,
      onSelect,
      placeholder = 'Search commands\u2026',
      emptyMessage = 'No results found.',
      className,
    },
    ref,
  ) => {
    const [query, setQuery] = React.useState('');
    const [activeIndex, setActiveIndex] = React.useState(0);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const listRef = React.useRef<HTMLDivElement>(null);

    const filtered = filterItems(items, query);
    const grouped = groupItems(filtered);
    const flatFiltered = filtered.filter((i) => !i.disabled);

    // Reset state when opening
    React.useEffect(() => {
      if (open) {
        setQuery('');
        setActiveIndex(0);
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    }, [open]);

    // Scroll active item into view
    React.useEffect(() => {
      if (!open || flatFiltered.length === 0) return;
      const activeId = flatFiltered[activeIndex]?.id;
      if (!activeId) return;
      const el = listRef.current?.querySelector(`[data-item-id="${activeId}"]`);
      el?.scrollIntoView({ block: 'nearest' });
    }, [activeIndex, open, flatFiltered]);

    // Reset active index when query changes
    React.useEffect(() => {
      setActiveIndex(0);
    }, [query]);

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
          return;
        }

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveIndex((i) => (i + 1) % Math.max(flatFiltered.length, 1));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveIndex((i) =>
            (i - 1 + flatFiltered.length) % Math.max(flatFiltered.length, 1),
          );
        } else if (e.key === 'Enter') {
          e.preventDefault();
          const item = flatFiltered[activeIndex];
          if (item) {
            onSelect(item);
            onClose();
          }
        }
      },
      [flatFiltered, activeIndex, onSelect, onClose],
    );

    const handleBackdropClick = React.useCallback(
      (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
      },
      [onClose],
    );

    if (!open) return null;

    const activeId = flatFiltered[activeIndex]?.id;

    return (
      <div
        ref={ref}
        className={cn('ledger-cmd-palette', className)}
        style={overlayStyle}
        onClick={handleBackdropClick}
        role="presentation"
      >
        <div
          style={paletteStyle}
          role="dialog"
          aria-label="Command palette"
          onKeyDown={handleKeyDown}
        >
          {/* Search input */}
          <div style={inputWrapperStyle}>
            <SearchIcon />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              role="combobox"
              aria-expanded={true}
              aria-controls="ledger-cmd-list"
              aria-activedescendant={activeId ? `ledger-cmd-${activeId}` : undefined}
              autoComplete="off"
              spellCheck={false}
              style={inputStyle}
            />
          </div>

          {/* Results list */}
          <div
            ref={listRef}
            id="ledger-cmd-list"
            role="listbox"
            style={listStyle}
          >
            {filtered.length === 0 ? (
              <div style={emptyStyle}>{emptyMessage}</div>
            ) : (
              Array.from(grouped.entries()).map(([group, groupedItems]) => (
                <div key={group} role="group" aria-label={group || undefined}>
                  {group && <div style={groupLabelStyle}>{group}</div>}
                  {groupedItems.map((item) => {
                    const isActive = item.id === activeId;
                    return (
                      <div
                        key={item.id}
                        id={`ledger-cmd-${item.id}`}
                        data-item-id={item.id}
                        className="ledger-cmd-item"
                        role="option"
                        aria-selected={isActive}
                        aria-disabled={item.disabled || undefined}
                        style={{
                          ...itemStyle,
                          ...(isActive ? itemActiveStyle : {}),
                          ...(item.disabled ? itemDisabledStyle : {}),
                        }}
                        onClick={() => {
                          if (item.disabled) return;
                          onSelect(item);
                          onClose();
                        }}
                        onMouseEnter={() => {
                          if (!item.disabled) {
                            const idx = flatFiltered.findIndex((f) => f.id === item.id);
                            if (idx >= 0) setActiveIndex(idx);
                          }
                        }}
                      >
                        {item.icon && <span style={itemIconStyle}>{item.icon}</span>}
                        <div style={itemContentStyle}>
                          <span style={itemLabelStyle}>{item.label}</span>
                          {item.description && (
                            <span style={itemDescriptionStyle}>{item.description}</span>
                          )}
                        </div>
                        {item.shortcut && <kbd style={shortcutStyle}>{item.shortcut}</kbd>}
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  },
);

CommandPalette.displayName = 'CommandPalette';
