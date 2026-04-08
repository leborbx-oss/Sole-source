## 2025-05-14 - [Navbar Accessibility]
**Learning:** In SPAs, adding a "Skip to main content" link requires both the link in the navbar and a corresponding target (like `<main id="main-content" tabIndex={-1}>`) to ensure keyboard focus shifts correctly. Dynamic ARIA labels for items like shopping carts provide critical context to screen reader users that visual badges alone do not.
**Action:** Always pair "Skip to main content" links with a properly identified target element. Ensure icon-only buttons have descriptive ARIA labels that update with state changes.
