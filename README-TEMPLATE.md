# Post Creation Guide

Use the interactive script to quickly create new posts. Just run it and answer the prompts!

## How to Use

**Option 1: Use the alias (recommended)**
```bash
newpost
```

**Option 2: Run the script directly**
```bash
node scripts/new-post.js
```

> 💡 The `newpost` alias has been added to your `.zshrc`. If it doesn't work, run `source ~/.zshrc` or restart your terminal.

That's it! The script will ask you:

1. **Title** - What's the title of your post?
2. **Alias** (optional) - An alternative name for easier linking (press Enter to skip)
3. **Folder** - Which folder should it go in?
   - Shows existing folders (Writing, Travel, etc.)
   - Option to create a new folder
   - Option to put it in the root content folder
4. **Draft status** - Should this be a draft? (won't be published)

## What It Does

- ✅ Generates a URL-friendly slug from your title
- ✅ Sets today's date as published date
- ✅ Creates folders if they don't exist
- ✅ Adds proper frontmatter with all essential fields
- ✅ Includes template content with examples

## Example Session

```
$ node scripts/new-post.js

  Create a new post for Wayward

? What is the title of your post? › My Amazing Post
? Add an alias for easier linking? (optional, press Enter to skip) › Amazing Post
? Which folder should this go in? › Writing
? Should this be a draft? (won't be published) › No

✅ Post created successfully!

📝 Title: My Amazing Post
📅 Published: 2025-01-15
📂 Folder: Writing
🔗 Permalink: my-amazing-post
🏷️  Alias: Amazing Post

💡 Open content/Writing/my-amazing-post.md to start editing!
```

## Tips

- **Use aliases** - Makes it easier to link using natural titles (e.g., `[[Amazing Post]]` instead of `[[my-amazing-post]]`)
- **Create new folders** - The script will create any folder you specify
- **Draft mode** - Use drafts to work on posts privately before publishing
- **See WRITING-GUIDE.md** - For detailed info on callouts, wikilinks, transclusion, etc.
