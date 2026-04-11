/**
 * Skyfall Ledger -- <Popover />
 *
 * A click-triggered positioned overlay panel anchored to a trigger element.
 * Supports controlled and uncontrolled modes with configurable placement
 * and alignment. Uses simple absolute positioning relative to the trigger
 * wrapper with no external positioning library.
 *
 * Accessibility:
 * - Escape key closes the popover
 * - Click outside closes the popover
 * - Focus is moved into the popover on open (first focusable element)
 * - role="dialog" on the content panel
 * - In financial workflows, use for account quick-view panels,
 *   filter options, or contextual detail overlays
 *
 * Primitives.css additions (optional, for animation):
 * ```css
 * .ledger-popover__content {
 *   animation: ledger-popover-in var(--ledger-duration-short) var(--ledger-easing-settle);
 * }
 * @keyframes ledger-popover-in { from { opacity: 0; transform: translateY(4px); } }
 * ```
 */
import * as React from 'react';
import { cn } from '../../utils/cn';
import { zIndex } from '../../tokens/zIndex';
import { radius } from '../../tokens/radius';
import { fontFamily } from '../../tokens/typography';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';
export type PopoverAlignment = 'start' | 'center' | 'end';

export interface PopoverProps {
  /** Trigger element that toggles the popover on click. */
  trigger: React.ReactNode;
  /** Content rendered inside the popover panel. */
  children: React.ReactNode;
  /** Controlled open state. */
  open?: boolean;
  /** Callback when the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Uncontrolled default open state. @default false */
  defaultOpen?: boolean;
  /** Placement relative to the trigger. @default 'bottom' */
  placement?: PopoverPlacement;
  /** Alignment along the placement axis. @default 'start' */
  alignment?: PopoverAlignment;
  /** Additional className applied to the outermost wrapper. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Offset between trigger and popover (px)
// ---------------------------------------------------------------------------
const OFFSET = 8;

// ---------------------------------------------------------------------------
// Position style calculator
// ---------------------------------------------------------------------------
function getPositionStyle(
  placement: PopoverPlacement,
  alignment: PopoverAlignment,
): React.CSSProperties {
  const style: React.CSSProperties = { position: 'absolute' };

  // Placement axis
  switch (placement) {
    case 'bottom':
      style.top = `calc(100% + ${OFFSET}px)`;
      break;
    case 'top':
      style.bottom = `calc(100% + ${OFFSET}px)`;
      break;
    case 'right':
      style.left = `calc(100% + ${OFFSET}px)`;
      break;
    case 'left':
      style.right = `calc(100% + ${OFFSET}px)`;
      break;
  }

  // Alignment axis
  const isVertical = placement === 'top' || placement === 'bottom';
  if (isVertical) {
    switch (alignment) {
      case 'start':
        style.left = 0;
        break;
      case 'center':
        style.left = '50%';
        style.transform = 'translateX(-50%)';
        break;
      case 'end':
        style.right = 0;
        break;
    }
  } else {
    switch (alignment) {
      case 'start':
        style.top = 0;
        break;
      case 'center':
        style.top = '50%';
        style.transform = 'translateY(-50%)';
        break;
      case 'end':
        style.bottom = 0;
        break;
    }
  }

  return style;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      trigger,
      children,
      open: controlledOpen,
      onOpenChange,
      defaultOpen = false,
      placement = 'bottom',
      alignment = 'start',
      className,
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const containerRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);

    // Merge forwarded ref with internal ref
    const mergedRef = (ref as React.RefObject<HTMLDivElement>) ?? containerRef;

    const setOpen = React.useCallback(
      (value: boolean) => {
        if (!isControlled) setInternalOpen(value);
        onOpenChange?.(value);
      },
      [isControlled, onOpenChange],
    );

    const toggle = React.useCallback(() => setOpen(!isOpen), [isOpen, setOpen]);

    // Close on Escape
    React.useEffect(() => {
      if (!isOpen) return;
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setOpen(false);
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, setOpen]);

    // Close on click outside
    React.useEffect(() => {
      if (!isOpen) return;
      const handleClick = (e: MouseEvent) => {
        const container = (ref as React.RefObject<HTMLDivElement>)?.current ?? containerRef.current;
        if (container && !container.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }, [isOpen, setOpen, ref]);

    // Focus management — move focus into popover on open
    React.useEffect(() => {
      if (isOpen && contentRef.current) {
        const firstFocusable = contentRef.current.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (firstFocusable) {
          firstFocusable.focus();
        }
      }
    }, [isOpen]);

    // -- Styles ---------------------------------------------------------------

    const wrapperStyle: React.CSSProperties = {
      position: 'relative',
      display: 'inline-flex',
    };

    const triggerStyle: React.CSSProperties = {
      display: 'inline-flex',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      padding: 0,
      font: 'inherit',
      color: 'inherit',
    };

    const contentStyle: React.CSSProperties = {
      ...getPositionStyle(placement, alignment),
      zIndex: zIndex.popover,
      minWidth: 200,
      background: 'var(--ledger-color-surface-default)',
      border: '1px solid var(--ledger-color-border-default)',
      borderRadius: radius.md,
      boxShadow: 'var(--ledger-shadow-3)',
      color: 'var(--ledger-color-text-primary)',
      fontFamily: fontFamily.sans,
      padding: '12px 16px',
    };

    return (
      <span
        ref={mergedRef}
        className={cn('ledger-popover', className)}
        style={wrapperStyle}
      >
        <span
          className="ledger-popover__trigger"
          role="button"
          tabIndex={0}
          onClick={toggle}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggle();
            }
          }}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          style={triggerStyle}
        >
          {trigger}
        </span>
        {isOpen && (
          <div
            ref={contentRef}
            className="ledger-popover__content"
            role="dialog"
            aria-modal="false"
            style={contentStyle}
          >
            {children}
          </div>
        )}
      </span>
    );
  },
);

Popover.displayName = 'Popover';
