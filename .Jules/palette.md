## 2026-04-24 - [A11y: Skip Links and Global Nav Markers]
**Learning:** In SPAs, visual state changes (like route changes or cart updates) aren't always clear to screen reader users. Adding a "Skip to main content" link and explicit ARIA markers (like `aria-current="page"` and dynamic `aria-label` for the cart) is critical for providing context after interactions.
**Action:** Always include a hidden-until-focused Skip Link as the first focusable element in `App.tsx`, and ensure all icon-only buttons have descriptive, context-aware `aria-label` attributes.
