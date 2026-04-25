## 2025-05-15 - Accessible Navigation Patterns
**Learning:** In Single Page Applications (SPAs), skip-to-content links and dynamic ARIA labels for state changes (like cart counts or menu toggles) are essential as route changes don't automatically reset focus or context for screen reader users.
**Action:** Always implement a "Skip to main content" link as the first focusable element in the App layout, and pair icon-only state changes (e.g., cart increments) with descriptive ARIA updates.
