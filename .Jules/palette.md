## 2026-06-15 - [A11y] Skip to Main Content Link in SPA
**Learning:** In a React Router Single Page Application (SPA), the 'Skip to main content' link must be the first child of the `<Router>` component. This ensures it is the first focusable element on every page load, allowing keyboard users to bypass global navigation.
**Action:** Always place the skip link immediately inside the `<Router>` and ensure the target element (usually `<main id="main-content">`) has `tabIndex={-1}` and `outline-none` for correct focus management without visual artifacts for mouse users.
