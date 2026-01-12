import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"
import { Root, Element } from "hast"

/**
 * Detects sequences of 2+ consecutive images and wraps them in a gallery container.
 * This enables bento-style gallery layouts with lightbox functionality.
 * 
 * Runs AFTER ClickableImages, so images are already wrapped in lightbox-wrapper divs.
 */
export const ImageGallery: QuartzTransformerPlugin = () => {
  return {
    name: "ImageGallery",
    htmlPlugins() {
      return [
        () => {
          return (tree: Root) => {
            // First pass: Find paragraphs with multiple lightbox-wrapper divs and mark them for replacement
            const paragraphsToReplace: Array<{ paragraph: Element; parent: Element; index: number; wrappers: Element[] }> = []
            
            visit(tree, "element", (node: Element, index: number | undefined, parent: Element | undefined) => {
              if (node.tagName === "p" && parent && index !== undefined) {
                const lightboxWrappers: Element[] = []
                
                // Collect all lightbox-wrapper divs from this paragraph
                node.children.forEach((pChild) => {
                  if (pChild.type === "element") {
                    const pChildElement = pChild as Element
                    if (pChildElement.tagName === "div") {
                      const className = pChildElement.properties?.className
                      const isLightboxWrapper = 
                        (Array.isArray(className) && className.includes("lightbox-wrapper")) ||
                        (typeof className === "string" && className.includes("lightbox-wrapper"))
                      if (isLightboxWrapper) {
                        lightboxWrappers.push(pChildElement)
                      }
                    }
                  }
                })
                
                // If paragraph has 2+ images, mark it for replacement
                if (lightboxWrappers.length >= 2) {
                  paragraphsToReplace.push({
                    paragraph: node,
                    parent: parent,
                    index: index,
                    wrappers: lightboxWrappers,
                  })
                }
              }
            })
            
            // Replace marked paragraphs with galleries
            paragraphsToReplace.forEach(({ parent, index, wrappers }) => {
              const galleryContainer: Element = {
                type: "element",
                tagName: "div",
                properties: {
                  className: ["image-gallery"],
                  "data-gallery": "true",
                  "data-image-count": String(wrappers.length),
                },
                children: wrappers,
              }
              
              parent.children[index] = galleryContainer
            })
            
            // Second pass: Find consecutive lightbox-wrapper divs that are direct siblings (not in paragraphs)
            visit(tree, "element", (node: Element) => {
              if (node.tagName === "article") {
                if (!node.children || node.children.length === 0) return
                
                const children = node.children
                let consecutiveWrappers: Element[] = []
                let wrapperStartIndex = -1
                
                for (let i = 0; i < children.length; i++) {
                  const child = children[i]
                  
                  // Skip if already a gallery
                  if (child.type === "element" && (child as Element).tagName === "div") {
                    const className = (child as Element).properties?.className
                    const isGallery = 
                      (Array.isArray(className) && className.includes("image-gallery")) ||
                      (typeof className === "string" && className.includes("image-gallery"))
                    
                    if (isGallery) {
                      // Close previous group if exists
                      if (consecutiveWrappers.length >= 2) {
                        const galleryContainer: Element = {
                          type: "element",
                          tagName: "div",
                          properties: {
                            className: ["image-gallery"],
                            "data-gallery": "true",
                            "data-image-count": String(consecutiveWrappers.length),
                          },
                          children: consecutiveWrappers,
                        }
                        
                        children.splice(wrapperStartIndex, consecutiveWrappers.length, galleryContainer)
                        i = wrapperStartIndex
                      }
                      consecutiveWrappers = []
                      wrapperStartIndex = -1
                      continue
                    }
                  }
                  
                  // Check if this is a lightbox-wrapper div
                  if (child.type === "element" && child.tagName === "div") {
                    const className = (child as Element).properties?.className
                    const isLightboxWrapper = 
                      (Array.isArray(className) && className.includes("lightbox-wrapper")) ||
                      (typeof className === "string" && className.includes("lightbox-wrapper"))
                    
                    if (isLightboxWrapper) {
                      if (consecutiveWrappers.length === 0) {
                        wrapperStartIndex = i
                      }
                      consecutiveWrappers.push(child as Element)
                    } else {
                      // Not a lightbox-wrapper - close group if we have 2+
                      if (consecutiveWrappers.length >= 2) {
                        const galleryContainer: Element = {
                          type: "element",
                          tagName: "div",
                          properties: {
                            className: ["image-gallery"],
                            "data-gallery": "true",
                            "data-image-count": String(consecutiveWrappers.length),
                          },
                          children: consecutiveWrappers,
                        }
                        
                        children.splice(wrapperStartIndex, consecutiveWrappers.length, galleryContainer)
                        i = wrapperStartIndex - 1
                      }
                      consecutiveWrappers = []
                      wrapperStartIndex = -1
                    }
                  } else {
                    // Not a div - close group if we have 2+
                    if (consecutiveWrappers.length >= 2) {
                      const galleryContainer: Element = {
                        type: "element",
                        tagName: "div",
                        properties: {
                          className: ["image-gallery"],
                          "data-gallery": "true",
                          "data-image-count": String(consecutiveWrappers.length),
                        },
                        children: consecutiveWrappers,
                      }
                      
                      children.splice(wrapperStartIndex, consecutiveWrappers.length, galleryContainer)
                      i = wrapperStartIndex - 1
                    }
                    consecutiveWrappers = []
                    wrapperStartIndex = -1
                  }
                }
                
                // Don't forget the last group
                if (consecutiveWrappers.length >= 2) {
                  const galleryContainer: Element = {
                    type: "element",
                    tagName: "div",
                    properties: {
                      className: ["image-gallery"],
                      "data-gallery": "true",
                      "data-image-count": String(consecutiveWrappers.length),
                    },
                    children: consecutiveWrappers,
                  }
                  
                  children.splice(wrapperStartIndex, consecutiveWrappers.length, galleryContainer)
                }
              }
            })
          }
        },
      ]
    },
  }
}
