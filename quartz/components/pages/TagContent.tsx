import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import style from "../styles/listPage.scss"
import { PageList, SortFn } from "../PageList"
import { FullSlug, getAllSegmentPrefixes, resolveRelative, simplifySlug, slugTag } from "../../util/path"
import { QuartzPluginData } from "../../plugins/vfile"
import { Root } from "hast"
import { htmlToJsx } from "../../util/jsx"
import { i18n } from "../../i18n"
import { ComponentChildren } from "preact"
import { concatenateResources } from "../../util/resources"

interface TagContentOptions {
  sort?: SortFn
  numPages: number
}

const defaultOptions: TagContentOptions = {
  numPages: 10,
}

export default ((opts?: Partial<TagContentOptions>) => {
  const options: TagContentOptions = { ...defaultOptions, ...opts }

  const TagContent: QuartzComponent = (props: QuartzComponentProps) => {
    const { tree, fileData, allFiles, cfg } = props
    const slug = fileData.slug

    if (!(slug?.startsWith("tags/") || slug === "tags")) {
      throw new Error(`Component "TagContent" tried to render a non-tag page: ${slug}`)
    }

    const tagSlug = simplifySlug(slug.slice("tags/".length) as FullSlug)
    // Match files by comparing slugified versions of their tags with the tag slug from URL
    const allPagesWithTag = (tagSlug: string) =>
      allFiles.filter((file) => {
        const fileTags = file.frontmatter?.tags ?? []
        return fileTags
          .flatMap(getAllSegmentPrefixes)
          .some((originalTag) => slugTag(originalTag) === tagSlug)
      })

    const content = (
      (tree as Root).children.length === 0
        ? fileData.description
        : htmlToJsx(fileData.filePath!, tree)
    ) as ComponentChildren
    const cssClasses: string[] = fileData.frontmatter?.cssclasses ?? []
    const classes = cssClasses.join(" ")
    if (tagSlug === "/") {
      // Collect unique tags by slugified version, but track originals for display
      const tagSlugSet = new Set<string>()
      const tagSlugToOriginal = new Map<string, string>()
      
      allFiles.forEach((data) => {
        const tags = data.frontmatter?.tags ?? []
        tags.flatMap(getAllSegmentPrefixes).forEach((originalTag) => {
          const slug = slugTag(originalTag)
          tagSlugSet.add(slug)
          if (!tagSlugToOriginal.has(slug)) {
            tagSlugToOriginal.set(slug, originalTag)
          }
        })
      })
      
      const sortedTagSlugs = Array.from(tagSlugSet).sort((a, b) => {
        const origA = tagSlugToOriginal.get(a) ?? a
        const origB = tagSlugToOriginal.get(b) ?? b
        return origA.localeCompare(origB)
      })
      
      const tagItemMap: Map<string, QuartzPluginData[]> = new Map()
      for (const slug of sortedTagSlugs) {
        tagItemMap.set(slug, allPagesWithTag(slug))
      }
      return (
        <div class="popover-hint">
          <article class={classes}>
            <p>{content}</p>
          </article>
          <p>{i18n(cfg.locale).pages.tagContent.totalTags({ count: sortedTagSlugs.length })}</p>
          <div>
            {sortedTagSlugs.map((slug) => {
              const pages = tagItemMap.get(slug)!
              const originalTag = tagSlugToOriginal.get(slug) ?? slug
              const listProps = {
                ...props,
                allFiles: pages,
              }

              const contentPage = allFiles.filter((file) => file.slug === `tags/${slug}`).at(0)

              const root = contentPage?.htmlAst
              const content =
                !root || root?.children.length === 0
                  ? contentPage?.description
                  : htmlToJsx(contentPage.filePath!, root)

              const tagListingPage = `/tags/${slug}` as FullSlug
              const href = resolveRelative(fileData.slug!, tagListingPage)

              return (
                <div>
                  <h2>
                    <a class="internal tag-link" href={href}>
                      {originalTag}
                    </a>
                  </h2>
                  {content && <p>{content}</p>}
                  <div class="page-listing">
                    <p>
                      {i18n(cfg.locale).pages.tagContent.itemsUnderTag({ count: pages.length })}
                      {pages.length > options.numPages && (
                        <>
                          {" "}
                          <span>
                            {i18n(cfg.locale).pages.tagContent.showingFirst({
                              count: options.numPages,
                            })}
                          </span>
                        </>
                      )}
                    </p>
                    <PageList limit={options.numPages} {...listProps} sort={options?.sort} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    } else {
      const pages = allPagesWithTag(tagSlug)
      const listProps = {
        ...props,
        allFiles: pages,
      }

      return (
        <div class="popover-hint">
          <article class={classes}>{content}</article>
          <div class="page-listing">
            <p>{i18n(cfg.locale).pages.tagContent.itemsUnderTag({ count: pages.length })}</p>
            <div>
              <PageList {...listProps} sort={options?.sort} />
            </div>
          </div>
        </div>
      )
    }
  }

  TagContent.css = concatenateResources(style, PageList.css)
  return TagContent
}) satisfies QuartzComponentConstructor
