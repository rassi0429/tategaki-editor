import {
  $getRoot,
} from 'lexical'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import ToolbarPlugin from './ToolbarPlugin'
import NewLineVisibilityPlugin from "@/components/NewLineVisibilityPlugin.tsx";

interface TategakiEditorProps {
  initialContent: string
  onChange: (content: string) => void
}

function MyOnChangePlugin({ onChange }: { onChange: (content: string) => void }) {

  return (
    <OnChangePlugin
      onChange={(editorState) => {
        editorState.read(() => {
          const root = $getRoot()
          const text = root.getTextContent()
          onChange(text)
        })
      }}
    />
  )
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

function TategakiEditor({ onChange }: TategakiEditorProps) {
  const initialConfig = {
    namespace: 'TategakiEditor',
    theme,
    nodes: [HeadingNode, QuoteNode],
    onError(error: Error) {
      console.error('Lexical error:', error)
    },
  }

  return (
    <div className="tategaki-editor-container">
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <NewLineVisibilityPlugin />
        <div className="tategaki-editor">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="tategaki-editor-input" />
            }
            placeholder={
              <div className="tategaki-editor-placeholder">
                縦書きテキストを入力してください...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <MyOnChangePlugin onChange={onChange} />
        </div>
      </LexicalComposer>
    </div>
  )
}

export default TategakiEditor
