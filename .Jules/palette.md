## 2026-06-10 - Skip to Main Content in React Router SPAs
**Learning:** In a React Router SPA, a 'Skip to main content' link must be the first focusable element. It should target the primary <main> element with an ID and tabIndex={-1} to ensure keyboard focus moves correctly, bypassing navigation on every page load.
**Action:** Always add a skip link as the first child of the Router in App.tsx and ensure the <main> element has id="main-content" and tabIndex={-1}.
