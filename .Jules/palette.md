# Palette's UX Journal

## 2025-05-14 - Global Accessibility Foundations
**Learning:** In React SPAs, "Skip to main content" links must target an element with `tabIndex={-1}` (typically `<main>`) to allow programmatic focus without disrupting natural tab order. Additionally, icon-only buttons like shopping carts benefit significantly from dynamic `aria-label` updates (e.g., "View cart, 2 items") to provide screen reader users with the same immediate context as visual badges.
**Action:** Always pair visual state changes (like cart counts or menu toggles) with corresponding ARIA attribute updates (`aria-label`, `aria-expanded`).
