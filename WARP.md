# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Quartz-based digital garden called "Wayward" that organizes content into four distinct types: **Tanker** (fleeting thoughts), **<｜tool▁sep｜>** (reference material), **Utkast** (exploratory thinking), and **Notater** (long-form pieces). Each piece has a `why` value (keep, remember, think, work-out, share) that captures its purpose.

### Content Type Philosophy
- **Tanker** - Quick, fleeting thoughts and observations. Stream-like, chronological. Title is optional (auto-generated from first sentence if omitted)
- **<｜tool▁sep｜>** - Reference material, building blocks, summaries. Personal library of notes worth keeping
- **Utkast** - Ideas in progress, exploratory thinking. May or may not evolve into something more
- **Notater** - Complete, coherent long-form pieces. Intended to be finished (have a `stage` field: forming or done)

### Type & Why Matrix
Not all `why` values make sense for every `type`:
- **tanke**: `keep` ✔✔ | `remember` ✔✔ | `think` ✔ | `share` ✔
- **oppslagsverk**: `keep` ✔✔✔ | `remember` ✔✔ | `think` ✔✔ | `work-out` ✔✔ | `share` ✔
- **utkast**: `think` ✔✔✔ | `work-out` ✔✔✔ | `share` ✔
- **notat**: `share` ✔✔✔ | `work-out` ✔✔ | `think` ✔

## Common Commands

### Build & Development
```bash
# Build the site
npm run build

# Build and serve with live preview
npx quartz build --serve

# Build docs (alternative)
npm run docs

# Run Quartz CLI directly
npm run quartz <command>
```

### Testing & Code Quality
```bash
# Run tests
npm run test

# Type checking (no output)
npm run check

# Format code with Prettier
npm run format
```

### Content Creation
```bash
# Create a new post interactively
node scripts/new-post.js

# Or use the wrapper script
./scripts/new-post-wrapper.sh
```

### Template Sync
```bash
# Sync to template version (for template maintainers)
npm run sync-template
```

## Architecture Overview

### Content Structure
- `content/` - All markdown content organized by type
  - `Tanker/` - Quick, fleeting thoughts (stream-like, chronological)
  - `<｜tool▁sep｜>/` - Reference material and building blocks
  - `Utkast/` - Ideas in progress, exploratory thinking
  - `Notater/` - Complete, coherent long-form pieces
  - `index.md` - Homepage

### Quartz Core (`quartz/`)
- `components/` - Preact components for UI elements
  - Custom components: `CategoryList`, `WhyField`, `HeroImage`, `Pinned`, `RecentNotes`
  - Layout-specific rendering based on page type (index, content, list pages)
- `plugins/` - Transform, filter, and emit content
  - `transformers/` - Process markdown during build
    - `minimalCallout.ts` - Custom callout syntax `> [minimal-tip]`
    - `imageGallery.ts` - Auto-wraps 2+ consecutive images in galleries
    - `clickableImages.ts` - Adds lightbox functionality to images
  - `emitters/` - Generate output files
    - `imageOptimizer.ts` - Optimizes images during build
  - `filters/` - Filter content (e.g., `RemoveDrafts`)
- `styles/` - SCSS stylesheets (warm color theme with separate light/dark modes)
- `util/` - Utility functions (path resolution, language helpers, etc.)

### Configuration Files
- `quartz.config.ts` - Main Quartz configuration (plugins, theme, colors)
- `quartz.layout.ts` - Page layouts (index, content pages, list pages)
  - `sharedPageComponents` - Components on every page (head, footer)
  - `defaultContentPageLayout` - Individual post pages
  - `indexPageLayout` - Homepage with Tanker, Oppslagsverk, Utkast, Notater sections
  - `defaultListPageLayout` - Tag/folder listing pages
- `tsconfig.json` - TypeScript configuration (uses Preact for JSX)
- `package.json` - Dependencies and scripts

## Key Architectural Patterns

### Component Composition
- Components are registered in `quartz/components/index.ts`
- Use `ConditionalRender` wrapper to show/hide components based on page context
- Components receive `QuartzComponentProps` with `fileData`, `allFiles`, `cfg`, etc.

### Plugin Pipeline
1. **Transformers** - Process markdown (run in order: FrontMatter → SyntaxHighlighting → MinimalCallout → ClickableImages → ImageGallery → CrawlLinks → etc.)
2. **Filters** - Filter content (e.g., remove drafts)
3. **Emitters** - Generate output files (run in parallel: ImageOptimizer, ContentPage, FolderPage, etc.)

