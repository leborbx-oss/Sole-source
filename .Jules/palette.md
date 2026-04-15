# Palette's UX Journal

## 2025-05-15 - Global Navigation Accessibility Patterns
**Learning:** In SPAs, standard navigation often lacks basic accessibility landmarks like "Skip to Content" links and proper ARIA states on interactive elements, making it difficult for keyboard and screen reader users to navigate efficiently.
**Action:** Always implement a "Skip to Main Content" link that targets a focusable `<main>` element (`id="main-content"`, `tabIndex={-1}`). Ensure all icon-only buttons have descriptive `aria-label` attributes and interactive states (`aria-expanded`, `aria-controls`) are correctly updated.
