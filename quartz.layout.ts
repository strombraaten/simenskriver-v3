import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [Component.Scrollbar()],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/strombraaten/simenskriver-v3",
      "Discord Community": "https://discord.gg/f2ZrnPVbYC",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleHeader(),
    Component.HeroImage(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.CategoryList({ 
      title: "Explorer",
      excludeFolders: ["Travel", "Writing"], // Hide old folders after migration
      alwaysShowFolders: ["Tanker", "Utkast", "oppslagsverk", "Notater"], // Always show these even if empty
      folderOrder: ["Tanker", "<｜tool▁sep｜>", "Utkast", "Notater"], // Custom order for folders
    }),
    Component.DesktopOnly(Component.TableOfContents()),
  ],
  right: [
    // Graph View - show on individual posts (not index, not all-posts, not tag pages, not folder pages)
    Component.ConditionalRender({
      component: Component.Graph(),
      condition: (page) => {
        const slug = page.fileData.slug ?? ""
        return slug !== "index" && 
               slug !== "all-posts" && 
               !slug.startsWith("tags/") && 
               !slug.endsWith("/index")
      },
    }),
    Component.Backlinks(),
    // Why field - show purpose of the piece
    Component.ConditionalRender({
      component: Component.WhyField(),
      condition: (page) => {
        const slug = page.fileData.slug ?? ""
        return slug !== "index" && slug !== "all-posts" && page.fileData.frontmatter?.why
      },
    }),
    // Tags - with spacing above to separate from Backlinks
    Component.ConditionalRender({
      component: Component.TagList(),
      condition: (page) => {
        const slug = page.fileData.slug ?? ""
        return slug !== "index" && slug !== "all-posts"
      },
    }),
  ],
}

// components for the index/home page
export const indexPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.CategoryList({ 
      title: "Explorer",
      excludeFolders: ["Travel", "Writing"], // Hide old folders after migration
      alwaysShowFolders: ["Tanker", "Utkast", "oppslagsverk", "Notater"], // Always show these even if empty
      folderOrder: ["Tanker", "<｜tool▁sep｜>", "Utkast", "Notater"], // Custom order for folders
    }),
    Component.Pinned({
      title: "Pinned",
      limit: 5,
      showTags: false,
      showDate: false, // Hide dates for pinned items
    }),
    Component.RecentNotes({
      title: "Nylige notater",
      limit: 5,
      showTags: false,
      showDate: false, // Hide dates for writings
      filter: (f) => {
        const slug = f.slug ?? ""
        // Exclude files marked with excludeFromLists
        if (f.frontmatter?.excludeFromLists === true) {
          return false
        }
        // Only show writings (slugs are now lowercase)
        return slug.startsWith("notater/")
      },
      // Sort by published date (not modified) for writings
      sort: (f1, f2) => {
        const d1 = f1.dates?.published || f1.dates?.created
        const d2 = f2.dates?.published || f2.dates?.created
        if (d1 && d2) {
          return d2.getTime() - d1.getTime() // Most recent first
        } else if (d1 && !d2) {
          return -1
        } else if (!d1 && d2) {
          return 1
        }
        // Fallback to alphabetical
        const t1 = f1.frontmatter?.title?.toLowerCase() ?? ""
        const t2 = f2.frontmatter?.title?.toLowerCase() ?? ""
        return t1.localeCompare(t2)
      },
    }),
    Component.RecentNotes({
      title: "Nylige notater",
      limit: 10,
      showTags: false,
      showUpdatedPrefix: true,
      filter: (f) => {
        const slug = f.slug ?? ""
        // Exclude Things (they're stream-only, never in lists)
        if (f.frontmatter?.type === "tanke") {
          return false
        }
        // Exclude files marked with excludeFromLists
        if (f.frontmatter?.excludeFromLists === true) {
          return false
        }
        // Include stash and notions (slugs are now lowercase)
        return slug.startsWith("oppslagsverk/") || slug.startsWith("utkast/")
      },
    }),
  ],
  right: [
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.CategoryList({ 
      title: "Explorer",
      excludeFolders: ["Travel", "Writing"], // Hide old folders after migration
      alwaysShowFolders: ["Tanker", "Utkast", "oppslagsverk", "Notater"], // Always show these even if empty
      folderOrder: ["Tanker", "<｜tool▁sep｜>", "Utkast", "Notater"], // Custom order for folders
    }),
  ],
  right: [],
}
