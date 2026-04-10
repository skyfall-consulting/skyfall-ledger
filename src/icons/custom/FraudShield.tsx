/**
 * Skyfall Ledger — FraudShield
 *
 * Shield with an inner alert/warning mark. Distinct from Lucide's `ShieldAlert`
 * by carrying a stronger fintech "fraud detection" semantic — used in
 * `FraudAlertBanner`, `SuspiciousActivityCard`, and security checkup surfaces.
 */
import { createLucideIcon } from 'lucide-react';

export const FraudShield = createLucideIcon('FraudShield', [
  [
    'path',
    {
      d: 'M12 22s8 -4 8 -10V5l-8 -3l-8 3v7c0 6 8 10 8 10z',
      key: 'shield',
    },
  ],
  ['path', { d: 'M12 8v4', key: 'mark' }],
  ['circle', { cx: '12', cy: '15', r: '0.6', fill: 'currentColor', key: 'dot' }],
]);
