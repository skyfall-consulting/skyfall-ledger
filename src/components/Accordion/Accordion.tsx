/**
 * Skyfall Ledger -- <Accordion />
 *
 * Multi-panel expandable sections with single or multiple open modes,
 * controlled and uncontrolled usage, and smooth CSS grid-based
 * expand/collapse animation.
 *
 * Accessibility:
 * - Button triggers with aria-expanded and aria-controls
 * - Content panels have role="region" and aria-labelledby
 * - Disabled items are marked with data-disabled and aria-disabled
 * - Chevron rotation provides visual open/close affordance
 *
 * ---------------------------------------------------------------------------
 * Companion CSS (add to primitives.css):
 * ---------------------------------------------------------------------------
 * .ledger-accordion__trigger { cursor: pointer; user-select: none; transition: background var(--ledger-duration-short) var(--ledger-easing-settle); }
 * .ledger-accordion__trigger:hover:not([data-disabled]) { background: var(--ledger-color-surface-sunken); }
 * .ledger-accordion__trigger[data-disabled] { opacity: 0.5; cursor: not-allowed; }
 * .ledger-accordion__chevron { transition: transform var(--ledger-duration-short) var(--ledger-easing-settle); }
 * .ledger-accordion__chevron[data-open='true'] { transform: rotate(180deg); }
 * .ledger-accordion__panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--ledger-duration-normal) var(--ledger-easing-settle); }
 * .ledger-accordion__panel[data-open='true'] { grid-template-rows: 1fr; }
 * .ledger-accordion__panel-inner { overflow: hidden; }
 * ---------------------------------------------------------------------------
 */
import * as React from 'react';
import { cn } from '../../utils/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface AccordionItem {
  /** Unique identifier for the panel. */
  id: string;
  /** Header title displayed in the trigger. */
  title: string;
  /** Content rendered inside the expandable panel. */
  content: React.ReactNode;
  /** Whether this item is non-interactive. @default false */
  disabled?: boolean;
  /** Whether this item starts open (uncontrolled). @default false */
  defaultOpen?: boolean;
}

export type AccordionMode = 'single' | 'multiple';

export interface AccordionProps {
  /** Accordion items to render. */
  items: AccordionItem[];
  /** Expansion mode. @default 'single' */
  mode?: AccordionMode;
  /** Controlled open panel IDs. */
  value?: string[];
  /** Default open panel IDs (uncontrolled). */
  defaultValue?: string[];
  /** Callback fired when open panels change. */
  onChange?: (openIds: string[]) => void;
  /** Additional className for the root element. */
  className?: string;
  /** Additional inline styles for the root element. */
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Internal panel sub-component
// ---------------------------------------------------------------------------
interface AccordionPanelProps {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

function AccordionPanel({ item, isOpen, onToggle }: AccordionPanelProps) {
  const triggerId = `ledger-accordion-trigger-${item.id}`;
  const panelId = `ledger-accordion-panel-${item.id}`;
  const disabled = item.disabled ?? false;

  const handleClick = () => {
    if (!disabled) {
      onToggle(item.id);
    }
  };

  return (
    <div
      className="ledger-accordion__item"
      style={{
        borderBottom: '1px solid var(--ledger-color-border-default)',
      }}
    >
      {/* Trigger */}
      <h3 style={{ margin: 0 }}>
        <button
          type="button"
          id={triggerId}
          className="ledger-accordion__trigger"
          aria-expanded={isOpen}
          aria-controls={panelId}
          aria-disabled={disabled || undefined}
          data-disabled={disabled || undefined}
          onClick={handleClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: 'var(--ledger-space-4) var(--ledger-space-5)',
            margin: 0,
            background: 'none',
            border: 'none',
            fontFamily: 'var(--ledger-font-sans)',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--ledger-color-text-primary)',
            textAlign: 'left',
            lineHeight: 1.5,
          }}
        >
          <span>{item.title}</span>
          <svg
            className="ledger-accordion__chevron"
            data-open={isOpen ? 'true' : 'false'}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ flexShrink: 0, marginLeft: 'var(--ledger-space-3)' }}
          >
            <polyline points="6 8 10 12 14 8" />
          </svg>
        </button>
      </h3>

      {/* Panel */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className="ledger-accordion__panel"
        data-open={isOpen ? 'true' : 'false'}
      >
        <div className="ledger-accordion__panel-inner">
          <div
            style={{
              padding: '0 var(--ledger-space-5) var(--ledger-space-5)',
              fontFamily: 'var(--ledger-font-sans)',
              fontSize: '14px',
              lineHeight: 1.6,
              color: 'var(--ledger-color-text-secondary)',
            }}
          >
            {item.content}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helper: compute initial open IDs from items + defaultValue
// ---------------------------------------------------------------------------
function getInitialOpenIds(
  items: AccordionItem[],
  defaultValue?: string[],
): string[] {
  if (defaultValue && defaultValue.length > 0) {
    return defaultValue;
  }
  return items.filter((item) => item.defaultOpen).map((item) => item.id);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      items,
      mode = 'single',
      value,
      defaultValue,
      onChange,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const isControlled = value !== undefined;

    const [internalOpenIds, setInternalOpenIds] = React.useState<string[]>(() =>
      getInitialOpenIds(items, defaultValue),
    );

    const openIds = isControlled ? value : internalOpenIds;

    const handleToggle = React.useCallback(
      (id: string) => {
        const isOpen = openIds.includes(id);
        let next: string[];

        if (isOpen) {
          next = openIds.filter((oid) => oid !== id);
        } else if (mode === 'single') {
          next = [id];
        } else {
          next = [...openIds, id];
        }

        if (!isControlled) {
          setInternalOpenIds(next);
        }
        onChange?.(next);
      },
      [openIds, mode, isControlled, onChange],
    );

    return (
      <div
        ref={ref}
        className={cn('ledger-accordion', className)}
        style={{
          borderTop: '1px solid var(--ledger-color-border-default)',
          ...style,
        }}
        {...rest}
      >
        {items.map((item) => (
          <AccordionPanel
            key={item.id}
            item={item}
            isOpen={openIds.includes(item.id)}
            onToggle={handleToggle}
          />
        ))}
      </div>
    );
  },
);

Accordion.displayName = 'Accordion';
