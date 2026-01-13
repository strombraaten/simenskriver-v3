import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { classNames } from "../../util/lang"
import { QuartzPluginData } from "../../plugins/vfile"
import { Root } from "hast"
import { htmlToJsx } from "../../util/jsx"
import { ComponentChildren } from "preact"
import { FullSlug, resolveRelative, slugTag } from "../../util/path"

export default (() => {
  const ThingsFeed: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
    tree,
  }: QuartzComponentProps) => {
  const things = allFiles
    .filter((file) => {
      const slug = file.slug ?? ""
      const fm = file.frontmatter ?? {}
      return (
        slug.startsWith("tanker/") &&
        !slug.endsWith("/index") &&
        fm.type === "tanke"
      )
    })
    .sort((a, b) => {
      const da = a.dates?.published ?? a.dates?.created
      const db = b.dates?.published ?? b.dates?.created
      return (db?.getTime() ?? 0) - (da?.getTime() ?? 0)
    })

  // Collect all unique tags and why values for filtering
  const allTags = new Set<string>()
  const allWhyValues = new Set<string>()
  
  things.forEach((file) => {
    const fm = file.frontmatter ?? {}
    const tags = (fm.tags as string[] | undefined) ?? []
    tags.forEach((tag) => allTags.add(tag))
    
    const why = Array.isArray(fm.why) ? fm.why : (fm.why ? [fm.why] : [])
    why.forEach((w) => {
      if (typeof w === "string") allWhyValues.add(w)
    })
  })

  // Filter out "Tanker" tag since we're already on the Tanker page - it's redundant
  const sortedTags = Array.from(allTags).filter(tag => tag !== "Tanker").sort()
  const sortedWhy = Array.from(allWhyValues).sort()

  // Get rendered content from index.md (the subline)
  const content: ComponentChildren =
    (tree as Root).children.length > 0
      ? htmlToJsx(fileData.filePath!, tree as Root)
      : fileData.description || null

  return (
    <div class="popover-hint things-wrapper">
      <article>{content}</article>
      <main class={classNames(displayClass, "things-page")}>
        <div class="things-header">
          <div class="things-header__inner">
            <nav class="things-filter" aria-label="Filter things">
            <select class="things-filter__select" id="things-filter-select">
              <option value="all">All</option>
              {sortedWhy.length > 0 && (
                <optgroup label="Why">
                  {sortedWhy.map((why) => {
                    const whyText: Record<string, string> = {
                      keep: "keep",
                      remember: "remember",
                      think: "think",
                      "work-out": "work out",
                      share: "share",
                    }
                    return (
                      <option
                        value={`why:${why}`}
                        key={why}
                      >
                        {whyText[why] || why}
                      </option>
                    )
                  })}
                </optgroup>
              )}
              {sortedTags.length > 0 && (
                <optgroup label="Tags">
                  {sortedTags.map((tag) => (
                    <option
                      value={`tag:${tag}`}
                      key={tag}
                    >
                      {tag}
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
          </nav>
          </div>
        </div>

        <section class="things-feed" aria-label="Things feed">
        {things.map((file) => {
          const fm = file.frontmatter ?? {}
          const why = Array.isArray(fm.why) ? fm.why : (fm.why ? [fm.why] : [])
          const tags = (fm.tags as string[] | undefined) ?? []

          const date = file.dates?.published ?? file.dates?.created
          const formattedDate =
            date &&
            date.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })

          // Get rendered content from htmlAst
          const thingTree = (file as any).htmlAst as Root | undefined
          const thingContent: ComponentChildren =
            thingTree && thingTree.children.length > 0
              ? htmlToJsx(file.filePath!, thingTree)
              : file.description || null

          return (
            <article
              class={classNames("thing-card")}
              data-why={why.map((w: string) => String(w)).join(",")}
              data-tags={tags.join(",")}
              key={file.slug}
            >
              <header class="thing-card__meta">
                <div class="thing-card__meta-left">
                  {formattedDate && (
                    <time
                      class="thing-card__date"
                      dateTime={date?.toISOString()}
                    >
                      {formattedDate}
                    </time>
                  )}
                </div>
                <div class="thing-card__meta-right">
                  {why.length > 0 && (
                    <span class="thing-card__why">
                      This is to: <span class="thing-card__why-value">
                        {why.map((w: string) => {
                          const whyText: Record<string, string> = {
                            keep: "keep",
                            remember: "remember",
                            think: "think",
                            "work-out": "work out",
                            share: "share",
                          }
                          return whyText[w] || w
                        }).join(", ")}
                      </span>
                    </span>
                  )}
                  {/* Hide tags section for Things - they're all tagged with "Things" which doesn't need to be displayed */}
                </div>
              </header>

              <div class="thing-card__body">
                {thingContent || <p class="things-empty">No content</p>}
              </div>
            </article>
          )
        })}
      </section>

      <script
        dangerouslySetInnerHTML={{
          __html: `
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("things-filter-select")
  const cards = Array.from(document.querySelectorAll(".thing-card"))

  if (!select || !cards.length) return

  select.addEventListener("change", (e) => {
    const value = e.target.value

    cards.forEach((card) => {
      const cardWhy = (card.dataset.why || "").split(",").filter(Boolean)
      const cardTags = (card.dataset.tags || "").split(",").filter(Boolean)

      let shouldShow = false

      if (value === "all") {
        shouldShow = true
      } else if (value.startsWith("why:")) {
        const whyValue = value.replace("why:", "")
        shouldShow = cardWhy.includes(whyValue)
      } else if (value.startsWith("tag:")) {
        const tagValue = value.replace("tag:", "")
        shouldShow = cardTags.includes(tagValue)
      }

      if (shouldShow) {
        card.style.display = ""
      } else {
        card.style.display = "none"
      }
    })
  })
})
          `,
        }}
      />
      </main>
    </div>
  )
}

const thingsCss = `
/* ====== THINGS PAGE – OVERALL LAYOUT ====== */

/* Ensure ArticleTitle is visible on Things page - minimal override */
/* Let default styles handle positioning and spacing */
.page-header .popover-hint .article-title {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
}

/* Scope styles to only ThingsFeed's popover-hint, not the page-header one */
/* Match the structure of FolderContent exactly - no extra margins/padding */
.popover-hint.things-wrapper {
  max-width: 900px;
  margin: 0 auto !important; /* Ensure no top margin that could affect visual spacing */
  padding: 0 2.5rem;
  width: 100%;
  box-sizing: border-box;
}

.popover-hint.things-wrapper > article {
  margin-bottom: 2rem;
  margin-top: 0;
}

.popover-hint.things-wrapper > article p {
  font-size: 0.95rem;
  opacity: 0.75;
  max-width: 32rem;
  margin: 0;
  line-height: 1.6;
}

.things-page {
  max-width: 980px;
  margin: 0 auto 4rem;
  padding: 2.5rem 1.5rem 4rem;
  box-sizing: border-box;
}

.things-header {
  margin-bottom: 0;
}

.things-header__inner {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.things-content {
  font-size: 0.95rem;
  opacity: 0.75;
  max-width: 32rem;
  margin: 0;
  line-height: 1.6;
}

.things-content p {
  margin: 0;
}

/* ====== FILTER STRIP ====== */

.things-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.things-filter__item {
  border-radius: 999px;
  border: 1px solid transparent;
  background: transparent;
  padding: 0.2rem 0.7rem;
  font-size: 0.78rem;
  cursor: pointer;
  opacity: 0.65;
  transition: opacity 120ms ease, border-color 120ms ease, background 120ms ease;
}

.things-filter__item:hover {
  opacity: 1;
}

.things-filter__item.is-active {
  opacity: 1;
  border-color: rgba(253, 186, 116, 0.7);
  background: rgba(253, 186, 116, 0.09);
}

/* ====== FEED WRAPPER ====== */

.things-feed {
  max-width: 720px;
  margin: 2rem auto 0;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

/* ====== THING CARD ====== */

.thing-card,
.page > #quartz-body > .center article.thing-card {
  border-radius: 16px !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  background: rgba(12, 8, 5, 0.96) !important;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.6) !important;
  padding: 1rem 1.25rem 1.1rem !important;
  transition: transform 120ms ease-out, box-shadow 120ms ease-out, border-color 120ms ease-out !important;
  max-width: none !important;
  width: 100% !important;
}

.thing-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
  border-color: rgba(253, 186, 116, 0.7);
}

/* ====== CARD META ====== */

.thing-card__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding-bottom: 0.4rem;
  margin-bottom: 0.55rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
}

.thing-card__date {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.65;
}

.thing-card__meta-right {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.thing-card__why-pill {
  font-size: 0.7rem;
  text-transform: lowercase;
  padding: 0.18rem 0.55rem;
  border-radius: 999px;
  background: rgba(253, 186, 116, 0.2);
  opacity: 0.95;
}

.thing-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.thing-card__tags li {
  font-size: 0.7rem;
  padding: 0.18rem 0.5rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
}

/* ====== CARD BODY ====== */

.thing-card__body {
  font-size: 0.96rem;
  line-height: 1.6;
}

.thing-card__body p {
  margin: 0 0 0.55rem 0;
}

.thing-card__body p:last-child {
  margin-bottom: 0;
}

/* Images: thumbnails, not heroes - HIGH SPECIFICITY to override global styles */
.things-page .thing-card .thing-card__body img,
.page > #quartz-body > .center article.thing-card .thing-card__body img,
.thing-card__body img {
  display: block !important;
  width: 100% !important;
  height: 240px !important;
  object-fit: cover !important;
  border-radius: 10px !important;
  margin: 0.4rem 0 0.35rem !important;
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.75) !important;
}

/* YouTube / iframes: responsive 16:9 */
.thing-card__body iframe {
  width: 100%;
  aspect-ratio: 16 / 9;
  border: none;
  border-radius: 10px;
  margin: 0.4rem 0 0.35rem;
}

/* Links inside Things */
.thing-card__body a {
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
}

/* Make sure it behaves on small screens */
@media (max-width: 700px) {
  .things-page {
    padding-inline: 1.1rem;
  }

  .things-feed {
    margin-top: 1.5rem;
  }

  .thing-card {
    padding-inline: 1rem;
  }
}

/* Dark mode */
:root[saved-theme="dark"] {
  .thing-card {
    background: rgba(10, 7, 4, 0.96);
    border-color: rgba(255, 255, 255, 0.06);
    box-shadow: 0 16px 30px rgba(0, 0, 0, 0.55);
  }

  .thing-card:hover {
    border-color: rgba(253, 186, 116, 0.7);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.65);
  }
}
`

  ThingsFeed.css = thingsCss
  
  return ThingsFeed
}) satisfies QuartzComponentConstructor

