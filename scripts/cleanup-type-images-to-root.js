#!/usr/bin/env node
/**
 * Canonicalize media storage to content/images.
 *
 * For each file in:
 *   content/{Notater,Oppslagsverk,Tanker,Utkast}/images/
 * this script will:
 *   1) Ensure the file exists in content/images/<filename>
 *      - if missing, copy it there
 *      - if exists with same size, do nothing
 *      - if exists with different size, record a conflict and KEEP the source (no delete)
 *   2) Delete the source file only when root exists and is safe (same size)
 *
 * Then it attempts to remove empty type images dirs.
 *
 * Usage:
 *   node scripts/cleanup-type-images-to-root.js --dry-run
 *   node scripts/cleanup-type-images-to-root.js --apply
 */

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const CONTENT_DIR = path.join(ROOT, "content")
const ROOT_IMAGES_DIR = path.join(CONTENT_DIR, "images")
const TYPES = ["Notater", "Oppslagsverk", "Tanker", "Utkast"]

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true })
}

function listFiles(dir) {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile())
    .map((d) => d.name)
}

function statSafe(p) {
  try {
    return fs.statSync(p)
  } catch {
    return null
  }
}

function rmIfEmpty(dir, dryRun) {
  try {
    const entries = fs.readdirSync(dir)
    if (entries.length === 0) {
      if (!dryRun) fs.rmdirSync(dir)
      return true
    }
  } catch {
    // ignore
  }
  return false
}

function main() {
  const args = new Set(process.argv.slice(2))
  const apply = args.has("--apply")
  const dryRun = args.has("--dry-run") || !apply

  ensureDir(ROOT_IMAGES_DIR)

  const copiedToRoot = []
  const skippedSame = []
  const conflicts = []
  const deletedFromType = []
  const deleteErrors = []
  const removedDirs = []

  for (const t of TYPES) {
    const typeImagesDir = path.join(CONTENT_DIR, t, "images")
    const files = listFiles(typeImagesDir)
    for (const name of files) {
      const src = path.join(typeImagesDir, name)
      const dest = path.join(ROOT_IMAGES_DIR, name)

      const s1 = statSafe(src)
      if (!s1) continue
      const s2 = statSafe(dest)

      if (!s2) {
        // Copy to root first
        if (!dryRun) fs.copyFileSync(src, dest)
        copiedToRoot.push({ from: `content/${t}/images/${name}`, to: `content/images/${name}` })
        // now safe to delete source
        try {
          if (!dryRun) fs.unlinkSync(src)
          deletedFromType.push({ from: `content/${t}/images/${name}` })
        } catch (err) {
          deleteErrors.push({ from: `content/${t}/images/${name}`, error: String(err?.message ?? err) })
        }
        continue
      }

      if (s1.size === s2.size) {
        skippedSame.push({ from: `content/${t}/images/${name}`, to: `content/images/${name}` })
        try {
          if (!dryRun) fs.unlinkSync(src)
          deletedFromType.push({ from: `content/${t}/images/${name}` })
        } catch (err) {
          deleteErrors.push({ from: `content/${t}/images/${name}`, error: String(err?.message ?? err) })
        }
      } else {
        conflicts.push({
          from: `content/${t}/images/${name}`,
          to: `content/images/${name}`,
          fromSize: s1.size,
          toSize: s2.size,
        })
      }
    }

    // Remove empty dir (if safe)
    if (fs.existsSync(typeImagesDir)) {
      if (rmIfEmpty(typeImagesDir, dryRun)) {
        removedDirs.push(`content/${t}/images/`)
      }
    }
  }

  const report = {
    mode: dryRun ? "dry-run" : "apply",
    copiedToRootCount: copiedToRoot.length,
    copiedToRoot,
    skippedSameCount: skippedSame.length,
    skippedSame,
    deletedFromTypeCount: deletedFromType.length,
    deletedFromType,
    conflictsCount: conflicts.length,
    conflicts,
    deleteErrorsCount: deleteErrors.length,
    deleteErrors,
    removedDirsCount: removedDirs.length,
    removedDirs,
  }

  const reportPath = path.join(CONTENT_DIR, "type-images-cleanup-report.json")
  if (!dryRun) {
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + "\n", "utf8")
  }

  console.log("--- TYPE IMAGES → ROOT CLEANUP ---")
  console.log(`Mode: ${report.mode}`)
  console.log(`Copied to root: ${report.copiedToRootCount}`)
  console.log(`Deleted from type folders: ${report.deletedFromTypeCount}`)
  console.log(`Conflicts: ${report.conflictsCount}`)
  console.log(`Delete errors: ${report.deleteErrorsCount}`)
  console.log(`Removed empty dirs: ${report.removedDirsCount}`)
  if (!dryRun) console.log("Wrote report: content/type-images-cleanup-report.json")
}

main()

