## 2026-02-13 - SPA Skip-to-Content Pattern
**Learning:** In a React Router SPA, the "Skip to main content" link must be the first child of the `<Router>` component. This ensures it is the first focusable element on every page load. Additionally, the target `<main>` element needs `tabIndex={-1}` to reliably receive focus across different browsers after the jump.
**Action:** Always place the skip link as the immediate first child of the Router/App wrapper and ensure the target main content has a unique ID and `tabIndex={-1}`.
