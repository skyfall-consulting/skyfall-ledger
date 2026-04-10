/**
 * Skyfall Ledger — Hooks barrel
 *
 * Wave 0 ships the foundational hooks. Component hooks (useDisclosure,
 * useFocusTrap, etc.) will land alongside the components that need them.
 *
 * Theme hooks (`useLedgerTheme`, `useLedgerThemeSafe`) intentionally live
 * under `../theme` and are re-exported from the package root via
 * `src/index.ts` alongside the provider — importing them here would cause
 * a duplicate named export in the root barrel.
 */
export { useMediaQuery } from './useMediaQuery';
