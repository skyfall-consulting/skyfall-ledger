/**
 * Skyfall Ledger -- <Tabs />
 *
 * Data-driven tabbed interface for switching between content panels.
 * Supports controlled and uncontrolled modes, two visual variants
 * (line / enclosed), two sizes (sm / md), and optional per-tab icons.
 *
 * Active and hover styles delegate to `.ledger-tab` in primitives.css:
 *
 * ```css
 * .ledger-tab { cursor: pointer; user-select: none; transition: color var(--ledger-duration-short) var(--ledger-easing-settle), border-color var(--ledger-duration-short) var(--ledger-easing-settle); }
 * .ledger-tab:hover:not([data-disabled]) { color: var(--ledger-color-text-primary); }
 * .ledger-tab[data-active='true'] { color: var(--ledger-color-text-primary); border-bottom-color: var(--ledger-color-teal-500); }
 * .ledger-tab[data-disabled] { opacity: 0.5; cursor: not-allowed; }
 * ```
 *
 * Accessibility (WAI-ARIA Tabs pattern):
 * - tablist has role="tablist"
 * - each tab button has role="tab", aria-selected, aria-controls
 * - each panel has role="tabpanel", aria-labelledby, tabIndex={0}
 * - Arrow key navigation (Left/Right), Home/End keys
 *
 * Taxonomy: Navigation / Tabs
 */
import * as React from 'react';
import { cn } from '../../utils/cn';
import { fontFamily, fontWeight, fontSize, lineHeight } from '../../tokens/typography';

// ---------------------------------------------------------------------------
// Size specs
// ---------------------------------------------------------------------------
interface TabSizeSpec {
  height: number;
  fontSize: string;
  lineHeight: string;
  padding: string;
  iconGap: number;
  borderWidth: number;
}

