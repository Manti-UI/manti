# Manti UI Design System

The first design-system release. One word drives every decision: **smooth**.

## Theming

Color tokens resolve with the CSS `light-dark()` function and follow the used
`color-scheme`. By default that means the OS preference; set `data-theme` on any
container to override it for that subtree:

```html
<div class="manti-app" data-theme="dark">…</div>
```

Apply `.manti-app` (or `body`) to pick up the themed background, text color, and
font. Import the stylesheet once at your app root —
`import '@manti-ui/styles/index.css'` — or use the Tailwind entry point;
`@manti-ui/react` deliberately ships no CSS side effects so headless usage
stays possible. See [styling.md](./styling.md) for the full customization
contract (plain CSS overrides, token theming, custom tones, Tailwind v4).

> Build note: bundlers must keep modern CSS (`light-dark()`, nesting) intact.
> The workspace Vite configs target `chrome123` for exactly this reason; a
> `prefers-color-scheme`-only polyfill would ignore manual `data-theme`.

## Color

Six perceptually-uniform OKLCH ramps (`50`–`950`) from the mantı kitchen:

| Ramp      | Role    | Reference      |
| --------- | ------- | -------------- |
| `dough`   | neutral | warm dough     |
| `paprika` | primary | paprika sauce  |
| `herb`    | success | parsley / mint |
| `sumac`   | warning | golden sumac   |
| `chili`   | danger  | hot chili      |
| `broth`   | info    | calm broth     |

### Semantic & tonal roles

`:root` exposes surfaces and text — `--manti-bg`, `--manti-surface`,
`--manti-surface-raised`, `--manti-border`, `--manti-text`, `--manti-text-muted`,
and more.

Every tonal component reads a uniform vocabulary selected by `[data-tone]`:

```
--tone-solid            --tone-soft-bg          --tone-border
--tone-solid-hover      --tone-soft-bg-hover    --tone-text
--tone-solid-active     --tone-soft-text        --tone-ring
--tone-on-solid
```

A component never hard-codes a hue; it sets `data-tone` and consumes `--tone-*`.

## Scales

- **Radius** — `--manti-radius-xs … 2xl`, `full`. Pillowy by default.
- **Spacing** — `--manti-space-0 … 16` on a 4px grid.
- **Type** — `--manti-text-xs … 5xl`, weights `regular`–`bold`, Inter.
- **Elevation** — `--manti-shadow-sm | md | lg`, soft and warm-tinted.
- **Motion** — `--manti-ease-smooth` (default), `--manti-ease-soft`, with
  `--manti-duration-fast | base | slow`. Honors `prefers-reduced-motion`.

## Components

| Component   | Tones | Notes                                                  |
| ----------- | :---: | ------------------------------------------------------ |
| `Button`    |  all  | `solid` / `soft` / `outline` / `ghost`, sizes, loading |
| `Toggle`    |  all  | Zag.js toggle machine; controlled or uncontrolled      |
| `Switch`    |  all  | real checkbox + `role="switch"`, smooth thumb          |
| `Checkbox`  |  all  | checked + indeterminate, drawn check                   |
| `TextField` |  all  | label, hint, error, adornments, wired ARIA             |
| `Badge`     |  all  | `solid` / `soft` / `outline`, optional dot             |
| `Card`      |   —   | pillowy surface; `Header`/`Title`/`Body`/`Footer`      |
| `Alert`     |  all  | soft/solid, dismiss, role escalates for danger/warning |
| `Spinner`   |   —   | inherits `currentColor`                                |

## Anatomy contract

Every component renders stable attributes so the CSS is framework-agnostic:

```html
<button
  data-scope="button"
  data-part="root"
  data-variant="solid"
  data-tone="primary"
  data-size="md"
>
  <span data-scope="button" data-part="label">…</span>
</button>
```

A future `@manti-ui/vue` or `@manti-ui/svelte` adapter renders the same anatomy
and reuses these tokens, styles, and folds unchanged.
