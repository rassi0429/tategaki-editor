import type React from 'react'
import { useEffect, useState } from 'react'
import {
  type Document,
  createDocument,
  deleteDocument,
  getDocuments,
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

const extractTextFromLexicalJSON = (editorStateJSON: any): string => {
  const root = editorStateJSON.root

  function extractTextFromNode(node: any) {
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

export const DocumentList: React.FC<DocumentListProps> = ({
  onSelectDocument,
}) => {
  const [documents, setDocuments] = useState<Document[]>([])

  useEffect(() => {
    loadDocuments()
  }, [])

  const loadDocuments = () => {
    setDocuments(getDocuments())
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>縦書きエディタ</div>
        <button className={styles.newButton} onClick={handleCreateNew}>
          新規作成
        </button>
      </div>

      {documents.length === 0 ? (
        <div className={styles.emptyState}>
          <h2 className={styles.emptyStateTitle}>文書がありません</h2>
          <p className={styles.emptyStateText}>
            「新規作成」ボタンをクリックして、最初の文書を作成しましょう。
          </p>
          <button className={styles.newButton} onClick={handleCreateNew}>
            最初の文書を作成
          </button>
        </div>
      ) : (
        <div className={styles.documentGrid}>
          {documents.map((doc) => (
            <div
              key={doc.id}
              className={styles.documentCard}
              onClick={() => onSelectDocument(doc.id)}
            >
              <button
                className={styles.deleteButton}
                onClick={(e) => handleDelete(e, doc.id)}
              >
                削除
              </button>
              <h3 className={styles.documentTitle}>{doc.title}</h3>
              <p className={styles.summaryText}>
                {extractTextFromLexicalJSONStrSummary(doc.content)}...
              </p>
              <p className={styles.documentMeta}>
                作成: {formatDate(doc.createdAt)}
              </p>
              <p className={styles.documentMeta}>
                更新: {formatDate(doc.updatedAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
