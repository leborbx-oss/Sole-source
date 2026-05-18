## 2025-05-15 - Accessible Rating and Counter Patterns
**Learning:** For rating components, wrapping decorative icons in `aria-hidden="true"` while providing a single `sr-only` summary prevents "announcement fatigue" for screen reader users. Similarly, dynamic `aria-label` on cart buttons that include item counts provides immediate context without requiring navigation.
**Action:** Always prefer consolidated ARIA labels for grouped visual status indicators (ratings, badges, counters).
