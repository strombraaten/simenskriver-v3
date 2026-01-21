# Writing Guide for Wayward

A quick reference guide for writing posts, notes, and content in this Quartz blog.

## Table of Contents

- [Content Structure & Types](#content-structure--types)
- [Type & Why Matrix](#type--why-matrix)
- [Frontmatter Essentials](#frontmatter-essentials)
- [Wikilinks & Aliases](#wikilinks--aliases)
- [Callouts](#callouts)
- [Transclusion](#transclusion)
- [Block References](#block-references)
- [Highlights](#highlights)
- [Permalinks](#permalinks)
- [Image Embedding](#image-embedding)
- [Block References](#block-references)

---

## Content Structure & Types

Wayward organizes content into four main types, each serving a distinct purpose in your digital garden.

### Types

1. **Tanker** (`content/tanker/`)
   - Quick, fleeting thoughts
   - Stream-like, chronological
   - Small observations, moments, links, quotes
   - Examples: "The neon reflection on the wet Shibuya street tonight...", "Hot take: modern trailers ruin movies"

2. **Oppslagsverk** (`content/oppslagsverk/`)
   - Reference material, kept notes, summaries
   - Building blocks and inputs
   - Personal library of notes worth keeping
   - Examples: List of T&S papers, travel notes, analysis summaries

3. **Utkast** (`content/utkast/`)
   - Ideas in progress, exploratory thinking
   - Writing-as-thinking
   - May or may not evolve into something more
   - Examples: "Do platforms over-index on safety at the cost of speech?", "Exploring how I want my Wayward Garden to function"

4. **Notater** (`content/notater/`)
   - Complete, coherent long-form writing
   - Essays, guides, reflections, arguments
   - Intended to be finished (even if still forming)
   - Examples: "How deepfake policy should evolve in 2026", "Tokyo: A guide for introverts who travel alone"

### Why Values

The `why` field captures the purpose behind your writing:

- **`keep`** - Things you don't want to lose
- **`remember`** - Things you want to remember
- **`think`** - Exploring an idea or concept
- **`work-out`** - Forming a position or constructing reasoning
- **`share`** - Writing meant for others

---

## Type & Why Matrix

Not all `why` values make sense for every `type`. Here's a guide to natural combinations:

| Type | keep | remember | think | work-out | share |
|------|------|----------|-------|----------|-------|
| **tanke** | ✔✔ | ✔✔ | ✔ | (rare) | ✔ |
| **oppslagsverk** | ✔✔✔ | ✔✔ | ✔✔ | ✔✔ | ✔ |
| **utkast** | (rare) | (rare) | ✔✔✔ | ✔✔✔ | ✔ |
| **notat** | (no) | (rare) | ✔ | ✔✔ | ✔✔✔ |

**Legend:**
- ✔✔✔ = Very natural
- ✔✔ = Common
- ✔ = Possible
- (rare)/(no) = Doesn't really fit the type's purpose

### Examples by Type

#### Tanker
```yaml
---
type: tanke
why: keep          # "Great article on digital gardens"
why: remember      # "The neon reflection on the wet Shibuya street tonight..."
why: think         # "Is moderation of AI content actually making policy more brittle?"
why: share         # "Hot take: modern trailers ruin movies"
---
```

#### Oppslagsverk
```yaml
---
type: oppslagsverk
why: keep          # "List of good T&S papers"
why: remember      # "My impressions of Prague cafés (notes for myself)"
why: think         # Analysis notes, like your deepfake policy summary
why: work-out      # Outline of a future essay on "unwanted sexualization"
why: share         # "My Interrail checklist & planning notes"
---
```

#### Utkast
```yaml
---
type: utkast
why: think         # "Do platforms over-index on safety at the cost of speech?"
why: work-out      # "Should deepfake sexual imagery require a complaint to action?"
why: share         # "Exploring how I want my Wayward Garden to function"
---
```

#### Notater
```yaml
---
type: notat
stage: forming      # or: done
why: share          # "How deepfake policy should evolve in 2026"
why: work-out       # "Why reactive moderation fails creators"
why: think          # "Why I feel more comfortable writing about T&S than anything else"
---
```

### Golden Rules

1. **Tanker er for nå** - Keep / remember / small think / small share
2. **Oppslagsverk er for å referere til seinere** - All five why values work
3. **Utkast er for utviklende tanker** - Think heavily + work-out
4. **Notater er for å uttrykke tanker** - Share primarily, sometimes work-out

---

## Minimal Callouts
This theme includes a minimal callout style for a cleaner look.

### Syntax

> [minimal-tip]> Your tip content here> [minimal-note]> Your note content here

### Available Types

[minimal-tip] - Tips and hints
[minimal-note] - General notes
[minimal-warning] - Warnings
[minimal-info] - Informational content
[minimal-quote] - Quotes (styled differently)
[minimal-success] - Success messages
[minimal-question] - Questions

### Examples

> [minimal-tip]
> This is a minimal tip callout with a cleaner, more subtle design.

> [minimal-quote]
> This is a quote styled with the minimal callout system.

> [minimal-note]
> A simple note using the minimal style.

---


## Wikilinks & Aliases

### Basic Wikilinks

```markdown
[[path-to-file]]                    # Link to a file
[[path-to-file | Custom Link Text]] # Link with custom display text
[[path-to-file#Section Header]]     # Link to a specific section
```

### Using Aliases for Title-Based Linking

Since Quartz resolves links by file paths/slugs (not titles), you can use **aliases** in frontmatter to link using page titles:

**In the target file's frontmatter:**
```yaml
---
title: Adventures in Athens
aliases:
  - "Adventures in Athens"
  - "Athens Snapshot"
---
```

**Then you can link using:**
```markdown
[[Adventures in Athens]]  # Works because of the alias!
```

**Note:** With `markdownLinkResolution: "shortest"`, if a filename is unique, you can use just the filename. Otherwise, use the full path or set up aliases.

---

## Callouts

Callouts are great for emphasizing important information, tips, warnings, and more.

### Basic Syntax

```markdown
> [!type] Optional Title
> Your callout content here
```

### Available Types

- `note` - General notes
- `abstract` / `summary` / `tldr` - Summaries
- `info` - Informational content
- `tip` / `hint` / `important` - Tips and hints
- `success` / `check` / `done` - Success messages
- `question` / `help` / `faq` - Questions
- `warning` / `attention` / `caution` - Warnings
- `failure` / `missing` / `fail` - Failures
- `danger` / `error` - Critical errors
- `bug` - Bug reports
- `example` - Examples
- `quote` / `cite` - Quotes

### Collapsible Callouts

```markdown
> [!tip]+ Expanded by default
> This callout is expanded when the page loads

> [!warning]- Collapsed by default
> This callout is collapsed when the page loads
```

### Examples

```markdown
> [!tip] Writing Tip
> Use callouts to make important information stand out!

> [!warning] Important
> Remember to set your permalink if you want a permanent URL.

> [!note]
> This is a simple note without a title.
```

---

## Transclusion

Transclusion lets you embed entire pages or sections from other files into your current page.

### Embed Entire Page

```markdown
![[path-to-file]]
```

### Embed Specific Section

```markdown
![[path-to-file#Section Header]]
```

This will embed everything under that header (including subsections).

### Embed Specific Block

```markdown
![[path-to-file#^block-id]]
```

**Note:** Block IDs are automatically generated by Quartz. You can reference them from the source file.

### Use Cases

- Embedding reusable content (like a "About the Author" section)
- Including excerpts from other posts
- Creating composite pages from multiple sources

---

## Block References

Link to or embed specific blocks (paragraphs, sections) in other pages, even when they don't have headings.

### Syntax

**Link to a block:**
```markdown
[[path-to-file#^block-id]]
```

**Embed/transclude a block:**
```markdown
![[path-to-file#^block-id]]
```

### How Block IDs Work

- Quartz automatically generates block IDs for content blocks
- You can find block IDs by inspecting the HTML or using developer tools
- Block IDs typically look like `^b15695` or similar

### Example

If you have a specific quote or paragraph in another file that you want to reference:

```markdown
As I mentioned [[in-retrospect-2024#^specific-block]], this was an important moment.
```

Or embed it directly:

```markdown
![[in-retrospect-2024#^specific-block]]
```

### Block Reference Styling

Block references (transcludes) are styled with a minimal, sleek design:
- Subtle left accent line
- Clean typography
- Source link with arrow indicator
- Designed to integrate seamlessly with your content

---

## Highlights

Highlight important text within your content.

### Syntax

```markdown
==This text will be highlighted==
```

### Example

```markdown
This is normal text, but ==this is highlighted== for emphasis.
```

**Note:** Highlights are styled with a warm yellow background by default, matching your site's theme.

---

## Permalinks

Set a permanent URL for a page that won't change even if you move or rename the file.

### Usage

Add to frontmatter:

```yaml
---
title: My Post Title
permalink: my-permanent-url
---
```

### Benefits

- **SEO-friendly**: URLs stay consistent
- **External linking**: Safe to share - won't break if you reorganize
- **Migration-proof**: Can move files without breaking links

### Example

```yaml
---
title: Adventures in Thailand
permalink: thailand-adventures-2024
published: 2024-01-15
---
```

Even if you later move this file to `content/Travel/2024/thailand.md`, the URL will remain `/thailand-adventures-2024`.

---

## Frontmatter Essentials

Frontmatter varies by content type. Here are the essential fields for each:

### Tanker

```yaml
---
type: tanke
why: keep          # or: remember, think, share
date: 2025-02-20   # Date for chronological sorting
title: Optional title (filename used if omitted)
---
```

### Oppslagsverk

```yaml
---
type: oppslagsverk
why: remember      # or: keep, think, work-out, share
title: Your Note Title
published: 2025-02-20
tags:
  - Reference
  - T&S
---
```

### Utkast

```yaml
---
type: utkast
why: think         # or: work-out, share
title: Your Notion Title
published: 2025-02-20
tags:
  - Policy
  - Exploration
---
```

### Notater

```yaml
---
type: notat
stage: forming     # or: done
why: share         # or: work-out, think
title: Your Writing Title
published: 2025-02-20
modified: 2025-02-21
tags:
  - Travel
  - Reflection
aliases:
  - "Alternative Title"
permalink: my-permanent-url
draft: false
---
```

### Common Fields (All Types)

- **`type`**: Required - `tanke`, `oppslagsverk`, `utkast`, or `notat`
- **`why`**: Required - `keep`, `remember`, `think`, `work-out`, or `share` (see matrix above)
- **`title`**: Page title (if omitted, uses filename)
- **`published`**: Publication date (YYYY-MM-DD)
- **`modified`**: Last modified date (optional, for writings)
- **`stage`**: Optional - Only for notater (`forming` or `done`)
- **`tags`**: List of tags for categorization
- **`aliases`**: Alternative names for linking (see Wikilinks section)
- **`permalink`**: Permanent URL (optional but recommended for notater)
- **`draft: true`**: Keeps page private (won't be published)
- **`date`**: For tanker - used for chronological sorting in stream view

---

## Image Embedding

### Basic Image Embedding

```markdown
![[image.jpg]]
```

Or using standard Markdown:

```markdown
![Alt text description](path/to/image.jpg)
```

### Image Layouts & Editorial Control

By default, images are **centered** for a calmer reading experience. You can control individual image layouts using a simple syntax in the alt text:

#### Wide Image (Full Width, Centered, Height Limited)
Perfect for landscape/wide images that deserve prominence:

```markdown
![Description|wide](image.jpg)
```

Or with wikilinks:
```markdown
![[image.jpg|wide]]
```

- Full width, centered
- Max height: 60vh
- `object-fit: cover` for best display

#### Center Image (Medium Width, Centered)
For balanced standalone images:

```markdown
![Description|center](image.jpg)
```

- 70% width, max 600px
- Centered
- Max height: 70vh

#### Small Image (Smaller Floating)
For subtle integration with text:

```markdown
![Description|small](image.jpg)
```

- 30% width, max 280px
- Floats with text (alternating left/right)
- Smaller than default floating images

#### Full Image (Maximum Impact)
For images that should dominate:

```markdown
![Description|full](image.jpg)
```

- Full width, no float
- Max height: 80vh
- Centered, maximum visual impact

#### Default Behavior (Floating with Text)
Regular markdown images automatically float with text:

```markdown
![Description](image.jpg)
```

- 40% width, max 380px
- Alternates left/right
- Text wraps around naturally

**Note:** You can also use HTML with classes if you prefer: `<img class="image-wide" src="..." alt="...">`

### Image Galleries

Two or more consecutive images automatically form a gallery:

```markdown
![](image1.jpg)
![](image2.jpg)
![](image3.jpg)
```

Galleries use a bento-style grid layout with lightbox functionality.

### Hero Images

Add a hero image that appears at the top of your post (after title/metadata, before content):

```yaml
---
title: My Post
heroImage: /path/to/hero.jpg
# OR
hero: /path/to/hero.jpg
# OR
coverImage: /path/to/hero.jpg
---
```

### With Custom Dimensions (Wikilinks)

```markdown
![[image.jpg|800x600]]
```

### Image Popovers

Images embedded via wikilinks can be viewed as popovers when hovered (just like page links).

### Lightbox

All images support lightbox functionality - click any image to view it full-size in a modal overlay.

---

## Quick Tips

1. **Use aliases liberally**: Makes linking much easier, especially for files with long or technical names
2. **Set permalinks for important posts**: Ensures URLs never break
3. **Use callouts for emphasis**: Better than bold text for important information
4. **Transclude reusable content**: Create shared sections (like author bios) and embed them
5. **Tag consistently**: Use the same tag names across posts for better organization
6. **Draft mode**: Use `draft: true` to work on posts privately before publishing

---

## Common Patterns

### Linking to a Post with Custom Text

```markdown
As I [[in-retrospect-2024 | wrote about before]], this was significant.
```

### Embedding a Quote from Another Post

```markdown
> [!quote]
> ![[other-post#^quote-block-id]]
```

### Creating a Series of Posts

Use consistent tags and aliases:

```markdown
---
title: Travel Series Part 1
tags:
  - Travel
  - Series
aliases:
  - "Travel Series 1"
---
```

Then link between them:
```markdown
This is part 1. See also [[Travel Series 2]] and [[Travel Series 3]].
```

---

---

## Quick Reference: Content Type Decision Tree

**Is it a quick, fleeting thought?**
- Yes → **Tanke** (`why: keep` or `remember`)

**Is it reference material or a building block?**
- Yes → **Oppslagsverk** (`why: keep`, `remember`, `think`, `work-out`, or `share`)

**Is it exploratory thinking that may never become finished?**
- Yes → **Utkast** (`why: think` or `work-out`)

**Is it intended to be a complete, coherent piece?**
- Yes → **Notat** (`why: share`, `stage: forming` or `done`)

---

*Last updated: 2025-02-20*

