## 2026-06-18 - [Accessibility] Skip to Main Content Implementation
**Learning:** In a React Router SPA, the "Skip to main content" link must be the first child of the `<Router>` component to ensure it is the first focusable element on every page load. Using `tabIndex={-1}` and `outline-none` on the target `<main>` element allows for smooth programmatic focus transition without distracting visual artifacts.
**Action:** Always include a skip-link as a baseline accessibility feature in new projects and ensure it is properly hidden/visible using `sr-only focus:not-sr-only`.

## 2026-06-18 - [Process] Managing PR Size and Lockfiles
**Learning:** Running `pnpm install` or `pnpm build` in some environments may generate a large `pnpm-lock.yaml` file that is not part of the original repo. Including this in a PR violates the 50-line micro-UX constraint.
**Action:** Explicitly delete or ignore auto-generated lockfiles before submission to keep the PR focused on the intended UX improvement.
