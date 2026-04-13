## 2025-05-14 - [A11y Foundations]
**Learning:** Icon-only buttons (Search, Menu) and status-dependent links (Cart with item count) were missing ARIA labels. The application also lacked a "Skip to main content" link for keyboard users.
**Action:** Always include `aria-label` for icon-only buttons, dynamic labels for elements with counts, and ensure a "Skip to main content" link is the first focusable element in the DOM.
