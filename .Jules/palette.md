## 2026-05-31 - Navbar Accessibility Baseline
**Learning:** Accessibility gaps in `Navbar.tsx` include active links missing 'aria-current="page"' and the mobile menu lacking 'aria-expanded' and 'aria-controls'; labels for icon-only Search and Cart buttons were also missing.
**Action:** Always implement 'aria-current="page"' for active navigation links and ensure icon-only buttons have descriptive 'aria-label' attributes. For mobile menus, use 'aria-expanded' and 'aria-controls' to communicate state to screen readers.
