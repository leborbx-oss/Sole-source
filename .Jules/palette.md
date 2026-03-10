## 2025-05-15 - [A11y Navigation Enhancements]
**Learning:** Screen readers and keyboard users require explicit markers (`aria-current`, `aria-expanded`, and "Skip to content" links) to navigate effectively, especially in single-page applications where focus doesn't automatically reset on route changes.
**Action:** Always include a "Skip to main content" link at the top of the application and use `aria-current="page"` on active navigation links.
