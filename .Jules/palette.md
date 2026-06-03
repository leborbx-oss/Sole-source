## 2026-06-03 - Accessible Navigation: 'Skip to main content' Link
**Learning:** In a React Router SPA, a 'Skip to main content' link must be the first child of the router component to ensure it's the first focusable element. The target main element requires `id="main-content"` and `tabIndex={-1}` to correctly receive focus.
**Action:** Always provide a skip-link in the root layout to allow keyboard users to bypass global navigation, especially in sneaker/retail sites with many nav links.
