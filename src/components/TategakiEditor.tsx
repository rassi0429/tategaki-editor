import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'

import CustomOnChangePlugin from '@/components/editorplugins/CustomOnChangePlugin'
import NewLineVisibilityPlugin from '@/components/editorplugins/NewLineVisibilityPlugin'
import ToolbarPlugin from '@/components/editorplugins/ToolbarPlugin'

import * as styles from './TategakiEditor.css'
import CurrentInfo from './editorplugins/CurrentInfo'
import PageBreakPlugin from "@/components/editorplugins/PageBreakPlugin.tsx";

interface TategakiEditorProps {
  initialContent?: string
  onSave?: (content: string) => void
  initialEditorState?: string
  onChange?: (content: string) => void
}

function TategakiEditor({
  onChange,
  onSave,
  initialEditorState,
  initialContent,
}: TategakiEditorProps) {
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
            contentEditable={<ContentEditable className={styles.input} />}
            placeholder={
              <div className={styles.placeholder}>
                縦書きテキストを入力してください...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <CurrentInfo />
          <PageBreakPlugin />
          <CustomOnChangePlugin
            {...((onChange ?? onSave) && { onChange: onChange ?? onSave })}
            {...((initialEditorState || initialContent) && {
              initString: initialEditorState || initialContent,
            })}
          />
        </div>
      </LexicalComposer>
    </div>
  )
}

export default TategakiEditor
