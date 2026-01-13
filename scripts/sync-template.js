#!/usr/bin/env node

/**
 * Sync script to create a clean template version of the blog
 * 
 * This script:
 * 1. Copies the blog to blog-template folder
 * 2. Removes all personal content
 * 3. Adds template/example files
 * 4. Updates config files with placeholders
 * 
 * Usage: node scripts/sync-template.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const templateDir = path.join(rootDir, '..', 'blog-template')

// Files and folders to completely remove
const filesToRemove = [
  'TANKER-PAGE-DEBUG.md',
  'content/ada.md',
  'content/wayward.md',
  'content/this-place.md',
  'content/all-posts.md',
]

// Folders to clean (remove all .md files except index.md)
const foldersToClean = [
  'content/Notater',
  'content/Tanker',
  'content/Utkast',
  'content/Oppslagsverk',
  'content/Travel',
]

// Image extensions to remove
const imageExtensions = ['.jpg', '.jpeg', '.JPG', '.JPEG', '.png', '.PNG']

// Copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true })
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    
    // Skip node_modules, .git, and other ignored folders
    if (entry.name === 'node_modules' || 
        entry.name === '.git' || 
        entry.name === '.quartz-cache' ||
        entry.name === 'prof' ||
        entry.name === 'tsconfig.tsbuildinfo' ||
        entry.name === '.DS_Store') {
      continue
    }
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

// Remove file or directory
function removePath(filePath) {
  const fullPath = path.join(templateDir, filePath)
  if (fs.existsSync(fullPath)) {
    if (fs.statSync(fullPath).isDirectory()) {
      fs.rmSync(fullPath, { recursive: true, force: true })
    } else {
      fs.unlinkSync(fullPath)
    }
    console.log(`  ✓ Removed: ${filePath}`)
  }
}

// Clean folder of content files (keep index.md)
function cleanFolder(folderPath) {
  const fullPath = path.join(templateDir, folderPath)
  if (!fs.existsSync(fullPath)) return
  
  const entries = fs.readdirSync(fullPath, { withFileTypes: true })
  
  for (const entry of entries) {
    if (entry.isDirectory()) {
      // Recursively clean subdirectories
      cleanFolder(path.join(folderPath, entry.name))
      // Remove empty subdirectories (except if they contain index.md)
      const subPath = path.join(fullPath, entry.name)
      const subEntries = fs.readdirSync(subPath)
      if (subEntries.length === 0 || (subEntries.length === 1 && subEntries[0] === 'index.md')) {
        // Keep if it has index.md, otherwise remove if empty
        if (subEntries.length === 0) {
          fs.rmdirSync(subPath)
        }
      }
    } else if (entry.isFile()) {
      const filePath = path.join(fullPath, entry.name)
      // Keep index.md, remove everything else
      if (entry.name !== 'index.md' && entry.name.endsWith('.md')) {
        fs.unlinkSync(filePath)
        console.log(`  ✓ Removed: ${path.join(folderPath, entry.name)}`)
      }
      // Remove images
      if (imageExtensions.some(ext => entry.name.endsWith(ext))) {
        fs.unlinkSync(filePath)
        console.log(`  ✓ Removed image: ${path.join(folderPath, entry.name)}`)
      }
    }
  }
}

// Remove images from content root
function removeImagesFromRoot() {
  const contentRoot = path.join(templateDir, 'content')
  if (!fs.existsSync(contentRoot)) return
  
  const entries = fs.readdirSync(contentRoot, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.isFile() && imageExtensions.some(ext => entry.name.endsWith(ext))) {
      fs.unlinkSync(path.join(contentRoot, entry.name))
      console.log(`  ✓ Removed image: content/${entry.name}`)
    }
  }
}

// Update quartz.config.ts
function updateConfig() {
  const configPath = path.join(templateDir, 'quartz.config.ts')
  if (!fs.existsSync(configPath)) return
  
  let content = fs.readFileSync(configPath, 'utf-8')
  
  // Replace baseUrl
  content = content.replace(/baseUrl:\s*"[^"]*"/, 'baseUrl: "your-domain.com"')
  
  // Remove or comment out analytics if it's plausible
  content = content.replace(/analytics:\s*\{[^}]*provider:\s*"plausible"[^}]*\},?/s, '// analytics: { provider: "plausible" },')
  
  fs.writeFileSync(configPath, content, 'utf-8')
  console.log(`  ✓ Updated: quartz.config.ts`)
}

// Update content/index.md with template
function updateIndex() {
  const indexPath = path.join(templateDir, 'content/index.md')
  if (!fs.existsSync(indexPath)) return
  
  const templateIndex = `---
title: Your Blog Name
hideReadingTime: true
---

## Welcome to Your Digital Garden

This is a Quartz-based digital garden template. Customize this page to introduce yourself and your space.

> [minimal-tip]
> Next to the Search field you will find a toggle for Dark and Light modes. You can also enable the Reader Mode (hiding the sidebar) by clicking on the book icon.

---

## Content Structure

This template organizes content into four main types:

- **Tanker** - Quick, fleeting thoughts and observations
- **<｜tool▁sep｜>** - Reference material and building blocks  
- **Utkast** - Ideas in progress and exploratory thinking
- **Notater** - Complete, coherent long-form pieces

See the [Writing Guide](WRITING-GUIDE.md) for more information on how to use this structure.

---

## Getting Started

1. Update this file (\`content/index.md\`) with your own introduction
2. Update \`quartz.config.ts\` with your domain name
3. Start creating content in the appropriate folders
4. Run \`npm run build\` to build your site

`
  
  fs.writeFileSync(indexPath, templateIndex, 'utf-8')
  console.log(`  ✓ Updated: content/index.md`)
}

// Create example files
function createExampleFiles() {
  const examples = {
    'content/Tanker/example-tanke.md': `---
type: tanke
why: remember
date: 2025-01-15
tags:
  - Tanker
---

A quick thought, observation, or moment. Tanker are stream-like and chronological - the kind of thoughts that might otherwise be lost.

You can include images:

![[example-image.jpg]]

Or just text. Tanker don't need to become anything bigger; they're valid as they are.
`,
    'content/Oppslagsverk/example-oppslagsverk.md': `---
type: oppslagsverk
why: keep
title: Example Oppslagsverk Note
published: 2025-01-15
tags:
  - Reference
  - Resources
permalink: example-oppslagsverk
draft: false
---

# Example Oppslagsverk Note

Oppslagsverk is where you hold reference material, summaries, building blocks and more. It's your personal library of things worth keeping.

## Notes

Add your reference notes here.

## References

- [Link 1](https://example.com)
- [Link 2](https://example.com)
`,
    'content/Utkast/example-utkast.md': `---
type: utkast
why: think
title: Example Utkast
published: 2025-01-15
tags:
  - Exploration
permalink: example-utkast
draft: false
---

# Example Utkast

Utkast are ideas in progress, partially exploratory thinking, half-formed arguments, and thoughts you're working through.

## The Idea

What are you exploring?

## Thoughts

Your developing thoughts here.

## Questions

What questions does this raise?
`,
    'content/Notater/example-notat.md': `---
type: notat
stage: forming
why: share
title: Example Notat
published: 2025-01-15
tags:
  - Example
permalink: example-notat
draft: false
---

# Example Notat

Notater are the longer and more coherent pieces: guides, reflections, arguments. These are intended to be complete, even if they're still forming.

## Introduction

Start your writing here.

## Main Content

Add your main content sections as needed.

### Subsection

Use callouts for important information:

> [!tip] Pro Tip
> This is a helpful tip!

Link to other posts using wikilinks: [[example-oppslagsverk]]

Use highlights for ==important text==.

---

*Published: 2025-01-15*
`,
  }
  
  for (const [filePath, content] of Object.entries(examples)) {
    const fullPath = path.join(templateDir, filePath)
    const dir = path.dirname(fullPath)
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    
    fs.writeFileSync(fullPath, content, 'utf-8')
    console.log(`  ✓ Created: ${filePath}`)
  }
}

// Clean debug comments from code
function cleanDebugComments() {
  const clickableImagesPath = path.join(templateDir, 'quartz/plugins/transformers/clickableImages.ts')
  if (fs.existsSync(clickableImagesPath)) {
    let content = fs.readFileSync(clickableImagesPath, 'utf-8')
    
    // Remove debug comments
    content = content.replace(/\s*\/\/ If count is 0, try reading the file directly to debug/g, '')
    content = content.replace(/\s*\/\/ Debug: log path resolution and manifest lookup/g, '')
    
    fs.writeFileSync(clickableImagesPath, content, 'utf-8')
    console.log(`  ✓ Cleaned debug comments: clickableImages.ts`)
  }
}

// Clean public folder (remove generated HTML, keep structure)
function cleanPublicFolder() {
  const publicDir = path.join(templateDir, 'public')
  if (!fs.existsSync(publicDir)) return
  
  const entries = fs.readdirSync(publicDir, { withFileTypes: true })
  
  for (const entry of entries) {
    const entryPath = path.join(publicDir, entry.name)
    
    // Keep _optimized folder structure but remove images
    if (entry.name === '_optimized') {
      if (entry.isDirectory()) {
        const optEntries = fs.readdirSync(entryPath, { withFileTypes: true })
        for (const optEntry of optEntries) {
          if (optEntry.isFile() && !optEntry.name.endsWith('.json')) {
            fs.unlinkSync(path.join(entryPath, optEntry.name))
          }
        }
      }
      continue
    }
    
    // Keep static folder
    if (entry.name === 'static') {
      continue
    }
    
    // Remove HTML files and other generated content
    if (entry.isFile() && (entry.name.endsWith('.html') || entry.name.endsWith('.xml'))) {
      fs.unlinkSync(entryPath)
      console.log(`  ✓ Removed: public/${entry.name}`)
    } else if (entry.isDirectory() && entry.name !== 'static' && entry.name !== '_optimized') {
      // Remove subdirectories with generated content
      fs.rmSync(entryPath, { recursive: true, force: true })
      console.log(`  ✓ Removed: public/${entry.name}/`)
    }
  }
}

// Update package.json description
function updatePackageJson() {
  const packagePath = path.join(templateDir, 'package.json')
  if (!fs.existsSync(packagePath)) return
  
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'))
  pkg.description = "🌱 A Quartz-based digital garden template with Tanker, Oppslagsverk, Utkast, and Notater structure"
  pkg.name = "quartz-digital-garden-template"
  
  // Add build script if it doesn't exist
  if (!pkg.scripts) {
    pkg.scripts = {}
  }
  if (!pkg.scripts.build) {
    pkg.scripts.build = "npx quartz build"
  }
  
  fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n', 'utf-8')
  console.log(`  ✓ Updated: package.json`)
}

// Update scripts/new-post.js to remove "Wayward" reference
function updateNewPostScript() {
  const scriptPath = path.join(templateDir, 'scripts/new-post.js')
  if (!fs.existsSync(scriptPath)) return
  
  let content = fs.readFileSync(scriptPath, 'utf-8')
  content = content.replace(/intro\('Create a new post for Wayward'\)/, "intro('Create a new post')")
  
  fs.writeFileSync(scriptPath, content, 'utf-8')
  console.log(`  ✓ Updated: scripts/new-post.js`)
}

// Main execution
console.log('🚀 Starting template sync...\n')

// Step 1: Copy blog to template folder
console.log('📋 Step 1: Copying blog to template folder...')
if (fs.existsSync(templateDir)) {
  console.log(`  ⚠️  Template folder already exists. Removing...`)
  fs.rmSync(templateDir, { recursive: true, force: true })
}

copyDir(rootDir, templateDir)
console.log(`  ✓ Copied to: ${templateDir}\n`)

// Step 2: Remove personal files
console.log('🗑️  Step 2: Removing personal files...')
for (const file of filesToRemove) {
  removePath(file)
}
console.log('')

// Step 3: Clean content folders
console.log('🧹 Step 3: Cleaning content folders...')
for (const folder of foldersToClean) {
  cleanFolder(folder)
}
removeImagesFromRoot()
console.log('')

// Step 4: Clean public folder
console.log('🧹 Step 4: Cleaning public folder...')
cleanPublicFolder()
console.log('')

// Step 5: Update config files
console.log('⚙️  Step 5: Updating configuration files...')
updateConfig()
updateIndex()
updatePackageJson()
updateNewPostScript()
console.log('')

// Step 6: Clean debug comments
console.log('🧹 Step 6: Cleaning debug comments...')
cleanDebugComments()
console.log('')

// Step 7: Create example files
console.log('📝 Step 7: Creating example files...')
createExampleFiles()
console.log('')

console.log('✅ Template sync complete!')
console.log(`\n📂 Template location: ${templateDir}`)
console.log('\nNext steps:')
console.log('  1. Review the template folder')
console.log('  2. Test building: cd blog-template && npm install && npm run build')
console.log('  3. When ready, initialize git and push to GitHub')

