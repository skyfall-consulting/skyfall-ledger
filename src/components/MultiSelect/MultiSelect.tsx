/**
 * Skyfall Ledger — <MultiSelect />
 *
 * Multi-value select with removable tag chips and a dropdown checkbox list.
 * Supports keyboard navigation (arrow keys, Enter, Space, Escape, Backspace),
 * click-outside dismiss, and full WAI-ARIA combobox + listbox semantics.
 *
 * Visual styling delegates to `.ledger-multiselect-control` and
 * `.ledger-multiselect-option` in primitives.css for hover/focus transitions.
 * Layout, sizing, and non-interactive colors remain inline.
 */
import * as React from 'react';
import { cn } from '../../utils/cn';
import { fontFamily, fontSize, fontWeight } from '../../tokens/typography';
import { space } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { controlHeight } from '../../tokens/sizing';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A single option in the multi-select dropdown. */
export interface MultiSelectOption {
  /** Unique value used for selection tracking. */
  value: string;
  /** Human-readable label displayed in the control and dropdown. */
  label: string;
}

export interface MultiSelectProps {
  /** Available options to choose from. */
  options: MultiSelectOption[];
  /** Currently selected values (controlled). */
  value?: string[];
  /** Called when the selected values change. */
  onChange?: (value: string[]) => void;
  /** Placeholder text shown when no values are selected. @default 'Select...' */
  placeholder?: string;
  /** Disable the entire control. @default false */
  disabled?: boolean;
  /** Apply error styling (red border). @default false */
  error?: boolean;
  /** Control height preset. @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Maximum number of tag chips to display before showing a "+N more" badge. */
  maxDisplayedTags?: number;
  /** Additional class names on the root wrapper. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Size map
// ---------------------------------------------------------------------------
interface SizeSpec {
  height: string;
  padding: string;
  fontSize: string;
  tagFontSize: string;
  tagPaddingY: string;
  tagPaddingX: string;
}

const SIZE_MAP: Record<NonNullable<MultiSelectProps['size']>, SizeSpec> = {
  sm: {
    height: controlHeight.sm,
    padding: `0 ${space[3]}`,
    fontSize: fontSize['body-sm'],
    tagFontSize: '11px',
    tagPaddingY: '1px',
    tagPaddingX: space[2],
  },
  md: {
    height: controlHeight.md,
    padding: `0 ${space[4]}`,
    fontSize: fontSize['body-md'],
    tagFontSize: fontSize.label,
    tagPaddingY: '2px',
    tagPaddingX: space[3],
  },
  lg: {
    height: controlHeight.lg,
    padding: `0 ${space[4]}`,
    fontSize: fontSize['body-lg'],
    tagFontSize: fontSize['body-sm'],
    tagPaddingY: '3px',
    tagPaddingX: space[3],
  },
};

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

const RemoveIcon: React.FC = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <line x1="3" y1="3" x2="9" y2="9" />
    <line x1="9" y1="3" x2="3" y2="9" />
  </svg>
);

const ChevronIcon: React.FC<{ open: boolean }> = ({ open }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{
      transition: 'transform var(--ledger-duration-short) var(--ledger-easing-settle)',
      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
      flexShrink: 0,
    }}
  >
    <path d="M4 6l4 4 4-4" />
  </svg>
);

const CheckmarkIcon: React.FC = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path
      d="M8 3L4 7.5L2 5.5"
      stroke="#fff"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      options,
      value = [],
      onChange,
      placeholder = 'Select...',
      disabled = false,
      error = false,
      size = 'md',
      maxDisplayedTags,
      className,
    },
    ref,
  ) => {
    const spec = SIZE_MAP[size];
    const [isOpen, setIsOpen] = React.useState(false);
    const [focusedIndex, setFocusedIndex] = React.useState(-1);

    const rootRef = React.useRef<HTMLDivElement>(null);
    const listboxRef = React.useRef<HTMLUListElement>(null);

    // Merge forwarded ref with internal ref
    const mergedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        (rootRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref],
    );

    // Unique IDs
    const idRef = React.useRef(
      `ledger-multiselect-${Math.random().toString(36).slice(2, 9)}`,
    );
    const listboxId = `${idRef.current}-listbox`;
    const optionId = (index: number) => `${idRef.current}-option-${index}`;

    // ---- Selection helpers --------------------------------------------------

    const isSelected = React.useCallback(
      (val: string) => value.includes(val),
      [value],
    );

    const toggleOption = React.useCallback(
      (val: string) => {
        if (disabled) return;
        const next = isSelected(val)
          ? value.filter((v) => v !== val)
          : [...value, val];
        onChange?.(next);
      },
      [disabled, isSelected, value, onChange],
    );

    const removeValue = React.useCallback(
      (val: string) => {
        if (disabled) return;
        onChange?.(value.filter((v) => v !== val));
      },
      [disabled, value, onChange],
    );

    // ---- Open / close -------------------------------------------------------

    const open = React.useCallback(() => {
      if (disabled) return;
      setIsOpen(true);
      setFocusedIndex(0);
    }, [disabled]);

    const close = React.useCallback(() => {
      setIsOpen(false);
      setFocusedIndex(-1);
    }, []);

    const toggle = React.useCallback(() => {
      if (isOpen) close();
      else open();
    }, [isOpen, close, open]);

    // ---- Click outside ------------------------------------------------------

    React.useEffect(() => {
      if (!isOpen) return;
      const handler = (e: MouseEvent) => {
        if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
          close();
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [isOpen, close]);

    // ---- Scroll focused option into view ------------------------------------

    React.useEffect(() => {
      if (!isOpen || focusedIndex < 0) return;
      const el = document.getElementById(optionId(focusedIndex));
      el?.scrollIntoView({ block: 'nearest' });
    }, [focusedIndex, isOpen]);

    // ---- Keyboard -----------------------------------------------------------

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;

        switch (e.key) {
          case 'ArrowDown': {
            e.preventDefault();
            if (!isOpen) {
              open();
            } else {
              setFocusedIndex((prev) =>
                prev < options.length - 1 ? prev + 1 : 0,
              );
            }
            break;
          }
          case 'ArrowUp': {
            e.preventDefault();
            if (!isOpen) {
              open();
            } else {
              setFocusedIndex((prev) =>
                prev > 0 ? prev - 1 : options.length - 1,
              );
            }
            break;
          }
          case 'Enter':
          case ' ': {
            e.preventDefault();
            if (isOpen && focusedIndex >= 0 && focusedIndex < options.length) {
              toggleOption(options[focusedIndex].value);
            } else if (!isOpen) {
              open();
            }
            break;
          }
          case 'Escape': {
            e.preventDefault();
            close();
            break;
          }
          case 'Backspace': {
            if (value.length > 0) {
              removeValue(value[value.length - 1]);
            }
            break;
          }
          case 'Home': {
            if (isOpen) {
              e.preventDefault();
              setFocusedIndex(0);
            }
            break;
          }
          case 'End': {
            if (isOpen) {
              e.preventDefault();
              setFocusedIndex(options.length - 1);
            }
            break;
          }
          default:
            break;
        }
      },
      [disabled, isOpen, focusedIndex, options, open, close, toggleOption, removeValue, value],
    );

    // ---- Resolve display tags -----------------------------------------------

    const selectedOptions = React.useMemo(
      () =>
        value
          .map((v) => options.find((o) => o.value === v))
          .filter((o): o is MultiSelectOption => o !== undefined),
      [value, options],
    );

    const displayedTags =
      maxDisplayedTags !== undefined
        ? selectedOptions.slice(0, maxDisplayedTags)
        : selectedOptions;

    const overflowCount =
      maxDisplayedTags !== undefined
        ? Math.max(0, selectedOptions.length - maxDisplayedTags)
        : 0;

    // ---- Styles -------------------------------------------------------------

    const controlStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: space[2],
      minHeight: spec.height,
      padding: spec.padding,
      borderRadius: radius.sm,
      background: 'var(--ledger-color-surface-default)',
      color: 'var(--ledger-color-text-primary)',
      fontFamily: fontFamily.sans,
      fontSize: spec.fontSize,
      cursor: disabled ? 'not-allowed' : 'pointer',
      position: 'relative',
      flexWrap: 'wrap',
    };

    const dropdownStyle: React.CSSProperties = {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      marginTop: space[1],
      background: 'var(--ledger-color-surface-raised)',
      borderRadius: radius.sm,
      boxShadow: 'var(--ledger-shadow-2)',
      maxHeight: 200,
      overflowY: 'auto',
      zIndex: 50,
      padding: `${space[2]} 0`,
      listStyle: 'none',
      margin: 0,
    };

    const tagStyle = (
      _tagPaddingY: string,
      _tagPaddingX: string,
      _tagFontSize: string,
    ): React.CSSProperties => ({
      display: 'inline-flex',
      alignItems: 'center',
      gap: space[1],
      background: 'var(--ledger-color-surface-sunken)',
      borderRadius: radius.full,
      padding: `${_tagPaddingY} ${_tagPaddingX}`,
      fontSize: _tagFontSize,
      fontWeight: fontWeight.medium,
      color: 'var(--ledger-color-text-primary)',
      maxWidth: 160,
      lineHeight: 1.2,
    });

    const tagRemoveBtnStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      border: 'none',
      background: 'transparent',
      color: 'var(--ledger-color-text-muted)',
      cursor: 'pointer',
      borderRadius: radius.full,
      flexShrink: 0,
    };

    const badgeStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      background: 'var(--ledger-color-surface-sunken)',
      borderRadius: radius.full,
      padding: `${spec.tagPaddingY} ${spec.tagPaddingX}`,
      fontSize: spec.tagFontSize,
      fontWeight: fontWeight.semibold,
      color: 'var(--ledger-color-text-secondary)',
      lineHeight: 1.2,
    };

    const optionStyle = (focused: boolean): React.CSSProperties => ({
      display: 'flex',
      alignItems: 'center',
      gap: space[3],
      padding: `${space[2]} ${space[4]}`,
      cursor: 'pointer',
      fontSize: spec.fontSize,
      fontFamily: fontFamily.sans,
      color: 'var(--ledger-color-text-primary)',
      background: focused ? 'var(--ledger-color-surface-sunken)' : 'transparent',
      outline: 'none',
    });

    const checkboxBoxStyle = (checked: boolean): React.CSSProperties => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 14,
      height: 14,
      borderRadius: radius.xs,
      border: checked ? 'none' : '2px solid var(--ledger-color-border-strong)',
      background: checked ? 'var(--ledger-color-teal-500)' : 'transparent',
      flexShrink: 0,
      transition:
        'background var(--ledger-duration-short) var(--ledger-easing-settle), border-color var(--ledger-duration-short) var(--ledger-easing-settle)',
    });

    const placeholderStyle: React.CSSProperties = {
      color: 'var(--ledger-color-text-muted)',
      flex: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      userSelect: 'none',
    };

    const chevronWrapStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 'auto',
      color: 'var(--ledger-color-text-muted)',
      flexShrink: 0,
      paddingLeft: space[2],
    };

    // ---- Data attributes for CSS --------------------------------------------

    const dataAttrs: Record<string, string> = {};
    if (error) dataAttrs['data-invalid'] = '';
    if (disabled) dataAttrs['data-disabled'] = '';

    return (
      <div
        ref={mergedRef}
        className={cn('ledger-multiselect', className)}
        style={{ position: 'relative', fontFamily: fontFamily.sans }}
      >
        {/* Control */}
        <div
          className="ledger-multiselect-control"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-owns={listboxId}
          aria-activedescendant={
            isOpen && focusedIndex >= 0 ? optionId(focusedIndex) : undefined
          }
          tabIndex={disabled ? -1 : 0}
          onClick={toggle}
          onKeyDown={handleKeyDown}
          style={controlStyle}
          {...dataAttrs}
        >
          {/* Tags */}
          {displayedTags.map((opt) => (
            <span
              key={opt.value}
              style={tagStyle(spec.tagPaddingY, spec.tagPaddingX, spec.tagFontSize)}
            >
              <span
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {opt.label}
              </span>
              {!disabled && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeValue(opt.value);
                  }}
                  aria-label={`Remove ${opt.label}`}
                  tabIndex={-1}
                  style={tagRemoveBtnStyle}
                >
                  <RemoveIcon />
                </button>
              )}
            </span>
          ))}

          {/* Overflow badge */}
          {overflowCount > 0 && (
            <span style={badgeStyle}>+{overflowCount} more</span>
          )}

          {/* Placeholder */}
          {selectedOptions.length === 0 && (
            <span style={placeholderStyle}>{placeholder}</span>
          )}

          {/* Chevron */}
          <span style={chevronWrapStyle}>
            <ChevronIcon open={isOpen} />
          </span>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <ul
            ref={listboxRef}
            id={listboxId}
            role="listbox"
            aria-multiselectable="true"
            style={dropdownStyle}
          >
            {options.map((opt, index) => {
              const checked = isSelected(opt.value);
              const focused = index === focusedIndex;
              return (
                <li
                  key={opt.value}
                  id={optionId(index)}
                  role="option"
                  aria-selected={checked}
                  className="ledger-multiselect-option"
                  style={optionStyle(focused)}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleOption(opt.value);
                  }}
                  onMouseEnter={() => setFocusedIndex(index)}
                >
                  {/* Checkbox visual */}
                  <span style={checkboxBoxStyle(checked)}>
                    {checked && <CheckmarkIcon />}
                  </span>
                  <span
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {opt.label}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  },
);

MultiSelect.displayName = 'MultiSelect';
