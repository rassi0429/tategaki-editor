import { useRef } from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'

import ToolbarPlugin from '@/components/editorplugins/ToolbarPlugin'
import NewLineVisibilityPlugin from "@/components/editorplugins/NewLineVisibilityPlugin";
import CustomOnChangePlugin from "@/components/editorplugins/CustomOnChangePlugin"

import * as styles from './TategakiEditor.css'
import { EditorState } from 'lexical'
import CurrentInfo from './editorplugins/CurrentInfo'

interface TategakiEditorProps {
  initialContent?: string
  onSave?: (content: string) => void
  initialEditorState?: string
  onChange?: (content: string) => void
}


function TategakiEditor({ onChange, onSave, initialEditorState, initialContent }: TategakiEditorProps) {

  const editorStateRef = useRef(undefined);

  const initialConfig = {
    namespace: 'TategakiEditor',
    theme: styles.theme,
    nodes: [HeadingNode, QuoteNode],
    onError(error: Error) {
      console.error('Lexical error:', error)
    },
  }

  return (
    <div className={styles.container}>
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <NewLineVisibilityPlugin />
        <div className={styles.editor}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable className={styles.input} />
            }
            placeholder={
              <div className={styles.placeholder}>
                縦書きテキストを入力してください...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <CurrentInfo />
          <CustomOnChangePlugin onChange={onChange || onSave} initString={initialEditorState || initialContent} />
        </div>
      </LexicalComposer>
    </div>
  )
}

export default TategakiEditor
