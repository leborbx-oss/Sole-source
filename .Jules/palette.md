## 2025-05-15 - [Accessibility Baseline Patterns]
**Learning:** A cohesive accessibility baseline in a React/Tailwind SPA requires three pillars: 1. A skip-to-content link targeting a `tabIndex={-1}` main element; 2. Dynamic `aria-label` for icon-buttons (especially those with badges like Carts); 3. Semantic navigation markers like `aria-current="page"` and `aria-expanded`.
**Action:** Always audit these three pillars first. Use `sr-only focus:not-sr-only` for the skip link and ensure it is the first focusable element in the DOM.
