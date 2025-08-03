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
  initialEditorState: string
  onChange: (content: string) => void
}



const theme = {
  text: {
    bold: 'editor-text-bold',
    italic: 'editor-text-italic',
    strikethrough: 'editor-text-strikethrough',
    underline: 'editor-text-underline',
  },
  paragraph: 'editor-paragraph',
  heading: {
    h1: 'editor-heading-h1',
    h2: 'editor-heading-h2',
    h3: 'editor-heading-h3',
    h4: 'editor-heading-h4',
  },
}

function TategakiEditor({ onChange, initialEditorState }: TategakiEditorProps) {

  const editorStateRef = useRef(undefined);

  const initialConfig = {
    namespace: 'TategakiEditor',
    theme,
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
          <CustomOnChangePlugin onChange={onChange} initString={initialEditorState} />
        </div>
      </LexicalComposer>
    </div>
  )
}

export default TategakiEditor
