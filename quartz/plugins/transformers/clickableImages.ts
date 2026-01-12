import { QuartzTransformerPlugin } from "../types"
import { Root } from "hast"
import { visit } from "unist-util-visit"
import { slugifyFilePath, isFilePath, joinSegments, FilePath } from "../../util/path"
import { BuildCtx } from "../../util/ctx"
import sharp from "sharp"
import fs from "fs/promises"
import path from "path"
import { h } from "preact"
import { QuartzPluginData } from "../vfile"
import type { OptimizedImageManifest } from "../emitters/imageOptimizer"
import { loadManifestForTransformer } from "../emitters/imageOptimizer"

// Cache manifest per build to avoid loading it multiple times
const manifestCache: Map<string, { manifest: OptimizedImageManifest; buildId: string }> = new Map()

export const ClickableImages: QuartzTransformerPlugin = () => {
  return {
    name: "ClickableImages",
    htmlPlugins(ctx: BuildCtx) {
      return [
        () => {
          return async (tree: Root, _file) => {
            // Load optimized image manifest (non-blocking, fails gracefully)
            // On first build, manifest won't exist yet - that's OK, we'll use original images
            // Cache manifest per build to avoid loading it multiple times
            const cacheKey = `${ctx.argv.output}:${ctx.buildId}`
            let imageManifest: OptimizedImageManifest = {}
            
            // Check cache first
            const cached = manifestCache.get(cacheKey)
            if (cached && cached.buildId === ctx.buildId) {
              imageManifest = cached.manifest
              if (ctx.argv.verbose && Object.keys(imageManifest).length > 0) {
                console.log(`[ClickableImages] Using cached manifest with ${Object.keys(imageManifest).length} images`)
              }
            } else {
              // Load from disk
              try {
                if (ctx.argv.verbose) {
                  console.log(`[ClickableImages] Loading manifest from output dir: ${ctx.argv.output}`)
                }
                const manifestPath = path.resolve(ctx.argv.output, "_optimized", "manifest.json")
                if (ctx.argv.verbose) {
                  try {
                    await fs.access(manifestPath)
                    console.log(`[ClickableImages] Manifest file exists at: ${manifestPath}`)
                    const stat = await fs.stat(manifestPath)
                    console.log(`[ClickableImages] Manifest file size: ${stat.size} bytes`)
                  } catch {
                    console.log(`[ClickableImages] Manifest file does NOT exist at: ${manifestPath}`)
                  }
                }
                imageManifest = await loadManifestForTransformer(ctx.argv.output)
                // Cache it
                manifestCache.set(cacheKey, { manifest: imageManifest, buildId: ctx.buildId })
                if (ctx.argv.verbose) {
                  const count = Object.keys(imageManifest).length
                  console.log(`[ClickableImages] Loaded manifest with ${count} optimized images`)
                  if (count > 0) {
                    console.log(`[ClickableImages] Sample keys:`, Object.keys(imageManifest).slice(0, 3))
                  } else {
                    try {
                      const directData = await fs.readFile(manifestPath, "utf-8")
                      const directParsed = JSON.parse(directData)
                      console.log(`[ClickableImages] Direct read shows ${Object.keys(directParsed).length} keys`)
                    } catch (directErr) {
                      console.log(`[ClickableImages] Direct read failed:`, directErr)
                    }
                  }
                }
              } catch (err) {
                // Manifest doesn't exist yet (first build) - continue without optimized images
                if (ctx.argv.verbose) {
                  console.log(`[ClickableImages] Manifest not found or error loading:`, err)
                }
                // Cache empty manifest to avoid retrying
                manifestCache.set(cacheKey, { manifest: {}, buildId: ctx.buildId })
              }
            }

            let imageIndex = 0
            const imageNodes: Array<{ node: any; index: number; parent: any }> = []
            
            // First pass: collect all image nodes
            try {
              visit(tree, "element", (node: any, index, parent) => {
                if (node && node.tagName === "img" && parent && typeof index === "number" && parent.children && Array.isArray(parent.children) && index >= 0 && index < parent.children.length) {
                  imageNodes.push({ node, index, parent })
                }
              })
            } catch (err) {
              if (ctx.argv.verbose) {
                console.warn(`[ClickableImages] Error collecting image nodes:`, err)
              }
            }

            // Store first image for preloading
            let firstImageSrc: string | undefined = undefined

            // Process each image
            if (!Array.isArray(imageNodes)) {
              if (ctx.argv.verbose) {
                console.warn(`[ClickableImages] imageNodes is not an array`)
              }
            } else {
            for (const { node, index, parent } of imageNodes) {
                try {
                // Ensure node has properties
                if (!node || !node.properties) {
                  if (ctx.argv.verbose) {
                    console.warn(`[ClickableImages] Image node missing properties, skipping`)
                  }
                  continue
                }
                
                // Get the current img src which should already be resolved
                let originalSrc = node.properties?.src
                let originalAlt = node.properties?.alt || ""
                
                if (!originalSrc) continue

                const isFirstImage = imageIndex === 0
                imageIndex++
                
                // Store first image src for preloading (before path normalization)
                if (isFirstImage && typeof originalSrc === "string") {
                  firstImageSrc = originalSrc
                }

                // Resolve relative paths to absolute paths for manifest lookup
                // The manifest uses absolute paths like /r0000155.jpg
                // But CrawlLinks may have converted the src to relative like ../r0000155.jpg
                if (typeof originalSrc === "string" && !originalSrc.startsWith("http") && !originalSrc.startsWith("//")) {
                  // If it's a relative path (starts with ../ or ./), resolve it to absolute
                  if (originalSrc.startsWith("../") || originalSrc.startsWith("./")) {
                    // Get the current file's directory
                    const currentFileSlug = _file.data.slug || ""
                    const currentDir = currentFileSlug.split("/").slice(0, -1).join("/")
                    
                    // Resolve the relative path
                    const pathParts = originalSrc.split("/")
                    let resolvedParts = currentDir ? currentDir.split("/") : []
                    
                    for (const part of pathParts) {
                      if (part === "..") {
                        resolvedParts.pop()
                      } else if (part === "." || part === "") {
                        // Skip current directory or empty
                        continue
                      } else {
                        resolvedParts.push(part)
                      }
                    }
                    
                    // Convert to absolute path
                    originalSrc = "/" + resolvedParts.join("/")
                  }
                  
                  // Slugify image path to match how Assets plugin processes files
                  // This ensures paths like /Travel/athens/R0002045.JPG
                  // become /Travel/athens/r0002045.JPG (lowercase)
                  if (originalSrc.startsWith("/")) {
                    // Remove leading slash for slugify, then add it back
                    const pathWithoutSlash = originalSrc.slice(1)
                    if (isFilePath(pathWithoutSlash)) {
                      originalSrc = `/${slugifyFilePath(pathWithoutSlash)}`
                    }
                  } else {
                    // Path without leading slash
                    if (isFilePath(originalSrc)) {
                      originalSrc = `/${slugifyFilePath(originalSrc)}`
                    } else {
                      originalSrc = `/${originalSrc}`
                    }
                  }
                }

                // Parse editorial style from alt text (format: alt|style or |style)
                // Examples: ![Description|wide], ![|center], ![image.jpg|small]
                let editorialStyle: string | null = null
                const styleMatch = originalAlt.match(/\|(wide|center|small|full)$/)
                if (styleMatch) {
                  editorialStyle = styleMatch[1]
                  // Remove the style suffix from alt text
                  originalAlt = originalAlt.replace(/\|(wide|center|small|full)$/, "").trim()
                }

                // Also check for HTML classes on img element (fallback for HTML usage)
                const imgClasses = node.properties?.className || []
                const imgClassArray: string[] = Array.isArray(imgClasses) 
                  ? imgClasses.filter((c): c is string => typeof c === "string")
                  : (typeof imgClasses === "string" ? [imgClasses] : [])
                const editorialClasses = ["image-wide", "image-center", "image-small", "image-full"]
                const htmlEditorialClass = imgClassArray.find(cls => 
                  typeof cls === "string" && editorialClasses.some(ec => cls.includes(ec))
                )

                // Use HTML class if present, otherwise use parsed style
                const finalStyle = htmlEditorialClass ? htmlEditorialClass.replace("image-", "") : editorialStyle

                // Check if optimized version exists
                const optimizedData = imageManifest && typeof originalSrc === "string" 
                  ? imageManifest[originalSrc] 
                  : undefined
                if (ctx.argv.verbose) {
                  const originalSrcFromNode = node.properties?.src
                  console.log(`[ClickableImages] Original src from node: ${originalSrcFromNode}`)
                  console.log(`[ClickableImages] Resolved/normalized src: ${originalSrc}`)
                  console.log(`[ClickableImages] Manifest has ${Object.keys(imageManifest).length} entries`)
                  if (imageManifest && Object.keys(imageManifest).length > 0) {
                    console.log(`[ClickableImages] Sample manifest keys:`, Object.keys(imageManifest).slice(0, 5))
                  }
                  console.log(`[ClickableImages] Optimized data found: ${!!optimizedData}`)
                }
                
                let imageWidth: number | undefined
                let imageHeight: number | undefined

                if (optimizedData) {
                  // Use optimized dimensions
                  imageWidth = optimizedData.originalWidth
                  imageHeight = optimizedData.originalHeight
                }
                // No fallback dimension reading - if not optimized, skip dimensions
                // This avoids unnecessary Sharp operations during build

                // Optimize loading: first 3 images eager (likely above fold), others lazy
                const isAboveFold = imageIndex <= 3
                const loading = isAboveFold ? "eager" : "lazy"
                
                // Add fetchpriority hints
                const fetchpriority = isFirstImage ? "high" : (imageIndex <= 3 ? "auto" : "low")
                // Use sync decoding for visible images to prevent blurriness during scroll
                // Async decoding can cause brief pixelation during fast scrolling
                const decoding = isAboveFold ? "sync" : "async"

                // Create image element(s) - use picture element if optimized, otherwise regular img
                let imageElement: any = undefined

                // Use optimized images if available
                const useOptimized = true
                
                if (useOptimized && optimizedData && optimizedData.sizes && Array.isArray(optimizedData.sizes) && optimizedData.sizes.length > 0) {
                  // Build WebP srcset string (only format we generate)
                  const webpSrcset: string[] = []

                  for (const size of optimizedData.sizes) {
                    if (size && size.width && size.webp) {
                      webpSrcset.push(`${size.webp} ${size.width}w`)
                    }
                  }
                  
                  // If no valid sizes were found, fall back to regular img
                  if (webpSrcset.length > 0) {
                    // Determine sizes attribute based on editorial style
                    let sizesAttr: string
                    if (finalStyle === "wide" || finalStyle === "full") {
                      sizesAttr = "(max-width: 600px) 100vw, (max-width: 1200px) 90vw, 1200px"
                    } else if (finalStyle === "small") {
                      sizesAttr = "(max-width: 600px) 100vw, 400px"
                    } else {
                      // Default/center: max-width matches article width
                      sizesAttr = "(max-width: 600px) 100vw, (max-width: 1200px) 800px, 900px"
                    }

                    // Use simple img with srcset (no picture element needed for WebP-only)
                    const webpSrcsetStr = webpSrcset.join(", ")
                    const fallbackSrc = optimizedData.sizes[optimizedData.sizes.length - 1]?.webp || originalSrc
                    
                    // Ensure className is always an array
                    const imgClassName = Array.isArray(imgClassArray) 
                      ? [...imgClassArray, "lightbox-image"]
                      : ["lightbox-image"]
                    
                    imageElement = {
                      type: "element",
                      tagName: "img",
                      properties: {
                        src: fallbackSrc,
                        srcset: webpSrcsetStr,
                        sizes: sizesAttr,
                        alt: originalAlt || "",
                        className: imgClassName,
                        loading,
                        fetchpriority,
                        decoding,
                        "data-src": originalSrc,
                        "data-alt": originalAlt || "",
                        width: imageWidth,
                        height: imageHeight,
                        style: imageWidth && imageHeight 
                          ? `aspect-ratio: ${imageWidth} / ${imageHeight};`
                          : undefined,
                      },
                      children: [] // Img elements should have empty children array
                    }
                  }
                }
                
                // Fallback: use regular img element if not optimized or if optimization failed
                if (!imageElement || !imageElement.type || !imageElement.tagName) {
                  // Fallback: use regular img element for non-optimized images
                  // Ensure className is always an array
                  const imgClassName = Array.isArray(imgClassArray) 
                    ? [...imgClassArray, "lightbox-image"]
                    : ["lightbox-image"]
                  
                  imageElement = {
                    type: "element",
                    tagName: "img",
                    properties: {
                      src: originalSrc,
                      alt: originalAlt || "",
                      className: imgClassName,
                      loading,
                      fetchpriority,
                      decoding,
                      "data-src": originalSrc,
                      "data-alt": originalAlt || "",
                      width: imageWidth,
                      height: imageHeight,
                      style: imageWidth && imageHeight 
                        ? `aspect-ratio: ${imageWidth} / ${imageHeight};`
                        : undefined,
                    },
                    children: [] // Img elements should have empty children array
                  }
                }
                
                // Ensure imageElement is valid before proceeding
                if (!imageElement || !imageElement.type || !imageElement.tagName) {
                  if (ctx.argv.verbose) {
                    console.warn(`[ClickableImages] Invalid imageElement, skipping`)
                  }
                  continue
                }

                // Mark first image for preloading
                if (isFirstImage && imageElement && imageElement.properties) {
                  imageElement.properties["data-first-image"] = "true"
                }

                // Ensure imageElement is valid before creating wrapper
                if (!imageElement || !imageElement.type || !imageElement.tagName) {
                  if (ctx.argv.verbose) {
                    console.warn(`[ClickableImages] imageElement is invalid, cannot create wrapper`)
                  }
                  continue
                }

                // Create a wrapper div with editorial class if style was detected
                const wrapperClasses: string[] = ["lightbox-wrapper"]
                if (finalStyle) {
                  wrapperClasses.push(`image-${finalStyle}`)
                }

                // Ensure imageElement is still valid after any modifications
                if (!imageElement || !imageElement.type || !imageElement.tagName) {
                  if (ctx.argv.verbose) {
                    console.warn(`[ClickableImages] imageElement became invalid after validation, skipping`)
                  }
                  continue
                }

                // Ensure all required HAST properties are set
                const wrapper: any = {
                  type: "element",
                  tagName: "div",
                  properties: {
                    className: Array.isArray(wrapperClasses) ? wrapperClasses : ["lightbox-wrapper"],
                    "data-lightbox": "true",
                  },
                  children: Array.isArray([imageElement]) ? [imageElement] : []
                }

                // Validate wrapper structure
                if (!wrapper.type || !wrapper.tagName || !wrapper.properties || !Array.isArray(wrapper.children)) {
                  if (ctx.argv.verbose) {
                    console.warn(`[ClickableImages] Invalid wrapper structure, skipping`)
                  }
                  continue
                }

                // Replace the img with the wrapper in the parent
                if (parent && parent.children && Array.isArray(parent.children) && typeof index === "number" && index >= 0 && index < parent.children.length) {
                  // Make a copy to avoid mutating the original array reference
                  const newChildren = [...parent.children]
                  newChildren[index] = wrapper
                  parent.children = newChildren
                } else {
                  // Fallback: if parent.children is not valid, skip replacement
                  if (ctx.argv.verbose) {
                    console.warn(`[ClickableImages] Cannot replace image: invalid parent.children or index. parent: ${!!parent}, children: ${!!parent?.children}, isArray: ${Array.isArray(parent?.children)}, index: ${index}, length: ${parent?.children?.length}`)
                  }
                  continue
                }
                
                // If parent is a <p> tag, add a class to enable float styling
                // This avoids relying on :has() selector which may not be supported
                if (parent.tagName === "p" && parent.properties) {
                  const existingClass = parent.properties.className
                  if (!existingClass) {
                    parent.properties.className = ["has-image"]
                  } else if (Array.isArray(existingClass)) {
                    if (!existingClass.includes("has-image")) {
                      parent.properties.className = [...existingClass, "has-image"]
                    }
                  } else {
                    // className is a string, convert to array
                    parent.properties.className = [existingClass, "has-image"]
                  }
                }
                } catch (err) {
                  // If image processing fails, log and continue with next image
                  if (ctx.argv.verbose) {
                    console.warn(`[ClickableImages] Failed to process image:`, err)
                  }
                  // Keep the original image node if processing fails
                  continue
                }
              }
            }
            } // End of imageNodes array check
            
            // Store first image src in file data for preloading
            if (firstImageSrc && typeof firstImageSrc === "string") {
              // Normalize the path for preload (same as we do for img src)
              let normalizedSrc = firstImageSrc
              if (!normalizedSrc.startsWith("http") && !normalizedSrc.startsWith("//")) {
                if (normalizedSrc.startsWith("/")) {
                  const pathWithoutSlash = normalizedSrc.slice(1)
                  if (isFilePath(pathWithoutSlash)) {
                    normalizedSrc = `/${slugifyFilePath(pathWithoutSlash)}`
                  }
                } else {
                  if (isFilePath(normalizedSrc)) {
                    normalizedSrc = `/${slugifyFilePath(normalizedSrc)}`
                  } else {
                    normalizedSrc = `/${normalizedSrc}`
                  }
                }
              }
              // Store in file data for preload link generation
              if (!_file.data.firstImageSrc) {
                _file.data.firstImageSrc = normalizedSrc
              }
            }
        },
      ]
    },
    externalResources() {
      return {
        additionalHead: [
          (fileData: QuartzPluginData) => {
            try {
              const firstImageSrc = (fileData as any).firstImageSrc
              if (firstImageSrc && typeof firstImageSrc === "string") {
                return h("link", {
                  rel: "preload",
                  as: "image",
                  href: firstImageSrc,
                  fetchpriority: "high",
                })
              }
            } catch (err) {
              // Silently fail if firstImageSrc is not available
            }
            return null
          },
        ],
        css: [
          {
            inline: true,
            content: `
/* Lightbox Image Styles */
.lightbox-wrapper {
  display: block;
  cursor: pointer;
  transition: transform 0.2s ease;
  margin: 0;
  /* Prevent layout shift by reserving space */
  min-height: 200px;
  position: relative;
}

.lightbox-wrapper:hover {
  transform: scale(1.02);
}

.lightbox-image {
  max-width: 100%;
  max-height: 70vh;
  height: auto;
  width: auto;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;
  /* Preserve aspect ratio to prevent layout shift */
  display: block;
  /* Ensure crisp image rendering during scroll */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  image-rendering: pixelated;
  /* Fallback to high quality for photos */
  image-rendering: auto;
  /* Prevent blur placeholder from showing through */
  background: transparent;
}

/* If image has width/height attributes, use them to prevent layout shift */
.lightbox-image[width][height] {
  aspect-ratio: attr(width) / attr(height);
}

/* Fallback: use inline style aspect-ratio if set */
.lightbox-image[style*="aspect-ratio"] {
  /* Inline style takes precedence */
}

/* Exclude gallery images from max-height constraint (they're handled by grid) */
.image-gallery .lightbox-image {
  max-height: none;
}

.lightbox-image:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* Modal/Lightbox Overlay */
.lightbox-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  backdrop-filter: blur(5px);
}

.lightbox-modal.active {
  opacity: 1;
  visibility: visible;
}

.lightbox-modal img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  transform: scale(0.8);
  transition: transform 0.3s ease;
}

.lightbox-modal.active img {
  transform: scale(1);
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  z-index: 1001;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.lightbox-close:hover {
  background: rgba(0, 0, 0, 0.8);
}

/* Prevent body scroll when modal is open */
body.lightbox-open {
  overflow: hidden;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .lightbox-modal img {
    max-width: 95%;
    max-height: 95%;
  }

  .lightbox-close {
    top: 10px;
    right: 15px;
    font-size: 1.5rem;
    width: 35px;
    height: 35px;
  }
}
            `,
          },
        ],
        js: [
          {
            loadTime: "afterDOMReady",
            contentType: "inline",
            script: `
              // Lightbox functionality
              function initLightbox() {
                // Remove existing modal if it exists
                const existingModal = document.querySelector('.lightbox-modal');
                if (existingModal) {
                  existingModal.remove();
                }

                // Create modal elements
                const modal = document.createElement('div');
                modal.className = 'lightbox-modal';
                
                const closeBtn = document.createElement('button');
                closeBtn.className = 'lightbox-close';
                closeBtn.innerHTML = '×';
                closeBtn.setAttribute('aria-label', 'Close lightbox');
                
                const img = document.createElement('img');
                img.style.display = 'none';
                
                modal.appendChild(closeBtn);
                modal.appendChild(img);
                document.body.appendChild(modal);

                // Function to open lightbox
                function openLightbox(imageSrc, imageAlt, originalImg) {
                  img.src = imageSrc;
                  img.alt = imageAlt || '';
                  img.style.display = 'block';
                  modal.classList.add('active');
                  document.body.classList.add('lightbox-open');
                  
                  // Preload the image and set appropriate size
                  const preloadImg = new Image();
                  preloadImg.onload = () => {
                    img.src = imageSrc;
                    
                    // Get original image size on page
                    const originalRect = originalImg ? originalImg.getBoundingClientRect() : null;
                    const originalDisplayWidth = originalRect ? originalRect.width : 0;
                    const originalDisplayHeight = originalRect ? originalRect.height : 0;
                    
                    // Smart scaling based on image size
                    const viewportWidth = window.innerWidth;
                    const viewportHeight = window.innerHeight;
                    const imageWidth = preloadImg.naturalWidth;
                    const imageHeight = preloadImg.naturalHeight;
                    
                    // Calculate appropriate display size
                    let targetWidth, targetHeight;
                    
                    // Ensure lightbox image is at least 1.5x the size it appears on page
                    const minDisplayWidth = Math.max(
                      originalDisplayWidth * 1.5,
                      Math.min(500, viewportWidth * 0.7)
                    );
                    const minDisplayHeight = Math.max(
                      originalDisplayHeight * 1.5,
                      Math.min(400, viewportHeight * 0.7)
                    );
                    
                    // Calculate scale to meet minimum size requirements
                    const scaleForWidth = minDisplayWidth / imageWidth;
                    const scaleForHeight = minDisplayHeight / imageHeight;
                    const minScale = Math.max(scaleForWidth, scaleForHeight, 1); // At least 1x (never smaller than original)
                    
                    // Limit maximum scale to prevent pixelation
                    const maxScale = Math.min(3, viewportWidth * 0.9 / imageWidth, viewportHeight * 0.9 / imageHeight);
                    const finalScale = Math.min(minScale, maxScale);
                    
                    targetWidth = Math.min(imageWidth * finalScale, viewportWidth * 0.9);
                    targetHeight = Math.min(imageHeight * finalScale, viewportHeight * 0.9);
                    img.style.width = targetWidth + 'px';
                    img.style.height = 'auto';
                  };
                  preloadImg.src = imageSrc;
                }

                // Function to close lightbox
                function closeLightbox() {
                  modal.classList.remove('active');
                  document.body.classList.remove('lightbox-open');
                  setTimeout(() => {
                    img.style.display = 'none';
                    img.src = '';
                  }, 300);
                }

                // Event listeners
                closeBtn.addEventListener('click', closeLightbox);
                
                modal.addEventListener('click', (e) => {
                  if (e.target === modal) {
                    closeLightbox();
                  }
                });

                // Keyboard support
                document.addEventListener('keydown', (e) => {
                  if (e.key === 'Escape' && modal.classList.contains('active')) {
                    closeLightbox();
                  }
                });

                // Add click handlers to all lightbox images
                const lightboxWrappers = document.querySelectorAll('.lightbox-wrapper');
                lightboxWrappers.forEach(wrapper => {
                  wrapper.addEventListener('click', (e) => {
                    e.preventDefault();
                    const img = wrapper.querySelector('.lightbox-image');
                    if (img) {
                      // Use img.src (browser-resolved URL) instead of data-src
                      // img.src is already normalized by CrawlLinks and works correctly
                      // data-src may have wrong case/path from original markdown
                      const src = img.src || img.getAttribute('data-src');
                      const alt = img.getAttribute('data-alt') || img.alt;
                      openLightbox(src, alt, img);
                    }
                  });
                });

                // Clean up function
                if (window.addCleanup) {
                  window.addCleanup(() => {
                    if (modal && modal.parentNode) {
                      modal.parentNode.removeChild(modal);
                    }
                    document.body.classList.remove('lightbox-open');
                  });
                }
              }

              // Initialize on page load and navigation
              document.addEventListener('nav', initLightbox);
              
              // Initialize immediately if DOM is already ready
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initLightbox);
              } else {
                initLightbox();
              }
            `,
          },
        ],
      }
    },
  }
}

