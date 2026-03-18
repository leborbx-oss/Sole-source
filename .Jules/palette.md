## 2025-05-15 - [Dynamic ARIA Labels for Cart Icons]
**Learning:** For e-commerce interfaces, a simple badge on a cart icon is insufficient for screen readers. Using a dynamic `aria-label` that pluralizes (e.g., "View cart, 1 item" vs "View cart, 2 items") provides much better situational awareness for non-visual users.
**Action:** Always pair cart status indicators with descriptive, state-aware ARIA labels.

## 2025-05-15 - [Skip-to-Content Implementation in SPAs]
**Learning:** In React SPAs, a "Skip to main content" link must target an element with `id="main-content"` and `tabIndex={-1}`. The negative tabIndex allows the element to receive programmatic focus via the link without becoming a regular tab stop, ensuring keyboard users can bypass global navigation.
**Action:** Implement focusable skip links in all global layouts to ensure keyboard accessibility.
