## 2025-05-14 - Navigation Accessibility Standards
**Learning:** Navigation components in SPAs often lack critical ARIA attributes (aria-current, aria-expanded) and skip-to-content links, which are essential for keyboard and screen reader users to maintain context after route changes.
**Action:** Always implement aria-current="page" for active links, aria-expanded for toggles, and a "Skip to main content" link targeting the main content area.
