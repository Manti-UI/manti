# Architecture

## Package boundaries

Manti UI separates framework-agnostic contracts from framework renderers:

- `@manti-ui/tokens` owns primitive and semantic design tokens.
- `@manti-ui/styles` owns CSS attached to stable `data-scope`, `data-part`, and
  `data-state` contracts.
- `@manti-ui/folds` owns Zag.js machines and shared interaction behavior.
- `@manti-ui/react` connects machines through `@zag-js/react` and renders React
  components.

Future `@manti-ui/vue`, `@manti-ui/svelte`, and `@manti-ui/solid` packages
should consume the same tokens, CSS, and machine exports.

## Dependency direction

```text
tokens <- styles
folds   <- react
styles   <- react
```

Framework-specific packages must not define private token values or duplicate
keyboard, focus, and state logic already owned by `folds`.

## Source layout

```text
packages/
  tokens/src/    Token contracts and generated outputs
  styles/src/    Shared CSS
  folds/src/     Zag.js behavior exports
  react/src/     React components and Storybook stories
```

## Component contract

Each interactive component should define:

- a Zag.js machine export or documented machine configuration
- stable anatomy and state attributes
- shared semantic styles
- a thin framework renderer
- keyboard, screen-reader, and Storybook accessibility checks
- equivalent cross-framework behavior tests when another adapter is added

Zag.js and its framework bindings are implementation details. Public Manti UI
props, events, anatomy, and naming must remain under Manti UI's control.
