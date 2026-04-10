import * as React from 'react';

/**
 * Skyfall Ledger — Theme provider
 *
 * Sets `data-ledger-theme="dark|light"` on a wrapper element so the
 * `ledger-tokens.css` CSS-variable scopes resolve correctly. Also exposes
 * the current mode + a setter through React context for components and hooks
 * (notably the chart `useChartTheme` hook) to read.
 *
 * Defaults to `dark` — Obsidian is the hero theme of the Ledger identity.
 */

export type LedgerThemeMode = 'light' | 'dark';

export interface LedgerThemeContextValue {
  mode: LedgerThemeMode;
  setMode: (mode: LedgerThemeMode) => void;
  toggleMode: () => void;
}

const LedgerThemeContext = React.createContext<LedgerThemeContextValue | null>(null);

export interface LedgerThemeProviderProps {
  /** Initial theme mode. Defaults to `dark`. */
  defaultMode?: LedgerThemeMode;
  /** Controlled mode — when provided, the provider does not manage internal state. */
  mode?: LedgerThemeMode;
  /** Called whenever the mode changes (controlled or uncontrolled). */
  onModeChange?: (mode: LedgerThemeMode) => void;
  /** Wrap children in a `<div>` (default) or render inline via Fragment. */
  asChild?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const LedgerThemeProvider: React.FC<LedgerThemeProviderProps> = ({
  defaultMode = 'dark',
  mode: controlledMode,
  onModeChange,
  asChild = false,
  className,
  children,
}) => {
  const [internalMode, setInternalMode] = React.useState<LedgerThemeMode>(defaultMode);
  const isControlled = controlledMode !== undefined;
  // `controlledMode ?? internalMode` narrows cleanly to `LedgerThemeMode`,
  // unlike the ternary form which leaves the union as `LedgerThemeMode | undefined`.
  const mode: LedgerThemeMode = controlledMode ?? internalMode;

  const setMode = React.useCallback(
    (next: LedgerThemeMode) => {
      if (!isControlled) setInternalMode(next);
      onModeChange?.(next);
    },
    [isControlled, onModeChange],
  );

  const toggleMode = React.useCallback(() => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  }, [mode, setMode]);

  const value = React.useMemo<LedgerThemeContextValue>(
    () => ({ mode, setMode, toggleMode }),
    [mode, setMode, toggleMode],
  );

  // When asChild is requested, callers are responsible for placing
  // `data-ledger-theme` on their own wrapper element.
  if (asChild) {
    return <LedgerThemeContext.Provider value={value}>{children}</LedgerThemeContext.Provider>;
  }

  return (
    <LedgerThemeContext.Provider value={value}>
      <div data-ledger-theme={mode} className={className}>
        {children}
      </div>
    </LedgerThemeContext.Provider>
  );
};

/**
 * Read the current Ledger theme. Throws a clear error if used outside the provider
 * so we never silently fall back to defaults that hide a missing wrapper.
 */
export const useLedgerTheme = (): LedgerThemeContextValue => {
  const ctx = React.useContext(LedgerThemeContext);
  if (!ctx) {
    throw new Error(
      '[Skyfall Ledger] useLedgerTheme() must be used inside <LedgerThemeProvider>.',
    );
  }
  return ctx;
};

/**
 * Soft variant — returns null instead of throwing. Used by chart primitives so
 * they can render with sensible defaults even outside a provider (e.g. in raw tests).
 */
export const useLedgerThemeSafe = (): LedgerThemeContextValue | null => {
  return React.useContext(LedgerThemeContext);
};
