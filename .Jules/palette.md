## 2025-05-15 - [Accessibility Foundation]
**Learning:** In Single Page Applications (SPAs), the "Skip to main content" link is a critical accessibility feature that is often overlooked. It requires both the link (hidden via `sr-only` but visible on `focus`) and a matching `id` on the `<main>` element with `tabIndex={-1}` to ensure focus is actually moved.
**Action:** Always verify that the layout includes a skip link and a properly anchored main landmark when starting work on a new frontend codebase.

## 2025-05-15 - [Dynamic ARIA Labels]
**Learning:** Static ARIA labels for icon buttons (like "Cart") are helpful, but dynamic labels that include state (like "Cart (3 items)") provide much better context for screen reader users.
**Action:** Implement template literals for `aria-label` on buttons that represent stateful UI elements.
