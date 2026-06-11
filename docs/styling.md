# Styling & Customization

Manti UI is built to be restyled — with plain CSS, with design tokens, or with
Tailwind CSS — without specificity battles or forked components. This document
is the contract for how.

## Getting the styles

`@manti-ui/react` ships no CSS side effects. Import the stylesheet once at your
app root:

```ts
import '@manti-ui/styles/index.css';
```

Stylesheet entry points:

| Entry                                 | Contents                                               |
| ------------------------------------- | ------------------------------------------------------ |
| `@manti-ui/styles/index.css`          | Everything: reset, tokens, base, component styles      |
| `@manti-ui/styles/tokens.css`         | Token custom properties only (for headless setups)     |
| `@manti-ui/styles/tailwind.css`       | `index.css` + Tailwind v4 layer order + theme bridge   |
| `@manti-ui/styles/tailwind-theme.css` | Tailwind v4 `@theme` bridge only (for headless setups) |

## How the cascade is organized

All Manti CSS lives in cascade layers, declared once in `index.css`:

```css
@layer manti.reset, manti.tokens, manti.base, manti.components;
```

This is the foundation of every customization story below, because of one CSS
rule: **unlayered styles always beat layered styles**, regardless of
specificity. Any ordinary CSS you write in your app wins over Manti UI without
`!important`, without selector contests.

## The stable selector contract

Every component renders stable data attributes — they are public API and follow
semver:

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

- `data-scope` — the component (`button`, `switch`, `tabs`, …)
- `data-part` — the anatomy piece (`root`, `label`, `trigger`, `content`, …)
- `data-variant`, `data-tone`, `data-size` — the chosen props
- state attributes (`data-state`, `data-loading`, `disabled`, …) — live state

Class names and internal DOM details are _not_ part of the contract; target the
data attributes.

## Customizing with plain CSS

### Override any component style

Write normal (unlayered) CSS against the anatomy contract:

```css
/* Always wins over Manti's layered styles. */
[data-scope='button'][data-part='root'] {
  border-radius: 2px;
  text-transform: uppercase;
}

[data-scope='button'][data-part='root'][data-variant='solid']:hover {
  translate: 0 -1px;
}
```

### Retheme with tokens

Tokens are CSS custom properties; redefine them at any scope. Pick the right
altitude:

```css
/* 1. Primitive ramp — rebrand the palette everywhere. */
:root {
  --manti-paprika-500: oklch(0.65 0.2 280); /* paprika is now purple */
}

/* 2. Semantic role — adjust surfaces, text, borders, focus. */
:root {
  --manti-radius-md: 4px;
  --manti-focus-ring: var(--manti-broth-500);
}

/* 3. Tone — remap what a tone means, globally or per subtree. */
.marketing-section [data-tone='primary'] {
  --tone-solid: var(--manti-broth-600);
  --tone-solid-hover: var(--manti-broth-700);
}

/* 4. One instance — className or style, as usual. */
```

Per-component knobs are intentionally private (the `--_*` variables inside
component CSS); rely on tokens and the selector contract instead.

### Register a custom tone

Tonal components accept any string as `tone`. Define the `--tone-*` vocabulary
for your own tone in plain CSS and pass its name:

```css
[data-tone='brand'] {
  --tone-solid: light-dark(#5536da, #7c63f0);
  --tone-solid-hover: light-dark(#4628c4, #8d77f2);
  --tone-solid-active: light-dark(#3a1fae, #9e8bf5);
  --tone-on-solid: white;
  --tone-soft-bg: light-dark(#eeeafd, #2a2350);
  --tone-soft-bg-hover: light-dark(#e0d9fb, #352b66);
  --tone-soft-text: light-dark(#4628c4, #c4b8f8);
  --tone-border: light-dark(#c4b8f8, #4a3d85);
  --tone-text: light-dark(#4628c4, #b3a3f6);
  --tone-ring: #7c63f0;
}
```

```tsx
<Button tone="brand">Ship it</Button>
```

Built-in tone names keep TypeScript autocomplete; custom strings are accepted.

## Tailwind CSS v4

### Styled components + utility overrides

One import wires everything — Manti styles, the correct layer order, and the
token theme bridge:

```css
/* app.css — order matters: Manti BEFORE tailwindcss. */
@import '@manti-ui/styles/tailwind.css';
@import 'tailwindcss';
```

The packaged file pins the layer order to
`theme, base, manti, components, utilities`, which means:

- Tailwind's preflight (`base`) sits _below_ Manti styles — it can't bleach
  Manti components.
- Tailwind utilities sit _above_ Manti styles — utility classes on a Manti
  component always win:

```tsx
<Button className="rounded-none px-8 shadow-none">Sharp</Button>
```

> If `tailwindcss` is imported first, Tailwind declares its layer order before
> Manti's, and `manti` lands above `utilities` — overrides will silently stop
> working. Keep the Manti import first.

### The theme bridge

`tailwind-theme.css` maps Manti tokens to Tailwind theme variables with
`@theme inline`, so generated utilities reference the underlying
`var(--manti-*)` at runtime — they follow `light-dark()` and `data-theme`
switches for free.

| Utility example                       | Resolves to                  |
| ------------------------------------- | ---------------------------- |
| `bg-surface`, `text-text-muted`       | semantic surface/text tokens |
| `border-border`, `ring-ring`          | semantic border/focus tokens |
| `bg-paprika-500`, `text-herb-700`     | primitive ramps              |
| `bg-primary-600`, `border-danger-300` | semantic ramp aliases        |
| `rounded-manti-lg`, `shadow-manti-md` | Manti radius/elevation       |
| `ease-smooth`, `ease-soft`            | Manti motion curves          |
| `font-sans`, `font-mono`              | Manti font stacks (override) |

Spacing needs no bridge: Manti's 4px grid equals Tailwind's default
`--spacing: 0.25rem`, so `p-4` and `var(--manti-space-4)` already agree.
Radius and shadow scales are prefixed with `manti-` so Tailwind's own
`rounded-md` / `shadow-sm` keep their stock meaning.

### Headless: skip Manti's CSS entirely

Don't import component styles at all; bring only the tokens (optional) and
style the anatomy with utilities. State lives in data attributes, which
Tailwind targets natively:

```css
/* app.css */
@import '@manti-ui/styles/tokens.css'; /* optional: keeps the token vocabulary */
@import '@manti-ui/styles/tailwind-theme.css'; /* optional: token-aware utilities */
@import 'tailwindcss';
```

```tsx
<Accordion.ItemTrigger className="flex w-full items-center justify-between p-4 data-[state=open]:font-semibold">
  …
  <ChevronIcon className="transition data-[state=open]:rotate-180" />
</Accordion.ItemTrigger>
```

### Tailwind v3

The override story works unchanged: v3 utilities are unlayered, and unlayered
CSS beats Manti's layers automatically. The `@theme` bridge is v4-only; in v3,
reference the custom properties from `tailwind.config` instead
(`colors: { surface: 'var(--manti-surface)' }`).

## What is public API

Stable under semver:

- token custom properties (`--manti-*`) and the `--tone-*` vocabulary
- the layer names (`manti.*`) and the rule that all Manti CSS is layered
- `data-scope` / `data-part` anatomy and documented state attributes
- the stylesheet entry points listed above

Internal and free to change: `--_*` variables, exact declarations inside the
layers, and the DOM between documented parts.
