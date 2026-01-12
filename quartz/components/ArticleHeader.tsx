import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { formatDate, getDate } from "./Date"
import readingTime from "reading-time"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"
import { FullSlug, resolveRelative } from "../util/path"
import { JSX } from "preact"
import style from "./styles/articleHeader.scss"

export default ((): QuartzComponentConstructor => {
  function ArticleHeader({ cfg, fileData, displayClass }: QuartzComponentProps) {
    // Don't show on index page
    if (fileData.slug === "index") {
      return null
    }

    const title = fileData.frontmatter?.title
    if (!title) {
      return null
    }

    const text = fileData.text
    const dates = fileData.dates
    const tags = fileData.frontmatter?.tags ?? []
    const hideReadingTime = fileData.frontmatter?.hideReadingTime === true
    const hideDate = fileData.frontmatter?.hideDate === true

    let readingTimeText: string | null = null
    if (text && !hideReadingTime) {
      const { minutes } = readingTime(text)
      readingTimeText = i18n(cfg.locale).components.contentMeta.readingTime({
        minutes: Math.ceil(minutes),
      })
    }

    // Use published date if available, otherwise fall back to created
    const publishedDate = dates?.published || dates?.created
    const modifiedDate = dates?.modified

    // Only show updated date if it's different from published date
    const showUpdated = modifiedDate && publishedDate && 
      modifiedDate.getTime() !== publishedDate.getTime()

    return (
      <header class={classNames(displayClass, "article-header")}>
        <h1 class="article-title">{title}</h1>
        
        <div class="article-meta">
          {publishedDate && !hideDate && (
            <time datetime={publishedDate.toISOString()} class="meta-item">
              {formatDate(publishedDate, cfg.locale)}
            </time>
          )}
          {readingTimeText && (
            <span class="meta-item">{readingTimeText}</span>
          )}
          {showUpdated && modifiedDate && !hideDate && (
            <span class="meta-item updated">
              Updated {formatDate(modifiedDate, cfg.locale)}
            </span>
          )}
        </div>
      </header>
    )
  }

  ArticleHeader.css = style

  return ArticleHeader
}) satisfies QuartzComponentConstructor

