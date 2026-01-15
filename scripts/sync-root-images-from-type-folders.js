#!/usr/bin/env node
/**
 * Quartz embeds like ![[images/foo.jpg]] resolve to /images/foo.jpg (vault-root),
 * i.e. they expect the file to exist at content/images/foo.jpg so the Assets
 * emitter can copy it to public/images/foo.jpg.
 *
 * This script copies (does NOT move) files from:
 *   content/{Notater,Oppslagsverk,Tanker,Utkast}/images/
 * into:
 *   content/images/
 *
 * It writes a small report to content/root-images-sync-report.json
 *
 * Usage:
 *   node scripts/sync-root-images-from-type-folders.js
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

ensureDir(ROOT_IMAGES_DIR)

const copied = []
const skippedSame = []
const conflicts = []

for (const t of TYPES) {
  const fromDir = path.join(CONTENT_DIR, t, "images")
  const files = listFiles(fromDir)
  for (const name of files) {
    const src = path.join(fromDir, name)
    const dest = path.join(ROOT_IMAGES_DIR, name)

    const s1 = statSafe(src)
    if (!s1) continue
    const s2 = statSafe(dest)

    if (!s2) {
      fs.copyFileSync(src, dest)
      copied.push({ from: `content/${t}/images/${name}`, to: `content/images/${name}` })
      continue
    }

    // If destination exists, treat as ok if same size; otherwise flag conflict
    if (s1.size === s2.size) {
      skippedSame.push({ from: `content/${t}/images/${name}`, to: `content/images/${name}` })
    } else {
      conflicts.push({
        from: `content/${t}/images/${name}`,
        to: `content/images/${name}`,
        fromSize: s1.size,
        toSize: s2.size,
      })
    }
  }
}

const report = {
  copiedCount: copied.length,
  copied,
  skippedSameCount: skippedSame.length,
  skippedSame,
  conflictsCount: conflicts.length,
  conflicts,
}

fs.writeFileSync(
  path.join(CONTENT_DIR, "root-images-sync-report.json"),
  JSON.stringify(report, null, 2) + "\n",
  "utf8",
)

console.log("--- ROOT IMAGES SYNC ---")
console.log(`Copied: ${report.copiedCount}`)
console.log(`Skipped (same size already exists): ${report.skippedSameCount}`)
console.log(`Conflicts (same name, different size): ${report.conflictsCount}`)
console.log("Wrote report: content/root-images-sync-report.json")