const SIZE_MAP: Record<'sm' | 'md', TabSizeSpec> = {
  sm: {
    height: 36,
    fontSize: fontSize.label,
    lineHeight: lineHeight.label,
    padding: '0 12px',
    iconGap: 4,
    borderWidth: 2,
  },
  md: {
    height: 44,
    fontSize: fontSize['body-sm'],
    lineHeight: lineHeight['body-sm'],
    padding: '0 16px',
    iconGap: 6,
    borderWidth: 2,
  },
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface TabItem {
  /** Unique identifier for this tab. */
  id: string;
  /** Display label. */
  label: string;
  /** Panel content rendered when this tab is active. */
  content: React.ReactNode;
  /** Whether the tab is disabled. */
  disabled?: boolean;
  /** Optional icon rendered before the label. */
  icon?: React.ReactNode;
}

export interface TabsProps {
  /** Tab definitions. */
  tabs: TabItem[];
  /** Controlled active tab id. */
  value?: string;
  /** Initial active tab id (uncontrolled). Defaults to the first non-disabled tab. */
  defaultValue?: string;
  /** Called when the active tab changes. */
  onChange?: (tabId: string) => void;
  /** Visual variant. @default 'line' */
  variant?: 'line' | 'enclosed';
  /** Size preset. @default 'md' */
  size?: 'sm' | 'md';
  /** Additional class names for the root wrapper. */
  className?: string;
  /** Additional inline styles for the root wrapper. */
  style?: React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      tabs,
      value: controlledValue,
      defaultValue,
      onChange,
      variant = 'line',
      size = 'md',
      className,
      style,
    },
    ref,
  ) => {
    // ---- Internal state ---------------------------------------------------
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState(
      defaultValue ?? tabs.find((t) => !t.disabled)?.id ?? tabs[0]?.id ?? '',
    );
    const currentValue = isControlled ? controlledValue : internalValue;

    const handleSelect = React.useCallback(
      (tabId: string) => {
        if (!isControlled) {
          setInternalValue(tabId);
        }
        onChange?.(tabId);
      },
      [isControlled, onChange],
    );

    // ---- Keyboard navigation (roving tabindex) ----------------------------
    const tabListRef = React.useRef<HTMLDivElement | null>(null);

    const mergedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        tabListRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref],
    );

    const enabledTabs = tabs.filter((t) => !t.disabled);

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const currentIndex = enabledTabs.findIndex((t) => t.id === currentValue);
        let nextIndex = currentIndex;

        switch (e.key) {
          case 'ArrowRight':
            nextIndex = (currentIndex + 1) % enabledTabs.length;
            break;
          case 'ArrowLeft':
            nextIndex = (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
            break;
          case 'Home':
            nextIndex = 0;
            break;
          case 'End':
            nextIndex = enabledTabs.length - 1;
            break;
          default:
            return;
        }

        e.preventDefault();
        const nextTab = enabledTabs[nextIndex];
        handleSelect(nextTab.id);

        const button = tabListRef.current?.querySelector(
          `[data-tab-id="${nextTab.id}"]`,
        ) as HTMLElement;
        button?.focus();
      },
      [currentValue, enabledTabs, handleSelect],
    );

    // ---- Size spec --------------------------------------------------------
    const spec = SIZE_MAP[size];
    const activePanel = tabs.find((t) => t.id === currentValue);
    const isEnclosed = variant === 'enclosed';

    // ---- Styles -----------------------------------------------------------
    const wrapperStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      ...style,
    };

    const tabListStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'stretch',
      borderBottom: `1px solid var(--ledger-color-border-default)`,
      gap: 0,
      margin: 0,
      padding: 0,
    };

    const tabBaseStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spec.iconGap,
      height: spec.height,
      padding: spec.padding,
      border: 'none',
      borderBottom: `${spec.borderWidth}px solid transparent`,
      marginBottom: -1,
      background: 'transparent',
      color: 'var(--ledger-color-text-secondary)',
      fontFamily: fontFamily.sans,
      fontWeight: fontWeight.medium,
      fontSize: spec.fontSize,
      lineHeight: spec.lineHeight,
      whiteSpace: 'nowrap',
    };

    const enclosedBaseStyle: React.CSSProperties = {
      ...tabBaseStyle,
      borderBottom: 'none',
      border: `1px solid transparent`,
      borderRadius: 'var(--ledger-radius-sm) var(--ledger-radius-sm) 0 0',
      marginBottom: -1,
    };

    const panelStyle: React.CSSProperties = {
      padding: `${size === 'sm' ? 12 : 16}px 0`,
    };

    return (
      <div
        className={cn('ledger-tabs', className)}
        style={wrapperStyle}
      >
        <div
          ref={mergedRef}
          role="tablist"
          className="ledger-tabs__list"
          style={tabListStyle}
          onKeyDown={handleKeyDown}
        >
          {tabs.map((tab) => {
            const isActive = tab.id === currentValue;

            const activeLineStyle: React.CSSProperties = isActive
              ? { borderBottomColor: 'var(--ledger-color-teal-500)' }
              : {};

            const activeEnclosedStyle: React.CSSProperties = isActive
              ? {
                  borderColor: 'var(--ledger-color-border-default)',
                  borderBottomColor: 'var(--ledger-color-surface-base)',
                  background: 'var(--ledger-color-surface-base)',
                }
              : {};

            const itemStyle: React.CSSProperties = isEnclosed
              ? { ...enclosedBaseStyle, ...activeEnclosedStyle }
              : { ...tabBaseStyle, ...activeLineStyle };

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                data-tab-id={tab.id}
                id={`ledger-tab-${tab.id}`}
                className="ledger-tab ledger-focus-ring"
                style={itemStyle}
                aria-selected={isActive}
                aria-controls={`ledger-tabpanel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                disabled={tab.disabled}
                data-active={isActive ? 'true' : 'false'}
                data-disabled={tab.disabled ? '' : undefined}
                onClick={() => {
                  if (!tab.disabled) handleSelect(tab.id);
                }}
              >
                {tab.icon && (
                  <span
                    className="ledger-tab__icon"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      flexShrink: 0,
                      width: size === 'sm' ? 14 : 16,
                      height: size === 'sm' ? 14 : 16,
                    }}
                  >
                    {tab.icon}
                  </span>
                )}
                {tab.label}
              </button>
            );
          })}
        </div>

        {activePanel && (
          <div
            key={activePanel.id}
            role="tabpanel"
            id={`ledger-tabpanel-${activePanel.id}`}
            aria-labelledby={`ledger-tab-${activePanel.id}`}
            className="ledger-tabs__panel"
            style={panelStyle}
            tabIndex={0}
          >
            {activePanel.content}
          </div>
        )}
      </div>
    );
  },
);

Tabs.displayName = 'Tabs';
