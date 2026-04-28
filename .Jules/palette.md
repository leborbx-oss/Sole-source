## 2025-05-15 - [Accessible Navigation and Focus Management]
**Learning:** In SPAs, route changes don't automatically reset focus or notify screen readers of the active page. Explicitly using `aria-current="page"` and providing a "Skip to main content" link is critical for keyboard and screen reader accessibility.
**Action:** Always include a skip link and `aria-current` markers in core navigation components.

## 2025-05-15 - [Dynamic ARIA Labels for Interactive Elements]
**Learning:** Icon-only buttons like shopping carts are more useful when their labels provide context (e.g., item count) rather than just a static name. Using `aria-hidden="true"` on the visual badge prevents redundant announcements while the parent label provides the full context.
**Action:** Use dynamic templates for `aria-label` on buttons that represent stateful information.
