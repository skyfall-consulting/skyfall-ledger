/**
 * Skyfall Ledger — Iban
 *
 * Bank-account-number glyph: a small "IBAN" mark inside a rounded plate.
 * Used by `IBANField`, `BankAccountLinkCard`, and any account-number form
 * input. Lucide has no direct equivalent.
 *
 * Built without text — pure SVG paths — so it scales and themes correctly.
 * Visually it reads as three groups of digits separated by dividers.
 */
import { createLucideIcon } from 'lucide-react';

export const Iban = createLucideIcon('Iban', [
  ['rect', { x: '2', y: '6', width: '20', height: '12', rx: '2', key: 'plate' }],
  // Three "digit groups" — short vertical strokes
  ['path', { d: 'M6 10v4', key: 'g1-a' }],
  ['path', { d: 'M8 10v4', key: 'g1-b' }],
  ['path', { d: 'M11 10v4', key: 'g2-a' }],
  ['path', { d: 'M13 10v4', key: 'g2-b' }],
  ['path', { d: 'M16 10v4', key: 'g3-a' }],
  ['path', { d: 'M18 10v4', key: 'g3-b' }],
  // Group dividers
  ['path', { d: 'M9.5 12h0.5', key: 'div-1' }],
  ['path', { d: 'M14.5 12h0.5', key: 'div-2' }],
]);
