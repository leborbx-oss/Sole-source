## 2025-04-10 - Enhancing Icon-Only Interactive Elements and Navigation Context

**Learning:** Screen readers and keyboard users need explicit context for navigation (current page) and purpose for icon-only buttons. Interactive components like mobile menus require ARIA state markers (`aria-expanded`) to be accessible. Providing a bypass block ("Skip to content") is essential for keyboard navigation efficiency.

**Action:** Always ensure icon-only buttons have descriptive `aria-label` attributes (preferably dynamic if state-dependent), use `aria-current="page"` for active navigation links, and include a visually-hidden but focusable "Skip to main content" link at the DOM root.
