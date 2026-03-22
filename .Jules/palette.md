## 2025-03-22 - Navigation Accessibility Enhancements
**Learning:** In Single Page Applications, basic navigation requires manual accessibility focus. Users relying on keyboards or screen readers often have to re-tab through the entire navbar on every route change.
**Action:** Always include a 'Skip to main content' link and use `aria-current="page"` to provide immediate context after navigation. Ensure the skip link target has `tabIndex={-1}` for programmatic focus.
