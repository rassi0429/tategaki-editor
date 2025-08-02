# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Tategaki Editor (縦書きエディタ)** - a web-based vertical Japanese text editor application. The goal is to create an editor suitable for writing text-based doujinshi and light novels with vertical Japanese text layout.

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Editor Core**: Lexical (Facebook's extensible text editor framework)
- **Styling**: CSS with writing-mode for vertical text support
- **Storage**: LocalStorage for document persistence

## Key Features to Implement

### Core Editor
- Vertical text editing using CSS `writing-mode: vertical-rl`
- Text styling: Headers (H1-H4), Bold, Italic, Strikethrough, Colors, Fonts
- Ruby text (ルビ) support for furigana annotations
- Page breaks with visual markers
- Indentation and line spacing controls

### Data Management
- Serialize to Lexical JSON format
- Auto-save to LocalStorage
- Template system for reusable styles

## Development Commands

```bash
# Initial setup (when package.json exists)
npm install

# Development server
npm run dev

# Build for production
npm run build

# Linting
npm run lint

# Type checking
npm run typecheck
```

## Architecture Considerations

### Vertical Text Implementation
- Use CSS `writing-mode: vertical-rl` for right-to-left vertical text flow
- Handle cursor movement and text selection in vertical context
- Ensure proper rendering of ruby text above characters

### Lexical Editor Integration
- Implement custom nodes for ruby text and page breaks
- Create custom plugins for vertical text-specific features
- Handle serialization/deserialization of custom node types

### State Management
- Document list management (create, delete, search)
- Editor settings and templates
- Real-time character/line/page counting

## Important Notes

- The reference site (https://vertical-japanese-input-editor.vercel.app/) provides the target UX for vertical text editing
- Focus on Japanese text layout conventions (right-to-left columns, top-to-bottom text)
- Ensure proper font support for Japanese characters
- Consider performance with large documents (optimize rendering and scrolling)