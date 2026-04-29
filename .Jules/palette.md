# Palette's Journal - Critical Learnings Only

## 2026-04-29 - Accessible Navbar Patterns
**Learning:** Icon-only navigation elements (search, cart, mobile menu) must have descriptive `aria-label` attributes to be usable by screen reader users. Additionally, dynamic labels for the cart (e.g., "Shopping bag, 2 items") provide essential context that a static label lacks. Visual badges should be `aria-hidden="true"` to prevent redundant data announcements.
**Action:** Always audit navigation components for icon-only interactions and implement descriptive, dynamic ARIA labels.
