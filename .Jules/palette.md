## 2026-05-24 - [Skip to Main Content Pattern]
**Learning:** In a React Router SPA, the "Skip to main content" link must be the first child of the `<Router>` component to ensure it is the first focusable element on every route change. Additionally, the target element (usually `<main>`) needs `tabIndex={-1}` to receive programmatic focus reliably across all browsers without adding to the natural tab order.
**Action:** Always place the skip link immediately inside the Router and ensure the main content container has a matching ID and `tabIndex={-1}`.
