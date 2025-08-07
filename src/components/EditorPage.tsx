import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import type React from 'react'
import { useEffect, useState } from 'react'
import {
  type Document,
  getDocument,
  updateDocument,
} from '../utils/documentManager'
import * as styles from './EditorPage.css'
import TategakiEditor from './TategakiEditor'
import * as editorStyles from './TategakiEditor.css'
import { RubyNode } from './editorplugins/RubyNode'
import { TateChuYokoNode } from './editorplugins/TateChuYokoNode'
import ToolbarPlugin from './editorplugins/ToolbarPlugin'
import {AuthorNode} from "@/components/editorplugins/AuthorNode.tsx";

interface EditorPageProps {
  documentId: string
  onBack: () => void
}

export const EditorPage: React.FC<EditorPageProps> = ({
  documentId,
  onBack,
}) => {
  const [document, setDocument] = useState<Document | null>(null)
  const [title, setTitle] = useState('')

  useEffect(() => {
    const doc = getDocument(documentId)
    if (doc) {
      setDocument(doc)
      setTitle(doc.title)
    }
  }, [documentId])

  const handleSave = (content: string) => {
    updateDocument(documentId, { content, title })
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    updateDocument(documentId, { title: e.target.value })
  }

  if (!document) {
    return <div>Loading...</div>
  }

  const initialConfig = {
    namespace: 'TategakiEditor',
    theme: editorStyles.theme,
    nodes: [HeadingNode, QuoteNode, RubyNode, TateChuYokoNode, AuthorNode],
    onError(error: Error) {
      console.error('Lexical error:', error)
    },
  }

  return (
    <div className={styles.container}>
      <LexicalComposer initialConfig={initialConfig}>
        <div className={styles.header}>
          <button type="button" className={styles.backButton} onClick={onBack}>
            一覧
          </button>
          <input
            type="text"
            className={styles.titleInput}
            value={title}
            onChange={handleTitleChange}
            placeholder="タイトル"
          />
          <div className={styles.toolbarContainer}>
            <ToolbarPlugin />
          </div>
        </div>
        <TategakiEditor initialContent={document.content} onSave={handleSave} />
      </LexicalComposer>
    </div>
  )
}
