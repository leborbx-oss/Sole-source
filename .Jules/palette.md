## 2026-06-11 - Accessibility Baseline: Skip to Main Content Link
**Learning:** In a React Router SPA, the 'Skip to main content' link must be the first child of the <Router> component to ensure it is the first focusable element on every page load, allowing keyboard users to bypass global navigation. Using tabIndex={-1} and outline-none on the target <main> element ensures focus moves correctly without adding a distracting visual ring.
**Action:** Always include a skip-to-content link targeting the primary <main> element in the root App layout.
