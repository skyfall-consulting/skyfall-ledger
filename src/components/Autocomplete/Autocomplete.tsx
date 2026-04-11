/**
 * Skyfall Ledger — <Autocomplete />
 *
 * Combobox input with a filterable dropdown listbox. Supports keyboard
 * navigation, loading states, and WAI-ARIA combobox semantics. Designed for
 * currency pickers, account selectors, and payee search fields in financial
 * interfaces.
 *
 * Pseudo-state classes:
 *  - `.ledger-autocomplete-input`  — hover/focus border transitions (primitives.css)
 *  - `.ledger-autocomplete-option` — option hover highlight (primitives.css)
 */
import * as React from 'react';
import { cn } from '../../utils/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AutocompleteOption {
  /** Unique value submitted or returned via onChange. */
  value: string;
  /** Human-readable display label shown in the dropdown. */
  label: string;
}

export type AutocompleteSize = 'sm' | 'md' | 'lg';

export interface AutocompleteProps {
  /** Array of selectable options displayed in the dropdown. */
  options: AutocompleteOption[];
  /** Currently selected value (controlled). */
  value?: string;
  /** Callback fired when the user selects an option. */
  onChange?: (value: string) => void;
  /** Callback fired when the text input value changes (for external filtering). */
  onInputChange?: (inputValue: string) => void;
  /** Placeholder text displayed when the input is empty. @default 'Search...' */
  placeholder?: string;
  /** Disables the input and prevents interaction. */
  disabled?: boolean;
  /** Renders an error state with `aria-invalid="true"`. */
  error?: boolean;
  /** Control height preset. @default 'md' */
  size?: AutocompleteSize;
  /** Shows a loading message in the dropdown instead of options. */
  loading?: boolean;
  /** Text displayed when no options match the current input. @default 'No results found' */
  noResultsText?: string;
  /** Additional CSS class names applied to the root wrapper. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Size map
// ---------------------------------------------------------------------------
interface SizeSpec {
  height: string;
  padding: string;
  fontSize: string;
}

const SIZE_MAP: Record<AutocompleteSize, SizeSpec> = {
  sm: { height: '32px', padding: '0 8px', fontSize: '13px' },
  md: { height: '40px', padding: '0 12px', fontSize: '14px' },
  lg: { height: '48px', padding: '0 12px', fontSize: '16px' },
};

// ---------------------------------------------------------------------------
// Static styles
// ---------------------------------------------------------------------------
const rootStyle: React.CSSProperties = {
  position: 'relative',
  display: 'inline-block',
};

const dropdownStyle: React.CSSProperties = {
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  marginTop: '4px',
  background: 'var(--ledger-color-surface-raised)',
  border: '1px solid var(--ledger-color-border-default)',
  borderRadius: 'var(--ledger-radius-md)',
  boxShadow: 'var(--ledger-shadow-2)',
  maxHeight: '200px',
  overflowY: 'auto',
  zIndex: 10,
};

const messageStyle: React.CSSProperties = {
  padding: '8px 12px',
  color: 'var(--ledger-color-text-muted)',
  fontFamily: 'var(--ledger-font-sans)',
  fontSize: '14px',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function Autocomplete({
  options,
  value,
  onChange,
  onInputChange,
  placeholder = 'Search...',
  disabled = false,
  error = false,
  size = 'md',
  loading = false,
  noResultsText = 'No results found',
  className,
}: AutocompleteProps) {
  const spec = SIZE_MAP[size];
  const listboxId = React.useId();

  const rootRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const [focusedIndex, setFocusedIndex] = React.useState(-1);

  // -----------------------------------------------------------------------
  // Sync input text when controlled value changes externally
  // -----------------------------------------------------------------------
  React.useEffect(() => {
    if (value !== undefined) {
      const match = options.find((o) => o.value === value);
      setInputValue(match ? match.label : '');
    }
  }, [value, options]);

  // -----------------------------------------------------------------------
  // Filtered options
  // -----------------------------------------------------------------------
  const filtered = React.useMemo(() => {
    const query = inputValue.toLowerCase().trim();
    if (!query) return options;
    return options.filter((o) => o.label.toLowerCase().includes(query));
  }, [inputValue, options]);

  // -----------------------------------------------------------------------
  // Click-outside detection
  // -----------------------------------------------------------------------
  React.useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // -----------------------------------------------------------------------
  // Handlers
  // -----------------------------------------------------------------------
  const selectOption = React.useCallback(
    (option: AutocompleteOption) => {
      setInputValue(option.label);
      onChange?.(option.value);
      setIsOpen(false);
      setFocusedIndex(-1);
      inputRef.current?.focus();
    },
    [onChange],
  );

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setInputValue(v);
      onInputChange?.(v);
      setIsOpen(true);
      setFocusedIndex(-1);
    },
    [onInputChange],
  );

  const handleFocus = React.useCallback(() => {
    if (!disabled) setIsOpen(true);
  }, [disabled]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        setIsOpen(true);
        return;
      }

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          setFocusedIndex((prev) =>
            prev < filtered.length - 1 ? prev + 1 : 0,
          );
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          setFocusedIndex((prev) =>
            prev > 0 ? prev - 1 : filtered.length - 1,
          );
          break;
        }
        case 'Enter': {
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < filtered.length) {
            selectOption(filtered[focusedIndex]);
          }
          break;
        }
        case 'Escape': {
          e.preventDefault();
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
        }
        case 'Tab': {
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
        }
        default:
          break;
      }
    },
    [isOpen, filtered, focusedIndex, selectOption],
  );

  // -----------------------------------------------------------------------
  // Scroll focused option into view
  // -----------------------------------------------------------------------
  React.useEffect(() => {
    if (focusedIndex < 0 || !isOpen) return;
    const optionEl = document.getElementById(
      `${listboxId}-option-${focusedIndex}`,
    );
    optionEl?.scrollIntoView({ block: 'nearest' });
  }, [focusedIndex, isOpen, listboxId]);

  // -----------------------------------------------------------------------
  // Derived state
  // -----------------------------------------------------------------------
  const activeDescendant =
    focusedIndex >= 0 ? `${listboxId}-option-${focusedIndex}` : undefined;

  const showDropdown = isOpen && !disabled;

  // -----------------------------------------------------------------------
  // Input inline styles
  // -----------------------------------------------------------------------
  const inputStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: spec.height,
    padding: spec.padding,
    borderRadius: 'var(--ledger-radius-sm)',
    background: 'var(--ledger-color-surface-default)',
    color: 'var(--ledger-color-text-primary)',
    fontFamily: 'var(--ledger-font-sans)',
    fontSize: spec.fontSize,
    border: '1px solid var(--ledger-color-border-default)',
    outline: 'none',
    cursor: disabled ? 'not-allowed' : 'text',
    opacity: disabled ? 0.5 : 1,
  };

  // -----------------------------------------------------------------------
  // Option inline styles
  // -----------------------------------------------------------------------
  const getOptionStyle = (
    index: number,
    option: AutocompleteOption,
  ): React.CSSProperties => ({
    padding: '8px 12px',
    fontSize: spec.fontSize,
    fontFamily: 'var(--ledger-font-sans)',
    cursor: 'pointer',
    background:
      index === focusedIndex
        ? 'var(--ledger-color-surface-sunken)'
        : 'transparent',
    color:
      value === option.value
        ? 'var(--ledger-color-teal-400)'
        : 'var(--ledger-color-text-primary)',
  });

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------
  return (
    <div ref={rootRef} className={cn(className)} style={rootStyle}>
      <input
        ref={inputRef}
        className="ledger-autocomplete-input"
        style={inputStyle}
        role="combobox"
        aria-expanded={showDropdown}
        aria-controls={listboxId}
        aria-activedescendant={activeDescendant}
        aria-autocomplete="list"
        aria-invalid={error ? true : undefined}
        aria-haspopup="listbox"
        value={inputValue}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
      />

      {showDropdown && (
        <ul id={listboxId} role="listbox" style={dropdownStyle}>
          {loading ? (
            <li style={messageStyle} role="option" aria-selected={false}>
              Loading...
            </li>
          ) : filtered.length === 0 ? (
            <li style={messageStyle} role="option" aria-selected={false}>
              {noResultsText}
            </li>
          ) : (
            filtered.map((option, index) => (
              <li
                key={option.value}
                id={`${listboxId}-option-${index}`}
                role="option"
                className="ledger-autocomplete-option"
                style={getOptionStyle(index, option)}
                aria-selected={value === option.value}
                onMouseDown={(e) => {
                  // Prevent input blur before selection fires
                  e.preventDefault();
                }}
                onClick={() => selectOption(option)}
                onMouseEnter={() => setFocusedIndex(index)}
              >
                {option.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

Autocomplete.displayName = 'Autocomplete';
