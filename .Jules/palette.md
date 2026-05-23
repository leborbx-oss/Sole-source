## 2026-05-23 - [Skip to Main Content in React Router SPA]
**Learning:** In a React Router SPA, the "Skip to main content" link must be the first focusable element rendered inside the `<Router>` (or `BrowserRouter`) to ensure it's the first child in the DOM. This guarantees that keyboard users can bypass navigation on every page load, as the router manages the view transitions without a full page refresh.

**Action:** Always place the skip-link as the immediate child of the `<Router>` component and target a `<main>` element with a unique ID (e.g., `id="main-content"`) and `tabIndex={-1}` for programmatically managing focus.
