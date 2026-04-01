## 2025-05-15 - [Accessibility Pass]
**Learning:** In Single Page Applications (SPAs), route changes do not automatically reset focus. Implementing a "Skip to main content" link and explicit ARIA markers (aria-current, aria-expanded) are critical for providing context to keyboard and screen reader users after navigation.
**Action:** Always include a 'Skip to main content' link as the first focusable element in the DOM, hidden with 'sr-only' but visible on focus, targeting a <main> element with id="main-content" and tabIndex={-1}.
