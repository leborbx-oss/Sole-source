## 2026-05-20 - Global Accessibility Baseline
**Learning:** In React SPAs, accessibility is often overlooked in global layout components like Navbars and Footers. Simple additions like "Skip to main content" links and ARIA labels on icon-only buttons significantly improve the experience for screen reader and keyboard users without impacting the visual design.
**Action:** Always check the main layout (App.tsx, Navbar, Footer) first for missing ARIA labels on social links, search icons, and cart buttons, and ensure a skip-link is present.
