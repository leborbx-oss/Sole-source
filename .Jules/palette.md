## 2025-05-15 - Comprehensive Navigation Accessibility
**Learning:** In a React SPA, accessibility is often overlooked in the global layout. A "Skip to main content" link is only effective if the target element (typically <main>) has `tabIndex={-1}` to allow programmatic focus without making it a tab stop. Additionally, mobile menus require `aria-expanded` and `aria-controls` to properly communicate state changes to screen readers.
**Action:** Always pair skip links with focusable main targets and ensure all icon-only buttons in the Navbar have descriptive, state-aware ARIA labels.
