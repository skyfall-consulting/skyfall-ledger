/**
 * Skyfall Ledger — <ToggleButton />
 *
 * A pill-style toggle button group that behaves like a radio group.
 * Supports two sizes (sm, md), full-width layout, and roving tab index
 * with arrow-key navigation.
 *
 * Active and hover styles delegate to `.ledger-seg__item` in primitives.css.
 * Container and sizing are set inline.
 *
 * Taxonomy: Inputs / Toggle Button
 */
import * as React from 'react';
import { fontFamily, fontWeight } from '../../tokens/typography';

// ---------------------------------------------------------------------------
// Size specs
// ---------------------------------------------------------------------------
interface ToggleSizeSpec {
  height: number;
  fontSize: string;
  padding: string;
}

const SIZE_MAP: Record<'sm' | 'md', ToggleSizeSpec> = {
  sm: { height: 28, fontSize: '12px', padding: '0 10px' },
  md: { height: 34, fontSize: '13px', padding: '0 14px' },
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface ToggleButtonItem {
  value: string;
  label: React.ReactNode;
}

export interface ToggleButtonProps {
  /** The segment items to display. */
  items: ToggleButtonItem[];
  /** Controlled selected value. */
  value?: string;
  /** Initial selected value (uncontrolled). Defaults to the first item. */
  defaultValue?: string;
  /** Called when the active segment changes. */
  onChange?: (value: string) => void;
  /** Control height preset. @default 'md' */
  size?: 'sm' | 'md';
  /** Stretch to fill container width; segments flex equally. */
  fullWidth?: boolean;
  /** Disable all segments. */
  disabled?: boolean;
  /** Additional class names. */
  className?: string;
  /** Additional inline styles. */
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const ToggleButton = React.forwardRef<HTMLDivElement, ToggleButtonProps>(
  (
    {
      items,
      value: controlledValue,
      defaultValue,
      onChange,
      size = 'md',
      fullWidth = false,
      disabled = false,
      className,
      style,
    },
    ref,
  ) => {
    // ---- Internal state ---------------------------------------------------
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState(
      defaultValue ?? items[0]?.value ?? '',
    );
    const currentValue = isControlled ? controlledValue : internalValue;

    const handleSelect = React.useCallback(
      (nextValue: string) => {
        if (disabled) return;
        if (!isControlled) {
          setInternalValue(nextValue);
        }
        onChange?.(nextValue);
      },
      [disabled, isControlled, onChange],
    );

    // ---- Keyboard navigation (roving tabindex) ----------------------------
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    const mergedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref],
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled) return;

        const currentIndex = items.findIndex((item) => item.value === currentValue);
        let nextIndex = -1;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          nextIndex = (currentIndex + 1) % items.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          nextIndex = (currentIndex - 1 + items.length) % items.length;
        } else if (e.key === 'Home') {
          e.preventDefault();
          nextIndex = 0;
        } else if (e.key === 'End') {
          e.preventDefault();
          nextIndex = items.length - 1;
        }

        if (nextIndex >= 0) {
          handleSelect(items[nextIndex].value);
          const buttons = containerRef.current?.querySelectorAll<HTMLButtonElement>(
            'button[role="radio"]',
          );
          buttons?.[nextIndex]?.focus();
        }
      },
      [currentValue, disabled, handleSelect, items],
    );

    // ---- Size spec --------------------------------------------------------
    const spec = SIZE_MAP[size];

    // ---- Styles -----------------------------------------------------------
    const containerStyle: React.CSSProperties = {
      display: fullWidth ? 'flex' : 'inline-flex',
      alignItems: 'center',
      padding: 2,
      borderRadius: 'var(--ledger-radius-sm)',
      background: 'var(--ledger-color-surface-sunken)',
      gap: 2,
      ...style,
    };

    const itemBaseStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      background: 'transparent',
      color: 'var(--ledger-color-text-muted)',
      fontFamily: fontFamily.sans,
      fontWeight: fontWeight.medium,
      fontSize: spec.fontSize,
      height: spec.height,
      padding: spec.padding,
      borderRadius: 'calc(var(--ledger-radius-sm) - 2px)',
      whiteSpace: 'nowrap',
      ...(fullWidth && { flex: 1 }),
      ...(disabled && { opacity: 0.5, cursor: 'not-allowed' }),
    };

    return (
      <div
        ref={mergedRef}
        role="radiogroup"
        className={className}
        style={containerStyle}
        onKeyDown={handleKeyDown}
      >
        {items.map((item) => {
          const isActive = item.value === currentValue;
          return (
            <button
              key={item.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              data-active={isActive ? 'true' : 'false'}
              tabIndex={isActive ? 0 : -1}
              disabled={disabled}
              className="ledger-seg__item ledger-focus-ring"
              style={itemBaseStyle}
              onClick={() => handleSelect(item.value)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    );
  },
);

ToggleButton.displayName = 'ToggleButton';
