/**
 * Skyfall Ledger -- <Tooltip />
 *
 * A hover/focus tooltip that renders into a portal. Positions
 * itself relative to the trigger element using getBoundingClientRect
 * with no external positioning library.
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Content to display inside the tooltip. */
  content: React.ReactNode;
  /** Preferred placement relative to the trigger. @default 'top' */
  placement?: TooltipPlacement;
  /** Delay in ms before the tooltip appears. @default 200 */
  delay?: number;
  /** Single child element that acts as the trigger. */
  children: React.ReactElement;
}

// ---------------------------------------------------------------------------
// Tooltip offset (gap between trigger and tooltip)
// ---------------------------------------------------------------------------
const OFFSET = 8;

// ---------------------------------------------------------------------------
// Position calculator
// ---------------------------------------------------------------------------
function getTooltipPosition(
  triggerRect: DOMRect,
  tooltipRect: DOMRect,
  placement: TooltipPlacement,
): React.CSSProperties {
  let top: number;
  let left: number;

  switch (placement) {
    case 'top':
      top = triggerRect.top - tooltipRect.height - OFFSET;
      left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
      break;
    case 'bottom':
      top = triggerRect.bottom + OFFSET;
      left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
      break;
    case 'left':
      top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
      left = triggerRect.left - tooltipRect.width - OFFSET;
      break;
    case 'right':
      top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
      left = triggerRect.right + OFFSET;
      break;
  }

  return { top, left };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  placement = 'top',
  delay = 200,
  children,
}) => {
  const [visible, setVisible] = React.useState(false);
  const [position, setPosition] = React.useState<React.CSSProperties>({});

  const triggerRef = React.useRef<HTMLElement | null>(null);
  const tooltipRef = React.useRef<HTMLDivElement | null>(null);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const tooltipId = React.useId();

  const show = React.useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setVisible(true);
    }, delay);
  }, [delay]);

  const hide = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setVisible(false);
  }, []);

  // Position the tooltip after it becomes visible
  React.useEffect(() => {
    if (!visible || !triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const pos = getTooltipPosition(triggerRect, tooltipRect, placement);
    setPosition(pos);
  }, [visible, placement]);

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Clone the child to attach event handlers and refs
  const child = React.Children.only(children);
  const trigger = React.cloneElement(child, {
    ref: (node: HTMLElement | null) => {
      triggerRef.current = node;
      // Forward the child's ref if it has one
      const { ref } = child as unknown as { ref?: React.Ref<HTMLElement> };
      if (typeof ref === 'function') ref(node);
      else if (ref && typeof ref === 'object') {
        (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    },
    onMouseEnter: (e: React.MouseEvent) => {
      show();
      child.props.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      hide();
      child.props.onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent) => {
      show();
      child.props.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      hide();
      child.props.onBlur?.(e);
    },
    'aria-describedby': visible ? tooltipId : undefined,
  } as Partial<Record<string, unknown>>);

  const tooltipStyle: React.CSSProperties = {
    position: 'fixed',
    top: position.top ?? -9999,
    left: position.left ?? -9999,
    zIndex: 'var(--ledger-z-tooltip)' as unknown as number,
    background: 'var(--ledger-color-surface-raised)',
    color: 'var(--ledger-color-text-primary)',
    border: '1px solid var(--ledger-color-border-subtle)',
    boxShadow: 'var(--ledger-shadow-3)',
    borderRadius: 'var(--ledger-radius-xs)',
    padding: 'var(--ledger-space-2) var(--ledger-space-3)',
    fontFamily: 'var(--ledger-font-sans)',
    fontSize: 'var(--ledger-font-size-body-sm)',
    lineHeight: 1.4,
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    maxWidth: 280,
  };

  const tooltipPortal =
    visible && typeof document !== 'undefined'
      ? ReactDOM.createPortal(
          <div ref={tooltipRef} id={tooltipId} role="tooltip" style={tooltipStyle}>
            {content}
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      {trigger}
      {tooltipPortal}
    </>
  );
};

Tooltip.displayName = 'Tooltip';
