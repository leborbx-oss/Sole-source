## 2025-05-15 - [Accessibility Baseline for Global Navigation]

**Learning:** Global navigation components in this SPA lacked standard accessibility markers: missing "Skip to main content" link, icon-only buttons without ARIA labels (Search/Cart), and mobile menus without state indicators (aria-expanded). These omissions create significant barriers for keyboard and screen reader users.

**Action:** Always include a visually-hidden (sr-only) skip link targeting the main content area in the primary Navbar. Ensure all icon-only buttons have descriptive aria-labels (with dynamic pluralization for counters like the Cart) and that interactive states (like mobile menu toggles) are explicitly communicated via ARIA attributes.
