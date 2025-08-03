# Document List Interface Analysis
## Research Date: August 3, 2025

This document provides comprehensive analysis of the current document management implementation and recommendations for document list table columns in the Tategaki Editor.

## Current Implementation Analysis

### 1. Document Data Model
Based on analysis of `src/utils/documentManager.ts`, the current Document interface includes:

```typescript
interface Document {
  id: string;           // UUID for unique identification
  title: string;        // User-defined document title
  content: string;      // Lexical JSON serialized content
  createdAt: Date;      // Document creation timestamp
  updatedAt: Date;      // Last modification timestamp
}
```

### 2. Current Document List Implementation
**File**: `src/components/DocumentList.tsx`

**Current UI Pattern**: Card-based grid layout (not table)
- Document cards with visual hierarchy
- Each card displays:
  - Title (prominent heading)
  - Content summary (first 20 characters of extracted text)
  - Creation date (formatted in Japanese locale)
  - Last updated date
  - Delete button

**Current Features**:
- Japanese locale date formatting (`ja-JP`)
- Lexical JSON text extraction for content preview
- Card-based responsive layout
- Empty state handling
- Direct document creation and deletion

### 3. Data Persistence
**Storage**: LocalStorage with key `'tategaki-documents'`
**Serialization**: JSON with Date object parsing

## Reference Site Analysis

The reference site (https://vertical-japanese-input-editor.vercel.app/) appears to be a minimal implementation showing only "Vite + React + TS" placeholder content, indicating it may be a development/demo site rather than a fully featured reference implementation.

## Document List Table Column Recommendations

Based on the current implementation, Japanese text editor conventions, and document management best practices, here are the recommended columns for a document list table:

### Core Columns (Essential)

1. **タイトル (Title)**
   - **Width**: Flexible (30-40% of table width)
   - **Content**: Document title with fallback to "無題の文書"
   - **Features**: Clickable to open document, sortable
   - **Justification**: Primary identifier for users

2. **更新日時 (Last Updated)**
   - **Width**: Fixed (140px)
   - **Content**: `YYYY/MM/DD HH:MM` format
   - **Features**: Sortable (default descending)
   - **Justification**: Most relevant for recent work identification

3. **作成日時 (Created Date)**
   - **Width**: Fixed (140px)
   - **Content**: `YYYY/MM/DD HH:MM` format
   - **Features**: Sortable
   - **Justification**: Document lifecycle tracking

4. **内容プレビュー (Content Preview)**
   - **Width**: Flexible (25-30% of table width)
   - **Content**: First 30-50 characters of extracted text
   - **Features**: Truncated with "..." indicator
   - **Justification**: Quick content identification

### Extended Columns (Future Enhancement)

5. **文字数 (Character Count)**
   - **Width**: Fixed (80px)
   - **Content**: Total character count from Lexical content
   - **Features**: Sortable, formatted with comma separators
   - **Justification**: Important for Japanese writing projects

6. **ステータス (Status)**
   - **Width**: Fixed (100px)
   - **Content**: Badge indicators (下書き/Draft, 完成/Complete, etc.)
   - **Features**: Visual status indicators
   - **Justification**: Writing workflow management

7. **タグ (Tags)**
   - **Width**: Flexible (150px)
   - **Content**: Colored tag badges
   - **Features**: Filterable, multiple tags per document
   - **Justification**: Document categorization

### Actions Column

8. **アクション (Actions)**
   - **Width**: Fixed (120px)
   - **Content**: 
     - 編集 (Edit) button
     - 複製 (Duplicate) button
     - 削除 (Delete) button with confirmation
   - **Features**: Dropdown menu or icon buttons
   - **Justification**: Quick access to common operations

## Japanese UX Considerations

### Date/Time Formatting
- Use Japanese locale formatting: `2025年8月3日 20:39`
- Consider relative time for recent documents: `3分前`, `1時間前`, `昨日`

### Text Direction
- Table should maintain horizontal (left-to-right) layout even in vertical text editor
- Content preview should show horizontal text for readability in list context

### Typography
- Use clear hierarchy with appropriate font weights
- Consider using system fonts optimized for Japanese characters
- Ensure proper line height for mixed Japanese/Latin characters

## Implementation Phases

### Phase 1: Basic Table Layout
- Convert current card layout to responsive table
- Implement core columns (Title, Last Updated, Created Date, Content Preview)
- Add sorting functionality
- Maintain existing delete functionality

### Phase 2: Enhanced Features
- Add character count calculation
- Implement search/filter functionality
- Add status management
- Improve responsive design

### Phase 3: Advanced Features
- Tag system implementation
- Batch operations (select multiple documents)
- Export functionality
- Advanced sorting and filtering

## Technical Implementation Notes

### Data Processing
- Text extraction function already exists (`extractTextFromLexicalJSON`)
- Character counting should exclude markup and count only visible text
- Date formatting should use consistent Japanese locale

### Performance Considerations
- For large document collections, implement virtual scrolling
- Cache text extraction results to avoid repeated processing
- Consider pagination for collections over 100 documents

### Accessibility
- Ensure table is properly labeled for screen readers
- Implement keyboard navigation
- Provide alternative views for mobile users

## Recommended Table Structure

```typescript
interface DocumentListColumn {
  id: 'title' | 'updatedAt' | 'createdAt' | 'preview' | 'characterCount' | 'status' | 'tags' | 'actions';
  label: string;
  width: string | number;
  sortable: boolean;
  required: boolean;
}

const columns: DocumentListColumn[] = [
  { id: 'title', label: 'タイトル', width: '30%', sortable: true, required: true },
  { id: 'updatedAt', label: '更新日時', width: 140, sortable: true, required: true },
  { id: 'createdAt', label: '作成日時', width: 140, sortable: true, required: true },
  { id: 'preview', label: '内容プレビュー', width: '25%', sortable: false, required: true },
  { id: 'characterCount', label: '文字数', width: 80, sortable: true, required: false },
  { id: 'actions', label: 'アクション', width: 120, sortable: false, required: true },
];
```

## Conclusion

The recommended document list table should prioritize the essential information Japanese writers need: document identification (title, content preview) and temporal context (creation and modification dates). The current card-based layout works well for small collections but a table format will scale better and provide more efficient scanning for larger document libraries.

The implementation should maintain the existing Japanese locale formatting and text extraction capabilities while adding sortable columns and improved visual hierarchy for document management at scale.

---

*Research conducted on August 3, 2025*  
*Analysis based on existing codebase and Japanese text editor usage patterns*