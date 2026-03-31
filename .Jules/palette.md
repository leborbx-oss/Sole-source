## 2025-05-15 - [Accessible Navigation: Skip Link & ARIA Labels]
**Learning:** In Single Page Applications (SPAs), route changes do not automatically reset focus. Implementing a "Skip to main content" link is critical for keyboard users. To work correctly, the target element (usually `<main>`) must have a unique `id` and `tabIndex={-1}` to allow programmatic focus while remaining non-focusable by default.
**Action:** Always include a skip link and ensure the target element is properly identified with `id` and `tabIndex={-1}` in React/Vite SPAs.
