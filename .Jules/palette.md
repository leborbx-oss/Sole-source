## 2025-05-15 - [Navigation Accessibility & Keyboard Bypass]
**Learning:** Single Page Applications (SPAs) often fail to provide a "Skip to Content" link, forcing keyboard users to tab through the entire navigation on every page load. Additionally, icon-only buttons and mobile menus frequently lack the necessary ARIA attributes to communicate their state (expanded/collapsed) and purpose to screen readers.

**Action:**
1. Always implement a "Skip to main content" link as the first focusable element in the DOM, using Tailwind's `sr-only focus:not-sr-only` for visual hiding.
2. Ensure the target of the skip link has a unique `id` (e.g., `main-content`) and `tabIndex={-1}` for programmatic focus.
3. For mobile menus, explicitly bind the toggle button to the menu container using `aria-controls` and `aria-expanded`.
4. Use `aria-current="page"` for active navigation links to provide semantic context for the user's current location.
