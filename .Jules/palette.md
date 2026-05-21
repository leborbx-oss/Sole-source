## 2025-05-14 - Accessibility Baseline Patterns
**Learning:** In a React Router SPA, the 'Skip to main content' link must be the first child of the `<Router>` component and target a `<main id="main-content" tabIndex={-1}>` to ensure it is the first focusable element and correctly moves focus on every page load.
**Action:** Always implement skip-to-content links using the proven Tailwind 4 styling: `className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-black focus:px-6 focus:py-3 focus:font-bold focus:border-2 focus:border-black"`.
