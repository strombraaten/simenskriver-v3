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
    Component.Explorer({ title: "Oversikt" }),
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
    Component.Explorer({ title: "Oversikt" }),
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
    Component.Explorer({ title: "Oversikt" }),
  ],
  right: [],
}
