## 2025-05-15 - [Global Accessibility Pass]
**Learning:** Single Page Applications (SPAs) often fail to provide basic navigation context (active route) and efficient keyboard navigation (skip links) out of the box. Adding ARIA labels to icon-only buttons is a critical micro-UX win that significantly helps screen reader users.
**Action:** Always implement a 'Skip to main content' link and use 'aria-current="page"' for navigation links in the primary layout. Ensure icon-only buttons have descriptive 'aria-label' attributes.
