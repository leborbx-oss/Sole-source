## 2025-05-15 - [Improving Global Navigation Accessibility]
**Learning:** Icon-only buttons and dynamic state changes (like cart counts and menu toggles) are often overlooked in e-commerce SPAs, creating barriers for screen reader users. Using `aria-current="page"` is essential in SPAs where the browser doesn't perform a full reload to signal navigation.
**Action:** Always check the `Navbar` and `Footer` for icon-only buttons and apply `aria-label`, `aria-expanded`, and `aria-current` attributes to interactive elements.
