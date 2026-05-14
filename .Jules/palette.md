## 2025-05-15 - Accessible Navigation & Iconography

**Learning:** In React SPAs, interactive icons (search, cart, social) and complex navigation structures are often inaccessible to screen reader and keyboard users. Providing explicit `aria-label` attributes for icon-only buttons and a "Skip to main content" link targeting a `tabIndex={-1}` main element are critical for a baseline accessible experience.

**Action:** Audit every layout for icon-only interactives and ensure a skip-link is the first focusable element in the DOM for keyboard-heavy interfaces.
