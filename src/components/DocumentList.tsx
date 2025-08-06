import type React from 'react'
import { useEffect, useState } from 'react'
import {
  type Document,
  createDocument,
  deleteDocument,
  generateUUID,
  getDocuments,
  saveDocuments,
} from '../utils/documentManager'
import * as styles from './DocumentList.css'

interface DocumentListProps {
  onSelectDocument: (id: string) => void
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

interface LexicalNode {
  type: string
  text?: string
  children?: LexicalNode[]
}

interface LexicalEditorState {
  root: LexicalNode
}

const extractTextFromLexicalJSON = (
  editorStateJSON: LexicalEditorState
): string => {
  const root = editorStateJSON.root

  function extractTextFromNode(node: LexicalNode) {
    let text = ''

    // テキストノードの場合
    if (node.type === 'text') {
      return node.text || ''
    }

    // 子ノードがある場合は再帰的に処理
    if (node.children && Array.isArray(node.children)) {
      for (const child of node.children) {
        text += extractTextFromNode(child)
        // パラグラフなどのブロック要素の後に改行を追加
        if (child.type === 'paragraph' || child.type === 'heading') {
          text += '\n'
        }
      }
    }

    return text
  }

  return extractTextFromNode(root).trim()
}

const extractTextFromLexicalJSONStrSummary = (str: string) => {
  try {
    const json = JSON.parse(str)
    const text = extractTextFromLexicalJSON(json)
    return text.slice(0, 20)
  } catch {
    return ''
  }
}

type SortKey = 'title' | 'createdAt' | 'updatedAt' | 'characterCount'
type SortOrder = 'asc' | 'desc'
type ViewMode = 'card' | 'table'

export const DocumentList: React.FC<DocumentListProps> = ({
  onSelectDocument,
}) => {
  const [documents, setDocuments] = useState<Document[]>([])
  const [sortKey, setSortKey] = useState<SortKey>('updatedAt')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [viewMode, setViewMode] = useState<ViewMode>('card')

  useEffect(() => {
    loadDocuments()
  }, [])

  const getCharacterCount = (content: string): number => {
    try {
      const json = JSON.parse(content)
      const text = extractTextFromLexicalJSON(json)
      return text.length
    } catch {
      return 0
    }
  }

  const loadDocuments = () => {
    const docs = getDocuments()
    const sortedDocs = [...docs].sort((a, b) => {
      let aValue: string | number
      let bValue: string | number

      switch (sortKey) {
        case 'title':
          aValue = a.title
          bValue = b.title
          break
        case 'createdAt':
          aValue = new Date(a.createdAt).getTime()
          bValue = new Date(b.createdAt).getTime()
          break
        case 'updatedAt':
          aValue = new Date(a.updatedAt).getTime()
          bValue = new Date(b.updatedAt).getTime()
          break
        case 'characterCount':
          aValue = getCharacterCount(a.content)
          bValue = getCharacterCount(b.content)
          break
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      }
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    })
    setDocuments(sortedDocs)
  }

  const handleCreateNew = () => {
    const newDoc = createDocument('新しい文書')
    onSelectDocument(newDoc.id)
  }

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    if (window.confirm('この文書を削除してもよろしいですか？')) {
      deleteDocument(id)
      loadDocuments()
    }
  }

  const handleExport = (e: React.MouseEvent, doc: Document) => {
    e.stopPropagation()
    const exportData = {
      title: doc.title,
      content: doc.content,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${doc.title}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const importData = JSON.parse(e.target?.result as string)
            if (importData.title && importData.content) {
              const documents = getDocuments()
              const newDoc: Document = {
                id: generateUUID(),
                title: importData.title,
                content: importData.content,
                createdAt: importData.createdAt
                  ? new Date(importData.createdAt)
                  : new Date(),
                updatedAt: importData.updatedAt
                  ? new Date(importData.updatedAt)
                  : new Date(),
              }
              documents.push(newDoc)
              saveDocuments(documents)
              loadDocuments()
              alert('文書をインポートしました。')
            } else {
              alert('不正なファイル形式です。')
            }
          } catch {
            alert('ファイルの読み込みに失敗しました。')
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('desc')
    }
  }

