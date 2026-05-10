## 2025-05-14 - [Centralized Navigation Accessibility]
**Learning:** In a React application with responsive navigation, using a centralized `navLinks` array allows for consistent application of accessibility attributes like `aria-current="page"` across both desktop and mobile views, reducing duplication and potential for errors.
**Action:** Always look for centralized data structures for navigation to ensure ARIA attributes are applied consistently across all viewport representations.

## 2025-05-14 - [Dynamic Cart Accessibility]
**Learning:** Icon-only buttons with badges (like a shopping cart) require a dynamic `aria-label` on the parent container to announce the current state (e.g., item count) to screen reader users, while the visual badge itself should be hidden with `aria-hidden="true"` to prevent redundant or confusing announcements.
**Action:** Implement `aria-label={\`View cart, \${count} item\${count === 1 ? '' : 's'}\`}` on cart links and `aria-hidden="true"` on the numeric badge.
