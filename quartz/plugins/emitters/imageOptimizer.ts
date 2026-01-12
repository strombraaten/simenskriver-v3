import { QuartzEmitterPlugin } from "../types"
import { BuildCtx } from "../../util/ctx"
import sharp from "sharp"
import fs from "fs/promises"
import path from "path"
import { FilePath, joinSegments, slugifyFilePath } from "../../util/path"

// Configuration - SIMPLIFIED: WebP only, no blur placeholders, no original-size duplicates
const IMAGE_SIZES = [800, 1200] // Just 2 sizes: medium and large
const WEBP_QUALITY = 82
const PARALLEL_BATCH_SIZE = 10

export interface OptimizedImageManifest {
  [originalPath: string]: {
    sizes: {
      width: number
      webp: string
    }[]
    originalWidth: number
    originalHeight: number
    aspectRatio: number
    processedAt: number // Timestamp when processed
  }
}

// Load existing manifest
async function loadManifest(manifestPath: string): Promise<OptimizedImageManifest> {
  try {
    // Check if file exists first
    try {
      await fs.access(manifestPath)
    } catch (accessErr: any) {
      // File doesn't exist - return empty manifest
      // This is expected on first build or if _optimized wasn't restored
      return {}
    }
    
    const data = await fs.readFile(manifestPath, "utf-8")
    if (!data || data.trim() === "") {
      return {}
    }
    const parsed = JSON.parse(data)
    if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
      const keys = Object.keys(parsed)
      // Validate that we have actual data (not just an empty object)
      if (keys.length > 0 && parsed[keys[0]] && parsed[keys[0]].sizes) {
        return parsed as OptimizedImageManifest
      }
    }
    return {}
  } catch (err: any) {
    // Manifest doesn't exist yet or is invalid - that's OK for first build
    // Silently return empty - this is expected on first build
    return {}
  }
}

// Save manifest
async function saveManifest(manifestPath: string, manifest: OptimizedImageManifest): Promise<void> {
  await fs.mkdir(path.dirname(manifestPath), { recursive: true })
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2))
}

// Blur placeholder generation removed - not needed for optimized images

// Check if image needs processing
// Returns true if: no manifest entry, optimized files missing, or source is newer
async function needsProcessing(
  sourcePath: string,
  outputDir: string,
  normalizedPath: string,
  manifestEntry: OptimizedImageManifest[string] | undefined,
): Promise<boolean> {
  if (!manifestEntry) return true
  
  try {
    // Check source file mtime vs processed timestamp
    const sourceStat = await fs.stat(sourcePath)
    if (sourceStat.mtimeMs > manifestEntry.processedAt) {
      return true // Source is newer, need to reprocess
    }
    
    // Check if at least one optimized file exists (they should all exist together)
    const firstSize = manifestEntry.sizes[0]
    if (firstSize) {
      // Manifest paths are like "/_optimized/file.webp" - convert to absolute path
      const relativePath = firstSize.webp.replace(/^\//, "") // Remove leading slash
      const optimizedPath = path.resolve(outputDir, relativePath)
      try {
        await fs.access(optimizedPath)
        // File exists and source hasn't changed, skip
        return false
      } catch {
        // Optimized file doesn't exist, need to process
        return true
      }
    }
    return true
  } catch {
    // On error, process to be safe
    return true
  }
}

// Cache for created directories to avoid race conditions
const createdDirs = new Set<string>()

// Ensure directory exists (thread-safe)
async function ensureDir(dirPath: string): Promise<void> {
  if (createdDirs.has(dirPath)) {
    return
  }
  try {
    await fs.mkdir(dirPath, { recursive: true })
    createdDirs.add(dirPath)
  } catch (err: any) {
    // Directory might already exist from parallel processing, that's OK
    if (err.code !== "EEXIST") {
      throw err
    }
    createdDirs.add(dirPath)
  }
}

// Optimize a single image
async function optimizeImage(
  sourcePath: string,
  outputDir: string,
  normalizedPath: string,
): Promise<OptimizedImageManifest[string] | null> {
  try {
    const metadata = await sharp(sourcePath).metadata()
    if (!metadata.width || !metadata.height) {
      return null
    }

    const originalWidth = metadata.width
    const originalHeight = metadata.height
    const aspectRatio = originalWidth / originalHeight

    // Generate optimized sizes only (no blur placeholder, no original-size duplicate)
    const sizes: OptimizedImageManifest[string]["sizes"] = []
    const baseName = path.basename(normalizedPath, path.extname(normalizedPath))
    const baseDir = path.dirname(normalizedPath).replace(/^\/+/, "")
    
    // Create base directory once for all sizes (thread-safe)
    const baseOutputDir = path.join(outputDir, "_optimized", baseDir)
    await ensureDir(baseOutputDir)

    for (const targetWidth of IMAGE_SIZES) {
      if (targetWidth > originalWidth) continue

      const targetHeight = Math.round(targetWidth / aspectRatio)

      const webpPath = path.join(baseOutputDir, `${baseName}-${targetWidth}w.webp`)
      
      // Only generate WebP - 97%+ browser support
      await sharp(sourcePath)
        .resize(targetWidth, targetHeight, { withoutEnlargement: true, fit: "inside" })
        .webp({ quality: WEBP_QUALITY })
        .toFile(webpPath)

      const webpRelative = path.relative(outputDir, webpPath).replace(/\\/g, "/")

      sizes.push({
        width: targetWidth,
        webp: `/${webpRelative}`,
      })
    }

    // No original-size generation - srcset handles it, and it's redundant

    return {
      sizes: sizes.sort((a, b) => a.width - b.width),
      originalWidth,
      originalHeight,
      aspectRatio,
      processedAt: Date.now(),
    }
  } catch (err) {
    console.warn(`[ImageOptimizer] Failed to optimize ${sourcePath}:`, err)
    return null
  }
}

// Find all image files
async function findImages(dir: string, baseDir: string): Promise<FilePath[]> {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".JPG", ".JPEG", ".PNG"]
  const images: FilePath[] = []

  async function walk(currentDir: string) {
    try {
      const entries = await fs.readdir(currentDir, { withFileTypes: true })
      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name)
        if (entry.isDirectory()) {
          await walk(fullPath)
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name).toLowerCase()
          if (imageExtensions.includes(ext)) {
            const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, "/")
            images.push(relativePath as FilePath)
          }
        }
      }
    } catch {
      // Skip inaccessible directories
    }
  }

  await walk(dir)
  return images
}

