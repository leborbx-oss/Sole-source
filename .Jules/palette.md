## 2026-05-25 - Skip to main content accessibility
**Learning:** In a React Router SPA, the 'Skip to main content' link must be the first child of the `<Router>` component to ensure it is the first focusable element on every page load. The target `<main>` element should have `id="main-content"` and `tabIndex={-1}` to receive focus programmatically.
**Action:** Always include a skip-link in SPAs to improve keyboard navigation and WCAG compliance. Use `sr-only` and `focus:not-sr-only` for a clean UI that doesn't compromise accessibility.
