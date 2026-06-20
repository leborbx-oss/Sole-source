## 2026-06-19 - [Skip to Main Content Pattern]
**Learning:** In a React Router SPA, the 'Skip to main content' link must be the first child of the <Router> component to ensure it is the first focusable element on every page load. Using `tabIndex={-1}` and `outline-none` on the target `<main>` element ensures focus shifts correctly without creating a permanent visual ring.
**Action:** Always verify the presence of a skip-link in the root layout and ensure it targets a unique ID on the primary content container.
