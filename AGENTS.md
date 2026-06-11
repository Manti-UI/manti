# Repository Guidelines

## Project Structure & Module Organization

This is a `pnpm` workspace for a framework-agnostic design system powered by
Zag.js behavior machines.

- `packages/tokens/`: shared design-token contract.
- `packages/styles/`: shared CSS and state selectors.
- `packages/folds/`: framework-agnostic Zag.js behavior.
- `packages/react/`: React renderer and Storybook stories.
- `playground/`: Vite consumer application for integration testing.
- `.storybook/`: shared Storybook configuration.
- `design/logo-explorations/`: non-production brand exploration assets.
- `docs/`: architecture and product vision.

Keep component stories beside their implementation when practical. Export
public React APIs through `packages/react/src/index.ts`.

## Build, Test, and Development Commands

Use Node `>=22.12.0` and `pnpm 10`.

```bash
pnpm install          # Install all workspace dependencies
pnpm dev              # Run the playground at localhost:5173
pnpm storybook        # Run Storybook at localhost:6006
pnpm build            # Build the package and playground
pnpm build:storybook  # Generate storybook-static/
pnpm lint             # Run ESLint
pnpm typecheck        # Check package, playground, and stories
pnpm verify           # Run lint, typecheck, and all production builds
```

Run `pnpm verify` before opening a pull request.

## Coding Style & Naming Conventions

Write strict TypeScript and React function components. Prettier enforces semicolons, single quotes, trailing commas, and two-space indentation. Run `pnpm format` after broad edits.

Use:

- `PascalCase.tsx` for React components.
- `camelCase` for functions and variables.
- `*.stories.tsx` for Storybook stories.
- semantic CSS names and tokens rather than raw product-specific colors.

Keep Zag.js machines framework-agnostic and adapters thin. Public components
require typed exports, keyboard support, visible focus states, and meaningful
screen-reader semantics.

## Testing Guidelines

No unit-test framework or coverage threshold is configured yet. Every public component must include Storybook coverage for variants, disabled/error states, and meaningful interactions. Use the Storybook accessibility panel for WCAG checks and verify integration behavior in `playground/`.

When automated tests are introduced, colocate them as `ComponentName.test.tsx`.

## Commit & Pull Request Guidelines

This workspace currently has no readable Git history. Until a project convention is established, use concise Conventional Commit messages, for example `feat(button): add loading state` or `docs: clarify token naming`.

Pull requests should explain the behavioral change, list verification commands, link relevant issues, and include Storybook or playground screenshots for visual changes. Avoid committing generated `dist/`, `storybook-static/`, or cache directories.
