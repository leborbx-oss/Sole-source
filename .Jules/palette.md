## 2025-05-15 - Accessibility Essentials for Navigation

**Learning:** In Single Page Applications (SPAs), route changes do not automatically reset focus or announce the new page context to screen readers. Explicitly marking the current page with `aria-current="page"` and providing a "Skip to main content" link (with `tabIndex={-1}` on the target) are critical for keyboard and screen reader navigation. Additionally, icon-only buttons in the header (like Search or Cart) must have descriptive `aria-label` attributes as they lack text nodes.

**Action:** Always include a visually hidden but focusable "Skip to main content" link as the first element in `App.tsx`. Ensure `NavLink` components use the `aria-current` attribute based on their active state. Audit all header icons for missing `aria-label`.
