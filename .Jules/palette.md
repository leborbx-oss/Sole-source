## 2025-05-14 - Navigation Accessibility and Keyboard Bypass
**Learning:** Many modern React/Vite starters lack basic accessibility landmarks and bypass blocks. Screen reader users often cannot identify the purpose of icon-only buttons (like Search or Cart), and keyboard-only users are forced to tab through the entire navigation on every page load.
**Action:** Always include a "Skip to main content" link as the first focusable element in `App.tsx` and ensure all navigation icons have descriptive `aria-label` attributes. Use `aria-current="page"` for active links to provide location context.