  const getSortIcon = (key: SortKey) => {
    if (sortKey !== key) return '↕'
    return sortOrder === 'asc' ? '↑' : '↓'
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>縦書きエディタ</div>
        <div className={styles.headerActions}>
          <div className={styles.viewToggle}>
            <button
              type="button"
              className={
                viewMode === 'card'
                  ? styles.viewButtonActive
                  : styles.viewButton
              }
              onClick={() => setViewMode('card')}
              title="カード表示"
            >
              ▦
            </button>
            <button
              type="button"
              className={
                viewMode === 'table'
                  ? styles.viewButtonActive
                  : styles.viewButton
              }
              onClick={() => setViewMode('table')}
              title="テーブル表示"
            >
              ☰
            </button>
          </div>
          <button
            type="button"
            className={styles.newButton}
            onClick={handleImport}
          >
            インポート
          </button>
          <button
            type="button"
            className={styles.newButton}
            onClick={handleCreateNew}
          >
            新規作成
          </button>
        </div>
      </div>

      {documents.length === 0 ? (
        <div className={styles.emptyState}>
          <h2 className={styles.emptyStateTitle}>文書がありません</h2>
          <p className={styles.emptyStateText}>
            「新規作成」ボタンをクリックして、最初の文書を作成しましょう。
          </p>
          <button
            type="button"
            className={styles.newButton}
            onClick={handleCreateNew}
          >
            最初の文書を作成
          </button>
        </div>
      ) : viewMode === 'card' ? (
        <div className={styles.documentGrid}>
          {documents.map((doc) => {
            const charCount = getCharacterCount(doc.content)
            const preview = extractTextFromLexicalJSONStrSummary(doc.content)
            return (
              <div
                key={doc.id}
                className={styles.documentCard}
                onClick={() => onSelectDocument(doc.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onSelectDocument(doc.id)
                  }
                }}
              >
                <div className={styles.cardActions}>
                  <button
                    type="button"
                    className={styles.cardActionButton}
                    onClick={(e) => handleExport(e, doc)}
                  >
                    エクスポート
                  </button>
                  <button
                    type="button"
                    className={styles.cardDeleteButton}
                    onClick={(e) => handleDelete(e, doc.id)}
                  >
                    削除
                  </button>
                </div>
                <h3 className={styles.documentTitle}>{doc.title}</h3>
                <p className={styles.summaryText}>
                  {preview ? `${preview}...` : '(空の文書)'}
                </p>
                <p className={styles.documentMeta}>
                  文字数: {charCount.toLocaleString()}
                </p>
                <p className={styles.documentMeta}>
                  作成: {formatDate(doc.createdAt)}
                </p>
                <p className={styles.documentMeta}>
                  更新: {formatDate(doc.updatedAt)}
                </p>
              </div>
            )
          })}
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.documentTable}>
            <thead>
              <tr>
                <th
                  className={styles.sortableHeader}
                  onClick={() => handleSort('title')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleSort('title')
                    }
                  }}
                >
                  タイトル {getSortIcon('title')}
                </th>
                <th className={styles.tableHeader}>内容プレビュー</th>
                <th
                  className={styles.sortableHeader}
                  onClick={() => handleSort('characterCount')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleSort('characterCount')
                    }
                  }}
                >
                  文字数 {getSortIcon('characterCount')}
                </th>
                <th
                  className={styles.sortableHeader}
                  onClick={() => handleSort('createdAt')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleSort('createdAt')
                    }
                  }}
                >
                  作成日時 {getSortIcon('createdAt')}
                </th>
                <th
                  className={styles.sortableHeader}
                  onClick={() => handleSort('updatedAt')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleSort('updatedAt')
                    }
                  }}
                >
                  更新日時 {getSortIcon('updatedAt')}
                </th>
                <th className={styles.tableHeader}>アクション</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => {
                const charCount = getCharacterCount(doc.content)
                const preview = extractTextFromLexicalJSONStrSummary(
                  doc.content
                )
                return (
                  <tr
                    key={doc.id}
                    className={styles.documentRow}
                    onClick={() => onSelectDocument(doc.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        onSelectDocument(doc.id)
                      }
                    }}
                  >
                    <td className={styles.titleCell}>{doc.title}</td>
                    <td className={styles.previewCell}>
                      {preview ? `${preview}...` : '(空の文書)'}
                    </td>
                    <td className={styles.countCell}>
                      {charCount.toLocaleString()}
                    </td>
                    <td className={styles.dateCell}>
                      {formatDate(doc.createdAt)}
                    </td>
                    <td className={styles.dateCell}>
                      {formatDate(doc.updatedAt)}
                    </td>
                    <td className={styles.actionCell}>
                      <button
                        type="button"
                        className={styles.editButton}
                        onClick={(e) => {
                          e.stopPropagation()
                          onSelectDocument(doc.id)
                        }}
                      >
                        編集
                      </button>
                      <button
                        type="button"
                        className={styles.exportButton}
                        onClick={(e) => handleExport(e, doc)}
                      >
                        エクスポート
                      </button>
                      <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={(e) => handleDelete(e, doc.id)}
                      >
                        削除
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
