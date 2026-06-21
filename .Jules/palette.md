# Palette UX Journal

## 2026-06-21 - [Skip to Main Content]
**Learning:** In a React Router SPA, the 'Skip to main content' link must be the first child of the <Router> component to ensure it is the first focusable element on every page load, allowing keyboard users to bypass global navigation.
**Action:** Always include a skip link targeting '#main-content' and ensure the target <main> element has 'tabIndex={-1}' and 'outline-none' for a smooth, accessible experience.
