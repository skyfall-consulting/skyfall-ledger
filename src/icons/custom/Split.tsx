/**
 * Skyfall Ledger — Split
 *
 * Single arrow branching into two — the "split this payment" semantic.
 * Lucide's `Split` exists but reads as a road sign; this version is tuned
 * to feel like a money path: a trunk with two equal forks.
 */
import { createLucideIcon } from 'lucide-react';

export const Split = createLucideIcon('LedgerSplit', [
  ['path', { d: 'M12 4v6', key: 'trunk' }],
  ['path', { d: 'M12 10l-6 5v5', key: 'fork-left' }],
  ['path', { d: 'M12 10l6 5v5', key: 'fork-right' }],
  ['circle', { cx: '12', cy: '4', r: '1', fill: 'currentColor', key: 'origin' }],
  ['circle', { cx: '6', cy: '20', r: '1', fill: 'currentColor', key: 'leaf-l' }],
  ['circle', { cx: '18', cy: '20', r: '1', fill: 'currentColor', key: 'leaf-r' }],
]);
