#!/bin/bash
# Wrapper script for new-post.js that works from any directory

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_DIR" && node scripts/new-post.js