### Frontmatter System
Each content type has required fields:
- `type` - `tanke`, `oppslagsverk`, `utkast`, or `notat`
- `why` - `keep`, `remember`, `think`, `work-out`, or `share`
- `title` - Page title (optional for tanker - auto-generated if omitted)
- `published` or `date` - Publication/creation date
- Optional: `stage` (notater only), `tags`, `aliases`, `permalink`, `draft`

### Image Handling
- Images are optimized during build by `imageOptimizer.ts`
- Consecutive images (2+) are auto-wrapped in galleries by `imageGallery.ts`
- All images get lightbox functionality from `clickableImages.ts`
- Images support layout modifiers in alt text: `|wide`, `|center`, `|small`, `|full`
- Hero images: Set `heroImage`, `hero`, or `coverImage` in frontmatter

### Content Filtering & Display
- Tanker: Stream-like display (chronological, by `date` field)
- Oppslagsverk/Utkast: List display on index page (Recent Notes)
- Notater: Special section on index (Nylige notater)
- Use `excludeFromLists: true` in frontmatter to hide from index lists

## TypeScript & Build System

- Target: ESNext with Preact JSX (`jsxImportSource: "preact"`)
- Strict mode enabled
- Tests use Node's built-in test runner (`tsx --test`)
- Build uses esbuild via Quartz's custom build pipeline

## Custom Features

### Minimal Callouts
Cleaner, more subtle callout syntax:
```markdown
> [minimal-tip]
> Your tip content here
```
Types: `minimal-tip`, `minimal-note`, `minimal-warning`, `minimal-info`, `minimal-quote`, `minimal-success`, `minimal-question`

### Why Field Component
Displays the purpose of a piece in the sidebar:
- "This is to: remember"
- "This is to: think and share"

### Category List
Custom explorer showing content folders with:
- Custom folder order configuration
- Always-show folders (even if empty)
- Exclude folders capability

## Common Writing Patterns

### Wikilinks & Aliases
- Use `[[page-name]]` for internal links
- Use `[[page-name | Custom Text]]` for custom link text
- Use `[[page-name#Section]]` to link to specific sections
- Set `aliases` in frontmatter to enable title-based linking: `[[My Page Title]]` instead of slug
- Wikilinks use shortest path resolution - prefer `[[example]]` over full paths when unique

### Transclusion
- Embed entire pages: `![[page-name]]`
- Embed sections: `![[page-name#Section Header]]`
- Embed blocks: `![[page-name#^block-id]]`

### Image Embedding
- Basic: `![[image.jpg]]` or `![Alt text](path/to/image.jpg)`
- Layout modifiers in alt text: `![Description|wide](image.jpg)`
  - `|wide` - Full width, centered, height limited
  - `|center` - Medium width, centered
  - `|small` - Smaller floating image
  - `|full` - Maximum impact, full width
- Default images float with text (alternating left/right)
- Consecutive images (2+) automatically form galleries

## Development Workflow

1. **Add new content**: Use `node scripts/new-post.js` for guided creation
2. **Preview changes**: Run `npx quartz build --serve` to see live updates
3. **Custom components**: Add to `quartz/components/`, export in `index.ts`, register in `quartz.layout.ts`
4. **Custom plugins**: Add to `quartz/plugins/transformers|emitters|filters/`, export in `index.ts`, register in `quartz.config.ts`
5. **Styling**: Edit SCSS in `quartz/styles/` or component-specific `styles/` directories
6. **Type checking**: Run `npm run check` before committing

## Important Notes

- Content folder names are case-sensitive in the file system but slugified to lowercase in URLs
- Wikilinks use shortest path resolution: `[[example-post]]` instead of full paths when unique
- Permalinks are recommended for notater to maintain stable URLs
- Draft posts (`draft: true`) are filtered out during build
- The `CategoryList` component uses folder index pages for titles (e.g., `Tanker/index.md`)
- Images in `public/` are served as-is; images in `content/` are optimized during build
- Always use co-author attribution when committing: `Co-Authored-By: Warp <agent@warp.dev>`

## Testing

Run tests with:
```bash
npm run test
```

Test files are located alongside source files with `.test.ts` extension:
- `quartz/components/scripts/search.test.ts`
- `quartz/util/fileTrie.test.ts`
- `quartz/util/path.test.ts`
