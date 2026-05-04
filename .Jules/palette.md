# Palette UX Journal

This journal tracks critical UX and accessibility learnings from working on the SOLE SOURCE project.

## 2025-05-04 - Global Accessibility Baseline Pattern
**Learning:** For a React/Tailwind e-commerce site, the "Skip to main content" link and dynamic cart `aria-label` (announcing item count) provide the highest ROI for initial accessibility. Using `aria-current="page"` on navigation links is often overlooked in SPAs but critical for context.
**Action:** Always implement the "Skip to main content" link as the first element in `App.tsx` and ensure the target `<main>` has `tabIndex={-1}` for programmatic focus. Use pluralization logic for interactive bag/cart labels to ensure professional screen reader output.
