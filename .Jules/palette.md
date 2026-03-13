## 2025-05-14 - Testing sr-only elements with Playwright
**Learning:** Tailwind's `sr-only` class hides elements visually but they remain in the DOM and are considered "visible" by many automated testing tools (like Playwright's `is_visible()`) because they aren't `display: none`.
**Action:** To verify `sr-only` elements are visually hidden, check their `bounding_box()` (width/height should be <= 1px) or check for the presence of the `sr-only` class, rather than using standard visibility assertions.

## 2025-05-14 - Focus resetting in SPAs
**Learning:** In Single Page Applications (SPAs) like this React project, route changes do not automatically reset focus to the top of the page. This makes "Skip to main content" links and explicit focus management (using `tabIndex={-1}`) critical for keyboard and screen reader users to maintain context after navigation.
**Action:** Always include a "Skip to main content" link and ensure the target `<main>` element is properly identified with an ID and `tabIndex={-1}` to allow programmatic focus.
