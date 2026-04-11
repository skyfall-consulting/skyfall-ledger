/**
 * Skyfall Ledger -- <NoSSR />
 *
 * Utility wrapper that defers rendering of its children until the
 * component has mounted on the client. Prevents hydration mismatches
 * caused by browser-only APIs (e.g. `window`, `navigator`,
 * `localStorage`) and lets you show an optional fallback placeholder
 * during server-side rendering.
 */
import * as React from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface NoSSRProps {
  /** Content that should only render on the client. */
  children: React.ReactNode;
  /** Optional placeholder rendered during SSR / before mount. @default null */
  fallback?: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const NoSSR: React.FC<NoSSRProps> = ({ children, fallback = null }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

NoSSR.displayName = 'NoSSR';
