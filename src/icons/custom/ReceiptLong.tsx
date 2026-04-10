/**
 * Skyfall Ledger — ReceiptLong
 *
 * Tall, ledger-style receipt with multiple line items. Lucide ships `Receipt`
 * but it reads as a generic single-receipt; `ReceiptLong` carries the
 * "statement / itemized history" semantic Ledger needs in `ReceiptCard`,
 * `StatementPreviewCard`, and transaction detail drawers.
 */
import { createLucideIcon } from 'lucide-react';

export const ReceiptLong = createLucideIcon('ReceiptLong', [
  [
    'path',
    {
      d: 'M5 3h14v18l-2 -1.5l-2 1.5l-2 -1.5l-2 1.5l-2 -1.5l-2 1.5l-2 -1.5z',
      key: 'body',
    },
  ],
  ['path', { d: 'M8 7h8', key: 'line-1' }],
  ['path', { d: 'M8 11h8', key: 'line-2' }],
  ['path', { d: 'M8 15h5', key: 'line-3' }],
]);
