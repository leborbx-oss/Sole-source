## 2025-05-22 - [Accessibility Essentials in SPAs]
**Learning:** Single Page Applications (SPAs) often neglect keyboard-only users who must tab through repetitive navigation on every route change. Missing "Skip to main content" links and ARIA labels on icon-only buttons (like search or cart) create significant barriers for screen reader users.
**Action:** Always include a visually hidden (but focusable) skip link in the root `App.tsx` and ensure every icon-only button has a descriptive `aria-label` with dynamic pluralization for counts.
