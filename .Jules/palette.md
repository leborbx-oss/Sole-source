# Palette's Journal

## 2026-06-01 - Skip to Main Content Pattern
**Learning:** In a React Router SPA using `motion/react` for page transitions, the 'Skip to main content' link must be the first child of the `<Router>` (or `App` wrapper) and target a `main` element with `tabIndex={-1}`. This ensures focus is correctly managed and the link is always the first focusable element on every page load, bypassing navigation.
**Action:** Always implement a skip-link with `sr-only focus:not-sr-only` classes and ensure the target `main` has a unique ID and `tabIndex={-1}`.
