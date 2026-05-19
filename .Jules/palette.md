## 2025-05-15 - [Accessibility Baseline Patterns]
**Learning:** In a React Router SPA, 'Skip to main content' links must be the first child of the Router to be focusable on page load. Dynamic ARIA labels for cart icons with badges prevent redundant announcements while providing necessary context (e.g., 'View cart, 2 items').
**Action:** Always implement skip links at the Router root and use consolidated ARIA labels for icon-badge combinations.
