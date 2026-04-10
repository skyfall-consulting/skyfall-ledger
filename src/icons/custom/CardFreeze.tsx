/**
 * Skyfall Ledger — CardFreeze
 *
 * Card with a snowflake overlay. Used by `CardFreezeCard` and any surface
 * that toggles a card's frozen/locked state. Lucide does not ship a
 * card-with-freeze concept, so this is one of the small custom set.
 *
 * Authored with `createLucideIcon` so it inherits Lucide's prop API:
 *   <CardFreeze size={24} strokeWidth={1.5} color="var(--ledger-color-text-primary)" />
 */
import { createLucideIcon } from 'lucide-react';

export const CardFreeze = createLucideIcon('CardFreeze', [
  ['rect', { x: '2', y: '5', width: '20', height: '14', rx: '2', key: 'card' }],
  ['path', { d: 'M2 10h20', key: 'magstripe' }],
  ['path', { d: 'M16 14v6', key: 'snow-vert' }],
  ['path', { d: 'M13 16l3 -2l3 2', key: 'snow-up' }],
  ['path', { d: 'M13 18l3 2l3 -2', key: 'snow-down' }],
]);
