import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, SimpleSlug, resolveRelative, slugTag } from "../util/path"
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
  linkToMore: SimpleSlug | false
  showTags: boolean
  filter: (f: QuartzPluginData) => boolean
  sort: (f1: QuartzPluginData, f2: QuartzPluginData) => number
  showUpdatedPrefix?: boolean // If true, show "Updated" prefix for notes
  showDate?: boolean // If false, hide dates (default: true)
}

const defaultOptions = (cfg: GlobalConfiguration): Options => ({
  limit: 3,
  linkToMore: false,
  showTags: true,
  filter: () => true,
  sort: byDateAndAlphabetical(cfg),
  showUpdatedPrefix: false,
  showDate: true,
})

export default ((userOpts?: Partial<Options>) => {
  const RecentNotes: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const opts = { ...defaultOptions(cfg), ...userOpts }
    const pages = allFiles.filter(opts.filter).sort(opts.sort)
    const remaining = Math.max(0, pages.length - opts.limit)
    return (
      <div class={classNames(displayClass, "recent-notes")}>
        <h3>{opts.title ?? i18n(cfg.locale).components.recentNotes.title}</h3>
        <ul class="recent-ul">
          {pages.slice(0, opts.limit).map((page) => {
            const title = page.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title
            const tags = page.frontmatter?.tags ?? []
            return (
              <li class="recent-li">
                <div class="section">
                  <div class="desc">
                    <h3>
                      <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal sidebar-link" data-no-popover="true">
                        {title}
                      </a>
                    </h3>
                  </div>
                  {opts.showDate !== false && page.dates && (() => {
                    const publishedDate = page.dates?.published || page.dates?.created
                    const modifiedDate = page.dates?.modified
                    
                    // For notes: use more recent of published/updated, show "Updated" prefix
                    // For writings: just show published date
                    let displayDate = publishedDate
                    let showUpdated = false
                    
                    if (opts.showUpdatedPrefix && modifiedDate && publishedDate) {
                      // Use the more recent date
                      if (modifiedDate.getTime() > publishedDate.getTime()) {
                        displayDate = modifiedDate
                        showUpdated = true
                      } else {
                        displayDate = publishedDate
                        showUpdated = true
                      }
                    }
                    
                    return (
                    <p class="meta">
                        {showUpdated && "Updated "}
                        <Date date={displayDate!} locale={cfg.locale} />
                    </p>
                    )
                  })()}
                  {opts.showTags && (
                    <ul class="tags">
                      {tags.map((tag) => {
                        // Display original tag name, but slugify for URL
                        const tagSlug = slugTag(tag)
                        return (
                        <li>
                          <a
                            class="internal tag-link"
                              href={resolveRelative(fileData.slug!, `tags/${tagSlug}` as FullSlug)}
                              data-no-popover="true"
                          >
                            {tag}
                          </a>
                        </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
        {opts.linkToMore && remaining > 0 && (
          <p>
            <a href={resolveRelative(fileData.slug!, opts.linkToMore)}>
              {i18n(cfg.locale).components.recentNotes.seeRemainingMore({ remaining })}
            </a>
          </p>
        )}
      </div>
    )
  }

  RecentNotes.css = style
  return RecentNotes
}) satisfies QuartzComponentConstructor
