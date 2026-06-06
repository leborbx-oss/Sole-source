## 2026-06-06 - Navigation Accessibility Baseline
**Learning:** Interactive elements in the navigation bar (Search, Cart, Mobile Menu) require explicit ARIA labels and state indicators (aria-expanded, aria-current) to be usable by screen reader users, especially when they only contain icons.
**Action:** Always implement aria-current for active links and aria-label for icon-only buttons. Ensure mobile menus have a clear semantic link between the toggle button (aria-controls) and the menu container (id).