// Process images in parallel batches with error handling
async function processBatch(
  batch: { sourcePath: string; normalizedPath: string; outputDir: string }[],
): Promise<{ normalizedPath: string; result: OptimizedImageManifest[string] | null }[]> {
  return Promise.all(
    batch.map(async ({ sourcePath, normalizedPath, outputDir }) => {
      try {
        const result = await optimizeImage(sourcePath, outputDir, normalizedPath)
        return { normalizedPath, result }
      } catch (err) {
        console.warn(`[ImageOptimizer] Error processing ${sourcePath}:`, err)
        return { normalizedPath, result: null }
      }
    }),
  )
}

export const ImageOptimizer: QuartzEmitterPlugin = () => {
  return {
    name: "ImageOptimizer",
    async emit(ctx: BuildCtx, _content, _resources): Promise<FilePath[]> {
      // Clear directory cache for new build
      createdDirs.clear()
      
      // Load manifest - use same path resolution as build.ts restore  
      const manifestPath = path.join(ctx.argv.output, "_optimized", "manifest.json")
      
      // Try to load manifest
      let manifest: OptimizedImageManifest = {}
      try {
        const data = await fs.readFile(manifestPath, "utf-8")
        if (data && data.trim()) {
          manifest = JSON.parse(data) as OptimizedImageManifest
        }
      } catch {
        // File doesn't exist or is invalid - that's OK for first build
      }
      
      if (Object.keys(manifest).length > 0) {
        console.log(`[ImageOptimizer] Loaded manifest with ${Object.keys(manifest).length} entries`)
      }

      // Find all images
      const imageFiles = await findImages(ctx.argv.directory, ctx.argv.directory)
      console.log(`[ImageOptimizer] Found ${imageFiles.length} images`)

      // Filter images that need processing
      const imagesToProcess: Array<{ sourcePath: string; normalizedPath: string }> = []
      let skippedCount = 0
      for (const imageFile of imageFiles) {
        const sourcePath = path.join(ctx.argv.directory, imageFile)
        // Normalize path to match manifest keys (lowercase, normalized)
        const normalizedPath = `/${slugifyFilePath(imageFile as FilePath)}`
        const manifestEntry = manifest[normalizedPath]
        const needs = await needsProcessing(sourcePath, ctx.argv.output, normalizedPath, manifestEntry)
        if (needs) {
          imagesToProcess.push({ sourcePath, normalizedPath })
        } else {
          skippedCount++
        }
      }

      if (imagesToProcess.length === 0) {
        console.log(`[ImageOptimizer] All ${imageFiles.length} images up to date`)
        return []
      }
      
      if (skippedCount > 0) {
        console.log(`[ImageOptimizer] Skipping ${skippedCount} already-optimized images, processing ${imagesToProcess.length} new/changed`)
      }

      console.log(`[ImageOptimizer] Processing ${imagesToProcess.length} images in batches of ${PARALLEL_BATCH_SIZE}...`)

      // Process in batches
      let processed = 0
      let failed = 0
      for (let i = 0; i < imagesToProcess.length; i += PARALLEL_BATCH_SIZE) {
        const batch = imagesToProcess.slice(i, i + PARALLEL_BATCH_SIZE).map(({ sourcePath, normalizedPath }) => ({
          sourcePath: path.resolve(sourcePath),
          normalizedPath,
          outputDir: path.resolve(ctx.argv.output),
        }))

        const results = await processBatch(batch)
        for (const { normalizedPath, result } of results) {
          if (result) {
            manifest[normalizedPath] = result
            processed++
          } else {
            failed++
          }
        }

      // Save manifest after each batch (incremental saves)
      await saveManifest(path.join(ctx.argv.output, "_optimized", "manifest.json"), manifest)
        console.log(`[ImageOptimizer] Progress: ${Math.min(i + PARALLEL_BATCH_SIZE, imagesToProcess.length)}/${imagesToProcess.length} (${processed} processed, ${failed} failed)`)
      }

      console.log(`[ImageOptimizer] Complete: ${processed} processed, ${failed} failed`)
      return []
    },
  }
}

// Export for use by ClickableImages transformer
export async function loadManifestForTransformer(outputDir: string): Promise<OptimizedImageManifest> {
  // outputDir might be relative (like "public") or absolute
  // path.resolve handles both cases correctly
  const manifestPath = path.resolve(outputDir, "_optimized", "manifest.json")
  return loadManifest(manifestPath)
}

export type { OptimizedImageManifest }
