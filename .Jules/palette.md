## 2025-05-14 - Accessible Skip Link Pattern in Tailwind 4
**Learning:** In Tailwind CSS v4, the `sr-only` and `not-sr-only` utilities provide a clean way to implement a "Skip to main content" link that is only visible when focused. Using `focus:z-[100]` ensures it stays above other fixed elements like navbars.
**Action:** Use the combination of `sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100]` for accessible bypass links in future projects.

## 2025-05-14 - Dynamic Cart Labels for Screen Readers
**Learning:** Visual badges on cart icons (e.g., "2") are often read redundantly by screen readers as "Shopping bag 2".
**Action:** Use a dynamic `aria-label` on the parent link (e.g., `aria-label="View cart, 2 items"`) and apply `aria-hidden="true"` to the visual badge to provide a more natural and clear announcement for assistive technology.
