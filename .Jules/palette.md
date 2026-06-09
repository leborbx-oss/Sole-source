## 2026-06-09 - Accessible Navigation: Skip to Main Content
**Learning:** In a React Router SPA, a 'Skip to main content' link must be the first focusable element within the Router to allow keyboard users to bypass global navigation. The target `<main>` element needs an `id="main-content"` and `tabIndex={-1}` to be programmatically focusable, and `outline-none` to prevent a distracting visual ring around the entire content area.
**Action:** Implement 'Skip to main content' as the first child of the Router, targeting a main element with `id="main-content"`, `tabIndex={-1}`, and `outline-none`.
