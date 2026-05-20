## 2025-05-14 - [Accessibility Baseline Patterns]
**Learning:** Icon-only buttons and purely visual status indicators (like star ratings) create a fragmented experience for screen reader users. Grouping visual elements and providing a single, descriptive ARIA label on a container is more effective than labeling individual icons.
**Action:** Always use a single `aria-label` for grouped ratings or status indicators, and hide decorative child elements with `aria-hidden="true"`.

**Learning:** In SPAs, route changes do not reset focus. A "Skip to Main Content" link is essential for keyboard efficiency, and the target `<main>` element needs `tabIndex={-1}` to become programmatically focusable without being in the natural tab order.
**Action:** Implement "Skip to Main Content" as the first child of the Router and ensure it targets a valid `id` on the main content area.
