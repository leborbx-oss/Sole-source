## 2025-04-27 - Improving Navigation Accessibility

**Learning:** In Single Page Applications (SPAs) built with frameworks like React, route changes do not automatically reset focus or provide context to screen readers about the new content. Additionally, complex navbars with icon-only buttons require explicit ARIA labels that reflect the application's state (e.g., cart count) to be truly accessible.

**Action:** Always implement a "Skip to main content" link as the first focusable element. Use dynamic `aria-label` attributes for interactive elements that change state, such as shopping carts and mobile menu toggles (`aria-expanded`, `aria-controls`). Ensure the main content area has a unique ID and `tabIndex={-1}` for programmatic focus management.
