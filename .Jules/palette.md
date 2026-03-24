## 2025-05-15 - [Skip to Main Content Link]
**Learning:** Implementing a "Skip to main content" link is a critical accessibility improvement for keyboard-only and screen reader users, allowing them to bypass repetitive navigation. However, the target element (usually `<main>`) must have `tabIndex={-1}` and `id="main-content"` for the focus to be programmatically shifted to it reliably across all browsers.
**Action:** Always include a skip link in the root layout and ensure the target element is properly identified and made focusable with `tabIndex={-1}`.
