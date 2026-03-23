## 2025-05-15 - [Accessible Navigation & Keyboard Shortcuts]
**Learning:** Screen reader users benefit significantly from dynamic ARIA labels that reflect the current state of the UI, such as cart item counts with correct pluralization and explicit "Open/Close" states for mobile menus. Additionally, "Skip to main content" links are essential for keyboard navigation in SPAs where the header/nav is large.
**Action:** Always implement dynamic `aria-label` for counts/states and include a visually-hidden (until focused) skip link targeting the `<main>` element with `tabIndex={-1}`.
