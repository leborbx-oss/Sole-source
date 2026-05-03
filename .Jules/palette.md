## 2025-05-14 - Global Accessibility Enhancements

**Learning:** Micro-UX wins are often found in global components like Navbar and Footer. Adding `aria-label` to icon-only buttons and proper labels to form inputs significantly improves the base accessibility of the entire application. Additionally, wrapping decorative elements like star ratings in `aria-hidden="true"` while providing a `sr-only` text summary ensures screen readers provide meaningful context without the noise of individual icons.

**Action:** Always audit global components (Navbar, Footer, Sidebars) for missing ARIA labels on icon-only interactive elements. For complex visual indicators like star ratings, use the `aria-hidden` + `sr-only` summary pattern.
