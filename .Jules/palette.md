# Palette's UX & Accessibility Journal

## 2025-05-15 - Navigation Accessibility & Keyboard UX
**Learning:** Icon-only buttons in complex navigation (like shopping carts) require dynamic `aria-label` pluralization to provide clear context for screen reader users. Simply labeling a button "Cart" is less helpful than "1 item in bag". Additionally, a "Skip to main content" link is a prerequisite for keyboard accessibility in any app with a persistent header.
**Action:** Always check for icon-only buttons in navigation and ensure they have descriptive, dynamic ARIA labels. Always include a skip link targeting the main content area.
