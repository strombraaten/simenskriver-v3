import { FullSlug, resolveRelative, slugTag } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import style from "./styles/tagList.scss"

const TagList: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const tags = fileData.frontmatter?.tags
  // Filter out "Tanker" tag when displaying Tanker pages (it's only for graph connectivity)
  const isTanke = fileData.frontmatter?.type === "tanke"
  const displayTags = tags?.filter((tag) => !(isTanke && tag === "Tanker")) ?? []
  
  if (displayTags.length > 0) {
    return (
      <div class={classNames(displayClass, "tag-list-wrapper")}>
        <p class="tag-intro">This relates to:</p>
        <ul class="tags">
          {displayTags.map((tag) => {
            // Display original tag name, but slugify for URL
            const tagSlug = slugTag(tag)
            const linkDest = resolveRelative(fileData.slug!, `tags/${tagSlug}` as FullSlug)
            return (
              <li>
                <a href={linkDest} class="internal tag-link">
                  {tag}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  } else {
    return null
  }
}

TagList.css = style

export default (() => TagList) satisfies QuartzComponentConstructor
