## 2025-05-14 - Skip-to-Main-Content Implementation in React Router
**Learning:** In a React Router SPA, the "Skip to main content" link must be placed at the very top of the application (typically in `App.tsx`) to ensure it is the first focusable element on every page load. Using Tailwind 4's `sr-only` and `focus:not-sr-only` utilities provides a robust, accessible way to manage visibility without custom CSS.
**Action:** Always place the skip link at the top of the root layout, targeting a specific `id="main-content"` on the primary `<main>` element to facilitate keyboard navigation.
