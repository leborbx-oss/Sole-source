## 2026-06-02 - Skip to Main Content Implementation
**Learning:** In a React Router SPA, the 'Skip to main content' link must be the first child of the `<Router>` component to ensure it is the first focusable element on every page load. The target `<main>` element needs `tabIndex={-1}` to receive focus without being in the natural tab order.
**Action:** Always place skip links at the root of the router and ensure target containers have appropriate IDs and negative tabIndex for accessibility.
