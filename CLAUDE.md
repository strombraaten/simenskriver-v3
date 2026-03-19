# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npx quartz build --serve  # Dev server with hot reload (primary dev workflow)
npx quartz build          # Build static site to /public/
npm run check             # TypeScript type-check + Prettier format check
npm run format            # Auto-format all files with Prettier
npm test                  # Run all tests (Node built-in runner via tsx)
```

To run a single test file:
```sh
tsx --test quartz/util/path.test.ts
```

Requires Node 22+.

## Architecture

### Plugin Pipeline

Content flows through three stages defined in `quartz.config.ts`:

1. **Transformers** (`quartz/plugins/transformers/`) — Parse and mutate the markdown AST. Each transformer returns `{ name, markdownPlugins?, htmlPlugins?, externalResources? }`.
2. **Filters** (`quartz/plugins/filters/`) — Exclude content from the build (e.g., `RemoveDrafts` checks `frontmatter.draft`).
3. **Emitters** (`quartz/plugins/emitters/`) — Write output files. Each emitter receives the full build context and all processed files.

Custom transformers in this repo:
- `minimalCallout.ts` — Simplified callout syntax: `> [minimal-tip] text`
- `imageGallery.ts` — Auto-groups 2+ consecutive images into a gallery container
- `clickableImages.ts` — Adds lightbox behavior, consumes the image manifest from `ImageOptimizer`
- `frontmatter.ts` — Extended frontmatter parsing; auto-generates titles for "Tanker" posts from first sentence

### Layout System

`quartz.layout.ts` defines three page layouts: `defaultContentPageLayout`, `indexPageLayout`, `defaultListPageLayout`. Components are placed in zones: `beforeBody`, `left`, `right`, `afterBody`.

Use `ConditionalRender` (not CSS) to show/hide components based on slug:
```ts
Component.ConditionalRender({
  component: Component.Graph(),
  condition: (page) => !page.fileData.slug?.startsWith("tags/"),
})
```

### Components

All Preact components live in `quartz/components/` and must be exported from `quartz/components/index.ts` to be usable in layouts. Components receive `QuartzComponentProps` which includes `fileData`, `cfg`, `ctx`, `tree`, `allFiles`, and `displayClass`.

Page-level templates are in `quartz/components/pages/` — these render the full page body for different content types (e.g., `ThingsFeed.tsx` for the Tanker stream, `AllPostsContent.tsx` for the archive).

### Styles

SCSS lives in `quartz/styles/`. `custom.scss` is the primary override file (very large — search carefully before editing). CSS variables for colors and typography are in `variables.scss`. Component-scoped styles can be returned from a component's `css` export.

## Content Types

Content is organized into four folders, each with a required `type` field:

| Folder | Type | Purpose |
|--------|------|---------|
| `Tanker/` | `tanke` | Short thoughts, stream-style |
| `Oppslagsverk/` | `oppslagsverk` | Reference notes, summaries |
| `Utkast/` | `utkast` | Works-in-progress |
| `Notater/` | `notat` | Long-form finished essays |

Required frontmatter fields: `type`, `why`, `title` (auto-generated for Tanker from first sentence).

Valid `why` values: `keep`, `remember`, `think`, `work-out`, `share`.

Content in `content/private/` is excluded from the build via `ignorePatterns` in `quartz.config.ts`.

## Key Conventions

- **Language:** Code comments in English; user-facing content and communication in Norwegian (nb-NO).
- **New components** must be registered in `quartz/components/index.ts` before they can be used in layouts.
- **Slug-based conditionals** in layout use `page.fileData.slug` — index is `"index"`, folder indexes end with `"/index"`, tag pages start with `"tags/"`.
- **Image optimization** is handled by the `ImageOptimizer` emitter — it generates a manifest consumed by `clickableImages.ts`. Don't bypass it for new image handling.
