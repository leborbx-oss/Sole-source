## 2025-05-14 - [A11y Foundations]
**Learning:** In a React Router SPA, the "Skip to main content" link must be the first child of the `<Router>` component and target a `<main>` element with a unique ID and `tabIndex={-1}` to ensure it is the first focusable element and correctly moves focus on activation.
**Action:** Always place the skip link at the top of the Router and ensure the target element is capable of receiving focus.

**Learning:** Icon-only buttons and links (Search, Shopping Bag, Social Media) require explicit `aria-label` attributes to be accessible to screen readers. For the Shopping Bag, a dynamic label that includes the item count is superior to a static label.
**Action:** Audit all icon-only interactive elements and provide descriptive ARIA labels.

**Learning:** Forms without visible labels (like newsletter signups in footers) should use a visually hidden `<label>` (using `sr-only`) linked via `htmlFor` and `id` to maintain accessibility without altering the visual design.
**Action:** Use `sr-only` labels for all form inputs that lack a visible corresponding label.
