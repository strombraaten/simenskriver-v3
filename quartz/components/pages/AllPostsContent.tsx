import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import style from "../styles/listPage.scss"
import { PageList, SortFn, byDateAndAlphabetical } from "../PageList"
import { FullSlug, getAllSegmentPrefixes, resolveRelative, slugTag } from "../../util/path"
import { QuartzPluginData } from "../../plugins/vfile"
import { Root } from "hast"
import { htmlToJsx } from "../../util/jsx"
import { ComponentChildren } from "preact"
import { concatenateResources } from "../../util/resources"

interface AllPostsContentOptions {
  recentPostsLimit?: number
  sort?: SortFn
}

const defaultOptions: AllPostsContentOptions = {
  recentPostsLimit: 10,
}

export default ((opts?: Partial<AllPostsContentOptions>) => {
  const options: AllPostsContentOptions = { ...defaultOptions, ...opts }

  const AllPostsContent: QuartzComponent = (props: QuartzComponentProps) => {
    const { tree, fileData, allFiles, cfg } = props

    // Filter out index, tags, folder index pages, the all-posts page itself, files marked with excludeFromLists, and Things
    const allPosts = allFiles.filter((file) => {
      const slug = file.slug ?? ""
      // Exclude Things (they don't have titles and are stream-only)
      if (file.frontmatter?.type === "thing") {
        return false
      }
      // Exclude files marked with excludeFromLists
      if (file.frontmatter?.excludeFromLists === true) {
        return false
      }
      return (
        slug !== "index" &&
        slug !== "all-posts" &&
        !slug.startsWith("tags/") &&
        !slug.endsWith("/index") &&
        file.frontmatter?.title // Only include files with titles
      )
    })

    // Sort by date (most recent first)
    const sorter = options.sort ?? byDateAndAlphabetical(cfg)
    const sortedPosts = [...allPosts].sort(sorter)

    // Get recent posts (limited)
    const recentPosts = sortedPosts.slice(0, options.recentPostsLimit)

    // Get all tags with counts
    // Use slugified tags for uniqueness (so "In Retrospect" and "in-retrospect" are treated as same)
    // But store mapping from slugified tag to original tag names and posts
    const allTagSlugs = new Set<string>()
    const tagSlugToOriginal = new Map<string, string>() // slug -> original (first seen)
    const tagPostMap = new Map<string, QuartzPluginData[]>() // slug -> posts
    
    allPosts.forEach((file) => {
      const tags = file.frontmatter?.tags ?? []
      tags.forEach((originalTag) => {
        // Get all segment prefixes (for hierarchical tags like "Writing/Notes")
        const segments = getAllSegmentPrefixes(originalTag)
        segments.forEach((segment) => {
          const tagSlug = slugTag(segment)
          allTagSlugs.add(tagSlug)
          
          // Store original tag name (use first one we see if multiple variants exist)
          if (!tagSlugToOriginal.has(tagSlug)) {
            tagSlugToOriginal.set(tagSlug, segment)
          }
          
          // Map slugified tag to posts
          if (!tagPostMap.has(tagSlug)) {
            tagPostMap.set(tagSlug, [])
          }
          tagPostMap.get(tagSlug)!.push(file)
        })
      })
    })

    // Sort by original tag names (not slugs) for display
    const sortedTagSlugs = Array.from(allTagSlugs).sort((a, b) => {
      const origA = tagSlugToOriginal.get(a) ?? a
      const origB = tagSlugToOriginal.get(b) ?? b
      return origA.localeCompare(origB)
    })

    const content = (
      (tree as Root).children.length === 0
        ? fileData.description
        : htmlToJsx(fileData.filePath!, tree)
    ) as ComponentChildren
    const cssClasses: string[] = fileData.frontmatter?.cssclasses ?? []
    const classes = cssClasses.join(" ")

    return (
      <div class="popover-hint">
        <article class={classes}>{content}</article>
        
        {/* Recent Posts Section */}
        <div class="page-listing">
          <h2>Recent Posts</h2>
          <PageList
            {...props}
            allFiles={recentPosts}
            limit={options.recentPostsLimit}
            sort={sorter}
          />
        </div>

        {/* Explore by Tag Section */}
        <div class="page-listing" style="margin-top: 3rem;">
          <h2>Explore by Tag</h2>
          <div class="tag-list-all">
            {sortedTagSlugs.map((tagSlug, idx) => {
              const posts = tagPostMap.get(tagSlug) ?? []
              const originalTag = tagSlugToOriginal.get(tagSlug) ?? tagSlug
              const tagHref = resolveRelative(fileData.slug!, `tags/${tagSlug}` as FullSlug)
              return (
                <>
                  <a href={tagHref} class="internal tag-link-all">
                    {originalTag}({posts.length})
                  </a>
                  {idx < sortedTagSlugs.length - 1 && " "}
                </>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  AllPostsContent.css = concatenateResources(
    style,
    PageList.css,
    `
    .tag-list-all {
      display: block;
      margin-top: 1rem;
      line-height: 2;
      font-size: var(--size-body-small);
      color: var(--color-text);
      word-wrap: break-word;
    }
    
    // Override ALL possible tag link styles - be very aggressive
    .tag-list-all a,
    .tag-list-all a.tag-link-all,
    .tag-list-all a.internal,
    .tag-list-all a.internal.tag-link-all,
    .tag-list-all a.internal.tag-link {
      display: inline !important;
      color: var(--color-accent) !important;
      text-decoration: underline !important;
      text-decoration-color: var(--color-accent-soft) !important;
      text-underline-offset: 0.2em !important;
      font-size: inherit !important;
      font-weight: 400 !important;
      font-family: inherit !important;
      background: none !important;
      background-color: transparent !important;
      border: none !important;
      border-radius: 0 !important;
      padding: 0 !important;
      margin: 0 !important;
      box-shadow: none !important;
      outline: none !important;
      transition: color 0.2s ease, text-decoration-color 0.2s ease;
    }
    
    .tag-list-all a:hover,
    .tag-list-all a.tag-link-all:hover,
    .tag-list-all a.internal:hover,
    .tag-list-all a.internal.tag-link-all:hover,
    .tag-list-all a.internal.tag-link:hover {
      color: var(--tertiary) !important;
      text-decoration-color: var(--color-accent) !important;
      background: none !important;
      background-color: transparent !important;
      box-shadow: none !important;
    }
    
    // Remove any ::before pseudo-elements that might add "#" or other content
    .tag-list-all a::before,
    .tag-list-all a.tag-link-all::before,
    .tag-list-all a.internal::before,
    .tag-list-all a.internal.tag-link-all::before {
      content: none !important;
    }
    `,
  )
  return AllPostsContent
}) satisfies QuartzComponentConstructor

