#!/usr/bin/env node

/**
 * Interactive post creation script for Quartz
 * 
 * Usage:
 *   node scripts/new-post.js
 * 
 * The script will prompt you for all the details interactively.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { text, select, confirm, isCancel, cancel } from '@clack/prompts'
import { intro, outro } from '@clack/prompts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const contentDir = path.join(rootDir, 'content')

// Generate slug from text
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Get current date in YYYY-MM-DD format
function getCurrentDate() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Get existing folders in content directory
function getExistingFolders() {
  if (!fs.existsSync(contentDir)) {
    return []
  }
  
  const items = fs.readdirSync(contentDir, { withFileTypes: true })
  return items
    .filter(item => item.isDirectory() && !item.name.startsWith('.'))
    .map(item => item.name)
    .sort()
}

intro('Create a new post')

// Get content type
const contentType = await select({
  message: 'What type of content is this?',
  options: [
    { value: 'tanke', label: 'Tanke - Kort, flyktig tanke (strøm-lignende)' },
    { value: 'oppslagsverk', label: '<｜tool▁sep｜> - Oversikt over noe jeg lærer meg, eller referer til' },
    { value: 'utkast', label: 'Utkast - tanker jeg utforsker, som er i utvikling' },
    { value: 'notat', label: 'Notat - Mer gjennomtenkt og sammenhengende tekster' },
  ],
})

if (isCancel(contentType)) {
  cancel('Operation cancelled.')
  process.exit(0)
}

// Get title (optional for things - will auto-generate from first sentence if not provided)
let title = ''
if (contentType !== 'tanke') {
  const titleInput = await text({
    message: 'What is the title of your post?',
    placeholder: 'My Amazing Post',
    validate: (value) => {
      if (!value || value.trim().length === 0) {
        return 'Title is required'
      }
      return
    },
  })

  if (isCancel(titleInput)) {
    cancel('Operation cancelled.')
    process.exit(0)
  }

  title = titleInput
} else {
  // For tanker, title is optional - will auto-generate from first sentence if not provided
  const titleInput = await text({
    message: 'Add a title? (optional - will auto-generate from first sentence if skipped)',
    placeholder: 'Press Enter to skip',
    initialValue: '',
  })

  if (isCancel(titleInput)) {
    cancel('Operation cancelled.')
    process.exit(0)
  }

  title = titleInput?.trim() || ''
}

// Get alias (optional, only for stash, notions, writings)
let alias = ''
if (contentType !== 'tanke') {
  const aliasInput = await text({
    message: 'Add an alias for easier linking? (optional, press Enter to skip)',
    placeholder: 'Alternative Title',
    initialValue: '',
  })

  if (isCancel(aliasInput)) {
    cancel('Operation cancelled.')
    process.exit(0)
  }

  alias = aliasInput
}

// Determine target folder based on type
const typeFolders = {
  tanke: 'Tanker',
  oppslagsverk: '<｜tool▁sep｜>',
  utkast: 'Utkast',
  notat: 'Notater',
}

const targetFolder = typeFolders[contentType]

// Ensure the folder exists
const folderPath = path.join(contentDir, targetFolder)
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true })
  console.log(`📁 Created folder: ${targetFolder}/`)
}

// Get why value based on type
const whyOptions = {
  tanke: [
    { value: 'keep', label: 'keep - Things you don\'t want to lose' },
    { value: 'remember', label: 'remember - A moment, mood, scene' },
    { value: 'think', label: 'think - Early seed thought, tiny pre-notion' },
    { value: 'share', label: 'share - Small thought you want others to see' },
  ],
  oppslagsverk: [
    { value: 'keep', label: 'keep - Resource lists, links, quotes' },
    { value: 'remember', label: 'remember - Travel notes, personal logs, memory anchors' },
    { value: 'think', label: 'think - Conceptual summaries' },
    { value: 'work-out', label: 'work-out - Early structured notes ahead of an argument' },
    { value: 'share', label: 'share - Public resource (e.g., travel tips)' },
  ],
  utkast: [
    { value: 'think', label: 'think - Exploring an idea (default)' },
    { value: 'work-out', label: 'work-out - Forming a position or constructing reasoning' },
    { value: 'share', label: 'share - Publicly exploring a developing idea' },
  ],
  notat: [
    { value: 'share', label: 'share - Writing meant for others (default)' },
    { value: 'work-out', label: 'work-out - Public-facing argument or opinion-forming piece' },
    { value: 'think', label: 'think - Exploratory but long-form' },
  ],
}

const whyValue = await select({
  message: 'Why does this exist?',
  options: whyOptions[contentType],
})

if (isCancel(whyValue)) {
  cancel('Operation cancelled.')
  process.exit(0)
}

// For writings, ask about stage
let stage = null
if (contentType === 'notat') {
  const selectedStage = await select({
    message: 'What stage is this writing in?',
    options: [
      { value: 'forming', label: 'forming - Still working on it' },
      { value: 'done', label: 'done - Complete and finished' },
    ],
  })

  if (isCancel(selectedStage)) {
    cancel('Operation cancelled.')
    process.exit(0)
  }

  stage = selectedStage
}

// Ask if draft (only for stash, notions, writings - things are always published)
let isDraft = false
if (contentType !== 'tanke') {
  const draftConfirm = await confirm({
    message: 'Should this be a draft? (won\'t be published)',
    initialValue: false,
  })

  if (isCancel(draftConfirm)) {
    cancel('Operation cancelled.')
    process.exit(0)
  }

  isDraft = draftConfirm
}

// Ask if should hide reading time (only for longer content)
let hideReadingTime = false
if (contentType === 'notat' || contentType === 'utkast') {
  const hideReading = await confirm({
    message: 'Should reading time be hidden?',
    initialValue: false,
  })

  if (isCancel(hideReading)) {
    cancel('Operation cancelled.')
    process.exit(0)
  }

  hideReadingTime = hideReading
}

// Ask if should exclude from lists (skip for things - they're always excluded)
let excludeFromLists = false
if (contentType !== 'tanke') {
  const excludeInput = await confirm({
    message: 'Should this be excluded from Recent Notes and All Posts lists?',
    initialValue: false,
  })

  if (isCancel(excludeInput)) {
    cancel('Operation cancelled.')
    process.exit(0)
  }

  excludeFromLists = excludeInput
}

// Generate slug and date
const slug = title && title.trim() ? slugify(title) : `tanke-${Date.now()}`
const date = getCurrentDate()

// Determine file path
let filePath
if (targetFolder) {
  const folderPath = path.join(contentDir, targetFolder)
  // Create folder if it doesn't exist
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true })
    console.log(`📁 Created folder: ${targetFolder}/`)
  }
  filePath = path.join(folderPath, `${slug}.md`)
} else {
  filePath = path.join(contentDir, `${slug}.md`)
}

// Check if file already exists
if (fs.existsSync(filePath)) {
  const overwrite = await confirm({
    message: `File already exists at ${path.relative(rootDir, filePath)}. Overwrite?`,
    initialValue: false,
  })

  if (isCancel(overwrite) || !overwrite) {
    cancel('Operation cancelled.')
    process.exit(0)
  }
}

// Build frontmatter based on type
let frontmatter = `---
type: ${contentType}
why: ${whyValue}
`
// Automatically add "Tanker" tag for Tanker (for graph connectivity)
if (contentType === 'tanke') {
  frontmatter += `tags:
  - Tanker
`
}

if (contentType === 'tanke') {
  frontmatter += `date: ${date}
`
  // Add title if provided (otherwise will auto-generate from first sentence)
  if (title && title.trim()) {
    frontmatter += `title: ${title}
`
  }
} else {
  // For stash, notions, writings
  frontmatter += `title: ${title}
published: ${date}
`
  
  if (contentType === 'notat' && stage) {
    frontmatter += `stage: ${stage}
`
  }
  
  if (alias && alias.trim()) {
    frontmatter += `aliases:
  - "${alias.trim()}"
`
  }
  
  if (hideReadingTime) {
    frontmatter += `hideReadingTime: true
`
  }
  
  if (excludeFromLists) {
    frontmatter += `excludeFromLists: true
`
  }
  
  frontmatter += `permalink: ${slug}
${isDraft ? 'draft: true' : 'draft: false'}
`
}

frontmatter += `---

`

// Add content template based on type
if (contentType === 'tanke') {
  frontmatter += `Your quick thought, observation, or moment here.
`
} else if (contentType === 'oppslagsverk') {
  frontmatter += `# ${title}

Your reference note, summary, or building block here.

## Notes

Add your notes here.

## References

- Link 1
- Link 2
`
} else if (contentType === 'utkast') {
  frontmatter += `# ${title}

Your exploratory thinking, idea in progress, or conceptual sketch here.

## The Idea

What are you exploring?

## Thoughts

Your developing thoughts here.

## Questions

What questions does this raise?
`
} else {
  // writing
  frontmatter += `# ${title}

Start writing your content here...

## Introduction

Add your introduction here.

## Main Content

Add your main content sections as needed.

### Subsection

Use callouts for important information:

> [!tip] Pro Tip
> This is a helpful tip!

Link to other posts using wikilinks: [[other-post]]

Use highlights for ==important text==.

---

*Published: ${date}*
`
}

// Write file
fs.writeFileSync(filePath, frontmatter, 'utf8')

// Success message
const relativePath = path.relative(rootDir, filePath)
const typeLabels = {
  tanke: '🪶 Tanke',
  oppslagsverk: '📚 Oppslagsverk',
  utkast: '💭 Utkast',
  notat: '✍️  Notat',
}

outro(`✅ Post created successfully!

${typeLabels[contentType]}
${contentType !== 'tanke' ? `📝 Title: ${title}\n` : ''}📅 ${contentType === 'tanke' ? 'Date' : 'Published'}: ${date}
📂 Folder: ${targetFolder}
🎯 Why: ${whyValue}
${stage ? `📊 Stage: ${stage}\n` : ''}${alias && alias.trim() ? `🏷️  Alias: ${alias.trim()}\n` : ''}${isDraft ? '⚠️  Status: Draft (will not be published)\n' : ''}${hideReadingTime ? '⏱️  Reading time: Hidden\n' : ''}${excludeFromLists ? '🚫 Excluded from lists\n' : ''}${contentType === 'tanke' ? '🚫 Tanker er ekskludert fra lister som standard\n' : ''}
💡 Open ${relativePath} to start editing!
`)
