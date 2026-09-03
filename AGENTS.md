<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## AgentMart project conventions

- Use arrow functions for all project-authored JavaScript and TypeScript functions, including React components, hooks, helpers, and callbacks. Do not introduce `function` declarations or function expressions.
- User-facing text must never render smaller than Tailwind's `text-base` size (1rem / 16px). Use `text-base` or a larger text utility; do not add `text-xs`, `text-sm`, or arbitrary font sizes below 1rem.
- Do not place decorative or redundant badges above page headings when they merely repeat the page title or context. Badges are appropriate when they communicate useful information such as product category, inventory, status, or featured state.
