import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { byDateAndAlphabetical } from "./PageList"
import style from "./styles/recentNotes.scss"
import { Date, getDate } from "./Date"
import { GlobalConfiguration } from "../cfg"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

interface Options {
  title?: string
  limit: number
  showTags: boolean
  showDate?: boolean // If false, hide dates (default: true)
}

const defaultOptions = (cfg: GlobalConfiguration): Options => ({
  limit: 10,
  showTags: false,
  showDate: true,
})

export default ((userOpts?: Partial<Options>) => {
  const Pinned: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const opts = { ...defaultOptions(cfg), ...userOpts }
    
    // Filter for pinned posts - check if frontmatter has pin field that's truthy
    const pinnedPages = allFiles
      .filter((f) => {
        const pin = f.frontmatter?.pin
        return pin !== undefined && pin !== null && pin !== false && pin !== 0 && pin !== ""
      })
      .sort(byDateAndAlphabetical(cfg))
      .slice(0, opts.limit)

    if (pinnedPages.length === 0) {
      return null
    }

    return (
      <div class={classNames(displayClass, "recent-notes")}>
        <h3>{opts.title ?? "Pinned"}</h3>
        <ul class="recent-ul">
          {pinnedPages.map((page) => {
            const title = page.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title
            const tags = page.frontmatter?.tags ?? []

            return (
              <li class="recent-li">
                <div class="section">
                  <div class="desc">
                    <h3>
                      <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal" data-no-popover="true">
                        {title}
                      </a>
                    </h3>
                  </div>
                  {opts.showDate !== false && page.dates && (
                    <p class="meta">
                      <Date date={getDate(cfg, page)!} locale={cfg.locale} />
                    </p>
                  )}
                  {opts.showTags && (
                    <ul class="tags">
                      {tags.map((tag) => (
                        <li>
                          <a
                            class="internal tag-link"
                            href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
                            data-no-popover="true"
                          >
                            {tag}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  Pinned.css = style
  return Pinned
}) satisfies QuartzComponentConstructor

