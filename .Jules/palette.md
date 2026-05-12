## 2025-05-14 - Skip to Main Content in SPAs

**Learning:** In a React Router SPA, the 'Skip to main content' link must be the first child of the `<Router>` component (or as close to the top of the DOM as possible) to ensure it is the first focusable element. Additionally, providing a clear focus style that breaks the 'visually hidden' state is critical for keyboard users who are not using screen readers.

**Action:** Always place the skip link immediately inside the Router/Layout and ensure it targets a stable ID (like `main-content`) on the primary `<main>` element.

## 2025-05-14 - Accessible Icon Buttons & Menus

**Learning:** Icon-only buttons (Search, Cart, Hamburgers) are completely opaque to screen readers without ARIA labels. For interactive elements like mobile menus, `aria-expanded` and `aria-controls` are essential for communicating state changes to assistive technology.

**Action:** Audit all icon-only interactions and ensure they have descriptive labels and appropriate state attributes.
