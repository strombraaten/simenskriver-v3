import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Simen skriver",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "tinylytics",
      siteId: "yeW5HoX3FJHdsswz69gg",
    },
    baseUrl: "https://simenskriver.no",
    locale: "nb-NO",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Lora",
        body: "Lora",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#fefaf6", // Warm cream background
          lightgray: "#f5e6d3", // Warm light gray (beige)
          gray: "#a67c52", // Warm brown-gray
          darkgray: "#4a3d2a", // Softer warm dark brown (softened from #3d2817)
          dark: "#2d2418", // Softer dark warm brown (softened from #1f1409 - less stark)
          secondary: "#ea580c", // Warm orange for links
          tertiary: "#f97316", // Brighter warm orange for hover
          highlight: "rgba(251,200,123, 0.1) !important", // Warm orange highlight
          textHighlight: "#fef3c7", // Warm yellow highlight
        },
        darkMode: {
          light: "#1a1612", // Warm dark background (less blue, more brown)
          lightgray: "#2a241f", // Warm dark gray
          gray: "#8b7355", // Warm medium gray
          darkgray: "#d4c4b0", // Softer warm light text (softened from #e8dcc8)
          dark: "#e0d4c0", // Softer warm text (softened from #f5ede0 - less stark)
          secondary: "#fb923c", // Warm orange for links (lighter for dark mode)
          tertiary: "#fdba74", // Lighter warm orange for hover
          highlight: "rgba(251,200,123)", // Warm orange highlight
          textHighlight: "rgba(184, 134, 11, 0.4)", // Darker warm yellow/orange highlight for dark mode (better contrast)
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.MinimalCallout(),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.ClickableImages(), // Add lightbox functionality to images (uses optimized images from previous build)
      Plugin.ImageGallery(), // Detect and wrap 2+ consecutive images in galleries (run after ClickableImages)
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.ImageOptimizer(), // Process all images first (runs in parallel with other emitters)
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
