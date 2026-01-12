import { QuartzTransformerPlugin } from "../types"
import { Root, Html, BlockContent, DefinitionContent, Paragraph } from "mdast"
import { visit } from "unist-util-visit"
import { toHast } from "mdast-util-to-hast"
import { toHtml } from "hast-util-to-html"
import { capitalize } from "../../util/lang"
import { PluggableList } from "unified"

// Regex to match minimal callout syntax: > [minimal-tip] or > [minimal-note] etc.
const minimalCalloutRegex = new RegExp(/^\[minimal-(\w+)\](.*)$/)
const minimalCalloutLineRegex = new RegExp(/^> *\[minimal-\w+\].*$/gm)

export interface MinimalCalloutOptions {
  enabled: boolean
}

const defaultOptions: MinimalCalloutOptions = {
  enabled: true,
}

const minimalCalloutMapping: Record<string, string> = {
  tip: "minimal-callout-tip",
  note: "minimal-callout",
  warning: "minimal-callout-warning",
  info: "minimal-callout-info",
  success: "minimal-callout",
  question: "minimal-callout",
  quote: "minimal-callout-quote",
}

export const MinimalCallout: QuartzTransformerPlugin<Partial<MinimalCalloutOptions>> = (
  userOpts,
) => {
  const opts = { ...defaultOptions, ...userOpts }

  const mdastToHtml = (ast: Paragraph) => {
    const hast = toHast(ast, { allowDangerousHtml: true })!
    return toHtml(hast, { allowDangerousHtml: true })
  }

  return {
    name: "MinimalCallout",
    textTransform(_ctx, src) {
      if (!opts.enabled) return src

      // Pre-process blockquotes to add newline after minimal callout directive
      src = src.replace(minimalCalloutLineRegex, (value) => {
        return value + "\n> "
      })

      return src
    },
    markdownPlugins() {
      if (!opts.enabled) return []

      const plugins: PluggableList = [
        () => {
          return (tree: Root) => {
            visit(tree, "blockquote", (node) => {
              if (node.children.length === 0) return

              const firstChild = node.children[0]
              if (firstChild.type !== "paragraph") return

              const text = firstChild.children[0]
              if (text.type !== "text") return

              const textValue = text.value
              const lines = textValue.split("\n")
              const firstLine = lines[0]
              const remainingLines = lines.slice(1)

              const match = firstLine.match(minimalCalloutRegex)
              if (!match) return

              const [, calloutType, textAfterDirective] = match
              const normalizedType = calloutType.toLowerCase()
              const variant = minimalCalloutMapping[normalizedType] || "minimal-callout"
              const label = capitalize(normalizedType)

              // Collect all content from remaining paragraphs
              const contentParagraphs: Paragraph[] = []
              
              // Get text on the same line as the directive (after [minimal-quote])
              const textOnSameLine = (textAfterDirective || "").trim()
              
              // Combine text on same line with remaining lines from first paragraph
              let firstParaText = textOnSameLine
              if (remainingLines.length > 0) {
                const remainingText = remainingLines.join("\n").trim()
                if (remainingText) {
                  firstParaText = firstParaText 
                    ? `${firstParaText} ${remainingText}`
                    : remainingText
                }
              }
              
              if (firstParaText) {
                contentParagraphs.push({
                  type: "paragraph",
                  children: [{ type: "text", value: firstParaText }],
                })
              }

              // Get all other paragraphs
              for (let i = 1; i < node.children.length; i++) {
                const child = node.children[i]
                if (child.type === "paragraph") {
                  contentParagraphs.push(child)
                }
              }

              // Extract plain text from all content paragraphs (no HTML tags)
              let textContent = ""
              if (contentParagraphs.length > 0) {
                // Extract text from each paragraph
                const extractText = (node: Paragraph): string => {
                  return node.children
                    .map((child) => {
                      if (child.type === "text") {
                        return (child as any).value
                      }
                      // Handle other inline elements (links, etc.)
                      if (child.type === "link") {
                        return (child as any).children
                          .filter((c: any) => c.type === "text")
                          .map((c: any) => c.value)
                          .join("")
                      }
                      return ""
                    })
                    .join("")
                }
                textContent = contentParagraphs.map(extractText).join(" ").trim()
              }

              // Create the minimal callout HTML
              const calloutHtml: Html = {
                type: "html",
                value: `<div class="minimal-callout ${variant}">
  <span class="minimal-callout-label">${label}</span>
  <span class="minimal-callout-text">${textContent}</span>
</div>`,
              }

              // Replace the blockquote with the minimal callout
              node.type = "html"
              ;(node as any).value = calloutHtml.value
              ;(node as any).children = []
            })
          }
        },
      ]

      return plugins
    },
    htmlPlugins() {
      return []
    },
  }
}

