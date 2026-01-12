import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, resolveRelative, joinSegments } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import style from "./styles/categoryList.scss"

interface Options {
  title?: string
  excludeFolders?: string[]
  alwaysShowFolders?: string[] // Folders to always show even if empty
  folderOrder?: string[] // Custom order for folders (folders not in this list will be sorted alphabetically after)
}

const defaultOptions: Options = {
  title: "Explorer",
  excludeFolders: [],
  alwaysShowFolders: [],
  folderOrder: [],
}

export default ((userOpts?: Partial<Options>) => {
  const opts = { ...defaultOptions, ...userOpts }
  
  const CategoryList: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    // Get unique folder slugs (lowercase) from all files
    const folderSlugs = new Set<string>()
    
    // Add always-show folders first (normalize to lowercase for slug matching)
    if (opts.alwaysShowFolders) {
      opts.alwaysShowFolders.forEach(folder => {
        const folderLower = folder.toLowerCase()
        const excludeLower = opts.excludeFolders?.map(f => f.toLowerCase()) ?? []
        if (!excludeLower.includes(folderLower)) {
          folderSlugs.add(folderLower)
        }
      })
    }
    
    allFiles.forEach((file) => {
      const slug = file.slug ?? ""
      // Skip index, tags, and root-level files
      if (slug === "index" || slug.startsWith("tags/")) {
        return
      }
      
      // Extract folder name (first segment of path) - already lowercase from sluggify
      const parts = slug.split("/")
      if (parts.length > 1) {
        const folderName = parts[0].toLowerCase() // Ensure lowercase for consistency
        const excludeLower = opts.excludeFolders?.map(f => f.toLowerCase()) ?? []
        // Exclude specified folders (case-insensitive comparison)
        if (!excludeLower.includes(folderName)) {
          folderSlugs.add(folderName)
        }
      }
    })
    
    // Create a map of folder slug -> display title
    // Look up folder index pages to get their titles
    const folderTitleMap = new Map<string, string>()
    folderSlugs.forEach((folderSlug) => {
      // Find the folder's index page
      const folderIndexSlug = joinSegments(folderSlug, "index") as FullSlug
      const folderIndexPage = allFiles.find(file => file.slug === folderIndexSlug)
      
      if (folderIndexPage?.frontmatter?.title) {
        // Use the title from the index page
        folderTitleMap.set(folderSlug, folderIndexPage.frontmatter.title)
      } else {
        // Fallback: capitalize first letter of each word in folder name
        // Convert "stash" -> "Stash", "travel-resources" -> "Travel Resources"
        const displayName = folderSlug
          .split("-")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
        folderTitleMap.set(folderSlug, displayName)
      }
    })
    
    // Sort folders: use custom order if provided, then alphabetically for the rest
    // Compare using lowercase versions for custom order matching
    const sortedFolders = Array.from(folderSlugs).sort((a, b) => {
      // If custom order is provided, use it (case-insensitive)
      if (opts.folderOrder) {
        const folderOrderLower = opts.folderOrder.map(f => f.toLowerCase())
        const indexA = folderOrderLower.indexOf(a)
        const indexB = folderOrderLower.indexOf(b)
        
        // If both are in the custom order, sort by their position
        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB
        }
        // If only A is in custom order, A comes first
        if (indexA !== -1) return -1
        // If only B is in custom order, B comes first
        if (indexB !== -1) return 1
      }
      // If neither is in custom order (or no custom order), sort alphabetically
      return a.localeCompare(b)
    })
    
    return (
      <div class={classNames(displayClass, "category-list")}>
        <h2>{opts.title ?? "Explorer"}</h2>
        <ul class="category-ul">
          {/* All Posts link */}
          <li>
            <a href={resolveRelative(fileData.slug!, "all-posts" as FullSlug)} class="internal category-link" data-no-popover="true">
              All Posts
            </a>
          </li>
          {/* Folder links - use folder/index format as that's how Quartz generates folder pages */}
          {sortedFolders.map((folderSlug) => {
            // Folder pages are generated as "folder/index"
            const folderSlugFull = joinSegments(folderSlug, "index") as FullSlug
            const displayTitle = folderTitleMap.get(folderSlug) ?? folderSlug
            return (
              <li key={folderSlug}>
                <a href={resolveRelative(fileData.slug!, folderSlugFull)} class="internal category-link" data-no-popover="true">
                  {displayTitle}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  CategoryList.css = style
  return CategoryList
}) satisfies QuartzComponentConstructor

