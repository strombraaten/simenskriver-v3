import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { formatDate } from "./Date"
import readingTime from "reading-time"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"
import { JSX } from "preact"
import style from "./styles/aboutThisPost.scss"

export default ((): QuartzComponentConstructor => {
  function AboutThisPost({ cfg, fileData, displayClass }: QuartzComponentProps) {
    // Don't show on index page
    if (fileData.slug === "index") {
      return null
    }

    const text = fileData.text
    const hideReadingTime = fileData.frontmatter?.hideReadingTime === true

    if (!text) {
      return null
    }

    let readingTimeText: string | null = null
    if (!hideReadingTime) {
      const { minutes } = readingTime(text)
      readingTimeText = i18n(cfg.locale).components.contentMeta.readingTime({
        minutes: Math.ceil(minutes),
      })
    }

    const dates = fileData.dates
    if (!dates) {
      return null
    }

    // Use published date if available, otherwise fall back to created
    const publishedDate = dates.published || dates.created
    const modifiedDate = dates.modified

    // Only show updated date if it's different from published date
    const showUpdated = modifiedDate && publishedDate && 
      modifiedDate.getTime() !== publishedDate.getTime()

    return (
      <div class={classNames(displayClass, "about-this-post")}>
        <h3>About this post</h3>
        <ul>
          {publishedDate && (
            <li>
              <span class="label">Published on</span>
              <time datetime={publishedDate.toISOString()}>
                {formatDate(publishedDate, cfg.locale)}
              </time>
            </li>
          )}
          {showUpdated && modifiedDate && (
            <li>
              <span class="label">Updated on</span>
              <time datetime={modifiedDate.toISOString()}>
                {formatDate(modifiedDate, cfg.locale)}
              </time>
            </li>
          )}
          {readingTimeText && (
            <li>
              <span class="label">Read time</span>
              <span>{readingTimeText}</span>
            </li>
          )}
        </ul>
      </div>
    )
  }

  AboutThisPost.css = style

  return AboutThisPost
}) satisfies QuartzComponentConstructor

