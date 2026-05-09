## 2025-05-14 - [Accessible Navigation in React SPAs]
**Learning:** In a React Single Page Application (SPA) using React Router, adding a "Skip to main content" link as the first child of the Router ensures it is the first focusable element on any page. Using Tailwind's `sr-only focus:not-sr-only` provides a clean, CSS-in-JS friendly way to implement this without custom stylesheets.
**Action:** Always place the skip link at the root of the app's routing structure and ensure every main content area has a matching `id="main-content"`.
