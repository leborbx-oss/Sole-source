## 2026-06-13 - Accessible Navigation with Skip Links
**Learning:** In a Single Page Application (SPA), a "Skip to main content" link must be the first focusable element to allow keyboard users to bypass repetitive navigation. For the skip link to effectively move focus to the content area in modern browsers, the target element (usually `<main>`) must have `id="main-content"` and `tabIndex={-1}`. Using `tabIndex={-1}` allows the element to receive programmatic focus while remaining outside the natural tab order.

**Action:** Ensure all Palette-managed applications include a skip link as the first child of the router or body, targeting a `<main>` element with `tabIndex={-1}` and `outline-none` to avoid visual clutter during focus shifts.
