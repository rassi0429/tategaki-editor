import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { useEffect, useRef } from 'react'

import CustomOnChangePlugin from '@/components/editorplugins/CustomOnChangePlugin'
import NewLineVisibilityPlugin from '@/components/editorplugins/NewLineVisibilityPlugin'

import PageBreakPlugin from '@/components/editorplugins/PageBreakPlugin.tsx'
import * as styles from './TategakiEditor.css'
import CurrentInfo from './editorplugins/CurrentInfo'
import { RubyNode, RubyPlugin } from './editorplugins/RubyNode'
import {
  TateChuYokoNode,
  TateChuYokoPlugin,
} from './editorplugins/TateChuYokoNode'

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
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const editorElement = editorRef.current?.children[0] as HTMLElement
    if (!editorElement || !editorElement.parentNode) return

    const handleWheel = (event: Event) => {
      const wheelEvent = event as WheelEvent
      wheelEvent.preventDefault()
      const direction: -1 | 1 = (() => {
        if (wheelEvent.deltaX < 0) return 1
        if (wheelEvent.deltaX > 0) return -1
        if (wheelEvent.deltaY > 0) return 1
        if (wheelEvent.deltaY < 0) return -1
        return 1
      })()
      const distance =
        direction *
        Math.sqrt(
          wheelEvent.deltaX * wheelEvent.deltaX +
            wheelEvent.deltaY * wheelEvent.deltaY
        )
      editorElement.scrollLeft -= distance
    }

    editorElement.parentNode.addEventListener('wheel', handleWheel, {
      passive: false,
    })

    return () => {
      if (editorElement.parentNode) {
        editorElement.parentNode.removeEventListener('wheel', handleWheel)
      }
    }
  }, [])

  return (
    <div className={styles.container}>
      <RubyPlugin />
      <TateChuYokoPlugin />
      <NewLineVisibilityPlugin />
      <div className={styles.editor} ref={editorRef}>
        <RichTextPlugin
          contentEditable={<ContentEditable className={styles.input} />}
          placeholder={
            <div className={styles.placeholder}>
              <ruby>
                縦書き<rp>(</rp>
                <rt>たてがき</rt>
                <rp>)</rp>
              </ruby>
              テキストを入力してください...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <CurrentInfo />
        <PageBreakPlugin maxWidth={350} />
        <CustomOnChangePlugin
          {...((onChange ?? onSave) && { onChange: onChange ?? onSave })}
          {...((initialEditorState || initialContent) && {
            initString: initialEditorState || initialContent,
          })}
        />
      </div>
    </div>
  )
}

export default TategakiEditor
