## 2026-05-27 - [Skip to Main Content]
**Learning:** In React Router SPAs, the "Skip to main content" link must be the first child of the `<Router>` to be the first focusable element on every page load. Additionally, the target `<main>` element needs `tabIndex={-1}` to receive programmatic focus correctly.
**Action:** Always place skip links at the root of the routing context and ensure the target has a unique ID and proper focus management.
