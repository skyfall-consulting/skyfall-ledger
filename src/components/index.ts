/**
 * Skyfall Ledger — Components barrel
 *
 * Organized by the approved 75-core taxonomy categories.
 * Each component's Storybook title reflects its taxonomy placement.
 *
 * Category legend (Storybook sidebar):
 *   Foundations/  — Icons, Tokens, Theme, Typography, CSS Baseline, Transitions
 *   Inputs/       — Button, Checkbox, Radio Group, Switch, Text Field, etc.
 *   Data Display/ — Amount, Badge, Chip, etc.
 *   Surfaces/     — Card, etc.
 *   Layout/       — Form Field, etc.
 *   Utils/        — Label, Helper Text, Error Text (co-located in FormField/)
 *   FinTech/      — StatusPill (domain layer)
 *   Skyfall X/    — Charts (subpath export)
 *   Deprecated/   — SegmentedControl (alias for ToggleButton)
 */

// -- Inputs ------------------------------------------------------------------
export * from './Button';
export * from './IconButton';
export * from './ButtonGroup';
export * from './Checkbox';
export * from './Radio';
export * from './Switch';
export * from './TextField';
export * from './NumberField';
export * from './Input';
export * from './ToggleButton';

// -- Data Display ------------------------------------------------------------
export * from './Amount';
export * from './Badge';
export * from './Chip';

// -- Surfaces ----------------------------------------------------------------
export * from './Card';

// -- Layout ------------------------------------------------------------------
export * from './FormField';

// -- FinTech (domain layer) --------------------------------------------------
export * from './StatusPill';

// -- Deprecated aliases (remove in next major) -------------------------------
export * from './SegmentedControl';
