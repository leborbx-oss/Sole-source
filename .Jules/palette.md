## 2026-05-29 - Skip to Main Content in React SPAs
**Learning:** In a React Router SPA, the 'Skip to main content' link must be the first child of the `<Router>` component to ensure it is the first focusable element on every page load. Additionally, the target `<main>` element needs `tabIndex={-1}` to reliably receive focus programmatically when the link is clicked.
**Action:** Always place the skip link at the top of the Router hierarchy and use the `sr-only focus:not-sr-only` pattern with absolute positioning to avoid disrupting the layout when focused.
