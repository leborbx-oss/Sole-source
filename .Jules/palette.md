## 2025-05-15 - [Accessibility & Keyboard Navigation Foundations]
**Learning:** For SPAs, a "Skip to main content" link is critical for keyboard users to bypass repetitive navigation. The target `<main>` element must have `tabIndex={-1}` to ensure focus is correctly moved to the content container even if it's not naturally focusable. Dynamic ARIA labels (e.g., "View cart, 1 item") provide significantly better context than static labels for stateful components.

**Action:** Always include a skip link as the first focusable element in `App.tsx`. Ensure all icon-only buttons have descriptive `aria-label` attributes that reflect current state. Use `sr-only` labels for form inputs when visual labels are omitted by design.
