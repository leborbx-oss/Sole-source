## 2026-06-16 - Skip to Main Content & Focus Management
**Learning:** In a React SPA, a "Skip to Main Content" link is essential for accessibility. To ensure the keyboard focus actually moves to the target element (like `<main>`) in all browsers (especially Chrome/Webkit), the target must have `tabIndex={-1}`. Adding `outline-none` to the target prevents a distracting focus ring around the entire content area when the skip link is used.
**Action:** Always include `tabIndex={-1}` and `outline-none` on the target of a skip link to ensure reliable focus management without visual regressions.
